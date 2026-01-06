import { Outlet } from "react-router-dom"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "../App.css"

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Header />

      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}