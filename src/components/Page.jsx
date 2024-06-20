import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Rankings from "./Page/Rankings/Rankings";
import Tables from "./Page/Tables/Tables";
import Home from "./Home/Home";
import ErrorPage from "./ErrorPage/ErrorPage";
import StoreProvider from "../stores/StoreProvider";
import AccessList from "./AccessList/AccessList";

const Page = () => {
  return (
    <StoreProvider>
      <main className="px-3">
        <Routes>
          <Route path="/" element={<Home title="Home" />} />
          <Route
            path="/rankings/:ranking_type"
            element={<Rankings title="Rankings" />}
          />
          <Route path="/rankings" element={<Rankings title="Rankings" />} />
          <Route
            path="/tables/:league_code"
            element={<Tables title="Tables" />}
          />
          <Route path="/tables" element={<Tables title="Tables" />} />
          <Route
            path="/access/:league_code"
            element={<AccessList title="Access list to UEFA competitions" />}
          />
          <Route
            path="/access"
            element={<AccessList title="Access list to UEFA competitions" />}
          />
          <Route path="*" element={<ErrorPage title="404 Error" />} />
        </Routes>
      </main>
    </StoreProvider>
  );
};

export default Page;
