import { NextResponse } from 'next/server'
import clientPromise from '@/app/lib/mongo';


export async function GET(){
    const client = await clientPromise;
    const db = client.db('aptos')
    const voices = await db.collection('voices').find({}).toArray()
    console.log("voices",voices)
    return NextResponse.json(voices);
}