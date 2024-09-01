import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet() {

  const  [isDisabled, setDisabled] = useState(false);
  const [buttonText, setText] = useState("Gimme Gimme");
  async function handleClick(event) {
    setDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await AuthClient.getIdentity();

    const authenticatedCanister = createActor(canisterId,{
      agentOptions: {
        identity,
      },
    });


    const result = await authenticatedCanister.payOut();
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 BINGO tokens to your account.</label>
      <p className="trade-buttons">
        <button disabled={isDisabled} id="btn-payout" onClick={handleClick}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
