"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { PlusCircleIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import GenerateCardConfirmation from "../components/generate-card-confirmation";
import AiCloningProgress from "../components/ai-cloning-progress";


export default function MonetizePopup(paramGeral: any) {
    const [files, setFiles] = useState<FileList[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [royalty, setRoyalty] = useState('');
    const [newLabel, setNewLabel] = useState('');
    const [labels, setLabels] = useState<string[]>([]);



    const item = JSON.stringify({ labels: labels, files: files, name: name, description: description, royalty: royalty })



    const handleChangeInputFile = (value: FileList | null) => {
        if (value) {
            setFiles((filesCopy) => {
                const exist = filesCopy.some(file => file[0].name === value[0].name);
                if (!exist) {
                    return [...filesCopy, value];
                }
                return filesCopy;
            });
        }
    }


    function addLabel() {
        setLabels((labelsCopy) => {
            if (!labelsCopy.includes(newLabel)) {
                return [...labelsCopy, newLabel]
            }
            return labelsCopy
        })
    }


    function removeFile(name: string) {
        if (files.length == 1) {
            setFiles([])
        } else setFiles(files.filter(item => item[0].name == name))
    }



    return (
        <div className={`${paramGeral.open ? 'opacity-100' : 'opacity-0 pointer-events-none'} inset-0 w-screen h-screen fixed flex flex-col transition duration-300 z-10`}>
            <GenerateCardConfirmation open={paramGeral.openGenerateCardConfirmation} set={paramGeral.setOpenGenerateCardConfirmation} setOpenAiCloningProgress={paramGeral.setOpenAiCloningProgress} item={item} />
            <AiCloningProgress open={paramGeral.openAiCloningProgress} />
            <button className="fixed w-screen h-screen blur opacity-50 bg-neutral-300" onClick={() => paramGeral.set(false)}></button>
            <div className="flex flex-col my-auto p-6 mx-auto items-center rounded-lg bg-white z-10 w-[950px]">
                <div className="flex flex-row w-full">
                    <h2 className="w-full">Generate a new VoiceCard NFT</h2>
                    <button onClick={() => paramGeral.set(false)} className="flex justify-end"><XMarkIcon className="w-6 text-neutral-400" /></button>
                </div>
                <div className="flex flex-row w-full text-xs gap-16">
                    <div className="flex flex-col w-full">
                        <label htmlFor="" className="mb-2 mt-8">Name</label>
                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Example: Daniel - Podcast" className="border rounded px-4 p-2" />
                        <label htmlFor="" className="mb-2 mt-6">Description</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} name="" className="border rounded px-4 p-2 h-32" placeholder="What is this voice suitable for?" id=""></textarea>
                        <label htmlFor="" className="mb-2 mt-6">Labels</label>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row flex-wrap gap-2">
                                {labels.map((item, index) => <p className="bg-stone-200 p px-4 rounded-full" key={index}>{item}</p>)}
                            </div>
                            <div className="flex flex-row gap-2">
                                <input className="px-4 p-2 w-full border rounded" onChange={(e) => setNewLabel(e.target.value)} type="text" />
                                <button onClick={addLabel}><PlusCircleIcon className="w-4 h-4 text-neutral-400" /></button>
                            </div>
                        </div>
                        <label htmlFor="" className="mb-2 mt-6">Royalty Fee for 10K Words</label>
                        <div className="flex">
                            <input onChange={(e) => setRoyalty(e.target.value)} type="text" className="border rounded px-4 p-2 w-full" placeholder="Example: 0.1" />
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
                            <input type="file" className="h-full w-full opacity-0" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInputFile(e.target.files)} />
                        </div>
                        <h2 className="mt-4 mb-4">Audio Samples for Training</h2>
                        <label>{files.length}/10 uploaded</label>
                        <div className="flex flex-col gap-2 mt-2">
                            {
                                files.length < 0 ?
                                    ''
                                    :
                                    files.map((item, index) => <div key={index} className="flex border rounded-lg p-2 w-full justify-between">
                                        <p>{item[0].name}</p>
                                        <button onClick={() => removeFile(item[0].name)}><TrashIcon className="w-4 h-4" /></button>
                                    </div>)}
                        </div>
                        <button onClick={() => { paramGeral.set(false), paramGeral.setOpenGenerateCardConfirmation(true) }} className="rounded-lg p-2 mt-8 w-full bg-black text-white text-base" >Generate VoiceCard NFT Collection</button>
                    </div>
                </div>
            </div>
        </div>
    )
}