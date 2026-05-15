import React, { Component, useEffect, useState } from "react";
import "./Detail.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const apiKey = "62c5658855e15f6ec169432e29e4b6a4";


function Detail(props){
    const[detalle, setDetalle]=useState(null)
    const[esFavorito, setEsFavorito]=useState(false)
    const[cargando, setCargando]=useState(true);

    useEffect(()=>{
        const {tipo, id} = props.match.params;

        fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                setDetalle(data) 
                setCargando(false)
            })
            .catch(err => console.log(err));

        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        let yaEsFavorito = favoritos.some(f => f.id === Number(id));
        setEsFavorito(yaEsFavorito)
    },[])


    function manejarFavorito() {
        const { tipo, id } = props.match.params;
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        if (esFavorito) {
            favoritos = favoritos.filter(f => f.id !== Number(id));
        } else {
            favoritos.push({
                id: detalle.id,
                nombre: detalle.title || detalle.name,
                foto: detalle.poster_path,
                tipo: tipo
            });
        }
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        setEsFavorito(!esFavorito)
    }

        const { tipo } = props.match.params;
        const sesion = cookies.get("user-auth-cookie");

        if (cargando) return <p>Cargando...</p>;

        return (
            <div className="container">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${detalle.poster_path}`}
                    alt={detalle.title || detalle.name}
                />
                <h1>{detalle.title || detalle.name}</h1>
                <p>Calificacion: {detalle.vote_average}</p>
                <p>Fecha de estreno: {detalle.release_date || detalle.first_air_date}</p>
                {tipo === "movie" && (
                    <p>Duracion: {detalle.runtime} minutos</p>
                )}
                <p>Sinopsis: {detalle.overview}</p>
                <p>Generos: {detalle.genres ? detalle.genres.map(g => g.name).join(", ") : "Sin generos"}</p>
                {sesion && (
                    <button onClick={() => manejarFavorito()}>
                        {esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                    </button>
                )}
            </div>
        );
    }

export default Detail;