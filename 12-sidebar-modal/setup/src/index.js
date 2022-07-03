import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    {/* Adding the useContext provider around the overall component inside index.js file  */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
