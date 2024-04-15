import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./components/App";
import "./style.scss";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);

// const root = ReactDOM.createRoot(document.getElementById('root')!).render(
//     <App />
// )
