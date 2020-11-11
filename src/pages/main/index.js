import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import imgLogo from "../../assets/lamp.png";

import "./styles.css";
import api from "../../services/api";

export default function MainMenu() {
  const [devices, setDevices] = useState([]);
  const email = localStorage.getItem("email");
  const jwtToken = localStorage.getItem("jwt");
  const history = useHistory();

  useEffect(() => {
    api
      .get("devices", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setDevices(response.data);
      });
  }, [email]);

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  async function handleDeleteDeviceId(deviceId) {
    try {
      api.delete(`devices/${deviceId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setDevices(devices.filter((devices) => devices.deviceId !== deviceId));
    } catch (error) {
      alert("Erro ao deletar device. Tente novamente.");
    }
  }

  function handleGetDeviceId(id) {
    localStorage.setItem("deviceId", id);
  }

  function handleAlterDeviceId(id){
    localStorage.setItem("deviceId", id);
    history.push("/alterDevice");
  }

  return (
    <div className="container-menu">
      <header>
        <img src={imgLogo} alt="Logo" />
        <span>Olá, {email}.</span>
        <div className="botoes">
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <h1>Devices Cadastrados: {devices.length}</h1>
      <Link to="/newDevice">
        <button className="button-menu">Adicionar Device</button>
      </Link>
      <ul>
        {devices.map((device) => (
          <li key={device.deviceId}>
            <strong>Nome Device:</strong>
            <p>{device.deviceName}</p>

            <strong>Modelo:</strong>
            <p>{device.deviceModel}</p>

            <strong>Mac-Id:</strong>
            <p>{device.deviceMacId}</p>

            <strong>Localização:</strong>
            <p>{device.deviceLocation}</p>

            
            <button
              className="button"
              onClick={() => handleAlterDeviceId(device.deviceId)}
            >
              Alterar Device
            </button>
            <button
              className="button"
              onClick={() => handleDeleteDeviceId(device.deviceId)}
            >
              Remover Device
            </button>

            <Link to="/newSensor">
              <button
                className="button"
                onClick={() => handleGetDeviceId(device.deviceId)}
              >
                Adicionar Sensor
              </button>
            </Link>
            <Link to="/listSensor">
              <button
                className="button"
                onClick={() => handleGetDeviceId(device.deviceId)}
              >
                Lista de Sensores
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
