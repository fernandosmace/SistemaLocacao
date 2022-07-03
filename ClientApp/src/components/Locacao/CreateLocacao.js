import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  DatePicker,
  Form,
  Input,
  Alert,
  Switch,
  InputNumber,
  Row,
  Col,
  Divider,
  Select,
} from "antd";
import { createLocacao } from "../../services/LocacaoService";
import { getCliente, getAllClientes } from "../../services/ClienteService";
import { getFilme, getAllFilmes } from "../../services/FilmeService";
import swal from "sweetalert";
import { MaskedInput } from "antd-mask-input";
import moment from "moment";
const { Title } = Typography;
const { Option } = Select;

export const CreateLocacao = () => {
  const [cliente, setCliente] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [filme, setFilme] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [filmeLancamento, setFilmeLancamento] = useState([]);

  const [CreateLocacaoForm] = Form.useForm();
  useEffect(() => {
    getAllClientes().then((response) => {
      if (response.status !== 200) {
        swal(
          "Ocorreu um erro ao buscar os cliente.",
          "Contate o administrador do sistema.",
          "error"
        );
      } else {
        var json = response.json();
        json.then((clientes) => {
          clientes.map((item) => {
            item.key = item.id;
            item.cpf = item.cpf.replace(
              /(\d{3})(\d{3})(\d{3})(\d{2})/,
              "$1.$2.$3-$4"
            );
            item.dataNascimento = moment(item.dataNascimento).format(
              "DD/MM/YYYY"
            );
            return item;
          });
          setClientes(clientes);
        });
      }
    });

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
  const ResetForm = () => {
    CreateLocacaoForm.resetFields();
  };

  const SetClienteForm = (json) => {
    let cpfFormatted = json.cpf.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );

    CreateLocacaoForm.setFieldsValue({
      nome: json.nome,
      cpf: cpfFormatted,
      dataNascimento: moment(json.dataNascimento),
    });
  };

  const SetFilmeForm = (json) => {
    CreateLocacaoForm.setFieldsValue({
      titulo: json.titulo,
      classificacaoIndicativa: json.classificacaoIndicativa,
    });

    setFilmeLancamento(json.lancamento);
  };

  const handleSwitchChange = () => {
    switch (filmeLancamento) {
      case 0:
        setFilmeLancamento(1);
        break;
      case 1:
        setFilmeLancamento(0);
        break;
      default:
        setFilmeLancamento(1);
        break;
    }
  };
  const handleClientSelect = (idCliente) => {
    getCliente(idCliente).then((response) => {
      let getText = response.text();
      if (response.status !== 200) {
        getText.then((value) => {
          swal("Ocorreu um erro ao buscar o cliente.", value, "error");
        });
      } else {
        getText.then((value) => {
          const json = JSON.parse(value);
          setCliente(json);
          SetClienteForm(json);
        });
      }
    });
  };

  const handleFilmeSelect = (idFilme) => {
    getFilme(idFilme).then((response) => {
      let getText = response.text();
      if (response.status !== 200) {
        getText.then((value) => {
          swal("Ocorreu um erro ao buscar o filme.", value, "error");
        });
      } else {
        getText.then((value) => {
          const json = JSON.parse(value);
          setFilme(json);
          SetFilmeForm(json);
        });
      }
    });
  };

  const onFinish = async (values) => {
    if (cliente.length == 0) {
      swal("Busque um cliente para continuar.", "", "error");
      return;
    }

    if (filme.length == 0) {
      swal("Busque um filme para continuar.", "", "error");
      return;
    }

    var locacao = {
      clienteId: values.clienteId,
      filmeId: values.filmeId,
    };

    createLocacao(locacao).then((response) => {
      if (response.status !== 200) {
        let getError = response.text();

        getError.then((value) => {
          swal("Ocorreu um erro ao cadastrar a locação.", value, "error");
        });
      } else {
        swal("Locação cadastrada com sucesso!", "", "success");
        ResetForm();
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    <Alert
      message={`Erro ao cadastrar a locação! Erro:${errorInfo}`}
      type="error"
    />;
  };

  return (
    <div>
      <Typography>
        <Title>Cadastro de Locações</Title>
      </Typography>

      <Form
        layout={"vertical"}
        form={CreateLocacaoForm}
        name="CreateLocacaoForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Row>
          <Col span={20}>
            <Form.Item
              style={{
                width: "25%",
              }}
              label="Cliente"
              name="clienteId"
              rules={[
                {
                  required: true,
                  message: "O Id do Cliente é obrigatório.",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "O id somente deve conter números.",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                onSelect={handleClientSelect}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {clientes.map((item) => {
                  return (
                    <Option value={item.id}>
                      {item.nome + " (CPF: " + item.cpf + ")"}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              style={{
                width: "25%",
              }}
              label="Filme"
              name="filmeId"
              rules={[
                {
                  required: true,
                  message: "O Id do Filme é obrigatório.",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "O id somente deve conter números.",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                onSelect={handleFilmeSelect}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {filmes.map((item) => {
                  return <Option value={item.id}>{item.titulo}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={10} justify="start">
            <div>
              <Typography>
                <Title level={3}>Cliente</Title>
              </Typography>
              <Form.Item
                style={{
                  width: "90%",
                }}
                label="Nome"
                name="nome"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                style={{
                  width: "33%",
                }}
                label="CPF"
                name="cpf"
              >
                <Input
                  disabled
                  style={{
                    textAlign: "center",
                  }}
                />
              </Form.Item>

              <Form.Item label="Data de Nascimento" name="dataNascimento">
                <DatePicker
                  placeholder=""
                  disabled
                  format={"DD/MM/YYYY"}
                  style={{
                    width: "50%",
                  }}
                />
              </Form.Item>
            </div>
          </Col>
          <Col span={10} justify="center">
            <div>
              <Typography>
                <Title level={3}>Filme</Title>
              </Typography>
              <Form.Item
                style={{
                  width: "90%",
                }}
                label="Título"
                name="titulo"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                style={{
                  width: "30%",
                }}
                label="Classificação Indicativa"
                name="classificacaoIndicativa"
              >
                <InputNumber
                  disabled
                  style={{
                    width: "30%",
                  }}
                  min={1}
                  max={18}
                />
              </Form.Item>

              <Form.Item label="Lançamento" name="lancamento">
                <Switch
                  disabled
                  checked={filmeLancamento}
                  onChange={handleSwitchChange}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateLocacao;
