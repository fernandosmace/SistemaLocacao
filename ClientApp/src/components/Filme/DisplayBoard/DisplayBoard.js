import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Space, Table, Button } from "antd";
import { getAllFilmes, deleteFilme } from "../../../services/FilmeService";
import swal from "sweetalert";
import moment from "moment";

export const DisplayBoard = () => {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    getAllFilmes().then((response) => {
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
            item.lancamento = item.lancamento == 1 ? "Sim" : "Não";
            return item;
          });
          setFilmes(filmes);
        });
      }
    });
  });

  const deleteFilmeHandler = (idFilme) => {
    swal("Tem certeza que deseja excluir este filme?", {
      buttons: {
        cancel: "Não",
        confirm: {
          text: "Sim",
          value: 1,
        },
      },
    }).then((value) => {
      switch (value) {
        case 1:
          deleteFilme(idFilme).then((response) => {
            if (response.status !== 200) {
              let getError = response.text();

              getError.then((value) => {
                swal("Ocorreu um erro ao excluir o filme.", value, "error");
              });
            } else {
              swal("Filme excluído com sucesso!", "", "success");
            }
          });
          break;

        default:
          break;
      }
    });
  };

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
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="default" href={`/update-filme/${record.id}`}>
            Atualizar
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => deleteFilmeHandler(record.id)}
          >
            Excluir
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={filmes} pagination={false} />;
};

export default DisplayBoard;
