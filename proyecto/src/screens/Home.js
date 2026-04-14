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
      peliculasPopulares: [],
      peliculasCartelera: [],
      peliculasCarteleraBack: [],
      peliculasPopularesBack: [],
      valorInput: ''
    }
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          peliculasPopulares: data.results,
          peliculasPopularesBack: data.results
        });
      })
      .catch(error => console.log('El error fue: ' + error));

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          peliculasCartelera: data.results,
          peliculasCarteleraBack: data.results
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
    let peliPopularFiltradas = this.state.peliculasPopularesBack.filter(pelicula =>
      pelicula.title.toLowerCase().includes(textoAFiltrar.toLowerCase()));

    let peliCarteleraFiltradas = this.state.peliculasCarteleraBack.filter(pelicula =>
      pelicula.title.toLowerCase().includes(textoAFiltrar.toLowerCase()));

    this.setState({
      peliculasPopulares: peliPopularFiltradas,
      peliculasCartelera: peliCarteleraFiltradas
    })

  }

  render() {
    console.log(this.state.peliculasPopulares);
    return (
      <div className="container">

        <form className="search-form" onSubmit={(e) => this.evitarSubmit(e)}>
          <input
            type="text"
            placeholder="Filtrar películas por nombre..."
            onChange={(e) => this.controlarCambios(e)}
            value={this.state.valorInput}
          />
        </form>

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
    )
  }
}



export default Home;

