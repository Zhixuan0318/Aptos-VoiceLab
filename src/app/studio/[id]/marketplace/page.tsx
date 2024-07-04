//@ts-nocheck
"use client"
import Card from "../components/card";
import { sampleData } from "@/app/data/sample-data";
import MintVoiceCard from "../components/mint-voice-card";
import { useEffect, useState } from "react";
import CardProps from "@/interfaces/card";
import MintProgress from "../components/mintin-progress";




export default function Marketplace() {
    const [mintVoiceCard, setMintVoiceCard] = useState<CardProps[]>([]);
    const [mintVoiceCardOpen, setMintVoiceCardOpen] = useState(false);
    const [mintingInProgress, setMintingInProgress] = useState(false);
    const [response, setResponse] = useState<{ voices: any[] }>({ voices: [] });
    const [self, setSelf] = useState<{ voices: any[] }>({ voices: [] });


    useEffect(() => {
        fetch('https://api.elevenlabs.io/v1/voices', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => setResponse(response))
            .catch(err => console.error('erro ao : ', err))

        fetch('/api/self', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => setSelf(response))
            .catch(err => console.error('erro ao : ', err))
    }, [])





    return (
        <div className="flex flex-col bg-white lg:h-screen">
            <MintVoiceCard open={mintVoiceCardOpen} set={setMintVoiceCardOpen} item={mintVoiceCard} setMintinInProgress={setMintingInProgress} />
            <MintProgress open={mintingInProgress} set={setMintingInProgress} />

            <div className={`${mintVoiceCardOpen ? 'pointer-events-none' : ''} flex flex-col h-full`}>
                <div className="flex flex-col w-full border-b p-8 bg-white">
                    <div className="flex flex-row items-center gap-2">
                        <img className="w-8 h-8" src="/assets/images/nft.png" alt="" />
                        <h1 className="text-4xl">Marketplace</h1>
                    </div>
                    <p className="text-xs font-thin mt-4">Explore talented voiceover artist and mint their VoiceCard NFT to generate your voiceover.</p>
                </div>
                <div className="flex flex-col h-full justify-between overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-4 gap-2">
                        {
                            response.voices.map((item, index) => <Card key={index} item={item} setMintVoiceCard={setMintVoiceCard} setMintVoiceCardOpen={setMintVoiceCardOpen} by={' '} description={' '} mint={' '} aptos={' '} />)
                        }
                        {self.length > 0?
                            self.map((item, index) => <Card key={index} item={item} setMintVoiceCard={setMintVoiceCard} setMintVoiceCardOpen={setMintVoiceCardOpen} by={' '} description={' '} mint={' '} aptos={' '} />)
                            :
                            ''
                        }
                    </div>
                    <button className="border rounded-lg p-2 m-4">Load More</button>
                </div>
            </div>
        </div>
    )
}