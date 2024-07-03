import { XMarkIcon } from "@heroicons/react/24/outline"
import { useState } from "react";


export default function GeneratingNft(paramGeral: any) {
    const [carregando, setCarregando] = useState(true);


    return (
        <div className={`${paramGeral.open ? 'opacity-100' : 'opacity-0 pointer-events-none'} w-viewport inset-0 h-screen fixed flex flex-col transition duration-300 z-10`}>
            <button className={`${carregando?'pointer-events-none':''} fixed w-screen h-screen blur opacity-50 bg-neutral-300`} onClick={() => paramGeral.set(false)}></button>


            <div className="flex flex-col my-auto p-6 mx-auto items-center rounded-lg bg-white z-10">
                <div className="flex flex-col items-center p-12">
                    <h1 className={`${carregando ? 'hidden' : 'flex'} text-4xl`}>VoiceCard NFT Collection Generated Successfully!</h1>
                    <div className={`${carregando ? 'flex' : 'hidden'} flex-col`}>
                        <h1 className="text-4xl mx-auto mb-8">Generating NFT Collection</h1>
                        <p className="max-w-[640px] text-center">Please do not close the application or refresh this page as it will affect the process. Be patient and your VoiceCard NFT collection will be ready in a few minutes.</p>
                    </div>
                    <div className="my-10">
                        {carregando ?
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                            :
                            <img className="w-72" src="/assets/images/check.png" alt="" />
                        }
                    </div>
                    <button onClick={() => { paramGeral.set(false) }} className={`${carregando ? 'opacity-20 pointer-events-none' : 'opacity-100'} text-xl p-4 w-96 rounded-lg text-white bg-black`}>View it on Marketplace</button>
                </div>
            </div>
        </div>
    )
}