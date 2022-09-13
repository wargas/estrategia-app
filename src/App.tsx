import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./providers/AuthProvider";
import Layout from "./compoenets/Layout";
import HomePage from "./pages/HomePage";
import PacotePage from "./pages/PacotePage";
import CursoPage from "./pages/CursoPage";
import AulaPage from "./pages/AulaPage";
import SearchPage from "./pages/SearchPage";
import ConcursosPage from "./pages/ConcursosPage/ConcursosPage";
import ConcursoDetail from "./pages/ConcursosPage/ConcursoDetail";
import ConcursosList from "./pages/ConcursosPage/ConcursosList";


const queryClient = new QueryClient({});

function App() {
  return (
    <BrowserRouter>

      <ToastContainer position="bottom-right" theme="light" />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/concursos" element={<ConcursosPage />}>
                <Route path="" element={<ConcursosList />} />
                <Route path=":concurso_id" element={<ConcursoDetail />} />
                <Route path=":concurso_id/curso/:id" element={<CursoPage />} />
                <Route path=":concurso_id/curso/:curso_id/aula/:id" element={<AulaPage />} />
              </Route>
              <Route path="search" element={<SearchPage />} />
              <Route path="pacote/:id" element={<PacotePage />} />
              <Route path="pacote/:pacote_id/curso/:id" element={<CursoPage />} />
              <Route path="pacote/:pacote_id/curso/:id" element={<CursoPage />} />
              <Route path="pacote/:pacote_id/curso/:curso_id/aula/:id" element={<AulaPage />} />
              <Route path="*" element={<p>404</p>} />
            </Route>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>

    </BrowserRouter>
  );
}

export default App;
