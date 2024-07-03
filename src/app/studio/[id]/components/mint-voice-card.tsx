import { XMarkIcon } from "@heroicons/react/24/outline"


export default function MintVoiceCard(paramGeral: any) {
    console.log(paramGeral)
    return (
        <div className={`${paramGeral.open ? 'opacity-100' : 'opacity-0 pointer-events-none'} w-viewport inset-0 h-screen fixed flex flex-col transition duration-300`}>
            <button className="fixed w-screen h-screen blur opacity-50 bg-neutral-300" onClick={() => paramGeral.set(false)}></button>
            <div className="flex flex-col my-auto p-6 mx-auto items-center rounded-lg bg-white z-10">
                <button onClick={() => paramGeral.set(false)} className="flex w-full justify-end"><XMarkIcon className="w-6 text-neutral-400" /></button>
                <div className="flex flex-col items-center p-12">
                    <h1 className="text-4xl">VoiceCard Minting Confirmation</h1>
                    <img className="w-72 h-72" src="/assets/images/nft-card.png" alt="" />
                    <div className="flex flex-col shadow-around-purple rounded-lg p-4 mb-8">
                        <p className="mx-auto text-xl">{paramGeral.item.name}</p>
                        <div className="flex flex-row items-center gap-2 text-sm mt-2">
                            <img className="w-4 h-4" src="/assets/images/aptos.png" alt="" />
                            <p className="items-center">{paramGeral.item.aptos} APT / 10,000 Words</p>
                        </div>
                    </div>
                    <button onClick={() => { paramGeral.set(false), paramGeral.setMintinInProgress(true) }} className="text-xl p-4 w-96 rounded-lg text-white bg-black">Proceed to minting</button>
                </div>
            </div>
        </div>
    )
}