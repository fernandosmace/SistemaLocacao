import React, { useState } from "react";
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
} from "antd";
import { createLocacao } from "../../services/LocacaoService";
import { getCliente } from "../../services/ClienteService";
import { getFilme } from "../../services/FilmeService";
import swal from "sweetalert";
import { MaskedInput } from "antd-mask-input";
import moment from "moment";
const { Title } = Typography;
const { Search } = Input;

export const CreateLocacao = () => {
  const [cliente, setCliente] = useState([]);
  const [filme, setFilme] = useState([]);
  const [filmeLancamento, setFilmeLancamento] = useState([]);

  const [CreateLocacaoForm] = Form.useForm();

  const ResetForm = () => {
    CreateLocacaoForm.resetFields();
  };

  const SetClienteForm = (json) => {
    CreateLocacaoForm.setFieldsValue({
      nome: json.nome,
      cpf: json.cpf,
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

  const clienteSearchHandler = (idCliente) => {
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

  const filmeSearchHandler = (idFilme) => {
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
              label="Id Cliente"
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
              <Search
                enterButton="Buscar Cliente"
                onSearch={clienteSearchHandler}
              />
            </Form.Item>
            <Form.Item
              style={{
                width: "25%",
              }}
              label="Id Filme"
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
              <Search
                enterButton="Buscar Filme"
                onSearch={filmeSearchHandler}
              />
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
                <MaskedInput
                  disabled
                  style={{
                    textAlign: "center",
                  }}
                  mask={"000.000.000-00"}
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
