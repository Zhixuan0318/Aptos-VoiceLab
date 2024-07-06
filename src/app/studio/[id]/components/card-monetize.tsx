import CardProps from "@/interfaces/card";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function CardMonetize(paramGeral: any) {
    const idPath = usePathname().split('/')[2]
    let labels: string[] = []
    console.log(JSON.parse(paramGeral.item.labels.tag).map((item: string) => { if (item) { labels.push(item) }}))


    return (
        <div className="flex flex-col border rounded-lg p-4 justify-between">
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col">
                    <h2 className="">{paramGeral.item.name}</h2>
                    <p className="text-xs  mt-2">By {paramGeral.item.by}</p>
                    <p className="text-neutral-500 text-sm mt-4 mb-4">{paramGeral.item.description}</p>
                    <div className="grid grid-cols-3 mb-8 text-sm gap-2">
                        {labels.map((item: string, index: number) =>
                            <p key={index} className="bg-neutral-200 text-xs p-1 w-full rounded-full text-center">{item}</p>
                        )}
                    </div>
                </div>

                <div className="flex flex-row gap-4 text-xs mb-4">
                    <div className="flex flex-row items-center gap-2">
                        <img className="w-3 h-3" src="/assets/images/neutral-star.png" alt="" />
                        <p className="text-neutral-400">{paramGeral.item.mint} mint</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <img className="w-3 h-3" src="/assets/images/aptos.png" alt="" />
                        <p>{paramGeral.item.royalty} APT / 10,000 Words</p>
                    </div>

                </div>
            </div>
            <div className="flex flex-row gap-2 text-xs">
                <Link href={`/studio/${idPath}/marketplace#${paramGeral.item.voice_id}`} className="w-full text-center px-4 p-2 rounded-lg bg-black text-white">View On Marketplace</Link>
            </div>
        </div>
    )
}