import client from '@/lib/mongodb';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

import getUser from '../getUser';

export async function POST(req: Request) {
    const received = await req.json();
    await client.connect();
    const db = client.db('voicelab');

    const response = fetch(`https://api.elevenlabs.io/v1/text-to-speech/${received.voice_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xi-api-key': String(process.env.XI_API_KEY),
        },
        body: JSON.stringify({
            text: received.textToSpeach,
            voice_settings: {
                stability: 0.1,
                similarity_boost: 0.1,
                style: 1,
                use_speaker_boost: true,
            },
        }),
    });

    let userAudios: any = [];

    const user = await getUser(received.id);
    const arrayBuffer = await (await response).arrayBuffer();
    const blob = await put('arquivo.mp3', arrayBuffer, { access: 'public' });

    let newQuota = 0;

    for (let i = 0; i < user.used_voices.length; i++) {
        if (user.used_voices[i].voice_id == received.voice_id) {
            user.used_voices[i].quotes -= received.words;
            newQuota = user.used_voices[i].quotes;
            break;
        }
    }

    const updatedUsedVoices = (user.used_voices as any[]).filter((voice: any) => voice.quotes > 0);

    userAudios.push(blob);
    await db
        .collection('users')
        .updateOne(
            { id: received.id },
            { $set: { audios: userAudios, used_voices: updatedUsedVoices } }
        );
    return NextResponse.json({ download: blob.downloadUrl, sample: blob.url, newQuota });
}
