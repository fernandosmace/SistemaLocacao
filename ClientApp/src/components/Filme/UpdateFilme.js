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
import { getFilme, updateFilme } from "../../services/FilmeService";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
const { Title } = Typography;

export const UpdateFilme = () => {
  const [filmeLancamento, setFilmeLancamento] = useState([]);

  const [UpdateFilmeForm] = Form.useForm();

  const SetForm = (json) => {
    UpdateFilmeForm.setFieldsValue({
      id: json.id,
      titulo: json.titulo,
      classificacaoIndicativa: json.classificacaoIndicativa,
    });

    setFilmeLancamento(json.lancamento);
  };

  const { id } = useParams();
  let idFilme = id;

  useEffect(() => {
    getFilme(idFilme).then((response) => {
      let getText = response.text();
      if (response.status !== 200) {
        getText.then((value) => {
          swal("Ocorreu um erro ao buscar o filme.", value, "error");
        });
      } else {
        getText.then((value) => {
          const json = JSON.parse(value);
          SetForm(json);
        });
      }
    });
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
      id: values.id,
      titulo: values.titulo,
      classificacaoIndicativa: values.classificacaoIndicativa,
      lancamento: filmeLancamento,
    };
    filme.lancamento = filme.lancamento.toString();
    console.log(filme);

    updateFilme(filme).then((response) => {
      if (response.status !== 200) {
        let getError = response.text();

        getError.then((value) => {
          swal("Ocorreu um erro ao atualizar o filme.", value, "error");
        });
      } else {
        swal("Filme atualizado com sucesso!", "", "success");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    <Alert
      message={`Erro ao atualizar o filme! Erro:${errorInfo}`}
      type="error"
    />;
  };

  return (
    <div>
      <Typography>
        <Title>Atualiza????o de Filme</Title>
      </Typography>
      <Form
        form={UpdateFilmeForm}
        name="UpdateFilmeForm"
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
          style={{
            width: "10%",
          }}
          label="Id"
          name="id"
          rules={[
            {
              required: true,
              message: "O Id ?? obrigat??rio.",
            },
            {
              pattern: /^[0-9]+$/,
              message: "O id somente deve conter n??meros.",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="T??tulo"
          name="titulo"
          rules={[
            {
              required: true,
              message: "Informe o t??tulo do Filme.",
            },
            {
              max: 100,
              message: "O t??tulo deve conter at?? 100 caracteres.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Classifica????o Indicativa"
          name="classificacaoIndicativa"
          rules={[
            {
              required: true,
              message: "Informe a classifica????o indicativa do filme.",
            },
            {
              pattern: /^[0-9]+$/,
              message:
                "A classifica????o indicativa deve conter somente n??meros.",
            },
          ]}
        >
          <InputNumber min={1} max={18} />
        </Form.Item>

        <Form.Item label="Lan??amento" name="lancamento">
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

export default UpdateFilme;
