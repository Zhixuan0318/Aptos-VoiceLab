// @ts-nocheck
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { fitaData } from "@/app/data/fita-data";
import Fita from "./components/fita";
import { useEffect, useState } from "react";
import ItemsFita from "./components/itens-fita";
import FitaProps from "@/interfaces/fita";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";


export default function Dashboard() {
    const idPath = usePathname().split('/')[2];
    const [downloadAudioAvailable, setDownloadAudioAvailable] = useState('')
    const [itemFitaOpen, setItemFitaOpen] = useState<FitaProps[]>([]);
    const [textToSpeach, setTextToSpeach] = useState('');
    const [response, setResponse] = useState()


    function generateSpeach() {
        fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ textToSpeach: textToSpeach, id: idPath })
        })
            .then(response => response.json())
            .then(response => {
                setDownloadAudioAvailable(response.download)
            })
            .catch(err => console.error('erro ao : ', err))
    }
    console.log(response)

    return (
        <div className="flex flex-col w-full bg-white min-h-screen xl:min-h-0 xl:h-screen">
            <div className="flex flex-col border-b p-8 gap-4">
                <div className="flex items-center gap-2">
                    <img className="w-8 h-8" src="/assets/images/stars-black.png" alt="" />
                    <h1 className="text-4xl">Studio</h1>
                </div>
                <p className="text-xs font-extralight">Generate life-like voiceover for your content creation journey with the power of generative AI.</p>
            </div>
            <div className="flex flex-col xl:flex-row h-full">
                <div className="flex justify-between border-r w-full xl:w-3/5">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex flex-col h-full">
                                <h2 className="border-b p-4 px-8">Text-to-Speech Generator</h2>
                                <textarea onChange={(e) => setTextToSpeach(e.target.value)} className="flex p-4 px-8 font-thin text-xs h-full min-h-40 outline-none" placeholder="Start typing here or paste any scripts you want to generate into a voiceover." required />
                            </div>
                            <div className="flex flex-col-reverse xl:flex-row md:minw-72 justify-between p-4 xl:border-b">
                                <div className="flex flex-row gap-4 items-center mx-auto xl:mx-0">
                                    <p className="text-xs md:text-base">0/100</p>
                                    <p className="bg-neutral-200 text-xs md:text-base rounded-full px-4 p-1 ">DEMO LIMIT</p>
                                </div>
                                <button onClick={generateSpeach} className="rounded-full px-4 p-2 text-white bg-black text-xs md:text-base w-64 lg:w-72 mb-4 xl:mb-0 sm:w-96 xl:w-auto max-w-96 mx-auto xl:mx-0">Generate Speech</button>
                            </div>
                        </div>
                        <div className="flex flex-col px-8 p-4 gap-4">
                            {downloadAudioAvailable != ''?
                                <div className="flex flex-col">
                                    <h2 className="text-xs xl:text-xl mb-4 mt-2">Output</h2>
                                    <Link href={downloadAudioAvailable} target="_blank" className="flex mb-8 xl:mb-0 flex-row p-4 rounded-lg border border-neutral-400 items-center gap-4 w-full xl:w-56 justify-between">
                                        <p>Voiceover.mp3</p>
                                        <img className="w-4 h-4" src="/assets/images/download-icon.png" alt="" />
                                    </Link>
                                </div>
                                :
                                <div>
                                    <h2>Output</h2>
                                    <p className="font-extralight text-xs mb-4">No output available to download at this moment. Generate one now!</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>


                <div className="flex flex-col xl:w-2/5 h-full">
                    <h1 className="p-4 border-b px-8 xl:text">Settings</h1>
                    <div className="flex flex-col p-4 justify-between">
                        <div className="flex flex-col p-4 gap-2 h-full">
                            {fitaData.length > 0 ?
                                itemFitaOpen.length != 0 ?
                                    <div className="flex flex-col gap-2 h-full">
                                        <button className="flex flex-row items-center gap-2 text-neutral-500" onClick={() => setItemFitaOpen([])}>
                                            <ArrowUturnLeftIcon className="w-4 h-4" />
                                            <p>Select a voice card from below</p>
                                        </button>
                                        {itemFitaOpen.content.map((item, index) =>
                                            <ItemsFita key={index} item={item} />
                                        )}
                                    </div>

                                    :
                                    fitaData.map((item, index) => <Fita key={index} item={item} setItemFitaOpen={setItemFitaOpen} />)
                                :
                                <div className="flex flex-col">
                                    <h2 className="text-xs">Voice Card</h2>
                                    <p className="font-thin text-xs mt-6">No VoiceCard available for you to choose.</p>
                                    <Link href={`/studio/${idPath}/marketplace`} className="mt-4 border w-full p-2 text-xs rounded text-center">Get one at the Marketplace</Link>
                                </div>
                            }
                            <h2 className="mt-6 text-xs mb-2">Model</h2>
                            <div className="flex flex-col p-2 border rounded-lg">
                                <h2 className="text-xs">VoiceLab SuperPolyglot V2</h2>
                                <p className="font-thin text-xs mt-4">Our powerful multi-language TTS model which supports 29 languages and able to generate ultra-realistic voiceover.</p>
                            </div>

                        </div>
                        <div className="flex flex-col p-4">
                            <button className="mt-4 border w-full p-2 rounded-lg border-neutral-400">Advanced Configuration</button>
                            <p className="font-thin text-xs mt-4 mx-auto text-center">Default configuration is applied for this demo ONLY</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}