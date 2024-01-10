import React from "react";
import Slide from "./Slide";
import Product from "./Product";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
    return(
        <>
            <Header />
            <Slide/>
            <Product />
            <Footer />
        </>
    );
};

export default Home;