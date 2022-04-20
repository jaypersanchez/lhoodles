import { useEffect, useState, useContext, useCallback } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletContext } from "./walletContext";
import { AbiItem } from 'web3-utils'
import hoodles_abi from "../config/hoodles.json";
import { hoodles_address } from "../config/constant"
import { CHAIN_ID } from "../config/constant";
import { disconnect } from "process";

export const useWalletButton = () => {

    const { provider, setProvider, walletAddress, setWalletAddress } = useContext(WalletContext);
      
    const changeNetwork = async (chainID:any) => {
        var result = await window.ethereum.request({
           method: 'wallet_switchEthereumChain',
           params: [{ chainId: "0x" + parseInt(chainID).toString(16) }],
        });
        return result
    }

    const walletButton = useCallback(async () => {

        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                infuraId: "8043bb2cf99347b1bfadfb233c5325c0", // required
                },
            },
        };

        const web3Modal = new Web3Modal({
            cacheProvider: false, // optional
            providerOptions, // required
        });

        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const chainId = await web3.eth.getChainId();

        if(chainId !== CHAIN_ID) {
            await changeNetwork(CHAIN_ID)
        }

        setProvider(web3);
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);

        console.log(accounts)

        localStorage.setItem("1", "walletConnect");

        // Subscribe to accounts change
        window.ethereum.on("accountsChanged", (accounts1:any) => {
            setWalletAddress(accounts1[0]);
        });
        
        // Subscribe to chainId change
        window.ethereum.on("chainChanged", (chainId:any) => {
            console.log("Network Changed")
            if(chainId != "0x" + CHAIN_ID.toString(16)) {
                disconnect()
            }
        });

        const disconnect = async () => {
            if(provider) {
                try{
                   await provider.close();
                } catch(e) {
                   setProvider(null)
                }
                setProvider(null)
                await web3Modal.clearCachedProvider();
            }
        }
     
  }, [provider, walletAddress]);
  return walletButton;
};

export default useWalletButton;
