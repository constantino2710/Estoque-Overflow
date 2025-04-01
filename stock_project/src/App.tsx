import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {MainLayout} from "@/components/layout";

export function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}
