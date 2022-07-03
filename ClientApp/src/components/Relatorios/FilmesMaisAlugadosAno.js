import React, { useState, useEffect } from "react";
import { Table, Space } from "antd";
import { Link } from "react-router-dom";
import { getFilmesMaisAlugadosAno } from "../../services/RelatoriosService";
import { EyeTwoTone } from "@ant-design/icons";
import swal from "sweetalert";

const FilmesMaisAlugadosAno = () => {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    getFilmesMaisAlugadosAno().then((response) => {
      if (response.status !== 200) {
        swal(
          "Ocorreu um erro ao buscar os filmes.",
          "Contate o administrador do sistema.",
          "error"
        );
      } else {
        var json = response.json();
        json.then((filmes) => {
          filmes.map((item) => {
            item.key = item.id;
            item.lancamento = item.lancamento === 1 ? "Sim" : "Não";
            return item;
          });
          setFilmes(filmes);
        });
      }
    });
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Titulo",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Classificação Indicativa",
      dataIndex: "classificacaoIndicativa",
      key: "classificacaoIndicativa",
    },
    {
      title: "Lançamento",
      dataIndex: "lancamento",
      key: "lancamento",
    },
    {
      title: "Quantidade de Locações",
      dataIndex: "quantidadeDeLocacoes",
      key: "quantidadeDeLocacoes",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/update-filme/${record.id}`}>
            <EyeTwoTone style={{ fontSize: "1.5em" }} />
          </Link>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={filmes} pagination={false} />;
};

export default FilmesMaisAlugadosAno;
