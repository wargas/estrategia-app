import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <Header />
      <div className="flex-1 overflow-y-scroll py-3">
        <main className="w-full max-w-[1200px] mx-auto px-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
