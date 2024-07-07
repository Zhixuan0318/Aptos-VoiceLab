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
    const userClonings = await fetch('https://api.elevenlabs.io/v1/voices', {
        method: 'GET',
        headers: {
            "xi-api-key": String(process.env.XI_API_KEY)
        }
    })
        .then(response => response.json())
        .then(response => { return response })
        .catch(err => console.error('erro ao : ', err))


    if (!userClonings.voices.some((item: any) => item.voice_id === user[0].mint_voice_card)) {
        await db.collection('users').updateOne({ id: Number(received.idPath) }, { $set: { mint_voice_card: "" } });
    }

    let newUsedVoices:any = []
    user[0].ownerCards.map((item: any) => {
        if (userClonings.voices.some((itemUserCreatedCards: any) => itemUserCreatedCards.voice_id == item.voice_id)) {
            newUsedVoices.push(item)
        }
    }) 
    
    
    await db.collection('users').updateOne({ id: Number(received.idPath) }, { $set: { ownerCards: newUsedVoices } });
    user[0].createdCards.map((item: any) => { voices.push(item) })
    voices.map((item: any) => {
        if (item.voice_id == user[0].mint_voice_card) {
            voice = item
        }
    })


    return NextResponse.json({ useVoice: voice, usedVoices: user[0].ownerCards });
}