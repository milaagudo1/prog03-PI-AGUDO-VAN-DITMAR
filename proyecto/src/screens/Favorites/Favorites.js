import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Favorites.css";

const cookies = new Cookies();

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritos: []
        };
    }

    componentDidMount() {
        if (!cookies.get("user-auth-cookie")) {
            this.props.history.push("/login");
            return;
        }
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        this.setState({ favoritos });
    }

    quitarFavorito(id) {
        let favoritos = this.state.favoritos.filter(f => f.id !== id);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        this.setState({ favoritos });
    }

    render() {
        let peliculas = this.state.favoritos.filter(f => f.tipo === "movie");
        let series = this.state.favoritos.filter(f => f.tipo === "tv");
        return (
            <div className="container">
                <h2>Mis Favoritos</h2>

                <h3>Películas</h3>
                {peliculas.length === 0 ? (
                    <p>No tenés películas favoritas</p>
                ) : (
                    <ul>
                        {peliculas.map(favorito => (
                            <div className="card" key={favorito.id}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${favorito.foto}`}
                                    alt={favorito.nombre}
                                />
                                <h3>{favorito.nombre}</h3>
                                <Link to={`/detail/${favorito.tipo}/${favorito.id}`}>
                                    <button className="btn btn-secondary">Ver detalle</button>
                                </Link>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => this.quitarFavorito(favorito.id)}
                                >
                                    Quitar de favoritos
                                </button>
                            </div>
                        ))}
                    </ul>
                )}

                <h3>Series</h3>
                {series.length === 0 ? (
                    <p>No tenés series favoritas</p>
                ) : (
                    <ul>
                        {series.map(favorito => (
                            <div className="card" key={favorito.id}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${favorito.foto}`}
                                    alt={favorito.nombre}
                                />
                                <h3>{favorito.nombre}</h3>
                                <Link to={`/detail/${favorito.tipo}/${favorito.id}`}>
                                    <button className="btn btn-secondary">Ver detalle</button>
                                </Link>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => this.quitarFavorito(favorito.id)}
                                >
                                    Quitar de favoritos
                                </button>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default Favorites;