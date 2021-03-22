import { createContext, useContext } from "react";
import ComputerStore from "./computerStore";

interface Store {
  ComputerStore: ComputerStore;
}

export const store: Store = {
  ComputerStore: new ComputerStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
