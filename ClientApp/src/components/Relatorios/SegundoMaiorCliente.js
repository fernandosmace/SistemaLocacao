import React, { useState, useEffect } from "react";
import { Table, Space } from "antd";
import { Link } from "react-router-dom";
import { getSegundoMaiorCliente } from "../../services/RelatoriosService";
import { EyeTwoTone } from "@ant-design/icons";
import swal from "sweetalert";
import moment from "moment";

const SegundoMaiorCliente = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getSegundoMaiorCliente().then((response) => {
      if (response.status !== 200) {
        swal(
          "Ocorreu um erro ao buscar os cliente.",
          "Contate o administrador do sistema.",
          "error"
        );
      } else {
        var json = response.json();
        json.then((cliente) => {
          let clientes = [];
          clientes.push(cliente);
          clientes.map((item) => {
            item.key = item.id;
            item.id = item.id;
            item.cpf = item.cpf.replace(
              /(\d{3})(\d{3})(\d{3})(\d{2})/,
              "$1.$2.$3-$4"
            );
            item.dataNascimento = moment(item.dataNascimento).format(
              "DD/MM/YYYY"
            );
            item.quantidadeDeLocacoes = item.quantidadeDeLocacoes;
            return item;
          });
          setClientes(clientes);
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
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "Data de Nascimento",
      dataIndex: "dataNascimento",
      key: "dataDeNascimento",
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
          <Link to={`/update-cliente/${record.id}`}>
            <EyeTwoTone style={{ fontSize: "1.5em" }} />
          </Link>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={clientes} pagination={false} />;
};

export default SegundoMaiorCliente;
