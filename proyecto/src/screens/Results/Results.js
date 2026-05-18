import React, { useState, useEffect } from "react";
import UnElemento from "../../components/UnElemento/UnElemento";

const apiKey = "62c5658855e15f6ec169432e29e4b6a4";

function Search(props) {
    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        let params = new URLSearchParams(props.location.search);
        let query = params.get("query");
        let tipo = params.get("tipo");

        fetch(`https://api.themoviedb.org/3/search/${tipo}?api_key=${apiKey}&query=${query}`)
            .then(res => res.json())
            .then(data => {
                setResultados(data.results);
                setCargando(false);
            })
            .catch(err => console.log(err));

    }, []);

    let params = new URLSearchParams(props.location.search);
    let tipo = params.get("tipo");
    if (cargando) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container">
            <h2>Resultados de {tipo}: "{params.get("query")}"</h2>
            <ul>
                {resultados.length === 0 ?
                    <p>No se encontraron resultados</p>:resultados.map(item => (
                        <UnElemento
                            key={item.id}
                            id={item.id}
                            tipo={tipo}
                            foto={item.poster_path}
                            nombre={item.title || item.name}
                            descripcion={item.overview}
                        />
                    ))
                }

            </ul>

        </div>
    );
}

export default Search;
