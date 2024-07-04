import { XMarkIcon } from "@heroicons/react/24/outline"


export default function GenerateCardConfirmation(paramGeral: any) {
    
    function sendNewVoicecardNFT() {
        console.log("send nft voice card")
        console.log("log")
        console.log("log",paramGeral.item)
        fetch('/api/clone', {
            method: 'POST',
            body: paramGeral.item
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error('erro ao : ', err))
    }


    return (
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
    )
}