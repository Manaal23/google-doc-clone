import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="201340605088-8pikerd5bveklcettp2mhnl8ev46h5l4.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
