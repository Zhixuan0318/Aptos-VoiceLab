import { NextResponse } from 'next/server';
import client from '@/lib/mongodb';

import getUser from '../getUser';

export async function POST(req: Request) {
    try {
        const received = await req.json();
        await client.connect();
        const db = client.db('voicelab');

        const user = await getUser(received.id);

        let used_voices = user.used_voices;

        used_voices.push({
            tokenId: received.tokenId,
            voice_id: received.voice_id,
            quotes: 10000,
            name: received.name,
        });

        const voice_id = received.voice_id;

        const voices = await db.collection('voices').find({ voice_id }).toArray();

        const voice = voices[0].voice;

        await db.collection('voices').updateOne(
            {
                voice_id,
            },
            {
                $set: {
                    voice_id,
                    voice: {
                        tokenId: voice.tokenId,
                        creator: voice.creator,
                        royalty: voice.royalty,
                        mint: voice.mint + 1,
                    },
                },
            }
        );

        await db.collection('users').updateOne({ id: received.id }, { $set: { used_voices } });
    } catch (error) {}

    return NextResponse.json({});
}
