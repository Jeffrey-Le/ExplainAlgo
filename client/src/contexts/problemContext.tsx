import { createContext, useContext, useState } from "react";
import { ProblemType } from "../types/types";

type ProblemContextType = {
    problems: ProblemType[] | undefined;
    setList: React.Dispatch<React.SetStateAction<ProblemType[] | undefined>>;
}

const ListItemContext = createContext<ProblemContextType | undefined>(undefined);

const ListItemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [problems, setList] = useState<ProblemType[] | undefined>([]);
  
    return (
      <ListItemContext.Provider value={{ problems, setList }}>
        {children}
      </ListItemContext.Provider>
    );
  };

function useListItemContext() {
    const listItems = useContext(ListItemContext);

    if (listItems === undefined) {
        throw new Error("useListItemContext must be used with a ListItemContext");
    }

    return listItems;
}


export {ListItemProvider, useListItemContext};