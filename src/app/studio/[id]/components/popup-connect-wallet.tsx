import Link from "next/link";



export default function PopupConnectWallet(paramGeral: any) {
    return (
        <div className={`${paramGeral.open?'flex':'hidden pointer-events-none'} h-screen w-screen fixed z-10`}>
            <button
                className="fixed w-screen h-screen bg-[#cccccc8a]"
                onClick={() => paramGeral.set(false)}
            >
            </button>
            <div className="flex bg-white px-8 lg:px-16 py-8 rounded-lg w-72 sm:w-96 lg:w-auto my-auto mx-auto z-10">

                <div className="flex flex-col mx-auto my-auto">
                    <p className="text-center lg:text-2xl font-semibold">Connect your wallet to VoiceLab.</p>
                    <div className="flex justify-between w-40 lg:w-64 items-center mx-auto mt-10 mb-10">
                        <img
                            className="w-8 h-8 lg:w-16 lg:h-20"
                            src="/assets/images/voicelab.png"
                            alt=""
                        />
                        <div className="flex flex-row">
                            <div className="rounded-full bg-neutral-300 w-2 h-2 lg:w-4 lg:h-4"></div>
                            <div className="rounded-full bg-neutral-300 w-2 h-2 lg:w-4 lg:h-4"></div>
                            <div className="rounded-full bg-neutral-300 w-2 h-2 lg:w-4 lg:h-4"></div>
                        </div>
                        <img
                            className="w-8 h-8 lg:w-20 lg:h-20"
                            src="/assets/images/aptos.png"
                            alt=""
                        />
                    </div>


                    <Link
                        className="mx-auto p-4 lg:mt-4 w-full lg:w-96 rounded-lg text-center bg-black text-white"
                        href='/studio/1'
                    >
                        Connect to Aptos
                    </Link>
                    <div className="flex flex-row items-center mx-auto mt-2 lg:mt-8 gap-1 font-extralight">
                        <p className="">powered by</p>
                        <img
                            className="h-10"
                            src="/assets/images/magic.png"
                            alt="" />

                    </div>
                </div>
            </div>
        </div>
    )
}