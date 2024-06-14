/**
 * Challenge:
 * Bootstrap the VanLife project by creating the first 2 routes:
 * Home and About.
 * 
 * Also include the navbar that can link between the two routes.
 * For now, you'll either need to copy/paste the navbar code
 * to both Home and About pages, or you'll need to find a place
 * to put it where it can be shared between the two pages.
 * (Don't overthink this part - just do whatever is easiest for
 * you because we'll learn a better approach very soon)
 * 
 * Review challenge: do all the CSS yourself based on the design
 * linked in the slides.
 */
import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from "./pages/Vans"
import VanDetail from "./pages/VanDetail"


import "./server"

function App() {

  return (
    <BrowserRouter>
        <header>
          <Link calssName="site-logo"to="/">#VANLIFE</Link>
          <nav>
          <Link to="/about">About </Link>
          <Link to="/vans">Vans</Link>
          </nav>
        </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/vans" element={<Vans />} />
        <Route path="/vans:id" element={<VanDetail />}/> {/* created a route that has a parameter as part of its path */}
      </Routes>
    </BrowserRouter>
  )
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);

//we can use non self closing route tags to make nested routes
// nested routes are nested pieces of the url
// shared UI are parts of the page that needs to stay on the page even when you move to a diffrent page within the same route
//use nested routes when you want to kep displaying some ui on the page but also want to display more, and when you want to avoid repitition in your route definitions