import "./Home.css";
import React, { useEffectEvent } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import UnElemento from "../../components/UnElemento/UnElemento";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

let apiKeyPelis = "62c5658855e15f6ec169432e29e4b6a4";
let apiKeySeries = "62c5658855e15f6ec169432e29e4b6a4"

function Home(props) {
  const [peliculas, setPeliculas] = useState([]);
  const [series, setSeries] = useState([]);
  const [valorInput, setValorInput] = useState("");
  const [tipo, setTipo] = useState("movie");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKeyPelis}`)
      .then(response => response.json())
      .then(data => setPeliculas(data.results))
      .catch(error => console.log('El error fue: ' + error));

    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKeySeries}`)
      .then(response => response.json())
      .then(data => {
        setSeries(data.results)
        setCargando(false)
      })
      .catch(error => console.log('El error fue: ' + error));
  }, [])


  function cambiarTipo(event) {
    setTipo(event.target.value);
  }

  function buscar(event) {
    event.preventDefault();
    if (valorInput === "") return;
    props.history.push(`/search?query=${valorInput}&tipo=${tipo}`);
  }

  function controlarCambios(event) {
    setValorInput(event.target.value);
  }

  if (cargando) return <p>Cargando...</p>;
  return (
    <div className="container">

      <form className="search-form" onSubmit={(e) => buscar(e)}>
        <input
          type="radio"
          name="tipo"
          value="movie"
          checked={tipo === "movie"}
          onChange={(e) => cambiarTipo(e)}
        /> Películas
        <input
          type="radio"
          name="tipo"
          value="tv"
          checked={tipo === "tv"}
          onChange={(e) => cambiarTipo(e)}
        /> Series
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => controlarCambios(e)}
          value={valorInput}
        />
        <button type="submit">Buscar</button>
      </form>

      <h2>Películas</h2>
      <ul>
        {peliculas.length === 0 ?
          <p>No se encontraron películas</p>
          : peliculas.slice(0, 4).map((pelicula) => {
            console.log(pelicula)
            
           return <UnElemento
              key={pelicula.id}
              id={pelicula.id}
              tipo="movie"
              foto={pelicula.poster_path}
              nombre={pelicula.title}
              descripcion={pelicula.overview}
            />
})}
        <Link className="nav-link" to="/movies"><button className="btn btn-secondary">Ver más</button></Link>
      </ul>

      <h2>Series</h2>
      <ul>
        {series.length === 0 ?
          <p>No se encontraron series</p>
          : series.slice(0, 4).map((serie) => (
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

export default Home;

