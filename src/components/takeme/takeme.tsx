import React, { FC, useContext, useEffect, useState } from "react";
import "../common.scss";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../connect/walletContext";
import { useWalletButton } from "../connect/useWalletButton";
import { useMintForPublic } from "../nft/useMint";

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Modal, Button} from "react-bootstrap";
import '../bootstrap.min.css';

import thanks_img from "../../assets/pictures/thank.jpg"


interface TakeMeToProps {
  title: string;
  to: string;
  variant?: boolean;
}


const TakeMeTo: FC<TakeMeToProps> = ({ title, to, variant }) => {
  const navigate = useNavigate();

  const { provider, setProvider, walletAddress, setWalletAddress } = useContext(WalletContext);
  let [amount, setAmount] = useState(1);

  const [show, setShow] = useState(false);
  const [processing, setProcessing] = useState(false)

  const closeModal = () => {
    setShow(false); 
  }

  const showModal = () => {
    setShow(true); 
  }
  
  const walletButton = useWalletButton();
  const mintNFT = useMintForPublic(amount, setShow, setProcessing);

  const incrementCount = () => {
    if(amount < 6) {
      amount = amount + 1;
      setAmount(amount);
    }
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
  } else if(provider != null && !processing){
    return (
      <div>
        <Modal
          size="lg"
          show={show}
          onHide={closeModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="flex" style={{flexDirection: 'column'}}>
             <img src={thanks_img} className="thanks_img" alt="thanks" />
             <div style={{textAlign: 'center', marginTop: '15px'}}>
              <Button onClick={closeModal} className="closeBtn" style={{width: "100%", color:'black'}}>Close</Button>
             </div>
            </div>
            
          </Modal.Body>
        </Modal>

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
  } else if(provider != null && processing) {
    return (
      <div>
          <div className="flex div_amount">
            <button className="btn_amount pointer" onClick={decrementCount}><FontAwesomeIcon icon={faMinus} /></button>
            <div className="amount">{amount}</div>
            <button className="btn_amount pointer" onClick={incrementCount}><FontAwesomeIcon icon={faPlus} /></button>
          </div>
          <button
          className={`take-me-to-mint-btn ${variant ? "variant" : ""}`} disabled
          >
          Processing...
        </button>
      </div>
    )
  } else {
    return (
      <button
        onClick={walletButton}
        className={`take-me-to-mint-btn ${variant ? "variant" : ""}`}
      >
        {title}
      </button>
    )
  }
  
};

export default TakeMeTo;
