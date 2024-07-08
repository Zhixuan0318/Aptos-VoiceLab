import { NextResponse } from 'next/server';
import client from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const received = await req.json();

        await client.connect();
        const db = client.db('voicelab');
        const voices = await db
            .collection('voices')
            .find({ voice_id: received.voice_id })
            .toArray();

        await db.collection('voices').deleteMany({ voice_id: null });

        return NextResponse.json({ voice: voices[0].voice });
    } catch (error) {
        return NextResponse.json({
            voice: {
                tokenId: '0x0000000000000000000000000000000000000000000000000000000000000001',
                creator: '0x0000000000000000000000000000000000000000000000000000000000000001',
                royalty: '0',
                mint: 0,
            },
        });
    }
}
