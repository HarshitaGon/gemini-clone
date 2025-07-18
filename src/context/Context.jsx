import { createContext } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const onSent = async (prompt) => {
        await main(prompt)
    }

    onSent("What is react js")

    const contextValue = {

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider