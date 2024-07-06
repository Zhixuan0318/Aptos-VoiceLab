import { NextResponse } from 'next/server'
import client from '@/lib/mongodb';



export async function POST(req: Request) {
    const received = await req.json();
    await client.connect();
    const db = client.db('voicelab')

    db.collection('users').updateOne({ id: Number(received.id) }, { $set: { mint_voice_card: received.voice_id } });
    const user = await db.collection('users').find({ id: Number(received.id) }).toArray()
    let used_voices = user[0].used_voices
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

    user[0].clones.map((item: any) => { voices.push(item) })

    voices.map((item: any) => {
        if (item.voice_id == user[0].mint_voice_card) {
            voice = item
        }
    })
    
    if(!used_voices.some((item:any) => item.voice_id == voice.voice_id)){
        used_voices.push(voice)
    }
    
    db.collection('users').updateOne({ id: Number(received.id) }, { $set: { used_voices: used_voices } });
    return NextResponse.json({});
}