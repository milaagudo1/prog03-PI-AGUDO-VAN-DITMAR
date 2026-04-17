import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Styles.css";
import React from "react";
import UnElemento from "../components/UnElemento.js";

let apiKey = "62c5658855e15f6ec169432e29e4b6a4";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      series: []
    };
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          peliculas: data.results
        });
      });

    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=62c5658855e15f6ec169432e29e4b6a4&page=1`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          series: data.results
        });
      });
  }

  filtrarPeliculas(textoAFiltrar) {
    let peliculas = this.state.peliculas.filter(p =>
      p.title.includes(textoAFiltrar)
    );

    let series = this.state.series.filter(p =>
      p.title.includes(textoAFiltrar)
    );

    this.setState({
      peliculas: peliculas,
      series: series
    });
  }

  render() {
    return (
      <div className="container">

        

        <h2>Películas</h2>
        <ul>
          {this.state.peliculas.length === 0 ?
            <p>No se encontraron películas</p>
            : this.state.peliculas.map((pelicula) => (
              <UnElemento
                key={pelicula.id}
                id={pelicula.id}
                foto={pelicula.poster_path}
                nombre={pelicula.title}
                descripcion={pelicula.overview}
              />
            ))}
        </ul>

        <h2>Series</h2>
        <ul>
          {this.state.series.length === 0 ?
            <p>No se encontraron series</p>
            : this.state.series.map((serie) => (
              <UnElemento
                key={serie.id}
                id={serie.id}
                foto={serie.poster_path}
                nombre={serie.title}
                descripcion={serie.overview}
              />
            ))}
        </ul>

      </div>
    );
  }
}

export default Home;

