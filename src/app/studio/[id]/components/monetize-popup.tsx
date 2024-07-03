import Link from "next/link";
import { PlusCircleIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";


export default function MonetizePopup(paramGeral: any) {
    return (
        <div className={`${paramGeral.open ? 'opacity-100' : 'opacity-0 pointer-events-none'} inset-0 h-screen fixed flex flex-col transition duration-300`}>
            <button className="fixed w-screen h-screen blur opacity-50 bg-neutral-300" onClick={() => paramGeral.set(false)}></button>
            <div className="flex flex-col my-auto p-6 mx-auto items-center rounded-lg bg-white z-10 w-[950px]">
                <div className="flex flex-row w-full">
                    <h2 className="w-full">Generate a new VoiceCard NFT</h2>
                    <button onClick={() => paramGeral.set(false)} className="flex justify-end"><XMarkIcon className="w-6 text-neutral-400" /></button>
                </div>
                <div className="flex flex-row w-full text-xs gap-16">
                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="mb-2 mt-8">Name</label>
                        <input type="text" placeholder="Example: Daniel - Podcast" className="border rounded px-4 p-2" />
                        <label htmlFor="" className="mb-2 mt-6">Description</label>
                        <textarea name="" className="border rounded px-4 p-2 h-32" placeholder="What is this voice suitable for?" id=""></textarea>
                        <label htmlFor="" className="mb-2 mt-6">Labels</label>
                        <div className="flex flex-row gap-2">
                            <input type="text" className="border rounded px-4 p-2 w-full" />
                            <button><PlusCircleIcon className="w-4 h-4 text-neutral-400" /></button>
                        </div>
                        <label htmlFor="" className="mb-2 mt-6">Royalty Fee for 10K Words</label>
                        <div className="flex">
                            <input type="text" className="border rounded px-4 p-2 w-full" placeholder="Example: 0.1" />
                            <div className="flex -ml-14 my-auto gap-2">
                                <p>APT</p>
                                <img className="w-4 h-4" src="/assets/images/aptos.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="h-40 w-full rounded-lg border border-neutral-400 border-dashed relative mt-14">
                            <div className="flex flex-col pointer-events-none absolute items-center justify-center h-full w-full cursor-pointer">
                                <img className="w-16 h-16 mb-4" src="/assets/images/music-plus.png" alt="" />
                                <p className="mb-2">Click to upload an audio file or drag and drop</p>
                                <p className="font-thin">Audio files up to 10MB each</p>
                            </div>
                            <input type="file" className="h-full w-full opacity-0" />
                        </div>
                        <h2 className="mt-4 mb-4">Audio Samples for Training</h2>
                        <label>1/10 uploaded</label>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="flex border rounded-lg p-2 w-full justify-between">
                                <p>sample.mp3</p>
                                <button ><TrashIcon className="w-4 h-4"/></button>
                            </div>
                        </div>
                        <button  onClick={()=>{paramGeral.set(false), paramGeral.setOpenGenerateCardConfirmation(true)}} className="rounded-lg p-2 mt-8 w-full bg-black text-white text-base" >Generate VoiceCard NFT Collection</button>
                    </div>
                </div>
            </div>
        </div>
    )
}