import { NextResponse } from 'next/server';
import client from '@/lib/mongodb';

import getUser from '../getUser';

export async function POST(req: Request) {
    const received = await req.json();
    await client.connect();

    const user: any = await getUser(received.idPath);

    const sorted = user.used_voices.filter((item: any) => item.voice_id);

    return NextResponse.json({
        useVoice: sorted ? sorted[0] : undefined,
        usedVoices: sorted,
    });
}
