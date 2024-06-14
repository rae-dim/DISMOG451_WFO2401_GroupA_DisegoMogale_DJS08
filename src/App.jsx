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
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from "./pages/Vans"
import VanDetail from "./pages/VanDetail"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout";


import "./server"
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans from "./pages/Host/HostVans";
import HostVansDetails from "./pages/Host/HostVansDetails";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhoto from "./pages/Host/HostVanPhoto";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}> {/** we want to render the relevant rout */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} /> {/* created a route that has a parameter as part of its path */}
       

          <Route path="host" element={<HostLayout/>}> {/**stores all shared UI */}
            <Route index element={<Dashboard/>}/> 
            <Route path="income" element={<Income/>}/>
            <Route path="reviews" element={<Reviews/>}/>
            <Route path="vans" element={<HostVans/>}/>
            <Route path="vans/:id" element={<HostVansDetails/>}>
              <Route index element={<HostVanInfo/>} />
              <Route path="pricing" element={<HostVanPricing/>} />
              <Route path="photo" element={<HostVanPhoto/>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);

//we can use non self closing route element to make nested routes
// nested routes are nested pieces of the url
// shared UI are parts of the page that needs to stay on the page even when you move to a diffrent page within the same route
//use nested routes when you want to kep displaying some ui on the page but also want to display more, and when you want to avoid repitition in your route definitions
//a layout route does not need to have a path
//Relative routes prevent us from using absolute routes. Relative routes are relative to the parent element, so theres no need to include the path of the parent in the path of the child element
//index routes: if you have an element that you want to display at the same path as the layout element you use an index route