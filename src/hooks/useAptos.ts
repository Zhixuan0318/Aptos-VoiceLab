import { Ed25519PrivateKey } from '@aptos-labs/ts-sdk';
import { InputTransactionData, useWallet } from '@aptos-labs/wallet-adapter-react';

import { createHash } from 'crypto';

const useAptos = () => {
    const { account, signAndSubmitTransaction } = useWallet();

    const contractAddress = process.env.NEXT_PUBLIC_MODULE_ADDRESS as string;

    const signSignature = (message: string): [string, string] => {
        const privateKey = new Ed25519PrivateKey(
            '0x8c6e3ca03b28c8d3ede9af0cb968cef528baab16100e42f231a119443c1cb24c'
        );
        const hashedMessage = createHash('sha256').update(message).digest('hex');
        const signature = privateKey.sign(hashedMessage).toString();
        return [signature, hashedMessage];
    };

    const toVectorU8 = (signature: string): number[] => {
        const result: number[] = [];
        for (let i = 0; i < signature.length; i += 2) {
            result.push(Number(`0x${signature.slice(i, i + 2)}`));
        }
        return result;
    };

    const generateNewCard = async (
        name: string,
        description: string,
        royalty: string,
        labels: string[]
    ): Promise<string> => {
        const [signature, hashedMessage] = signSignature(name + description + Date.now());

        const response = await fetch('/api/pinata', {
            method: 'POST',
            body: JSON.stringify({
                name,
                description,
                creator: account?.address,
                price: Number(royalty.replace(',', '.')) * 10 ** 8,
                labels: labels.join(', '),
            }),
        });

        const json = await response.json();

        const tx: InputTransactionData = {
            data: {
                function: `${contractAddress}::voice_cards::add_card`,
                functionArguments: [
                    name,
                    description,
                    json.uri,
                    Number(royalty.replace(',', '.')) * 10 ** 8,
                    labels,
                    toVectorU8(signature.slice(2)),
                    toVectorU8(hashedMessage),
                ],
            },
        };

        try {
            const data = await signAndSubmitTransaction(tx);

            for (let event of data.output.events) {
                if (event.type.includes(contractAddress)) {
                    return event.data.card_address;
                }
            }
        } catch (error) {}

        return '0x0';
    };

    const mintCard = async (tokenId: string) => {
        const tx: InputTransactionData = {
            data: {
                function: `${contractAddress}::voice_cards::buy_card`,
                functionArguments: [tokenId],
            },
        };

        await signAndSubmitTransaction(tx);
    };

    const burnCard = async (tokenId: string) => {
        const [signature, hashedMessage] = signSignature(tokenId + Date.now());

        const tx: InputTransactionData = {
            data: {
                function: `${contractAddress}::voice_cards::burn_card`,
                functionArguments: [
                    tokenId,
                    toVectorU8(signature.slice(2)),
                    toVectorU8(hashedMessage),
                ],
            },
        };

        await signAndSubmitTransaction(tx);
    };

    return { generateNewCard, mintCard, burnCard };
};

export default useAptos;
