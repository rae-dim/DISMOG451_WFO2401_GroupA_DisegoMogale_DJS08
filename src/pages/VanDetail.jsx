import React from "react"
import { useParams, Link, useLocation } from "react-router-dom"
import { getVan } from "../../api"

// useParams() allows us to grab any of the parameter sthat we have in our url
export default function VanDetail() {
    const {id} = useParams() //gets the parameter details from the url
    const location = useLocation()
    const [van, setVan] = React.useState(null) //we intialize the state as null
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    /* React.useEffect(() => {
        fetch(`/api/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [params.id]) */ /** first parameter is the effect function we want to run and the second parameter is the array of dependencies. This array is not empty because we want to rerun the page if the id where to change. if we left it empty it would not refetch  */
    
    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVan(id)
                setVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [id])

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    const search = location.state?.search || ""
    const type = location.state?.type || "all"

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>} {/** here we use conditional rendering because we initilalize the van state as null so if the state is null then we just have loading, if van state is changed to van, it loads the van details */}
        </div>
    )
}