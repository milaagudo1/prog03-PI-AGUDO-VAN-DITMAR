import React, { Component } from "react";
import UnElemento from "../components/UnElemento";

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            moviesBack: [],
            valorInput: "",
            page: 1
        };
    }

    componentDidMount() {
        this.cargarMovies(1);
    }

    cargarMovies(page) {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=62c5658855e15f6ec169432e29e4b6a4&page=${page}`)
            .then(res => res.json())
            .then(data => {
                if (data.results) {
                    this.setState(prev => ({
                        movies: [...prev.movies, ...data.results],
                        moviesBack: [...prev.moviesBack, ...data.results]
                    }));
                }
            })
            .catch(err => console.log(err));
    }

    cargarMas() {
        let nuevaPagina = this.state.page + 1;
        this.setState({ page: nuevaPagina });
        this.cargarMovies(nuevaPagina);
    }

    controlarCambios(event) {
        let texto = event.target.value;
        let filtradas = this.state.moviesBack.filter(m =>
            m.title.toLowerCase().includes(texto.toLowerCase())
        );
        this.setState({ movies: filtradas, valorInput: texto });
    }

    render() {
        return (
            <div className="container">
                <h2>Películas</h2>
                <input
                    className="buscador"
                    type="text"
                    placeholder="Buscar..."
                    value={this.state.valorInput}
                    onChange={(e) => this.controlarCambios(e)}
                />
                <ul>
                    {this.state.movies.map(movie => (
                        <UnElemento
                            key={movie.id}
                            id={movie.id}
                            tipo="movie"
                            foto={movie.poster_path}
                            nombre={movie.title}
                            descripcion={movie.overview}
                        />
                    ))}
                </ul>
                <button onClick={() => this.cargarMas()} className="btn-primary">
                    Cargar más
                </button>
            </div>
        );
    }
}

export default Movies;