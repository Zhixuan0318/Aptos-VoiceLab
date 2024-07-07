import { NextResponse } from 'next/server';
import client from '@/lib/mongodb';
import getUser from '../getUser';

export async function POST(req: Request) {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xi-api-key': String(process.env.XI_API_KEY),
        },
    });

    const json = await response.json();

    const data = json.voices.filter((item: any) => item.category == 'cloned');

    return NextResponse.json(data);
}
