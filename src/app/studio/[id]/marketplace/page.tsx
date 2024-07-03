"use client"
import Card from "../components/card";
import { sampleData } from "@/app/data/sample-data";
import MintVoiceCard from "../components/mint-voice-card";
import { useState } from "react";
import CardProps from "@/interfaces/card";
import MintProgress from "../components/mintin-progress";




export default function Marketplace() {
    const [mintVoiceCard, setMintVoiceCard] = useState<CardProps[]>([]);
    const [mintVoiceCardOpen, setMintVoiceCardOpen] = useState(false);
    const [mintingInProgress, setMintingInProgress] = useState(false);


    return (
        <div className="flex flex-col bg-white min-h-full lg:h-screen">
            <MintVoiceCard open={mintVoiceCardOpen} set={setMintVoiceCardOpen} item={mintVoiceCard} setMintinInProgress={setMintingInProgress} />
            <MintProgress open={mintingInProgress} set={setMintingInProgress} />

            <div className={`${mintVoiceCardOpen ? 'pointer-events-none' : ''} flex flex-col h-full`}>
                <div className="flex flex-col w-full border-b p-8 fixed bg-white w-full">
                    <div className="flex flex-row items-center gap-2">
                        <img className="w-8 h-8" src="/assets/images/nft.png" alt="" />
                        <h1 className="text-4xl">Marketplace</h1>
                    </div>
                    <p className="text-xs font-thin mt-4">Explore talented voiceover artist and mint their VoiceCard NFT to generate your voiceover.</p>
                </div>
                <div className="flex flex-col h-full justify-between pt-36">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-4 gap-2 overflow-y-auto">
                        {sampleData.map((item, index) => <Card key={index} item={item} setMintVoiceCard={setMintVoiceCard} setMintVoiceCardOpen={setMintVoiceCardOpen} />)}
                    </div>
                    <button className="border rounded-lg p-2 m-4">Load More</button>
                </div>
            </div>
        </div>
    )
}