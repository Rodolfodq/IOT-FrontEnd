import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import imgLogo from "../../assets/lamp.png";

import "./styles.css";

export default function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    const confirmPassword = password;

    const data = {
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await api.post("authorize/login", data);
      const token = response.data.token;
      localStorage.setItem("jwt", token);
      localStorage.setItem("email", email);
      history.push("/main");
    } catch (error) {
      alert("Falha na autenticação, tente novamente.");
    }
  }

  return (
    <div className="container-login">
      <section className="form">
        <img src={imgLogo} alt="Logon" />
        <h1>Faça seu logon</h1>
        <form onSubmit={handleLogon}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link to="/register">
            <button className="button" type="submit">
              Cadastre-se
            </button>
          </Link>
        </form>
      </section>
    </div>
  );
}
