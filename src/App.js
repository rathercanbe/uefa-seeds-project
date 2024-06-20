import React, { Component } from "react";

import "./App.css";
import Header from "./components/Header";
import Page from "./components/Page";
import Footer from "./components/Footer";
import Sidebar from "./components/Page/Sidebar/Sidebar";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Page />
      <Footer />
    </React.Fragment>
  );
};

export default App;
