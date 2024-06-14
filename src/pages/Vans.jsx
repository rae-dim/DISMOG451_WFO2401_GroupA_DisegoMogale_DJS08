import React from "react"
import { Link, useSearchParams } from "react-router-dom"
import {getVans} from "../../api"

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()

    const typeFilter = searchParams.get("type")
    
    const [vans, setVans] = React.useState([]) // we create a state because we want to have somewhere where data ccan survive the rerender cycle so that if the page were re-rendered the data would be stored somewhere ()

    const [loading, setLoading] = React.useState(false)
    
    const [error, setError] = React.useState(false)
    
    // fetching api/vans from server.js, note the difference from normal API fetch
    /* React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json()) //API fetch generates a response which is a javascript object
            .then(data => setVans(data.vans) )    
    }, []) */ //request is kicked off once when the component first mounts 
    
    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch(err) {
                console.log("There was an error!")
                console.log(err)
            }
           
            
            setLoading(false)
        }

        loadVans()
    }, []) //refactor code by using external function to render vans, avoids the assumption of "Happy path"

    const displayedVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans

    const vanElements = displayedVans.map(van => ( //we craete the first van element we want to render
        <div key={van.id} className="van-tile">
            <Link to={van.id} state={{search: `?${searchParams.toString()}`, type: typeFilter }}> {/* create link that sends user to details on a specific van with specific van.id / also we use a relative pathinstead of hard coding*/}
                
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }
    
    if (loading) {
        return <h1 aria-live="polite">Loading...</h1>
    }

    if (loading) {
        return <h1 aria-live="assertive">There was an error: {error.message}</h1>
    }
    return (
        
       <div className="van-list-container">
        <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button onClick={() => handleFilterChange("type", "simple")} 
                    className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}> {/**consitional statement keeps styling of the button if the search filter is applied */}
                        Simple
                </button>
                <button onClick={() => handleFilterChange("type", "luxury")}
                    className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}>
                        Luxury
                </button>
                <button onClick={() => handleFilterChange("type", "rugged")} 
                    className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}>
                        Rugged
                </button>
                
                {typeFilter ? (
                    <button onClick={() => handleFilterChange("type", null)} className="van-type clear-filter">Clear</button>
                ) : null} {/**coditional statement determines wether or not clear button renders (renders if filter is applied) */}
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        
       </div>
    )
}

// instead of hardcoding the search filter we should use a function URLSearchParams is outside the scope of react-dom-router
//History state