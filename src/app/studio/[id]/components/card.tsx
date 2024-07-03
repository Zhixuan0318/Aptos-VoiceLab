//@ts-nocheck
import CardProps from "@/interfaces/card";
import { useRef, useState } from "react";


export default function CardMarketplace(paramGeral: any) {
    const audioRef = useRef(paramGeral.item.preview_url);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    return (
        <div className="flex flex-col border rounded-lg p-4 justify-between">
            <div className="flex flex-col">
                <h2 className="">{paramGeral.item.name} - {paramGeral.item.labels['use case']}</h2>
                <p className="text-xs font-thin mt-2 text-neutral-500">By {paramGeral.by}</p>
                <p className="text-neutral-400 text-sm mt-4 mb-4">{paramGeral.description}</p>
                <div className="grid grid-cols-3 mb-8 text-xs gap-2">
                    <p className={`${paramGeral.item.labels['use case'] == null ? 'hidden' : 'flex'} bg-neutral-200 p-1 w-full rounded-full items-center justify-center text-center`}>{paramGeral.item.labels['use case']}</p>
                    <p className={`${paramGeral.item.labels.accent == null ? 'hidden' : 'flex'} bg-neutral-200 p-1 w-full rounded-full items-center justify-center text-center`}>{paramGeral.item.labels.accent}</p>
                    <p className={`${paramGeral.item.labels.age == null ? 'hidden' : 'flex'} bg-neutral-200 p-1 w-full rounded-full items-center justify-center text-center`}>{paramGeral.item.labels.age}</p>
                    <p className={`${paramGeral.item.labels.gender == null ? 'hidden' : 'flex'} bg-neutral-200 p-1 w-full rounded-full items-center justify-center text-center`}>{paramGeral.item.labels.gender}</p>
                    <p className={`${paramGeral.item.labels.description == null ? 'hidden' : 'flex'} bg-neutral-200 p-1 w-full rounded-full items-center justify-center text-center`}>{paramGeral.item.labels.description}</p>
                </div>
                <div className="flex flex-row gap-4 text-xs mb-4">
                    <div className="flex flex-row items-center gap-2">
                        <img className="w-3 h-3" src="/assets/images/neutral-star.png" alt="" />
                        <p className="text-neutral-400">{paramGeral.mint} mint</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <img className="w-3 h-3" src="/assets/images/aptos.png" alt="" />
                        <p>{paramGeral.aptos} APT / 10,000 Words</p>
                    </div>

                </div>
            </div>
            <div className="flex flex-row gap-2 text-xs">
                <button onClick={toggleAudio} className="flex flex-row gap-2 items-center justify-center w-full px-4 p-2 rounded-lg border border-black">
                    <img className="w-4 h-4" src="/assets/images/speaker.png" alt="" />
                    <p>Sample</p>
                    <audio ref={audioRef} src={paramGeral.item.preview_url} />
                </button>
                <button onClick={() => { paramGeral.setMintVoiceCard(paramGeral.item), paramGeral.setMintVoiceCardOpen(true) }} className="w-full px-4 p-2 rounded-lg bg-black text-white">Mint VoiceCard</button>
            </div>
        </div>
    )
}