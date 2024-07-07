import client from '@/lib/mongodb';

export default async function getUser(id: string) {
    await client.connect();
    const db = client.db('voicelab');
    const user = await db.collection('users').find({ id }).toArray();

    if (user[0]) return user[0];

    const empty = {
        id: id,
        mint_voice_card: '',
        audios: [],
        used_voices: [],
        clones: [],
        type_account: 'sample',
    };
    await db.collection('users').insertOne(empty);
    return empty;
}
