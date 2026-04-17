import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Styles.css";
import React from "react";
import UnElemento from "../components/UnElemento.js";
import Buscador from "../components/Buscador";

let apiKey = "62c5658855e15f6ec169432e29e4b6a4";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculasPopulares: [],
      peliculasCartelera: []
    };
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          peliculasPopulares: data.results
        });
      });

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          peliculasCartelera: data.results
        });
      });
  }

  filtrarPeliculas(textoAFiltrar) {
    let populares = this.state.peliculasPopulares.filter(p =>
      p.title.includes(textoAFiltrar)
    );

    let cartelera = this.state.peliculasCartelera.filter(p =>
      p.title.includes(textoAFiltrar)
    );

    this.setState({
      peliculasPopulares: populares,
      peliculasCartelera: cartelera
    });
  }

  render() {
    return (
      <div className="container">

        <Buscador onBuscar={(texto) => this.filtrarPeliculas(texto)} />

        <h2>Películas populares</h2>
        <ul>
          {this.state.peliculasPopulares.length === 0 ?
            <p>No se encontraron películas populares</p>
            : this.state.peliculasPopulares.map((pelicula) => (
              <UnElemento
                key={pelicula.id}
                id={pelicula.id}
                foto={pelicula.poster_path}
                nombre={pelicula.title}
                descripcion={pelicula.overview}
              />
            ))}
        </ul>

        <h2>Películas en cartelera</h2>
        <ul>
          {this.state.peliculasCartelera.length === 0 ?
            <p>No se encontraron películas de Cartelera</p>
            : this.state.peliculasCartelera.map((pelicula) => (
              <UnElemento
                key={pelicula.id}
                id={pelicula.id}
                foto={pelicula.poster_path}
                nombre={pelicula.title}
                descripcion={pelicula.overview}
              />
            ))}
        </ul>

      </div>
    );
  }
}

export default Home;

