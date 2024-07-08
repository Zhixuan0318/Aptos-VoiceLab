import { NextResponse } from 'next/server';
import client from '@/lib/mongodb';

export async function POST(req: Request) {
    const received = await req.json();

    try {
        await client.connect();
        const db = client.db('voicelab');

        await db.collection('voices').insertOne({
            voice_id: received.voice_id,
            voice: {
                tokenId: received.tokenId,
                creator: received.creator,
                royalty: received.royalty,
                mint: 0,
            },
        });

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        return NextResponse.json({}, { status: 500 });
    }
}
