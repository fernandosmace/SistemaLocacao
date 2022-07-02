import React from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./Header.css";
import { PageHeader, Button } from "antd";
const Header = () => (
  <PageHeader
    className="site-page-header"
    title="Sistema Locação"
    subTitle="Gestão de locações de filmes"
    extra={[
      <Button key="4">
        <Link to="/filmes">Filmes</Link>
      </Button>,
      <Button key="3">
        <Link to="/clientes">Clientes</Link>
      </Button>,
      <Button key="2">
        <Link to="/relatorios">Relatórios</Link>
      </Button>,
      <Button key="1" type="primary">
        <Link to="/locacoes">Locações</Link>
      </Button>,
    ]}
  />
);

export default Header;
