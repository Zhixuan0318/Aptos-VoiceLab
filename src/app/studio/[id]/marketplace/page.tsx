//@ts-nocheck
'use client';
import Card from '../components/card';
import MintVoiceCard from '../components/mint-voice-card';
import { useEffect, useMemo, useState } from 'react';
import CardProps from '@/interfaces/card';
import MintProgress from '../components/mintin-progress';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CardMonetize from '../components/card-monetize';
import CardMarketplace from '../components/card';
import useAptos from '@/hooks/useAptos';

export default function Marketplace() {
    const idPath = usePathname().split('/')[2];
    const [mintVoiceCard, setMintVoiceCard] = useState<CardProps[]>([]);
    const [mintVoiceCardOpen, setMintVoiceCardOpen] = useState(false);
    const [mintingInProgress, setMintingInProgress] = useState(false);
    const [response, setResponse] = useState<{ voices: any[] }>({ voices: [] });
    const [self, setSelf] = useState<[]>([]);

    const [isMinted, setIsMinted] = useState(false);
    const [info, setInfo] = useState<string[]>([]);

    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (!self) return;

        const fethcing = async () => {
            const updated = [];

            for (let item of self) {
                if (!item) continue;

                const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/card-id`, {
                    method: 'POST',
                    body: JSON.stringify({ voice_id: item.voice_id }),
                }).catch((error) => {});
                const json = await response.json();

                if (!json || !json.voice) continue;

                updated.push(
                    <Card
                        key={item.name}
                        item={item}
                        setMintVoiceCard={setMintVoiceCard}
                        setMintVoiceCardOpen={setMintVoiceCardOpen}
                        by={json.voice.creator}
                        description={item.description}
                        mint={json.voice.mint}
                        aptos={json.voice.royalty}
                        self={true}
                        tokenId={json.voice.tokenId}
                        setInfo={setInfo}
                    />
                );
            }

            return updated;
        };

        fethcing().then((data) => setCards(data));
    }, [self]);

    useEffect(() => {
        fetch('https://api.elevenlabs.io/v1/voices', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((response) => setResponse(response))
            .catch((err) => console.error('erro ao : ', err));

        fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/self`, {
            method: 'POST',
            body: JSON.stringify({ idPath: idPath }),
        })
            .then((response) => response.json())
            .then((response) => setSelf(response))
            .catch((err) => console.error('erro ao : ', err));
    }, [idPath]);

    return (
        <div className='flex flex-col bg-white lg:h-screen'>
            <MintVoiceCard
                open={mintVoiceCardOpen}
                set={setMintVoiceCardOpen}
                item={mintVoiceCard}
                setMintinInProgress={setMintingInProgress}
                idPath={idPath}
                mintVoiceCard={mintVoiceCard}
                setIsMinted={setIsMinted}
                info={info}
            />
            <MintProgress
                open={mintingInProgress}
                set={setMintingInProgress}
                idPath={idPath}
                isMinted={isMinted}
            />

            <div
                className={`${mintVoiceCardOpen ? 'pointer-events-none' : ''} flex flex-col h-full`}
            >
                <div className='flex flex-col w-full border-b p-8 bg-white'>
                    <div className='flex flex-row items-center gap-2'>
                        <img className='w-8 h-8' src='/assets/images/nft.png' alt='' />
                        <h1 className='text-4xl'>Marketplace</h1>
                    </div>
                    <p className='text-xs md:text-base mt-4'>
                        Explore talented voiceover artist and mint their VoiceCard NFT to generate
                        your voiceover.
                    </p>
                </div>
                <div className='flex flex-col h-full justify-between overflow-y-auto'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-4 gap-2'>
                        {useMemo(
                            () =>
                                cards.length ? (
                                    cards
                                ) : (
                                    <div
                                        role='status'
                                        className='flex flex-col items-center justify-center gap-y-2 col-span-full'
                                    >
                                        <svg
                                            aria-hidden='true'
                                            className='w-8 h-8 text-gray-200 animate-spin fill-black'
                                            viewBox='0 0 100 101'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                                fill='currentColor'
                                            />
                                            <path
                                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                                fill='currentFill'
                                            />
                                        </svg>
                                        <h2 className='text-center'>
                                            Please be patient, while we fetching the data
                                        </h2>
                                    </div>
                                ),
                            [cards]
                        )}
                    </div>
                    <button className='border rounded-lg p-2 m-4'>Load More</button>
                </div>
            </div>
        </div>
    );
}
