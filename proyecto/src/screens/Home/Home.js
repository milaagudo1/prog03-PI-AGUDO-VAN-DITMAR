import "./Home.css";
import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import UnElemento from "../../components/UnElemento/UnElemento";
import { Link } from "react-router-dom";

let apiKeyPelis = "62c5658855e15f6ec169432e29e4b6a4";
let apiKeySeries = "62c5658855e15f6ec169432e29e4b6a4"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      series: [],
      valorInput: '',
      tipo: "movie",
      cargando: true
    };
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKeyPelis}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          peliculas: data.results
        });
      })
      .catch(error => console.log('El error fue: ' + error));

    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKeySeries}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          series: data.results,
          cargando: false
        });
      })
      .catch(error => console.log('El error fue: ' + error));
  }

  cambiarTipo(event) {
    this.setState({ tipo: event.target.value });
  }
  buscar(event) {
    event.preventDefault();
    if (this.state.valorInput === "") return;
    this.props.history.push(`/search?query=${this.state.valorInput}&tipo=${this.state.tipo}`);
  }

  controlarCambios(event) {
    this.setState({ valorInput: event.target.value });
  }

  render() {
    if (this.state.cargando) return <p>Cargando...</p>;
    return (
      <div className="container">

        <form className="search-form" onSubmit={(e) => this.buscar(e)}>
          <input
            type="radio"
            name="tipo"
            value="movie"
            checked={this.state.tipo === "movie"}
            onChange={(e) => this.cambiarTipo(e)}
          /> Películas
          <input
            type="radio"
            name="tipo"
            value="tv"
            checked={this.state.tipo === "tv"}
            onChange={(e) => this.cambiarTipo(e)}
          /> Series
          <input
            type="text"
            placeholder="Buscar..."
            onChange={(e) => this.controlarCambios(e)}
            value={this.state.valorInput}
          />
          <button type="submit">Buscar</button>
        </form>

        <h2>Películas</h2>
        <ul>
          {this.state.peliculas.length === 0 ?
            <p>No se encontraron películas</p>
            : this.state.peliculas.slice(0, 4).map((pelicula) => (
              <UnElemento
                key={pelicula.id}
                id={pelicula.id}
                tipo="movie"
                foto={pelicula.poster_path}
                nombre={pelicula.title}
                descripcion={pelicula.overview}
              />
            ))}
            <Link className="nav-link" to="/movies"><button className="btn btn-secondary">Ver más</button></Link>
        </ul>

        <h2>Series</h2>
        <ul>
          {this.state.series.length === 0 ?
            <p>No se encontraron series</p>
            : this.state.series.slice(0, 4).map((serie) => (
              <UnElemento
                key={serie.id}
                id={serie.id}
                tipo="tv"
                foto={serie.poster_path}
                nombre={serie.title}
                descripcion={serie.overview}
              />
            ))}
            <Link className="nav-link" to="/series"><button className="btn btn-secondary">Ver más</button></Link>
      
        </ul>
      </div>
    );
  }
}

export default Home;

