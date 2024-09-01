import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";

function Transfer() {

  const [recipientId, setId] = useState("");

  const [amount, setAmount] = useState(""); 

  const [isDisabled, setDisabled] = useState("");

  const[feedback, setFeedback] = useState("");

  const[isHidden, setHidden] = useState(true);
  
  async function handleClick() {
    setHidden(true);
    setDisabled(true);
    try {
      if (!recipientId.trim()) {
        throw new Error("Recipient ID cannot be empty");
      }
      if (isNaN(Number(amount)) || Number(amount) <= 0) {
        throw new Error("Invalid amount");
      }
      
      const recipient = Principal.fromText(recipientId);
      const amountToTransfer = BigInt(amount); 
  
      const result = await token.transfer(recipient, amountToTransfer);
      
      if (result === "Success") {
        setId("");
        setAmount("");
      } else {
        throw new Error(result);
      }
    } catch (error) {
      console.error("Error in transfer:", error);
      alert(`Transfer failed: ${error.message}`);
    }
    setDisabled(false);
    setFeedback(false);
    setHidden(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} >
            Transfer
          </button>
        </p>
        <p>
          hidden={setHidden}{feedback}  
        </p>
      </div>
    </div>
  );
}

export default Transfer;
