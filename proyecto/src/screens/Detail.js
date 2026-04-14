import React, { Component } from 'react'

export default class Detail extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>Detalle del personaje con id: {this.props.match.params.personajeId}</div>
    )
  }
}

 /* Falta completar
 Usar usestate para pelucilas de la API + loeader True*/
