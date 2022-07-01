import React from "react";
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
        <a href="/filmes">Filmes</a>
      </Button>,
      <Button key="3">
        <a href="/clientes">Clientes</a>
      </Button>,
      <Button key="2">
        <a href="/relatorios">Relatórios</a>
      </Button>,
      <Button key="1" type="primary">
        <a href="/locacaoes">Locações</a>
      </Button>,
    ]}
  />
);

export default Header;
