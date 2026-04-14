import { useEffect, useState } from "react";
import UnElemento from "../components/UnElemento";

function Series() {

    const [series, setSeries] = useState([]);
    const [page, setPage] = useState(1);
    const [busqueda, setBusqueda] = useState("");


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=62c5658855e15f6ec169432e29e4b6a4&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setSeries(prev => [...prev, ...data.results]);
            })
            .catch(err => console.log(err));
    }, [page]);


    function cargarMas() {
        setPage(page + 1);
    }


    let filtradas = series.filter(serie =>
        serie.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container">

            <h2>Series</h2>


            <input
                className="buscador"
                type="text"
                placeholder="Buscar serie..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />


            <ul>
                {filtradas.map(serie => (
                    <UnElemento
                        key={serie.id}
                        id={serie.id}
                        foto={serie.poster_path}
                        nombre={serie.name}
                        descripcion={serie.overview}
                    />
                ))}
            </ul>

            <button onClick={cargarMas} className="btn-primary">
                Cargar más
            </button>

        </div>
    );
}

export default Series;