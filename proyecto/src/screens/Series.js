import React, { Component } from "react";
import UnElemento from "../components/UnElemento";
import "./Series.css";

class Series extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [],
            seriesBack: [],
            valorInput: "",
            page: 1,
            cargando: true
        };
    }

    componentDidMount() {
        this.cargarSeries(1);
    }

    cargarSeries(page) {
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=62c5658855e15f6ec169432e29e4b6a4&page=${page}`)
            .then(res => res.json())
            .then(data => {
                this.setState(prev => ({
                    series: [...prev.series, ...data.results],
                    seriesBack: [...prev.seriesBack, ...data.results],
                    cargando: false
                }));
            })
            .catch(err => console.log(err));
    }

    cargarMas() {
        let nuevaPagina = this.state.page + 1;
        this.setState({ page: nuevaPagina });
        this.cargarSeries(nuevaPagina);
    }

    controlarCambios(event) {
        let texto = event.target.value;
        let filtradas = this.state.seriesBack.filter(s =>
            s.name.toLowerCase().includes(texto.toLowerCase())
        );
        this.setState({ series: filtradas, valorInput: texto });
    }

    render() {
        if (this.state.cargando) return <p>Cargando...</p>;
        return (
            <div className="container">
                <h2>Series</h2>
                <input
                    className="buscador"
                    type="text"
                    placeholder="Buscar serie..."
                    value={this.state.valorInput}
                    onChange={(e) => this.controlarCambios(e)}
                />
                <ul>
                    {this.state.series.map(serie => (
                        <UnElemento
                            key={serie.id}
                            id={serie.id}
                            tipo="tv"
                            foto={serie.poster_path}
                            nombre={serie.name}
                            descripcion={serie.overview}
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

export default Series;