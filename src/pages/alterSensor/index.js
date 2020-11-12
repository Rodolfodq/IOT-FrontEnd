import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import imgLogo from "../../assets/lamp.png";
import api from "../../services/api";

import "./styles.css";

export default function AlterSensor() {
  const [sensorName, setSensorName] = useState("");
  const [sensorModel, setSensorModel] = useState("");
  const [sensorFunction, setSensorFunction] = useState("");

  const jwtToken = localStorage.getItem("jwt");
  const deviceId = localStorage.getItem("deviceId");
  const sensorId = localStorage.getItem("sensorId");
  const sensorToken = localStorage.getItem("sensorToken");

  const history = useHistory();

  async function handleAlterSensor(e) {
    e.preventDefault();

    const data = {
      sensorName,
      sensorModel,
      sensorFunction,
      deviceId,
      sensorToken,
    };

    try {
      await api.put(`sensor/${sensorId}`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      alert(`Sensor alterado com sucesso.`);
      history.push("/listSensor");
    } catch (error) {
      alert("Erro ao alterar o sensor. Favor tente novamente.");
    }
  }

  return (
    <div className="container-sensor">
      <section className="form">
        <img src={imgLogo} alt="NewSensor" />
        <h1>Alterar Sensor ID: {sensorId}</h1>
        <form onSubmit={handleAlterSensor}>
          <input
            type="text"
            placeholder="Nome"
            value={sensorName}
            onChange={(e) => setSensorName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Modelo Sensor"
            value={sensorModel}
            onChange={(e) => setSensorModel(e.target.value)}
          />
          <input
            type="text"
            placeholder="Função"
            value={sensorFunction}
            onChange={(e) => setSensorFunction(e.target.value)}
          />

          <button className="button" type="submit">
            Confirmar
          </button>
          <Link to="/listSensor">
            <button className="button" type="reset">
              Cancelar
            </button>
          </Link>
        </form>
      </section>
    </div>
  );
}
