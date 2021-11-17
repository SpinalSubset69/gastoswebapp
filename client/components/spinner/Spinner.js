import React from 'react'
import { hot } from 'react-hot-loader';
import spinnerImg from './../../assets/icons/cargando.png'
import './spinner.css'

const Spinner = ({ message }) =>{
    return (
        <div className="spinnerWrapper">
        <img
          className="spinner"
          src={spinnerImg}
          alt=""
        />
        <h1>{ message }...</h1>
      </div>
    )
}

export default hot(module)(Spinner);