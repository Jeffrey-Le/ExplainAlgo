import { list } from "postcss";
import { createContext, useContext } from "react";

const ListItemContext = createContext<string[] | undefined>(undefined!);

function useListItemContext() {
    const listItems = useContext(ListItemContext);

    if (listItems === undefined) {
        throw new Error("useListItemContext must be used with a ListItemContext");
    }

    return listItems;
}


export {ListItemContext, useListItemContext};