import React from "react";
import "../styles/Styles.css";
import { Link } from "react-router-dom";
import "./UnElemento.css";

class UnElemento extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foto: props.foto,
            nombre: props.nombre,
            descripcion: props.descripcion,
            verDescripcion: false,
            esFavorito: false

        }
    }

   
    componentDidMount() {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        let esFavorito = favoritos.some(favorito => favorito.id === this.props.id);
        this.setState({ esFavorito });
    }

    Favorito() {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        if (this.state.esFavorito) {
            favoritos = favoritos.filter(favorito => favorito.id !== this.props.id);
        } else {
            favoritos.push(this.props.id);
        }
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        this.setState({ esFavorito: !this.state.esFavorito });
    }
    
  
    render() {
        let haySesion = sessionStorage.getItem('usuario')
        return (
            <div className="card">
                <img src={`https://image.tmdb.org/t/p/w500/${this.state.foto}`} alt={this.state.nombre} />
                <h3>{this.state.nombre}</h3>
                <p> {this.state.verDescripcion ? this.state.descripcion : ''}</p>
                <button className="btn btn-primary" onClick={() => this.setState({ verDescripcion: !this.state.verDescripcion })}>
                    {this.state.verDescripcion ? 'Ocultar descripción' : 'Ver descripción'}
                </button>
                <Link to={`/detail/${this.props.tipo}/${this.props.id}`}><button className="btn btn-secondary">Ver detalle</button></Link>
                {haySesion ? (
                    <button className="btn btn-warning" onClick={() => this.Favorito()}>
                        {this.state.esFavorito ? " Quitar de favoritos" : " Agregar a favoritos"}</button>) : null}
            </div>
        )
    }
}



export default UnElemento;






