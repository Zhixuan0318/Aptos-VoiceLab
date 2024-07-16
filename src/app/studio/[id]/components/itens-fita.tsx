import Link from 'next/link';

export default function ItemsFita(paramGeral: any) {
    return (
        <button
            onClick={() => {
                paramGeral.setItemFitaOpen(false);
                paramGeral.setUseVoice(paramGeral.item);
            }}
            className='flex flex-col lg:flex-row border rounded-lg p-4 items-center gap-2'
        >
            <img className='w-12 h-12' src='/assets/images/profile.png' alt='' />
            <div className='flex flex-col justify-between text-center lg:text-start'>
                <h2 className='text-sm'>{paramGeral.item.name}</h2>
                <Link
                    href={`https://explorer.aptoslabs.com/token/${paramGeral.item.tokenId}/0?network=testnet`}
                    className='mb-1 text-xs underline underline-offset-2'
                >
                    View on Aptoscan
                </Link>
                <p className='text-xs'>Quota Remaining: {paramGeral.item.quotes} words</p>
            </div>
        </button>
    );
}
