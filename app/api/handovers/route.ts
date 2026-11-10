import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { cleanText, isValidObjectId } from "@/lib/validation";
export const runtime="nodejs";
function parseJson(s:string):Record<string,unknown>{const t=s.trim().replace(/^```(?:json)?\\s*/i,"").replace(/\\s*```$/,"");const a=t.indexOf("{"),b=t.lastIndexOf("}");if(a<0||b<=a)throw new Error("Gemini did not return valid JSON. Try again.");return JSON.parse(t.slice(a,b+1)) as Record<string,unknown>;}
export async function POST(req:NextRequest){try{
 if(!process.env.GEMINI_API_KEY)return NextResponse.json({error:"GEMINI_API_KEY is missing. Add it to .env.local and restart the server."},{status:503});
 const b=await req.json(),projectId=cleanText(b.projectId,50),incomingMember=cleanText(b.incomingMember,100)||"Incoming team member";
 if(!isValidObjectId(projectId))return NextResponse.json({error:"Select a valid project."},{status:400});
 const db=await getDb(),project=await db.collection("projects").findOne({_id:new ObjectId(projectId)});
 if(!project)return NextResponse.json({error:"Project not found."},{status:404});
 const activities=await db.collection("activities").find({projectId}).sort({createdAt:1}).limit(250).toArray();
 if(!activities.length)return NextResponse.json({error:"Add at least one project activity first."},{status:400});
 const compact=activities.map(a=>({evidenceId:a._id.toString(),type:a.type,title:a.title,description:a.description,owner:a.owner,status:a.status,evidence:a.evidence||"No external evidence supplied",createdAt:a.createdAt}));
 const prompt=`Prepare a careful project handover using ONLY the supplied records. Never invent facts, owners, dates, progress, decisions, risks or dependencies. If unavailable say Not recorded. If sources disagree describe the conflict. Every item in decisions, completedWork, pendingWork, ownership, risks, dependencies and nextActions must include evidenceIds using only supplied evidenceId values. Put unsupported or missing facts in missingInformation. Return valid JSON only: {"projectSummary":"", "decisions":[{"item":"","evidenceIds":[]}], "completedWork":[{"item":"","owner":"","evidenceIds":[]}], "pendingWork":[{"item":"","owner":"","status":"","evidenceIds":[]}], "ownership":[{"area":"","owner":"","evidenceIds":[]}], "risks":[{"item":"","severity":"unknown|low|medium|high","evidenceIds":[]}], "dependencies":[{"item":"","evidenceIds":[]}], "missingInformation":[{"item":"","whyItMatters":""}], "nextActions":[{"action":"","reason":"","evidenceIds":[]}], "handoverQuestions":[""]}. Project: ${project.name}. Description: ${project.description||"Not provided"}. Incoming member: ${incomingMember}. Records: ${JSON.stringify(compact)}`;
 const model=process.env.GEMINI_MODEL||"gemini-2.5-flash";
 const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:prompt}]}],generationConfig:{temperature:0.2,responseMimeType:"application/json"}}),cache:"no-store"});
 const payload=await response.json(); if(!response.ok)return NextResponse.json({error:payload?.error?.message||`Gemini request failed (${response.status})`},{status:502});
 const generated=payload?.candidates?.[0]?.content?.parts?.map((p:{text?:string})=>p.text||"").join(""); if(!generated)return NextResponse.json({error:"Gemini returned an empty response."},{status:502});
 const content=parseJson(generated),handover={projectId,incomingMember,content,sourceActivityIds:activities.map(a=>a._id.toString()),createdAt:new Date().toISOString()};
 const r=await db.collection("handovers").insertOne(handover); return NextResponse.json({_id:r.insertedId.toString(),...handover},{status:201});
}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Could not generate handover"},{status:500});}}
