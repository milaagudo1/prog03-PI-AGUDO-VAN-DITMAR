import React from "react";
import { Link } from "react-router-dom";

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritos: []
        };
    }

    componentDidMount() {
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        this.setState({ favoritos });
    }

    quitarFavorito(id) {
        let favoritos = this.state.favoritos.filter(f => f.id !== id);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        this.setState({ favoritos });
    }

    render() {
        return (
            <div className="container">
                <h2>Mis Favoritos</h2>

                {this.state.favoritos.length === 0 ? (
                    <p>No tenés favoritos guardados</p>
                ) : (
                    <ul>
                        {this.state.favoritos.map(favorito => (
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