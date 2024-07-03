"use client"
import { useState } from "react";
import GenerateCardConfirmation from "../components/generate-card-confirmation";
import AiCloningProgress from "../components/ai-cloning-progress";
import GeneratingNft from "../components/generating-nft";
import { sampleData } from "@/app/data/sample-data";
import CardMonetize from "../components/card-monetize";
import MonetizePopup from "../components/monetize-popup";



export default function Monetize() {
    const [openGenerateCardConfirmation, setOpenGenerateCardConfirmation] = useState(false)
    const [openAiCloningProgress, setOpenAiCloningProgress] = useState(false)
    const [openGeneratingNft, setOpenGeneratingNft] = useState(false)
    const [openMonetizePopup, setOpenMonetizePopup] = useState(false)

    return (
        <div className="text-black min-h-screen bg-white ">
            <MonetizePopup open={openMonetizePopup} set={setOpenMonetizePopup} setOpenGenerateCardConfirmation={setOpenGenerateCardConfirmation}/>
            <GenerateCardConfirmation open={openGenerateCardConfirmation} set={setOpenGenerateCardConfirmation} setOpenAiCloningProgress={setOpenAiCloningProgress} />
            <AiCloningProgress open={openAiCloningProgress} />
            <GeneratingNft open={openGeneratingNft} set={setOpenGeneratingNft} />


            <div className={`${openGenerateCardConfirmation || openAiCloningProgress || openGenerateCardConfirmation ? 'pointer-events-none' : ''} flex flex-col h-full`}>
                <div className="flex flex-col w-full border-b p-8 fixed bg-white">
                    <div className="flex flex-row items-center gap-2">
                        <img className="w-8 h-8" src="/assets/images/coin.png" alt="" />
                        <h1 className="text-4xl">Monetize</h1>
                    </div>
                    <p className="text-xs font-thin mt-4">Explore talented voiceover artist and mint their VoiceCard NFT to generate your voiceover.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-4 gap-2 overflow-y-auto pt-40">
                    {sampleData.map((item, index) => <CardMonetize key={index} item={item} />)}
                    <button className="flex flex-col items-center h-[330px] border rounded-lg" onClick={() => setOpenMonetizePopup(true)}>
                        <img className="w-20 h-20 mt-auto" src="/assets/images/plus-folder.png" alt="" />
                        <h2 className="mb-auto text-xs mt-2">Generate a new VoiceCard NFT</h2>
                    </button>
                </div>
            </div>
        </div>
    )
}