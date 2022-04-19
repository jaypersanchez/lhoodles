import { useEffect, useState, useContext, useCallback } from "react";
import Web3 from "web3";
import { AbiItem } from 'web3-utils'
import { WalletContext } from "../connect/walletContext";
import hoodles_abi from "../config/hoodles.json";
import { hoodles_address } from "../config/constant"



export const useMintForPublic = (amount:any) => {

    const { provider, walletAddress } = useContext(WalletContext);

    const mintNFT = useCallback(async () => {

        const web3 = new Web3(provider)
        const hoodles =  new web3.eth.Contract(hoodles_abi as AbiItem[], hoodles_address)

        const data = hoodles.methods.publicSaleMint(amount).encodeABI();
        const gasPrice = await web3.eth.getGasPrice();
        const glimit = await web3.eth.getBlock("latest");
        const priceData = amount * 0.07;
        const price = web3.utils.toWei(priceData.toString(), "ether");
        const limit = glimit.gasLimit;
        const tx = {
            from: walletAddress,
            to: hoodles_address,
            gasPrice: gasPrice,
            gasLimit: limit,
            data: data,
            value: price
        };
        try {
            console.log(tx);
            const result = await web3.eth.sendTransaction(tx);
            console.log(result)
        } catch {

        }
       

    }, [provider, walletAddress, amount]);

    return mintNFT;
};

export default useMintForPublic;
