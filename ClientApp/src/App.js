import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { Layout } from "./components/Layout";
import "./custom.css";
import { Clientes } from "./components/Cliente/Clientes";
import { CreateCliente } from "./components/Cliente/CreateCliente";
import { UpdateCliente } from "./components/Cliente/UpdateCliente";
import { Filmes } from "./components/Filme/Filmes";
import { CreateFilme } from "./components/Filme/CreateFilme";
import { UpdateFilme } from "./components/Filme/UpdateFilme";
import { Locacoes } from "./components/Locacao/Locacoes";
import { CreateLocacao } from "./components/Locacao/CreateLocacao";
import { UpdateLocacao } from "./components/Locacao/UpdateLocacao";

const App = () => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;
