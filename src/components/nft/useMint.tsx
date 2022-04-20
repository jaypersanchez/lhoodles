import { useEffect, useState, useContext, useCallback } from "react";
import Web3 from "web3";
import { AbiItem } from 'web3-utils'
import { WalletContext } from "../connect/walletContext";
import hoodles_abi from "../config/hoodles.json";
import { hoodles_address } from "../config/constant"
import { Button, Modal, ModalBody} from 'reactstrap';
import { toast } from 'react-toastify';
import  BigNumber from 'bn.js';




export const useMintForPublic = (amount:any, setShow:any, setProcessing:any, setToast:any) => {

    const { provider, walletAddress } = useContext(WalletContext);

    const notify = () => toast.error("Your account have already max Hoodles NFT", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
    })

    const notify_insufficient = () => toast.error("Insuffient balance of your wallet", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
    })


    const notify_cancel = () => toast.warn("Transaction has been cancelled", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
    })

    const notify_fail = () => toast.warn("Transaction has been failed", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
    })

    const mintNFT = useCallback(async () => {

        const web3 = new Web3(provider)
        const hoodles =  new web3.eth.Contract(hoodles_abi as AbiItem[], hoodles_address)
        const hoodles_price = await hoodles.methods.tokenPrice().call()
        const priceData = amount * hoodles_price;
        
        const current_amount = await hoodles.methods.publicSaleClaimed(walletAddress).call()
        const max_amount = await hoodles.methods.PUBLIC_SALE_PURCHASE_LIMIT().call()
        const balance = await web3.eth.getBalance(walletAddress)

        if(new BigNumber(balance).lt( new BigNumber(priceData))) {
            notify_insufficient()
            setProcessing(false)
            return;
        }

        if(parseInt(current_amount) + parseInt(amount) >= parseInt(max_amount)) {
            notify()
            setProcessing(false)
            return;
        }

        setProcessing(true)
        const data = hoodles.methods.publicSaleMint(amount).encodeABI();
        const gasPrice = await web3.eth.getGasPrice();
        const glimit = await web3.eth.getBlock("latest");
        const price = priceData.toString()

        // const priceData = amount * 0.00007;
        // const price = web3.utils.toWei(priceData.toString(), "ether");

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
            const result = await web3.eth.sendTransaction(tx);
            if(result.status) {
                setShow(true)
                setProcessing(false)
            } else {
                setShow(false)
                setProcessing(false)
                notify_fail()
            }
        } catch {
            notify_cancel()
            setProcessing(false)
        }
       
    }, [provider, walletAddress, amount]);

    return mintNFT;
};

export default useMintForPublic;
