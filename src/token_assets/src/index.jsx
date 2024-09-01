import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => {

  const authclient = await AuthClient.create();
  
  if(await authclient.isAuthenticated()){
    handleAuthenticated(authclient);
  }
  else{
  await authclient.login({
    identityProvider: "https://identity.ic0.app/#authorize",
    onSuccess: () => {
      handleAuthenticated(authclient);
    }
  });}

}

async function handleAuthenticated(authclient){
  ReactDOM.render(<App />, document.getElementById("root"));
}

init();


