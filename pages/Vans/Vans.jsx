import React from "react"
import { Link, useSearchParams } from "react-router-dom"

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [vans, setVans] = React.useState([])
    const typeFilter = searchParams.get('type')


    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])


    const displayedVans = typeFilter
        ? vans.filter(van => van.type.toLowerCase() === typeFilter)
        : vans


    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={`/vans/${van.id}`}>
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
            <div className="van-list-filter-buttons">
                {/* <Link className="van-type simple" to="?type=simple">Simple</Link>
                <Link className="van-type luxury" to="?type=luxury">Luxury</Link>
                <Link className="van-type ruggged" to="?type=rugged">Rugged</Link>
                <Link className="van-type clear-filters" to="." >Clear</Link> */}

                {/* <button className="van-type simple" onClick={() => setSearchParams("type=simple")} >Simple</button>
                <button className="van-type luxury" onClick={() => setSearchParams("type=luxury")} >Luxury</button>
                <button className="van-type ruggged" onClick={() => setSearchParams("type=rugged")} >Rugged</button>
                <button className="van-type clear-filters" onClick={() => setSearchParams("")} >Clear</button> */}

                <button className="van-type simple" onClick={() => setSearchParams({ type: "simple" })} >Simple</button>
                <button className="van-type luxury" onClick={() => setSearchParams({ type: "luxury" })} >Luxury</button>
                <button className="van-type ruggged" onClick={() => setSearchParams({ type: "rugged" })} >Rugged</button>
                {typeFilter ? (
                    <button
                        className="van-type clear-filters"
                        onClick={() => setSearchParams({})}
                    >Clear</button>
                ) : null}
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}