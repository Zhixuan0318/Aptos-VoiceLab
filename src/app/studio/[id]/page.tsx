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
    const [spin, setSpin] = useState(false)


    function generateSpeach() {
        setSpin(true)
        console.log("spin",spin)
        fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ textToSpeach: textToSpeach, id: idPath })
        })
            .then(response => response.json())
            .then(response => {
                setDownloadAudioAvailable(response.download)
                setSpin(false)
            })
            .catch(err => console.error('erro ao : ', err))
    }
    console.log(response)

    return (
        <div className="flex flex-col w-full bg-white min-h-screen xl:min-h-0 xl:h-screen">
            <div role="status" className={`${spin? 'opacity-100':'opacity-0'} transition-opacity duration-300 fixed flex w-full inset-0 pointer-events-none rounded-full z-100`}>
                <svg aria-hidden="true" class="w-8 h-8 bg-black rounded-full ml-auto mt-4 mr-4 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
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
                            {downloadAudioAvailable != '' ?
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