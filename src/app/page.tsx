"use client"
import Image from "next/image";
import PopupConnectWallet from "./studio/[id]/components/popup-connect-wallet";
import { useState } from "react";


export default function Home() {
    const [openPopupConnectWallet, setOpenPopupConnectWallet] = useState(false);
    // const [,set] = useState();


    return (
        <main className="flex min-h-screen flex-col justify-between bg-white">
            <PopupConnectWallet open={openPopupConnectWallet} set={setOpenPopupConnectWallet} />

            <div className={`${openPopupConnectWallet ? 'pointer-events-none' : ''} pt-20 items-center mx-auto`}>
                <Image
                    className="w-40 mx-auto"
                    src='/assets/images/voicelab-logo.png'
                    width={10000}
                    height={10000}
                    alt=""
                />

                <div className="p-6 lg:px-20 mt-10">
                    <h1 className="lg:text-4xl xl:text-6xl md:text-2xl text-xl text-center lg:max-w-[980px]">
                        Generate World Class Voice Over with AI-generated VoiceCard NFT
                    </h1>
                    <p className="text-justify text-xs lg:text-sm xl:text-lg mt-10 max-w-[680px] md:text-center mx-auto">
                        Level up your content creation journey with our powerful AI voice engine. Explore professional voice over artists’ voice card NFT. Mint and use any voices on the fly with commercial rights.
                    </p>


                    <div className="flex flex-row bg-neutral-200 mt-8 px-4 rounded-lg items-center mx-auto w-fit font-extralight">
                        <p>powered by </p>
                        <Image
                            className="w-20"
                            src='/assets/images/powered-by-aptos.png'
                            width={10000}
                            height={10000}
                            alt="powered aptos"
                        />
                    </div>
                    <button
                        className="flex flex-row items-center mt-12 px-6 p-2 mx-auto gap-2 rounded-full bg-black"
                        onClick={() => setOpenPopupConnectWallet(true)}
                    >
                        <Image
                            className="w-8"
                            src="/assets/images/stars-white.png"
                            height={10000}
                            width={10000}
                            alt=""
                        />
                        <p className="text-white">Play with our demo</p>
                    </button>
                </div>

            </div>
            <Image
                className=""
                src='/assets/images/purple-wave.png'
                width={10000}
                height={10000}
                alt=""
            />
        </main>
    );
}
