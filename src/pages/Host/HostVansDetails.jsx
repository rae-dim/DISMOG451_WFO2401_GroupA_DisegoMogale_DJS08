import React from "react"
import { Link } from "react-router-dom"

export default function HostVansDetails() {
    const [vans, setVans] = React.useState([])

    React.useEffect(() => {
        fetch(`/api/vans/:${van.id}`)
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    const hostVansElement = vans.map(van => (
        <Link
            to={`/host/vans/${van.id}`}
            key={van.id}
            className="host-van-link-wrapper">
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ))
    
    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {
                    vans.length > 0 ? (
                        <section>
                            {hostVansElement}
                        </section>

                    ) : (
                            <h2>Loading...</h2>
                        )
                }
            </div>
        </section>
    )
}