"use client"
import { FormEvent, useEffect, useState } from "react";
import { PlusCircleIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";


export default function MonetizePopup(paramGeral: any) {
    const idPath = usePathname().split('/')[2]
    const [files, setFiles] = useState<FileList[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [royalty, setRoyalty] = useState('');
    const [newLabel, setNewLabel] = useState('');
    const [labels, setLabels] = useState<string[]>([]);
    const [openGenerateCardConfirmation, setOpenGenerateCardConfirmation] = useState(false)
    const [fillData, setFillData] = useState(false)
    const [invalidLabels, setInvalidLabels] = useState(false)



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


    function sendNewVoicecardNFT() {
        const formData = new FormData();
        files.map((file, index) => {
            formData.append(`audio${index}`, file[0]);
        })
        formData.append(`id`, idPath);
        formData.append(`name`, name);
        formData.append(`description`, description);
        formData.append(`royalty`, royalty);
        formData.append(`labels`, JSON.stringify(labels));




        fetch('/api/clone', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                paramGeral.setOpenAiCloningProgress(false)
                paramGeral.refetch();
                paramGeral.setOpenGeneratingNft(true)
                paramGeral.setVoiceId(response.voice_id)
            })
            .catch(err => console.error('erro ao : ', err))
    }




    function removeFile(name: string) {
        if (files.length == 1) {
            setFiles([])
        } else setFiles(files.filter(item => item[0].name == name))
    }


    const handleChangeProceed = () => {
        setInvalidLabels(false)
        if (files.length>0 && name != '' && description != '' && royalty != '' && newLabel != '' && labels.length>0) {
            setOpenGenerateCardConfirmation(true)
        } else {
            setFillData(true)
            setTimeout(() => {
                setFillData(false)
            }, 3000)
            if(labels.length == 0){
                setInvalidLabels(true)
            }
        }
    }


    return (
        <div className={`${paramGeral.open ? 'opacity-100' : 'opacity-0 pointer-events-none'} inset-0 w-screen h-screen fixed flex flex-col transition duration-300 z-10`}>
            {
                !openGenerateCardConfirmation ?
                    <div className={`${paramGeral.open ? 'opacity-100' : 'opacity-0 pointer-events-none'} inset-0 w-screen h-screen fixed flex flex-col transition duration-300 z-10`}>
                        <button className="fixed w-screen h-screen blur opacity-50 bg-neutral-300" onClick={() => paramGeral.set(false)}></button>
                        <div className="flex flex-col my-auto p-6 mx-auto items-center rounded-lg bg-white z-10 w-[950px]">
                            <div className={`${fillData?'opacity-100':'opacity-0'} transition-opacity duration-300 fixed flex w-full pointer-events-none`}>
                                <p className="px-4 p-2 mx-auto rounded-lg bg-black text-red-600">You must fill in all the fields</p>
                            </div>
                            <div className="flex flex-row w-full">
                                <h2 className="w-full">Generate a new VoiceCard NFT</h2>
                                <button onClick={() => paramGeral.set(false)} className="flex justify-end"><XMarkIcon className="w-6 text-neutral-400" /></button>
                            </div>
                            <div className="flex flex-row w-full text-xs gap-16">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="" className="mb-2 mt-8">Name</label>
                                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Example: Daniel - Podcast" className="border rounded px-4 p-2" required />
                                    <label htmlFor="" className="mb-2 mt-6">Description</label>
                                    <textarea onChange={(e) => setDescription(e.target.value)} name="" className="border rounded px-4 p-2 h-32" placeholder="What is this voice suitable for?" id="" required />
                                    <label htmlFor="" className="mb-2 mt-6">Labels</label>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-row flex-wrap gap-2">
                                            {labels.map((item, index) => <p className="bg-stone-200 p px-4 rounded-full" key={index}>{item}</p>)}
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <input className={`${invalidLabels? 'border-red-700':''} px-4 p-2 w-full border rounded`} onChange={(e) => setNewLabel(e.target.value)} type="text" />
                                            <button onClick={addLabel}><PlusCircleIcon className={`${invalidLabels? 'text-red-700':'text-black'} w-4 h-4 text-neutral-400`} /></button>
                                        </div>
                                    </div>
                                    <label htmlFor="" className="mb-2 mt-6">Royalty Fee for 10K Words</label>
                                    <div className="flex">
                                        <input onChange={(e) => setRoyalty(e.target.value)} type="text" className="border rounded px-4 p-2 w-full" placeholder="Example: 0.1" required />
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
                                        <input type="file" className="h-full w-full opacity-0" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInputFile(e.target.files)} required />
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
                                    <button type="button" onClick={() => handleChangeProceed()} className="rounded-lg p-2 mt-8 w-full bg-black text-white text-base" >Generate VoiceCard NFT Collection</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={`${paramGeral.open ? 'opacity-100' : 'opacity-0 pointer-events-none'} w-viewport inset-0 h-screen fixed flex flex-col transition duration-300 z-10`}>
                        <button className="fixed w-screen h-screen blur opacity-50 bg-neutral-300" onClick={() => paramGeral.set(false)}></button>
                        <div className="flex flex-col my-auto p-6 mx-auto items-center rounded-lg bg-white z-10 w-[600px]">
                            <button onClick={() => paramGeral.set(false)} className="flex w-full justify-end"><XMarkIcon className="w-6 text-neutral-400" /></button>
                            <div className="flex flex-col items-center p-12 gap-8">
                                <h1 className="text-4xl text-center">Are you confirm to generate your VoiceCard?</h1>
                                <img className="h-64 w-64" src="/assets/images/nft-card.png" alt="" />
                                <button onClick={() => { paramGeral.set(false), sendNewVoicecardNFT(), paramGeral.setOpenAiCloningProgress(true) }} className="text-xl p-4 w-96 rounded-lg text-white bg-black">Proceed to generate NFT collection</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}