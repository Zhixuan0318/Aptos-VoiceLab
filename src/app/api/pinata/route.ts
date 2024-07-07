import { NextResponse, NextRequest } from 'next/server';

import pinataSDK from '@pinata/sdk';

export async function POST(req: NextRequest) {
    try {
        const json = await req.json();

        const pinata = new pinataSDK(process.env.PINATA_API, process.env.PINATA_SECRET);

        const metadata = {
            name: json.name,
            description: json.description,
            image: `${process.env.PINATA_URL}QmfTT2zQhjJkVssL3R644EWreQXTAfR4JKVUGZkRzQqdbo`,

            attributes: [
                {
                    trait_type: 'creator',
                    value: json.creator,
                },
                {
                    trait_type: 'price',
                    value: json.price,
                },
                {
                    trait_type: 'labels',
                    value: json.labels,
                },
            ],
        };

        const result = await pinata.pinJSONToIPFS(metadata, {
            pinataMetadata: {
                name: json.name,
            },
        });

        return NextResponse.json(
            { uri: process.env.PINATA_URL + result.IpfsHash },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
