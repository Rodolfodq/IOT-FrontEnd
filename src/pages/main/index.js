import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

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
  return (
    <div className="container-menu">
      <header>
        <img src={imgLogo} alt="Logo" />
        <span>Olá, {email}.</span>
        <div className="botoes">
          <Link to="/newDevice">
            <button type="button" className="card-button">
              Cadastrar novo Device
            </button>
          </Link>
          <button type="button" onClick={handleLogout}>
            <FiPower size={18} color="black" />
          </button>
        </div>
      </header>

      <h1>Devices Cadastrados</h1>
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

            <button type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}