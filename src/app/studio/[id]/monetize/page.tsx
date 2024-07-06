"use client"
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import GeneratingNft from "../components/generating-nft";
import { sampleData } from "@/app/data/sample-data";
import CardMonetize from "../components/card-monetize";
import MonetizePopup from "../components/monetize-popup";
import AiCloningProgress from "../components/ai-cloning-progress";



export default function Monetize() {
    const router = useRouter();
    const idPath = usePathname().split('/')[2]
    const [response, setResponse] = useState<[]>([])
    const [openGeneratingNft, setOpenGeneratingNft] = useState(false)
    const [openMonetizePopup, setOpenMonetizePopup] = useState(false)
    const [openAiCloningProgress, setOpenAiCloningProgress] = useState(false)
    const [openGenerateCardConfirmation, setOpenGenerateCardConfirmation] = useState(false)
    const [voice_id, setVoiceId] = useState('')



    useEffect(() => {
        console.log("use effect fetch")
        fetch('/api/clone/list', {
            method: 'POST',
            body: JSON.stringify({ id: idPath })
        })
            .then(response => response.json())
            .then(response => setResponse(response))
            .catch(err => console.error('erro ao : ', err))
    }, [idPath])

    function refetch(){
        console.log("refetching")
        fetch('/api/clone/list', {
            method: 'POST',
            body: JSON.stringify({ id: idPath })
        })
            .then(response => response.json())
            .then(response => setResponse(response))
            .catch(err => console.error('erro ao : ', err))
    }

    return (
        <div className="text-black h-screen bg-white ">
            <MonetizePopup open={openMonetizePopup} set={setOpenMonetizePopup} setOpenGenerateCardConfirmation={setOpenGenerateCardConfirmation} setOpenAiCloningProgress={setOpenAiCloningProgress} setOpenGeneratingNft={setOpenGeneratingNft} setVoiceId={setVoiceId} refetch={refetch}/>
            <GeneratingNft open={openGeneratingNft} set={setOpenGeneratingNft} idPath={idPath} voice_id={voice_id} refetch={refetch}/>
            <AiCloningProgress open={openAiCloningProgress}/>


            <div className={`${openGenerateCardConfirmation || openAiCloningProgress || openGenerateCardConfirmation ? 'pointer-events-none' : ''} flex flex-col h-full`}>
                <div className="flex flex-col w-full border-b p-8 fixed bg-white">
                    <div className="flex flex-row items-center gap-2">
                        <img className="w-8 h-8" src="/assets/images/coin.png" alt="" />
                        <h1 className="text-4xl">Monetize</h1>
                    </div>
                    <p className="text-xs md:text-base mt-4 font-normal">Generate a clone of your voice and turn them into a VoiceCard NFT to start earning royalties</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-4 gap-2 overflow-y-auto pt-40">
                    {response.length > 0 ?
                        response.map((item, index) => <CardMonetize key={index} item={item} />)
                        :
                        ''
                    }
                    <button className="flex flex-col items-center h-[330px] border rounded-lg" onClick={() => setOpenMonetizePopup(true)}>
                        <img className="w-20 h-20 mt-auto" src="/assets/images/plus-folder.png" alt="" />
                        <h2 className="mb-auto text-xs mt-2">Generate a new VoiceCard NFT</h2>
                    </button>
                </div>
            </div>
        </div>
    )
}