import React, { FC, useContext, useEffect, useState } from "react";
import "../common.scss";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../connect/walletContext";
import { useWalletButton } from "../connect/useWalletButton";
import { useMintForPublic } from "../nft/useMint";

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TakeMeToProps {
  title: string;
  to: string;
  variant?: boolean;
}
const TakeMeTo: FC<TakeMeToProps> = ({ title, to, variant }) => {
  const navigate = useNavigate();

  const { provider, setProvider, walletAddress, setWalletAddress } = useContext(WalletContext);
  let [amount, setAmount] = useState(1);
  
  const walletButton = useWalletButton();
  const mintNFT = useMintForPublic(amount);

  const incrementCount = () => {
    amount = amount + 1;
    setAmount(amount);
  }

  const decrementCount = () => {
    if(amount > 1) {
      amount = amount - 1;
      setAmount(amount);
    }
  }

  if(provider == null) {
    return (
      <button
        onClick={walletButton}
        className={`take-me-to-mint-btn ${variant ? "variant" : ""}`}
      >
        {title}
      </button>
    );
  } else {
    return (
      <div>
        <div className="flex div_amount">
          <button className="btn_amount pointer" onClick={decrementCount}><FontAwesomeIcon icon={faMinus} /></button>
          <div className="amount">{amount}</div>
          <button className="btn_amount pointer" onClick={incrementCount}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
        <button
          onClick={mintNFT}
          className={`take-me-to-mint-btn ${variant ? "variant" : ""}`}
        >
          Mint Now
        </button>
      </div>
     
    );
  }
  
};

export default TakeMeTo;
