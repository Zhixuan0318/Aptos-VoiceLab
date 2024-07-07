import { NextResponse } from 'next/server';
import client from '@/lib/mongodb';

export async function POST(req: Request) {
    const received = await req.json();
    const voice_id = received.voice_id;

    await client.connect();
    const db = client.db('voicelab');
    const voices = await db.collection('voices').find({}).toArray();

    for (let voice of voices) {
        if (voice[voice_id]) return NextResponse.json({ voice: voice[voice_id] });
    }
}
