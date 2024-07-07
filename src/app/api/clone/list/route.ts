import { NextResponse } from 'next/server';
import client from '@/lib/mongodb';

import getUser from '../../getUser';

export async function POST(req: Request) {
    const received = await req.json();
    await client.connect();
    const db = client.db('voicelab');
    const userClonings = await fetch('https://api.elevenlabs.io/v1/voices', {
        method: 'GET',
        headers: {
            'xi-api-key': String(process.env.XI_API_KEY),
        },
    })
        .then((response) => response.json())
        .then((response) => {
            return response;
        })
        .catch((err) => console.error('erro ao : ', err));

    const voices = await db.collection('voices').find({}).toArray();
    let clones: any = [];
    userClonings.voices.map((item: any) => {
        voices.map((voice) => {
            if (
                voice[item.voice_id] &&
                received.id == voice[item.voice_id].creator &&
                item.category === 'cloned'
            ) {
                clones.push(item);
            }
        });
    });

    await getUser(received.id);

    db.collection('users').updateOne({ id: received.id }, { $set: { clones: clones } });
    return NextResponse.json(clones);
}
