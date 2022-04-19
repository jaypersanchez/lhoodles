import { useEffect, useState, useContext, useCallback } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletContext } from "./walletContext";

export const useWalletButton = () => {

    const { provider, setProvider, walletAddress, setWalletAddress } = useContext(WalletContext);

    const switchNework = () => {
        console.log(1)
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



        // Subscribe to accounts change
        
        const web3 = new Web3(provider);

        setProvider(web3);

        const chainId = await web3.eth.getChainId();
        const accounts = await web3.eth.getAccounts();

        setWalletAddress(accounts[0]);
        localStorage.setItem("1", "walletConnect");

        window.ethereum.on('accountsChanged', async () => {
            console.log(1)
        });
        
      
        // Subscribe to chainId change
        provider.on("chainChanged", (chainId:any) => {
            switchNework();
        });
      
        // Subscribe to networkId change
        provider.on("networkChanged", (networkId:any) => {
            switchNework();
        });

        // if (provider == null) {
        //     const provider = await web3Modal.connect();

        //     const web3 = new Web3(provider);
        //     setProvider(web3);

        //     const chainId = await web3.eth.getChainId();
        //     const accounts = await web3.eth.getAccounts();

        //     console.log("chainID:", chainId);
        //     console.log("accounts:", accounts);
        //     setWalletAddress(accounts[0]);
        //     localStorage.setItem("1", "walletConnect");
        // } else if (localStorage.getItem("1") == "walletConnect") {
        //     const provider = await web3Modal.connect();

        //     const web3 = new Web3(provider);
        //     setProvider(web3);

        //     const chainId = await web3.eth.getChainId();
        //     const accounts = await web3.eth.getAccounts();
        //     setWalletAddress(accounts[0]);
        // } else {
        //     await web3Modal.clearCachedProvider();
        //     setProvider(null);
        //     setWalletAddress(null);
        //     localStorage.setItem("1", "");
        // }
  }, [provider]);
  return walletButton;
};

export default useWalletButton;
