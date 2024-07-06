import { NextResponse } from 'next/server'
import client from '@/lib/mongodb';


export async function POST(req: Request) {
    const received = await req.json();
    await client.connect();
    const db = client.db('voicelab')
    const user = await db.collection('users').find({ id: Number(received.idPath) }).toArray()
    const voices = user[0].clones
    return NextResponse.json(voices);
}