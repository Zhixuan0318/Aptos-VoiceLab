import { NextResponse } from 'next/server';
import client from '@/lib/mongodb';

import getUser from '../getUser';

export async function POST(req: Request) {
    const received = await req.json();
    await client.connect();

    const user: any = await getUser(received.idPath);

    return NextResponse.json({
        useVoice: user.used_voices ? user.used_voices[0] : undefined,
        usedVoices: user.used_voices,
    });
}
