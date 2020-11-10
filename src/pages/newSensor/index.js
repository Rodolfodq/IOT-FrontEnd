import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import imgLogo from "../../assets/lamp.png";
import api from "../../services/api";

import "./styles.css";

export default function NewSensor() {
  const [sensorName, setSensorName] = useState("");
  const [sensorModel, setSensorModel] = useState("");
  const [sensorFunction, setSensorFunction] = useState("");

  const jwtToken = localStorage.getItem("jwt");
  const deviceId = localStorage.getItem("deviceId");

  const history = useHistory();

  async function handleNewSensor(e) {
    e.preventDefault();

    const data = {
      sensorName,
      sensorModel,
      sensorFunction,
      deviceId,
    };

    try {
      const response = await api.post("sensor", data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const sensorId = response.data.deviceId;
      const sensorToken = response.data.sensorToken;
      alert(
        `Sensor inserido com sucesso. Sensor Token: ${sensorToken}. Sensor ID: ${sensorId}`
      );
      history.push("/listSensor");
    } catch (error) {
      alert("Erro ao inserir o sensor. Favor tentar novamente.");
    }
  }

  return (
    <div className="container-sensor">
      <section className="form">
        <img src={imgLogo} alt="NewSensor" />
        <h1>Novo Sensor</h1>
        <form onSubmit={handleNewSensor}>
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
