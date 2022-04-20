import React, { FC, useContext, useEffect, useState } from "react";
import "../common.scss";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../connect/walletContext";
import { useWalletButton } from "../connect/useWalletButton";
import { useMintForPublic } from "../nft/useMint";

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Modal} from "react-bootstrap";
import '../bootstrap.min.css';


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
  const [show, setShow] = useState(false);

  const closeModal = () => {
    setShow(false); 
  }

  const showModal = () => {
    setShow(true); 
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

        <Modal
          show={show}
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Some Content here</p>
          </Modal.Body>
          <Modal.Footer>

            <button className='btn btn-primary' onClick={closeModal}>
              Save
            </button>
          </Modal.Footer>
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
  }
  
};

export default TakeMeTo;
