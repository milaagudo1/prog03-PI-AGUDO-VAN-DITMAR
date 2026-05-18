import React, { useState, useEffect, use } from "react";
import "./Movies.css";
import UnElemento from "../../components/UnElemento/UnElemento";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [moviesBack, setMoviesBack] = useState([]);
    const [valorInput, setValorInput] = useState("");
    const [page, setPage] = useState(1);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarMovies(1);
    }, [])

    function cargarMovies(page) {

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=62c5658855e15f6ec169432e29e4b6a4&page=${page}`)
            .then(res => res.json())
            .then(data => {

                if (data.results) {

                    setMovies(prevMovies => prevMovies.concat(data.results));

                    setMoviesBack(prevMoviesBack =>
                        prevMoviesBack.concat(data.results)
                    );

                    setCargando(false);
                }
            })
            .catch(err => console.log(err));
    }

    function cargarMas() {

        let nuevaPagina = page + 1;

        setPage(nuevaPagina);

        cargarMovies(nuevaPagina);
    }

    function controlarCambios(event) {

        let texto = event.target.value;

        setValorInput(texto);

        let filtradas = moviesBack.filter(m =>
            m.title.toLowerCase().includes(texto.toLowerCase())
        );

        setMovies(filtradas);
    }


    if (cargando) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container">

            <h2>Películas</h2>

            <input
                className="buscador"
                type="text"
                placeholder="Buscar..."
                value={valorInput}
                onChange={controlarCambios}
            />

            <ul>
                {movies.map((movie, idx) => (
                    <UnElemento
                        key={movie.id + idx}
                        id={movie.id}
                        tipo="movie"
                        foto={movie.poster_path}
                        nombre={movie.title}
                        descripcion={movie.overview}
                    />
                ))}
            </ul>


            <button onClick={cargarMas} className="btn-primary">Cargar más</button>

        </div>
    );
}


export default Movies;