import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
export const runtime = "nodejs";
export async function GET() { try { const db = await getDb(); await db.command({ping:1}); return NextResponse.json({ok:true,database:"connected",geminiConfigured:Boolean(process.env.GEMINI_API_KEY)}); } catch(e) { return NextResponse.json({ok:false,database:"disconnected",error:e instanceof Error?e.message:"Database connection failed"},{status:503}); } }
