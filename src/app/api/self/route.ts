
import { NextResponse } from 'next/server'
import clientPromise from '@/app/lib/mongo';


export async function GET(){
    const client = await clientPromise;
    const db = client.db('voicelab')
    const voices = await db.collection('voices').find({}).toArray()
    return NextResponse.json(voices);
}