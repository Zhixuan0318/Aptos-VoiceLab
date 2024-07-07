import { NextResponse } from 'next/server';
import client from '@/lib/mongodb';
import { put } from '@vercel/blob';

import getUser from '../getUser';

export async function POST(req: Request) {
    const formData = await req.formData();
    await client.connect();
    const db = client.db('voicelab');
    const id = formData.get(`id`) as string;
    const user = await getUser(id as string);
    let userAudios: any = [];
    let filesBlobs: any = [];
    const labelStrings: any = [];

    for (let x = 0; x < 10; x++) {
        const audioFile = formData.get(`audio${x}`);
        if (audioFile) {
            if (user.type_account == 'sample') {
                if (user.audios.length < 100) {
                    const blob = await put('arquivo.mp3', audioFile, { access: 'public' });
                    userAudios.push(blob);
                    db.collection('users').updateOne({ id: id }, { $set: { audios: userAudios } });
                }
            }

            const fileUrl = userAudios[x].url;
            const fileResponse = await fetch(fileUrl);
            const fileBlob = await fileResponse.blob();
            filesBlobs.push(fileBlob);
        }
    }

    const form = new FormData();

    const name = String(formData.get('name'));
    const description = String(formData.get('description'));
    const labels = formData.get('labels');
    const royalty = formData.get('royalty') as string;
    const newCardId = formData.get('newCardId') as string;

    form.append('name', name);
    form.append('files', new File(filesBlobs, 'audio.mp3', { type: filesBlobs[0].type }));
    form.append('description', description);
    const dataLabels = { tag: labels };
    form.append('labels', JSON.stringify(dataLabels));

    const options = {
        method: 'POST',
        headers: {
            'xi-api-key': String(process.env.XI_API_KEY),
        },
        body: form,
    };

    const response = await fetch('https://api.elevenlabs.io/v1/voices/add', options);
    const data = await response.json();

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

    let clones: any = [];
    userClonings.voices.map((item: any) => {
        if (item.category === 'cloned') {
            clones.push(item);
        }
    });

    const voice_id = data.voice_id as string;

    user.used_voices.push({
        tokenId: newCardId,
        voice_id: voice_id,
        quotes: 10000,
        name: name,
    });

    db.collection('users').updateOne(
        { id: id },
        { $set: { clones: clones, used_voices: user.used_voices } }
    );
    db.collection('voices').insertOne({
        [voice_id]: {
            tokenId: newCardId,
            creator: id,
            royalty,
            mint: 0,
        },
    });

    return NextResponse.json({ voice_id: data.voice_id });
}
