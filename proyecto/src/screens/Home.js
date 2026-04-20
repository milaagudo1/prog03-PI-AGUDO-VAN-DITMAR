import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css"; 
import React from "react";
import UnElemento from "../components/UnElemento.js";

let apiKeyPelis = "62c5658855e15f6ec169432e29e4b6a4";
let apiKeySeries = "62c5658855e15f6ec169432e29e4b6a4&page=1"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      series: [],
      peliculasBack: [],
      seriesBack: [],
      valorInput: ''
    };
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKeyPelis}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          peliculas: data.results,
          peliculasBack: data.results
        });
      });

    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKeySeries}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          series: data.results,
          seriesBack: data.results
        });
      })
      .catch(error => console.log('El error fue: ' + error));
  }

  evitarSumbit(event) {
    event.preventDefault();
  }

  controlarCambios(event) {
    this.setState({ valorInput: event.target.value },
      () => this.filtrarPeliculas(event.target.value),
    );
  }

  filtrarPeliculas(textoAFiltrar) {
    let peliculas = this.state.peliculasBack.filter(p =>
      p.title.toLowerCase().includes(textoAFiltrar.toLowerCase()));

    let series = this.state.seriesBack.filter(p =>
      p.name.toLowerCase().includes(textoAFiltrar.toLowerCase()));

    this.setState({peliculas, series});
  }

  render() {
    return (
      <div className="container">

        <form className="search-form" onSubmit={(e) => this.evitarSubmit(e)}>
          <input
            type="text"
            placeholder="Filtrar por nombre..."
            onChange={(e) => this.controlarCambios(e)}
            value={this.state.valorInput}
          />
        </form>

        <h2>Películas</h2>
        <ul>
          {this.state.peliculas.length === 0 ?
            <p>No se encontraron películas</p>
            : this.state.peliculas.map((pelicula) => (
              <UnElemento
                key={pelicula.id}
                id={pelicula.id}
                 tipo="movie" 
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
                  tipo="tv"   
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

