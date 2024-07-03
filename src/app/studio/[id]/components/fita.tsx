import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


export default function Fita(paramGeral: any) {
    return (
        <div className="flex flex-col lg:flex-row justify-between border rounded-lg">
            <div className="flex flex-col lg:flex-row p-4 gap-2 items-center font-extralight text-center lg:text-start">
                <img className="w-12 h-12" src="/assets/images/profile.png" alt="" />
                <div className="flex flex-col justify-between">
                    <h2 className="">{paramGeral.item.name}</h2>
                    <Link href={'/'} className="text-neutral-300 mb-1 text-xs underline underline-offset-2">View on Aptoscan</Link>
                    <p className="text-xs">Quota Remaining: {paramGeral.item.quotes} words</p>
                </div>
            </div>
            <button className="flex min-h-full border-t lg:border-l p-2" onClick={() => paramGeral.setItemFitaOpen(paramGeral.item)}>
                <ChevronRightIcon className="w-4 mx-auto my-auto" />
            </button>
        </div>
    )
}