import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { cleanText } from "@/lib/validation";
export const runtime = "nodejs";
export async function GET() { try { const db=await getDb(); const rows=await db.collection("projects").find({}).sort({createdAt:-1}).limit(50).toArray(); return NextResponse.json(rows.map(p=>({_id:p._id.toString(),name:p.name,description:p.description||"",createdAt:p.createdAt}))); } catch(e) { return NextResponse.json({error:e instanceof Error?e.message:"Could not load projects"},{status:500}); } }
export async function POST(req:NextRequest) { try { const b=await req.json(); const name=cleanText(b.name,100), description=cleanText(b.description,500); if(!name)return NextResponse.json({error:"Project name is required."},{status:400}); const db=await getDb(); const project={name,description,createdAt:new Date().toISOString()}; const r=await db.collection("projects").insertOne(project); return NextResponse.json({_id:r.insertedId.toString(),...project},{status:201}); } catch(e) { return NextResponse.json({error:e instanceof Error?e.message:"Could not create project"},{status:500}); } }
