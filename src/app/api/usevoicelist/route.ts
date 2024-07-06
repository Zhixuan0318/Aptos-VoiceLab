import { NextResponse } from 'next/server'
import client from '@/lib/mongodb';


export async function POST(req: Request) {
    const received = await req.json();
    await client.connect();
    const db = client.db('voicelab')
    let voices: any = [];
    let voice: any = []

    await fetch('https://api.elevenlabs.io/v1/voices', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(response => {
            voices = response.voices
        })
        .catch(err => console.error('erro ao : ', err))


    const user: any = await db.collection('users').find({ id: Number(received.idPath) }).toArray()
    user[0].clones.map((item: any) => { voices.push(item) })

    voices.map((item: any) => {
        if (item.voice_id == user[0].mint_voice_card) {
            voice = item
        }
    })


    return NextResponse.json({ useVoice: voice, usedVoices: user[0].used_voices });
}