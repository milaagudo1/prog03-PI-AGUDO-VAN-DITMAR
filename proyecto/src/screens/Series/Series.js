import React, { useState, useEffect } from "react";
import UnElemento from "../../components/UnElemento/UnElemento";
import "./Series.css";

function Series() {


    const [series, setSeries] = useState([]);
    const [seriesBack, setSeriesBack] = useState([]);
    const [valorInput, setValorInput] = useState("");
    const [page, setPage] = useState(1);
    const [cargando, setCargando] = useState(true);

   
    useEffect(() => {
        cargarSeries(1);
    }, []);

  
    function cargarSeries(page) {

        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=62c5658855e15f6ec169432e29e4b6a4&page=${page}`)
            .then(res => res.json())
            .then(data => {

                setSeries(prevSeries =>
                    prevSeries.concat(data.results)
                );

                setSeriesBack(prevSeriesBack =>
                    prevSeriesBack.concat(data.results)
                );

                setCargando(false);
            })
            .catch(err => console.log(err));
    }

  
    function cargarMas() {

        let nuevaPagina = page + 1;

        setPage(nuevaPagina);

        cargarSeries(nuevaPagina);
    }

  
    function controlarCambios(event) {

        let texto = event.target.value;

        setValorInput(texto);

        let filtradas = seriesBack.filter(s =>
            s.name.toLowerCase().includes(texto.toLowerCase())
        );

        setSeries(filtradas);
    }

    
    if (cargando) {
        return <p>Cargando...</p>;
    }

    return (

        <div className="container">

            <h2>Series</h2>

            <input
                className="buscador"
                type="text"
                placeholder="Buscar serie..."
                value={valorInput}
                onChange={controlarCambios}
            />

            <ul>
                {series.map((serie, idx) => (
                    <UnElemento
                        key={`${serie.id}-${idx}`}
                        id={serie.id}
                        tipo="tv"
                        foto={serie.poster_path}
                        nombre={serie.name}
                        descripcion={serie.overview}
                    />
                ))}
            </ul>

            <button onClick={cargarMas} className="btn-primary">Cargar más</button>

        </div>
    );
}

export default Series;