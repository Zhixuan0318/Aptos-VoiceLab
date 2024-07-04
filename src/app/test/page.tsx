//@ts-nocheck
"use client"
import { useEffect, useState } from "react"

export default function Test() {
    const [response, setResponse] = useState<{ voices: any[] }>({ voices: [] });
    
    useEffect(() => {
        fetch('/api/clone', {
            method: 'POST',
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error('erro ao : ', err))
    }, []);

    const voices = response.voices;
    console.log(voices);
    voices.map(item => console.log(item));

    return (
        <div>
            {voices.map((voice, index) => (
                <div key={index}>{voice.name}</div>
            ))}
        </div>
    );
}
