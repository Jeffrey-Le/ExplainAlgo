import { createContext, useContext, useState } from "react";

type ProblemContextType = {
    problems: any[];
    setList: React.Dispatch<React.SetStateAction<any[]>>;
}

const ListItemContext = createContext<ProblemContextType | undefined>(undefined);

const ListItemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [problems, setList] = useState<any[]>([]);
  
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