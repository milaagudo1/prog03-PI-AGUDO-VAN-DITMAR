import { useEffect, useState } from "react";
import UnElemento from "../components/UnElemento";

function Movies() {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=62c5658855e15f6ec169432e29e4b6a4&page=${page}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.results) {
                    setMovies(prev => [...prev, ...data.results]);
                }
            })
            .catch(err => console.log(err));
    }, [page]);



    function cargarMas() {
        setPage(page + 1);
    }

    let filtradas = movies.filter(movie =>
        movie.title.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container">

            <h2>Películas</h2>

            <input
                className="buscador"
                type="text"
                placeholder="Buscar..."
                onChange={(e) => setBusqueda(e.target.value)}
            />


            <ul>
                {filtradas.map(movie => (
                    <UnElemento
                        key={movie.id}
                        id={movie.id}
                        foto={movie.poster_path}
                        nombre={movie.title}
                        descripcion={movie.overview}
                    />
                ))}
            </ul>

            <button onClick={cargarMas}>Cargar más</button>

        </div>
    );
}

export default Movies;