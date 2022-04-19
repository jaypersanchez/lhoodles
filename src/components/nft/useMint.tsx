import { useEffect, useState, useContext, useCallback } from "react";
import Web3 from "web3";
import { AbiItem } from 'web3-utils'
import { Contract } from "web3-eth-contract"
import { WalletContext } from "../connect/walletContext";
import hoodles_abi from "../config/hoodles.json";
import { hoodles_address } from "../config/constant"



export const useMintForPublic = () => {

    const { provider, setProvider, walletAddress, setWalletAddress } = useContext(WalletContext);

    const mintNFT = useCallback(async () => {
        
        const web3 = new Web3(provider)
        const hoodles =  new web3.eth.Contract(hoodles_abi as AbiItem[], hoodles_address)

        const data = hoodles.methods.publicSaleMint(1).encodeABI();
        const gasPrice = await web3.eth.getGasPrice();
        const glimit = await web3.eth.getBlock("latest");
        const limit = glimit.gasLimit;
        const tx = {
            from: walletAddress,
            to: hoodles_address,
            gasPrice: gasPrice,
            gasLimit: limit,
            data: data,
            value: "70000000000000000"
        };
        try {
            console.log(tx);
            const result = await web3.eth.sendTransaction(tx);
        } catch {

        }
       

    }, [provider, walletAddress]);

    return mintNFT;
};

export default useMintForPublic;
