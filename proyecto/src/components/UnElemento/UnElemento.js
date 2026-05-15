import React from "react";
import { Link } from "react-router-dom";
import "./UnElemento.css";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
const cookies = new Cookies();

function UnElemento(props) {

    console.log("existo");
    

    const[verDescripcion, setVerDescripcion]=useState(false)
    const[esFavorito, setEsFavorito]=useState(false)

    useEffect(()=>{
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        let esFavorito = favoritos.some(favorito => favorito.id === props.id);
        setEsFavorito(true);
    }, [])


    function Favorito() {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        if (esFavorito) {
            favoritos = favoritos.filter(favorito => favorito.id !== props.id);
        } else {
            favoritos.push({
                id: props.id,
                nombre: props.nombre,
                foto: props.foto,
                tipo: props.tipo
        });

        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        setEsFavorito(!esFavorito );
    }

  
      



}

  let haySesion = cookies.get('user-auth-cookie')
  
return (
            <div className="card">
                <img src={`https://image.tmdb.org/t/p/w500/${props.foto}`} alt={props.nombre} />
                <h3>{props.nombre}</h3>
                <p> {verDescripcion ? props.descripcion : ''}</p>
                <button className="btn btn-primary" onClick={() => setVerDescripcion(!verDescripcion)}>
                    {verDescripcion ? 'Ocultar descripción' : 'Ver descripción'}
                </button>
                <Link to={`/detail/${props.tipo}/${props.id}`}><button className="btn btn-secondary">Ver detalle</button></Link>
                {haySesion ? (
                    <button className="btn btn-warning" onClick={() => Favorito()}>
                        {esFavorito ? " Quitar de favoritos" : " Agregar a favoritos"}</button>) : null}
            </div>
        )
    }

export default UnElemento;






