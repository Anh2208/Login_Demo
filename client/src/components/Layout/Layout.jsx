import React from "react";
import Routers from "../../router/Routers";
import Header from "../Header/Header";
// import Header from "../Header/Header.tsx";
// import Routers from "../../router/Routers.tsx";

const Layout = () => {
    return (
        <>
            <Header />
            <Routers />
        </>
    );
};

export default Layout;
