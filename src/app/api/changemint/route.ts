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

        const voices = await db.collection('voices').find({}).toArray();

        const voice: any = voices.find((voice) => {
            const keys = Object.keys(voice);
            return keys[1] == received.voice_id;
        });

        const mint = voice[voice_id].mint + 1;

        console.log(
            await db
                .collection('voices')
                .find({
                    [voice_id]: {
                        tokenId: voice[voice_id].tokenId,
                        creator: voice[voice_id].creator,
                        royalty: voice[voice_id].royalty,
                        mint: voice[voice_id].mint,
                    },
                })
                .toArray()
        );

        db.collection('voices').updateOne(
            {
                [voice_id]: {
                    tokenId: voice[voice_id].tokenId,
                    creator: voice[voice_id].creator,
                    royalty: voice[voice_id].royalty,
                    mint: voice[voice_id].mint,
                },
            },
            {
                $set: {
                    [voice_id]: {
                        tokenId: voice[voice_id].tokenId,
                        creator: voice[voice_id].creator,
                        royalty: voice[voice_id].royalty,
                        mint: mint,
                    },
                },
            }
        );

        db.collection('users').updateOne({ id: received.id }, { $set: { used_voices } });
    } catch (error) {
        console.log(error);
    }

    return NextResponse.json({});
}
