import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./page/Home";

const root = createRoot(document.getElementById("root")!);
root.render(<Home />);