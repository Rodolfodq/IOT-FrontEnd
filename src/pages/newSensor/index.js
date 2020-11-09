import React from "react";
import { Link } from "react-router-dom";

//import imgLogo from "../../assets/ilustrador-da-adobe.svg";
import imgLogo from "../../assets/lamp.png";

import "./styles.css";

export default function NewSensor() {
  return (
    <div className="container-sensor">
      <section className="form">
        <img src={imgLogo} alt="NewSensor" />
        <h1>Novo Sensor</h1>
        <form>
          <input type="text" placeholder="Nome" />
          <input type="text" placeholder="Função" />

          <button className="button" type="submit">
            Confirmar
          </button>
          <button className="button" type="reset">
            Limpar
          </button>
          <Link to="main">
            <button className="button" type="reset">
              Cancelar
            </button>
          </Link>
        </form>
      </section>
    </div>
  );
}
