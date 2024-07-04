import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongo';
import { put } from '@vercel/blob';


export async function POST(req: Request) {
    console.log("log")
    const formData = await req.formData();
    const client = await clientPromise;
    const db = client.db('aptos')
    const id = formData.get(`id`)
    const user = await db.collection('users').find({ id: Number(id) }).toArray()
    let userAudios: any = [];
    let filesBlobs: any = [];
    let userClonings: any = [];
    const labelStrings:any = [];



    for (let x = 0; x < 10; x++) {
        const audioFile = formData.get(`audio${x}`)
        if (audioFile) {

            if (user[0].type_account == 'sample') {
                if (user[0].audios.length < 100) {
                    const blob = await put('arquivo.mp3', audioFile, { access: 'public' });
                    userAudios.push(blob);
                    db.collection('users').updateOne({ id: Number(id) }, { $set: { audios: userAudios } });
                }
            }



            const fileUrl = userAudios[x].url;
            const fileResponse = await fetch(fileUrl);
            const fileBlob = await fileResponse.blob();
            filesBlobs.push(fileBlob)
        }
    }



    
    const form = new FormData();
    
    const name = String(formData.get('name'));
    const description = String(formData.get('description'));
    const labels = formData.get('labels')
    const royalty = formData.get('royalty')
    


    form.append("name", name);
    form.append("files", new File(filesBlobs, "audio.mp3", { type: filesBlobs[0].type }));
    form.append("description", description);
    form.append("labels", JSON.stringify({labels}))


    const options = {
        method: 'POST',
        headers: {
            'xi-api-key': 'sk_cc0a19099b75867088a061d754f2c8072d2efac886bb7ea3',
        },
        body: form
    };


    const response = await fetch('https://api.elevenlabs.io/v1/voices/add', options);
    const data = await response.json();


    user[0].clones.map((clone: any) => userClonings.push(clone))
    userClonings.push({ id: data.voice_id, name: name, description: description, mint:0, erned:0, royalty:royalty, labels: JSON.parse(String(labels)) });
    
    db.collection('users').updateOne({ id: Number(id) }, { $set: { clones: userClonings } });
    db.collection('voices').insertOne({id: data.voice_id, name: name, description: description, mint:0, erned:0, royalty:royalty, labels: JSON.parse(String(labels))})
    return NextResponse.json({})
}