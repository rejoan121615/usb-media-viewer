import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./page/Videos";
import Layout from "./Layout";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
);
