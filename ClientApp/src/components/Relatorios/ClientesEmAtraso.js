import React, { useState, useEffect } from "react";
import { Table, Space } from "antd";
import { Link } from "react-router-dom";
import { getLocacoesAtrasadas } from "../../services/RelatoriosService";
import { EyeTwoTone } from "@ant-design/icons";
import swal from "sweetalert";
import moment from "moment";

const ClientesEmAtraso = () => {
  const [locacoes, setLocacoes] = useState([]);

  useEffect(() => {
    getLocacoesAtrasadas().then((response) => {
      if (response.status !== 200) {
        swal(
          "Ocorreu um erro ao buscar os cliente.",
          "Contate o administrador do sistema.",
          "error"
        );
      } else {
        var json = response.json();
        json.then((locacoes) => {
          locacoes.map((item) => {
            item.key = item.id;
            item.idLocacao = item.id;
            item.cliente = item.cliente.nome;
            item.filme = item.filme.titulo;
            item.diasDeAtraso = item.diasDeAtraso;
            item.dataLocacao = moment(item.dataLocacao).format("DD/MM/YYYY");
            return item;
          });
          console.log(locacoes);
          setLocacoes(locacoes);
        });
      }
    });
  });

  const columns = [
    {
      title: "Id Locação",
      dataIndex: "idLocacao",
      key: "idLocacao",
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
    },
    {
      title: "Filme",
      dataIndex: "filme",
      key: "filme",
    },
    {
      title: "Data da Locação",
      dataIndex: "dataLocacao",
      key: "dataLocacao",
    },
    {
      title: "Dias de atraso",
      dataIndex: "diasDeAtraso",
      key: "diasDeAtraso",
      sorter: (a, b) => a.diasDeAtraso > b.diasDeAtraso,
      sortOrder: (a, b) => a.diasDeAtraso > b.diasDeAtraso,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/update-locacao/${record.id}`}>
            <EyeTwoTone style={{ fontSize: "1.5em" }} />
          </Link>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={locacoes} pagination={false} />;
};

export default ClientesEmAtraso;
