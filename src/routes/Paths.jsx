import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Index } from "../pages/Index";

export const Paths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};
