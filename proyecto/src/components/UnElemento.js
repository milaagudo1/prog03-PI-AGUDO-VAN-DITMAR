import React from "react";

class UnElemento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        foto: props.foto,
        nombre: props.nombre,
        descripcion: props.descripcion,
        verDescripcion: false
        // agregar los que faltan, favorito, ver mas 

    }
  }

  


  render() {
    return (
      <div className="container"> 
        <img src={`https://image.tmdb.org/t/p/w500/${this.state.foto}`} alt={this.state.nombre} />
        <h3>{this.state.nombre}</h3>
        <p> {this.state.verDescripcion ? this.state.descripcion : ''}</p>
        <button className="btn btn-primary" onClick={() => this.setState({verDescripcion: !this.state.verDescripcion})}>
          {this.state.verDescripcion ? 'Ocultar descripción' : 'Ver descripción'}
        </button>
      </div>
    )
  }
}



export default UnElemento;