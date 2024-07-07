import { NextResponse } from 'next/server'
import client from '@/lib/mongodb';


export async function POST(req: Request) {
    const received = await req.json();
    await client.connect();
    const db = client.db('voicelab')
    const userClonings = await fetch('https://api.elevenlabs.io/v1/voices', {
        method: 'GET',
        headers: {
            "xi-api-key": String(process.env.XI_API_KEY)
        }
    })
        .then(response => response.json())
        .then(response => { return response })
        .catch(err => console.error('erro ao : ', err))
    
    let createdCards:any = []
    userClonings.voices.map((item: any) => {
        if (item.category === "cloned") {
            createdCards.push(item)
        }
    })

    db.collection('users').updateOne({ id: Number(received.id) }, { $set: { createdCards: createdCards } });
    const user = await db.collection('users').find({ id: Number(received.id) }).toArray()
    return NextResponse.json(user[0].createdCards);
}