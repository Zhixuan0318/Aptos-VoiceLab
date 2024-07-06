import Link from "next/link";
import { usePathname } from "next/navigation";


export default function ItemsFita(paramGeral: any) {
    const idPath = usePathname().split('/')[2]
    console.log(paramGeral.item.voice_id, idPath)
    function setMintToUse(){
        fetch('/api/changemint', {
            method: 'POST',
            body: JSON.stringify({id:idPath, voice_id:paramGeral.item.voice_id})
         })
         .then(response => response.json())
         .then(response => {
            paramGeral.setItemFitaOpen(false)
            fetch('/api/usevoicelist', {
                method: 'POST',
                body: JSON.stringify({ idPath: idPath })
            })
                .then(response => response.json())
                .then(response => 
                    {
                        paramGeral.setUseVoice(response.useVoice)
                        paramGeral.setUsedVoices(response.usedVoices)
                    })
                .catch(err => console.error('erro ao : ', err))
        })
         .catch(err => console.error('erro ao : ', err))    
    }


    return (
        <button onClick={setMintToUse} className="flex flex-col lg:flex-row border rounded-lg p-4 items-center gap-2">
            <img className="w-12 h-12" src="/assets/images/profile.png" alt="" />
            <div className="flex flex-col justify-between text-center lg:text-start">
                <h2 className="text-sm">{paramGeral.item.name}</h2>
                <Link href={'/'} className="mb-1 text-xs underline underline-offset-2">View on Aptoscan</Link>
                <p className="text-xs">Quota Remaining: {paramGeral.item.quotes} words</p>
            </div>
        </button>
    )
}