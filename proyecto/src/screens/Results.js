import React, { Component } from "react";
import UnElemento from "../components/UnElemento";

const apiKey = "62c5658855e15f6ec169432e29e4b6a4";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultados: [],
            cargando: true
        };
    }

    componentDidMount() {
        let params = new URLSearchParams(this.props.location.search);
        let query = params.get("query");
        let tipo = params.get("tipo");

        fetch(`https://api.themoviedb.org/3/search/${tipo}?api_key=${apiKey}&query=${query}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ resultados: data.results, cargando: false });
            })
            .catch(err => console.log(err));
    }

    render() {
        let params = new URLSearchParams(this.props.location.search);
        let tipo = params.get("tipo");

        if (this.state.cargando) return <p>Cargando...</p>;

        return (
            <div className="container">
                <h2>Resultados de {tipo}: "{params.get("query")}"</h2>
                <ul>
                    {this.state.resultados.length === 0 ?
                        <p>No se encontraron resultados</p>
                        : this.state.resultados.map(item => (
                            <UnElemento
                                key={item.id}
                                id={item.id}
                                tipo={tipo}
                                foto={item.poster_path}
                                nombre={item.title || item.name}
                                descripcion={item.overview}
                            />
                        ))}
                </ul>
            </div>
        );
    }
}

export default Search;