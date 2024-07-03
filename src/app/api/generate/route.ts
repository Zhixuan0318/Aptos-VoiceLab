// import clientPromise from '@/app/lib/mongo';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
    const received = await req.json();
    // const client = await clientPromise;
    // const db = client.db('aptos')
    const response = fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
            "xi-api-key": "sk_8311f88cebb94c437691f2ea5299eb50529b93bfa8f319af"
        },
        body: JSON.stringify({
            text: received.textToSpeach,
            "voice_settings": {
                "stability": 0.1,
                "similarity_boost": 0.1,
                "style": 1,
                "use_speaker_boost": true
            }
        })
    })

    // const user = await db.collection('users').find({ id: Number(received.id) }).toArray()

    // let userAudios: any = [];
    
    // if (user[0].type_account == 'sample') {
        // if (user[0].audios.length < 100) {
            const arrayBuffer = await (await response).arrayBuffer();
            const blob = await put('arquivo.mp3', arrayBuffer, { access: 'public' });
            // userAudios.push(blob);
            // db.collection('users').updateOne({ id: Number(received.id) }, { $set: { audios: userAudios } });
            return NextResponse.json({ download: blob.downloadUrl });
        // }
    // }
}



