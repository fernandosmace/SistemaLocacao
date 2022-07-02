import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Form,
  Input,
  Alert,
  Switch,
  InputNumber,
} from "antd";
import { createFilme } from "../../services/FilmeService";
import swal from "sweetalert";
const { Title } = Typography;

export const CreateFilme = () => {
  const [filmeLancamento, setFilmeLancamento] = useState([]);

  const [CreateFilmeForm] = Form.useForm();

  const ResetForm = () => {
    CreateFilmeForm.resetFields();
  };

  useEffect(() => {
    setFilmeLancamento(1);
  }, []);

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

  const onFinish = async (values) => {
    var filme = {
      titulo: values.titulo,
      classificacaoIndicativa: values.classificacaoIndicativa,
      lancamento: filmeLancamento,
    };

    createFilme(filme).then((response) => {
      if (response.status !== 200) {
        let getError = response.text();

        getError.then((value) => {
          swal("Ocorreu um erro ao cadastrar o filme.", value, "error");
        });
      } else {
        swal("Filme cadastrado com sucesso!", "", "success");
        ResetForm();
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    <Alert
      message={`Erro ao cadastrar o filme! Erro:${errorInfo}`}
      type="error"
    />;
  };

  return (
    <div>
      <Typography>
        <Title>Cadastro de Filme</Title>
      </Typography>
      <Form
        form={CreateFilmeForm}
        name="CreateFilmeForm"
        layout="vertical"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="Título"
          name="titulo"
          rules={[
            {
              required: true,
              message: "Informe o título do Filme.",
            },
            {
              max: 100,
              message: "O título deve conter até 100 caracteres.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Classificação Indicativa"
          name="classificacaoIndicativa"
          rules={[
            {
              required: true,
              message: "Informe a classificação indicativa do filme.",
            },
            {
              pattern: /^[0-9]+$/,
              message:
                "A classificação indicativa deve conter somente números.",
            },
          ]}
        >
          <InputNumber min={1} max={18} />
        </Form.Item>

        <Form.Item label="Lançamento" name="lancamento">
          <Switch checked={filmeLancamento} onChange={handleSwitchChange} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateFilme;
