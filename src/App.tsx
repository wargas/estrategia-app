import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";


import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./providers/AuthProvider";
import Layout from "./compoenets/Layout";

const queryClient = new QueryClient({});

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" theme="light" />
      <QueryClientProvider  client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Layout />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
