import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";
import UnElemento from "../components/UnElemento.js";

let apiKey = "62c5658855e15f6ec169432e29e4b6a4";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        peliculasPopulares: [],

    }
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ peliculasPopulares: data.results });
      })
      .catch(error=>console.log('El error fue: ' + error));

  }


  render() {
    console.log(this.state.peliculasPopulares);
    return (
      <div className="container"> 
      <h2>Películas populares</h2>
      <ul>
        {this.state.peliculasPopulares.map((pelicula) => (
          <UnElemento 
            key={pelicula.id} 
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

// hacer lo mismo para otra seccion mas 
//agregar un boton q sea un link que me lleve a la seccion correspondiente