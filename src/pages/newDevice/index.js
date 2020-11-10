import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import imgLogo from "../../assets/lamp.png";
import api from "../../services/api";

import "./styles.css";

export default function NewDevice() {
  const [deviceName, setDeviceName] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [deviceMacId, setDeviceMacId] = useState("");
  const [deviceLocation, setDeviceLocation] = useState("");

  const jwtToken = localStorage.getItem("jwt");

  const history = useHistory();

  async function handleNewDevice(e) {
    e.preventDefault();

    const data = {
      deviceName,
      deviceModel,
      deviceMacId,
      deviceLocation,
    };

    try {
      const response = await api.post("devices", data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const deviceId = response.data.deviceId;
      alert(`Device inserido com sucesso. ID: ${deviceId}`);
      history.push("/main");
    } catch (error) {
      alert("Erro ao inserir o device. Favor tentar novamente.");
    }
  }

  return (
    <div className="container-device">
      <section className="form">
        <img src={imgLogo} alt="NewDevice" />
        <h1>Novo Device</h1>
        <form onSubmit={handleNewDevice}>
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
