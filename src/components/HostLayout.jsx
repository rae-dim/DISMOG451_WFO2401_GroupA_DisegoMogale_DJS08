import React from "react"
import { NavLink, Outlet } from "react-router-dom"


export default function HostLayout() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    return (
        <div>
            <nav className="host-nav">
                <NavLink 
                    to="." /**if we want to link to the route we are currently in we just use "." this a relative link*/
                    end
                    style={({isActive}) => isActive ? activeStyles : null}>
                        Dashboard
                </NavLink>
                 {/**since these are children of the host element we can use relative links/routes, instead of absolute links */}
                <NavLink 
                    to="income"
                    style={({isActive}) => isActive ? activeStyles : null}>
                        Income
                </NavLink>
                <NavLink 
                    to="vans"
                    style={({isActive}) => isActive ? activeStyles : null}>
                        Vans
                </NavLink>
                <NavLink 
                    to="reviews"
                    style={({isActive}) => isActive ? activeStyles : null}>
                        Reviews
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
    
}