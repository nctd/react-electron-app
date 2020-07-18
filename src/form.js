import React, { useCallback, useState } from "react";
import _ from "lodash";
import { Form, Button, Steps, ConfigProvider } from "antd";
import FormBuilder from "antd-form-builder";
import locale from "antd/lib/date-picker/locale/es_ES";
import moment from "moment";
const { Step } = Steps;
const DateView = ({ value }) => (value ? value.format("MMM Do YYYY") : "N/A");

FormBuilder.defineWidget("date-view", DateView);

const formCliente = {
  columns: 2,
  fields: [
    {
      key: "cliente.nombre",
      label: "Nombre o razon social",
      clear: "both",
      required: true,
    },
    {
      key: "cliente.direccion",
      label: "Dirección",
    },
    {
      key: "cliente.comuna",
      label: "Comuna",
      // labelCol: { span: 6 },
    },
    {
      key: "cliente.telefono",
      label: "Telefono",
    },
    {
      key: "cliente.email",
      label: "Correo Electronico",
    },
  ],
};

const formExtintor = {
  columns: 2,
  fields: [
    {
      key: "extintor.id",
      label: "N° de identificacion",
      clear: "both",
      required: true,
    },
    {
      key: "extintor.marca",
      label: "Marca",
    },
    {
      key: "extintor.tipo",
      label: "Tipo",
      widget: "radio-group",
      forwardRef: true,
      options: ["Recargable", "No recargable"],
    },
    {
      key: "extintor.agente",
      label: "Agente de extinción",
      colSpan: 1,
      extra: "Naturaleza agente de extinción (NCh1430, cláusula 5)",
      clear: "both",
    },
    {
      key: "extintor.p_trabajo",
      label: "Presión de trabajo",
    },
    {
      key: "extintor.p_prueba",
      label: "Presión de prueba",
    },
    {
      key: "extintor.fabricacion",
      label: "Fabricación del cílindro ",
      placeholder: "Seleccionar fecha",
      widget: "date-picker",
      widgetProps: {
        style: { width: "100%" },
        // picker: "month",
        locale: moment.locale(locale, {
          months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
            "_"
          ),
          monthsShort: "Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sept._Oct._Nov._Dic.".split(
            "_"
          ),
          monthsParseExact: true,
          weekdaysShort: "dom._lun._mar._mie._jue._vie._sáb.".split("_"),
          weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
          weekdaysParseExact: true,
          week: {
            dow: 1,
          },
        }),
        format: "DD/MM/YYYY",
      },
      wrapperCol: { span: 8 },
    },
  ],
};

const wizardMeta = {
  steps: [
    {
      title: "Registro de cliente",
      formMeta: {
        columns: 2,
        fields: [
          {
            key: "name.first",
            label: "Nombre o razon social",
            clear: "both",
            required: true,
          },
          // {
          //   key: "direccion",
          //   label: "Dirección",
          //   colSpan: 1,
          // },
          // {
          //   key: "comuna",
          //   label: "Comuna",
          //   clear: "right",
          // },
          // {
          //   key: "telefono",
          //   label: "Telefono",
          // },
          // {
          //   key: "email",
          //   label: "Correo Electronico",
          //   clear: "right",
          // },
          // {
          //   key: "extintor.id",
          //   label: "N° de identificacion del extintor",
          //   clear: "both",
          //   // labelCol: { span: 12 },
          // },
          // {
          //   key: "noAccountInfo",
          //   label: "No Account Info",
          //   widget: "switch",
          //   dynamic: true,
          //   tooltip: "Switch on to remove account step",
          // },
        ],
      },
    },
    {
      title: "Servicio",
      formMeta: {
        columns: 2,
        fields: [
          {
            key: "email",
            label: "Email",
            clear: "right",
            rules: [{ type: "email", message: "Invalid email" }],
          },
          {
            key: "security",
            label: "Security Question",
            widget: "select",
            placeholder: "Select a question...",
            options: ["What's your pet's name?", "Your nick name?"],
          },
          { key: "answer", label: "Security Answer" },
        ],
      },
    },
  ],
};

export default () => {
  const [form] = FormBuilder.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const handleFinish = useCallback(() => {
    console.log("Submit: ", form.getFieldsValue(true));
  }, [form]);

  // Clone the meta for dynamic change
  const newWizardMeta = JSON.parse(JSON.stringify(wizardMeta));
  // In a wizard, every field should be preserved when swtich steps.
  // newWizardMeta.steps.forEach(s => s.formMeta.fields.forEach(f => (f.preserve = true)))
  if (form.getFieldValue("noAccountInfo")) {
    _.pullAt(newWizardMeta.steps, 1);
  }

  // Generate a general review step
  const reviewFields = [];
  newWizardMeta.steps.forEach((s, i) => {
    reviewFields.push(
      {
        key: "review" + i,
        colSpan: 2,
        render() {
          return (
            <fieldset>
              <legend>{s.title}</legend>
            </fieldset>
          );
        },
      },
      ...s.formMeta.fields
    );
  });

  newWizardMeta.steps.push({
    key: "review",
    title: "Resumen",
    formMeta: {
      columns: 2,
      fields: reviewFields,
    },
  });

  const stepsLength = newWizardMeta.steps.length;

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };
  const handleBack = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep - 1);
    });
  };
  const isReview = currentStep === stepsLength - 1;

  // TODO:
  if (currentStep === 0) {
    return (
      <Form
        layout="horizontal"
        form={form}
        onValuesChange={form.handleValuesChange}
        onFinish={handleFinish}
      >
        <Steps current={currentStep}>
          {newWizardMeta.steps.map((s) => (
            <Step key={s.title} title={s.title} />
          ))}
        </Steps>

        <div
          style={{ background: "#f7f7f7", padding: "20px", margin: "30px 0" }}
        >
          <fieldset>
            <legend>Información del cliente</legend>
            <FormBuilder form={form} meta={formCliente} />
          </fieldset>
          <fieldset>
            <legend>Extintor</legend>
            <FormBuilder form={form} meta={formExtintor} />
          </fieldset>
        </div>
        <Form.Item className="form-footer" style={{ textAlign: "right" }}>
          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              style={{ float: "left", marginTop: "5px" }}
            >
              Atras
            </Button>
          )}
          <Button>Cancelar</Button>&nbsp; &nbsp;
          <Button
            type="primary"
            onClick={isReview ? () => form.submit() : handleNext}
          >
            {isReview ? "Guardar" : "Siguiente"}
          </Button>
        </Form.Item>
      </Form>
    );
  } else {
    return (
      <Form
        layout="horizontal"
        form={form}
        onValuesChange={form.handleValuesChange}
        onFinish={handleFinish}
      >
        <Steps current={currentStep}>
          {newWizardMeta.steps.map((s) => (
            <Step key={s.title} title={s.title} />
          ))}
        </Steps>

        <div
          style={{ background: "#f7f7f7", padding: "20px", margin: "30px 0" }}
        >
          <FormBuilder
            viewMode={currentStep === stepsLength - 1}
            form={form}
            meta={newWizardMeta.steps[currentStep].formMeta}
          />
        </div>
        <Form.Item className="form-footer" style={{ textAlign: "right" }}>
          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              style={{ float: "left", marginTop: "5px" }}
            >
              Atras
            </Button>
          )}
          <Button>Cancelar</Button>&nbsp; &nbsp;
          <Button
            type="primary"
            onClick={isReview ? () => form.submit() : handleNext}
          >
            {isReview ? "Guardar" : "Siguiente"}
          </Button>
        </Form.Item>
      </Form>
    );
  }
};
