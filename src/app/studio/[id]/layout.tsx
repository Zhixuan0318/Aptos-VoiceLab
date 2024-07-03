"use client"
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react";



export default function LayoutId({ children }: { children: React.ReactNode }) {
    const path = usePathname().split('/');
    const [showMenu, setShowMenu] = useState(false)



    return (
        <div className="w-screen h-screen flex">
            <button className="fixed mt-4 ml-2 z-20 xl:hidden bg-[#6a6a6a32] text-black rounded-full p-1" onClick={()=>setShowMenu(!showMenu)}><Bars3Icon className="w-6"/></button>
            <div className={`${showMenu?'flex':'hidden'} w-screen h-screen md:w-56 fixed xl:static xl:flex flex-col p-4 min-w-56 bg-white border-r-2 justify-between z-10`}>
                <div className="flex flex-col">
                    <img
                        className="w-32 mx-auto my-10"
                        src="/assets/images/voicelab-logo-black.png"
                        alt=""
                    />
                    <div className="flex flex-col gap-4">
                        <Link href={`/studio/${path[2]}`} className={`${path.length == 3 ? 'bg-neutral-200' : ''} flex flex-row mx-auto px-4 p-1 rounded-lg w-full gap-2`} onClick={()=>setShowMenu(false)}>
                            <img className="w-6 h-6" src="/assets/images/stars-black.png" alt="" />
                            <p>Studio</p>
                        </Link>

                        <Link href={`/studio/${path[2]}/marketplace`} className={`${path.length == 3 ? '' : path[3] == 'marketplace' ? 'bg-neutral-200' : ''} flex flex-row mx-auto px-4 p-1 rounded-lg w-full gap-2`} onClick={()=>setShowMenu(false)}>
                            <img className="w-6 h-6" src="/assets/images/nft.png" alt="" />
                            <p>Marketplace</p>
                        </Link>

                        <Link href={`/studio/${path[2]}/monetize`} className={`${path.length == 3 ? '' : path[3] == 'monetize' ? 'bg-neutral-200' : ''} flex flex-row mx-auto px-4 p-1 rounded-lg w-full gap-2`} onClick={()=>setShowMenu(false)}>
                            <img className="w-6 h-6" src="/assets/images/coin.png" alt="" />
                            <p>Monetize</p>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col">
                    <img className="w-12 h-12 mx-auto" src="/assets/images/profile.png" alt="" />
                    <p className="mx-auto my-2">0xf6b...b39fc</p>
                    <Link href='/' className="text-center w-full p-2 rounded-lg bg-black text-white">Disconnect Wallet</Link>
                </div>
            </div>


            <div className="w-full">
                {children}
            </div>
        </div>
    )
}