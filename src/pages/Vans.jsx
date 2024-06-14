import React from "react"
import { Link } from "react-router-dom"

export default function Vans() {
    const [vans, setvans] = React.useState([]) // we create a state because we want to have somewhere where data ccan survive the rerender cycle so that if the page were re-rendered the data would be stored somewhere ()

    // fetching api/vans from server.js, note the difference from normal API fetch
    React.useEffect(function() {
        fetch("/api/vans")
        .then(res => res.json()) //API fetch generates a response which is a javascript object
        .then(data => setvans(data.vans) )    
    }, []) //request is kicked off once when the component first mounts 
    
    const vanElements = vans.map(van => ( //we craete the first van element we want to render
        
        <div key={van.id} className="van-tile">
            <Link to={`/vans/${van.id}`}> {/* create link that sends user to details on a specific van with specific van.id */}
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))


    return (
        
       <div className="van-list-container">
        <h1>Explore our van options</h1>
            <div className="van=list">
                {vanElements}
            </div>
        
       </div>
    )
}