import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";

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
  }

  return (
    <div className="container-listSensor">
      <header>
        <img src={imgLogo} alt="Logo" />
        <span>Olá, {email}.</span>
        <div className="botoes">
          <button type="button" onClick={handleLogout}>
            <FiPower size={18} color="black" />
          </button>
        </div>
      </header>

      <h1>Sensores Cadastrados</h1>
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
