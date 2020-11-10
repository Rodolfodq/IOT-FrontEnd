import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import imgLogo from "../../assets/lamp.png";

import "./styles.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      email,
      password,
      confirmPassword,
    };

    console.log(data);

    try {
      const response = await api.post("authorize/register", data);
      console.log(response);
      alert(
        "Usuário cadastrado com sucesso! Faça o login para acessar o sistema."
      );
      history.push("/");
    } catch (error) {
      alert(
        "Falha no cadastro do usuário, tente novamente. Utilize caracteres especiais, números, letras maisculas e minúsculas."
      );
    }
  }
  return (
    <div className="container-register">
      <section className="form">
        <img src={imgLogo} alt="Registrar" />
        <h1>Registre-se</h1>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            minLength="6"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            minLength="6"
            required
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Registrar
          </button>
          <Link to="/">
            <button className="button" type="reset">
              Cancelar
            </button>
          </Link>
        </form>
      </section>
    </div>
  );
}
