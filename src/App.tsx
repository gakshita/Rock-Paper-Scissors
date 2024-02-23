import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import RPC from "./views/rcp";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

function App() {
    return (
        <>
            <ThemeProvider theme={theme["dark"]}>
                <RPC />
            </ThemeProvider>
        </>
    );
}

export default App;
