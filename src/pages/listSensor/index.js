import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import imgLogo from "../../assets/lamp.png";

import "./styles.css";
import api from "../../services/api";

export default function ListSensor() {
  const [sensors, setSensors] = useState([]);
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwt");
  const deviceId = localStorage.getItem("deviceId");
  const history = useHistory();

  useEffect(() => {
    api
      .get(`sensor/deviceidsensor/${deviceId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setSensors(response.data);
      });
  }, [email]);

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  function handleGetSensorId(id) {
    localStorage.setItem("sensorId", id);
    handleDeleteSensor(id);
  }

  async function handleDeleteSensor(sensorId) {
    try {
      api.delete(`sensor/${sensorId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setSensors(sensors.filter((sensors) => sensors.sensorId !== sensorId));
    } catch (error) {
      alert("Erro ao deletar sensor. Tente novamente.");
    }
  }

  function handleAlterSensor(sensorId, sensorToken){
    localStorage.setItem("sensorId", sensorId);
    localStorage.setItem("sensorToken", sensorToken);
    history.push("/alterSensor");
  }

  return (
    <div className="container-listSensor">
      <header>
        <Link to="/main">
          <img src={imgLogo} alt="Logo" />
        </Link>
        <span>Olá, {email}.</span>
        <div className="botoes">
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

  <h1>Sensores Cadastrados: {sensors.length}</h1>
      <Link to="/newSensor">
        <button className="button-menu">Adicionar Sensor</button>
      </Link>
      <ul>
        {sensors.map((sensor) => (
          <li key={sensor.sensorId}>
            <strong>Nome Sensor:</strong>
            <p>{sensor.sensorName}</p>

            <strong>Modelo:</strong>
            <p>{sensor.sensorModel}</p>

            <strong>Função:</strong>
            <p>{sensor.sensorFunction}</p>

            <strong>Token Sensor:</strong>
            <p>{sensor.sensorToken}</p>

            <button
              className="button"
              onClick={() => handleAlterSensor(sensor.sensorId, sensor.sensorToken)}
            >
              Alterar Sensor
            </button>

            <button
              className="button"
              onClick={() => handleGetSensorId(sensor.sensorId)}
            >
              Remover Sensor
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
