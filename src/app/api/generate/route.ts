import client from '@/lib/mongodb';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
    const received = await req.json();
    await client.connect();
    const db = client.db('voicelab')
    const user = await db.collection('users').find({ id: Number(received.id) }).toArray()


    const response = fetch(`https://api.elevenlabs.io/v1/text-to-speech/${user[0].mint_voice_card}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            "xi-api-key": String(process.env.XI_API_KEY)
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

    

    let userAudios: any = [];
    
    if (user[0].type_account == 'sample') {
        if (user[0].audios.length < 100) {
            const arrayBuffer = await (await response).arrayBuffer();
            const blob = await put('arquivo.mp3', arrayBuffer, { access: 'public' });
            // verificar se ele adiciona conteudo ao invés de apagar e adicionar o novo
            userAudios.push(blob);
            db.collection('users').updateOne({ id: Number(received.id) }, { $set: { audios: userAudios } });
            return NextResponse.json({ download: blob.downloadUrl, sample:blob.url });
        }
    }
}



