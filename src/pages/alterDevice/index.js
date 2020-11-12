import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import imgLogo from "../../assets/lamp.png";
import api from "../../services/api";

import "./styles.css";

export default function AlterDevice() {
  const [deviceName, setDeviceName] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [deviceMacId, setDeviceMacId] = useState("");
  const [deviceLocation, setDeviceLocation] = useState("");

  const jwtToken = localStorage.getItem("jwt");
  const deviceId = localStorage.getItem("deviceId");

  const history = useHistory();

  async function handleAlterDevice(e) {
    e.preventDefault();

    const data = {
      deviceName,
      deviceModel,
      deviceMacId,
      deviceLocation,
    };

    try {
      await api.put(`devices/${deviceId}`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      alert(`Device alterado com sucesso. ID: ${deviceId}`);
      history.push("/main");
    } catch (error) {
      alert("Erro ao alterar o device. Favor tente novamente.");
    }
  }

  return (
    <div className="container-device">
      <section className="form">
        <img src={imgLogo} alt="NewDevice" />
        <h1>Alterar Device ID: {deviceId}</h1>
        <form onSubmit={handleAlterDevice}>
          <input
            type="text"
            placeholder="Nome"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Modelo"
            value={deviceModel}
            onChange={(e) => setDeviceModel(e.target.value)}
          />
          <input
            type="text"
            placeholder="MAC-ID"
            value={deviceMacId}
            onChange={(e) => setDeviceMacId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Localização"
            value={deviceLocation}
            onChange={(e) => setDeviceLocation(e.target.value)}
          />

          <button className="button" type="submit">
            Confirmar
          </button>
          <Link to="/main">
            <button className="button" type="reset">
              Cancelar
            </button>
          </Link>
        </form>
      </section>
    </div>
  );
}
