import { NextResponse } from 'next/server'
import clientPromise from '@/app/lib/mongo';


export async function POST(req: Request) {
    const received = await req.json();
    const client = await clientPromise;
    const db = client.db('aptos')
    const user = await db.collection('users').find({ id: Number(received.id) }).toArray()
    return NextResponse.json(user[0].clones);
}