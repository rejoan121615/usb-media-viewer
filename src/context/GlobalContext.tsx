import { createContext } from "react";
import { GlobalContextType } from "../types/main.types";

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export default GlobalContext;