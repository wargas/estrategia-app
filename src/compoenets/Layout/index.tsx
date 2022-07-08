import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import Header from "./Header";
import PacotePage from "../../pages/PacotePage";
import CursoPage from "../../pages/CursoPage";
import AulaPage from "../../pages/AulaPage";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <Header />
      <div className="flex-1 overflow-y-scroll py-3">
        <main className="w-full max-w-[1200px] mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pacote/:id" element={<PacotePage />} />
            <Route path="/pacote/:pacote_id/curso/:id" element={<CursoPage />} />
            <Route path="/pacote/:pacote_id/curso/:curso_id/aula/:id" element={<AulaPage />} />
            <Route path="*" element={<p>404</p>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
