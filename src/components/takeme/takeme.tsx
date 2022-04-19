import React, { FC, useContext, useEffect } from "react";
import "../common.scss";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../connect/walletContext";
import { useWalletButton } from "../connect/useWalletButton";
import { useMintForPublic } from "../nft/useMint";

interface TakeMeToProps {
  title: string;
  to: string;
  variant?: boolean;
}
const TakeMeTo: FC<TakeMeToProps> = ({ title, to, variant }) => {
  const navigate = useNavigate();

  const { provider, setProvider, walletAddress, setWalletAddress } = useContext(WalletContext);
  const walletButton = useWalletButton();
  const mintNFT = useMintForPublic();

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
      <button
        onClick={mintNFT}
        className={`take-me-to-mint-btn ${variant ? "variant" : ""}`}
      >
        Mint Now
      </button>
    );
  }
  
};

export default TakeMeTo;
