import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout() {
  return (
    <div>
      <Header />
      <main className="bg-neutral-200 min-h-screen p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
