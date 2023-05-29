import React from 'react';
import NavBar from "../components/NavBar";
import {Container} from "@mui/material";
import Player from "../components/Player";
import {Head} from "next/document";

const MainLayout: React.FC = ({children, title}) => {
    return (
        <>
            <NavBar />
            <Container style={{margin: '100px 0'}} >
                {children}
            </Container>
            <Player />
        </>
    );
};

export default MainLayout;