import React, { Component } from "react";
import "./Detail.css";

const apiKey = "62c5658855e15f6ec169432e29e4b6a4";

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detalle: null,
            esFavorito: false,
            cargando: true
        };
    }

    componentDidMount() {
        const { tipo, id } = this.props.match.params;

        fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ detalle: data, cargando: false });
            })
            .catch(err => console.log(err));

        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        let yaEsFavorito = favoritos.some(f => f.id === Number(id));
        this.setState({ esFavorito: yaEsFavorito });
    }

    manejarFavorito() {
        const { tipo, id } = this.props.match.params;
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        if (this.state.esFavorito) {
            favoritos = favoritos.filter(f => f.id !== Number(id));
        } else {
            favoritos.push({
                id: this.state.detalle.id,
                nombre: this.state.detalle.title || this.state.detalle.name,
                foto: this.state.detalle.poster_path,
                tipo: tipo
            });
        }
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        this.setState({ esFavorito: !this.state.esFavorito });
    }

    render() {
        const { tipo } = this.props.match.params;
        const { detalle, cargando, esFavorito } = this.state;
        const sesion = sessionStorage.getItem("usuario");

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
                    <button onClick={() => this.manejarFavorito()}>
                        {esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                    </button>
                )}
            </div>
        );
    }
}

export default Detail;