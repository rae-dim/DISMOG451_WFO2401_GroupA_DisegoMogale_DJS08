import React from "react"
import { Outlet } from "react-router-dom" 
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
    return (
        <div className="site-wrapper">
            <Header />
            <main>
                <Outlet /> {/* allows us to create a hole where the matching route can render */}
            </main>
            <Footer />
        </div>
    )
}