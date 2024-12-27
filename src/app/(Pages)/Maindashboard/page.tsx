"use client";
import DashboardLayout from "./DashboardLayout";
import { BrowserRouter } from "react-router-dom";

export default function Page() {
  return (
    <BrowserRouter>
      <DashboardLayout />
    </BrowserRouter>
  );
}