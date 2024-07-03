import CardProps from "@/interfaces/card";



export default function CardMonetize(paramGeral: any) {
    return (
        <div className="flex flex-col border rounded-lg p-4 justify-between">
            <div className="flex flex-col">
                <h2 className="">Daniel - Podcast</h2>
                <p className="text-xs font-thin mt-2 text-neutral-500">By {paramGeral.item.by}</p>
                <p className="text-neutral-400 text-sm mt-4 mb-4">{paramGeral.item.description}</p>
                <div className="grid grid-cols-3 mb-8 text-sm gap-2">
                    {paramGeral.item.characteristics.map((item: string, index: number) =>
                        <p key={index} className="bg-neutral-200 text-xs p-1 w-full rounded-full text-center">{item}</p>
                    )}
                </div>
                <div className="flex flex-row gap-4 text-xs mb-4">
                    <div className="flex flex-row items-center gap-2">
                        <img className="w-3 h-3" src="/assets/images/neutral-star.png" alt="" />
                        <p className="text-neutral-400">{paramGeral.item.mint} mint</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <img className="w-3 h-3" src="/assets/images/aptos.png" alt="" />
                        <p>{paramGeral.item.aptos} APT / 10,000 Words</p>
                    </div>

                </div>
            </div>
            <div className="flex flex-row gap-2 text-xs">
                <button onClick={() => {paramGeral.setMintVoiceCard(paramGeral.item), paramGeral.setMintVoiceCardOpen(true)}} className="w-full px-4 p-2 rounded-lg bg-black text-white">View On Marketplace</button>
            </div>
        </div>
    )
}