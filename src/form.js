import React, { useCallback, useState } from "react";
import _ from "lodash";
import { Form, Button, Steps } from "antd";
import FormBuilder from "antd-form-builder";
const { Step } = Steps;
const DateView = ({ value }) => (value ? value.format("MMM Do YYYY") : "N/A");

FormBuilder.defineWidget("date-view", DateView);

const formCliente = {
  columns: 2,
  fields: [
    {
      key: "name.first",
      label: "Nombre o razon social",
      clear: "both",
      required: true,
    },
    {
      key: "direccion",
      label: "Dirección",
      colSpan: 1,
    },
    {
      key: "comuna",
      label: "Comuna",
      clear: "right",
    },
    {
      key: "telefono",
      label: "Telefono",
    },
    {
      key: "email",
      label: "Correo Electronico",
      clear: "right",
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
      colSpan: 1,
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
