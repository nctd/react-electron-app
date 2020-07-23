import React, { useCallback, useState } from "react";
import _ from "lodash";
import { Form, Button, Steps, ConfigProvider, Tabs } from "antd";
import FormBuilder from "antd-form-builder";
import locale from "antd/lib/date-picker/locale/es_ES";
import moment from "moment";
import { render } from "@testing-library/react";
import { createRevision } from "./formRevision";
import { createMantenimiento } from "./formMantenimiento";
import { createPresion } from "./formPresion";
import { createRecarga } from "./formRecarga";
const { Step } = Steps;
const DateView = ({ value }) => (value ? value.format("MMM Do YYYY") : "N/A");

FormBuilder.defineWidget("date-view", DateView);

const formCliente = {
  columns: 2,
  fields: [
    {
      key: "cliente.nombre",
      label: "Nombre o razón social",
      clear: "both",
      // required: true,
      wrapperCol: { span: 12 },
    },
    {
      key: "cliente.direccion",
      label: "Dirección",
      wrapperCol: { span: 12 },
    },
    {
      key: "cliente.comuna",
      label: "Comuna",
      wrapperCol: { span: 12 },
      // labelCol: { span: 6 },
    },
    {
      key: "cliente.telefono",
      label: "Telefono",
      wrapperCol: { span: 12 },
    },
    {
      key: "cliente.email",
      label: "Correo Electronico",
      wrapperCol: { span: 12 },
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
      // required: true,
      wrapperCol: { span: 12 },
    },
    {
      key: "extintor.marca",
      label: "Marca",
      clear: "both",
      wrapperCol: { span: 12 },
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
      label: "Naturaleza agente de extinción",
      extra: "NCh1430, cláusula 5",
      clear: "both",
      wrapperCol: { span: 12 },
    },
    {
      key: "extintor.p_trabajo",
      label: "Presión de trabajo",
      wrapperCol: { span: 12 },
    },
    {
      key: "extintor.p_prueba",
      label: "Presión de prueba",
      wrapperCol: { span: 12 },
    },
    {
      key: "extintor.fabricacion",
      label: "Fabricación del cílindro ",
      placeholder: "Seleccionar fecha",
      widget: "date-picker",
      widgetProps: {
        style: { width: "100%" },
        picker: "month",
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
        format: "MM/YYYY",
      },
      wrapperCol: { span: 8 },
    },
    {
      key: "extintor.fecha_servicio",
      label: "Fecha del servicio",
      placeholder: "Seleccionar fecha",
      widget: "date-picker",
      widgetProps: {
        style: { width: "100%" },
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

const formServicio = {
  columns: 4,
  formItemLayout: null,
  fields: [
    {
      key: "revision",
      label: "Revisión",
      widget: "checkbox",
      formItemLayout: {
        labelCol: { span: 16 },
        wrapperCol: { span: 16 },
      },
    },
    {
      key: "mantenimiento",
      label: "Mantenimiento",
      widget: "checkbox",
      formItemLayout: {
        labelCol: { span: 16 },
        wrapperCol: { span: 16 },
      },
    },
    {
      key: "recarga",
      label: "Recarga",
      widget: "checkbox",
      formItemLayout: {
        labelCol: { span: 16 },
        wrapperCol: { span: 16 },
      },
    },
    {
      key: "presion",
      label: "Prueba de presión interna",
      widget: "checkbox",
      formItemLayout: {
        labelCol: { span: 16 },
        wrapperCol: { span: 16 },
      },
    },
  ],
};

let formRevision = [];
let formMantenimiento = [];
let formRecarga = [];
let formPresion = [];
let initialPanes = [];

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
  // const forceUpdate = FormBuilder.useForceUpdate()
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

  const testform = { ...form };

  const { TabPane } = Tabs;

  if (
    form.getFieldInstance("revision") &&
    !form.getFieldInstance("revision").props["checked"]
  ) {
    if (!form.getFieldInstance("fr_revision1")) {
      createRevision(formRevision);
      initialPanes.push({
        title: "Revision",
        content: (
          <fieldset>
            <FormBuilder form={testform} meta={formRevision} />
          </fieldset>
        ),
        key: "1",
      });
    }
  }

  if (!form.getFieldValue("revision")) {
    formRevision.forEach((e) => {
      const key = e.key;
      testform.setFieldsValue({ [key]: null });
    });
    formRevision = [];
    initialPanes.splice(
      initialPanes.findIndex(({ key }) => key == "1"),
      1
    );
    console.log(initialPanes);
  }

  //TODO: REFACTORIZAR PUSH EN LOS FORM

  if (
    form.getFieldInstance("mantenimiento") &&
    !form.getFieldInstance("mantenimiento").props["checked"]
  ) {
    if (!form.getFieldInstance("fr_mant1")) {
      createMantenimiento(formMantenimiento);
      initialPanes.push({
        title: "Mantenimiento",
        content: (
          <fieldset>
            <FormBuilder form={testform} meta={formMantenimiento} />
          </fieldset>
        ),
        key: "2",
      });
    }
  }

  if (!form.getFieldValue("mantenimiento")) {
    formMantenimiento.forEach((e) => {
      const key = e.key;
      testform.setFieldsValue({ [key]: null });
    });
    formMantenimiento = [];
    initialPanes.splice(
      initialPanes.findIndex(({ key }) => key == "2"),
      1
    );
  }

  if (
    form.getFieldInstance("recarga") &&
    !form.getFieldInstance("recarga").props["checked"]
  ) {
    if (!form.getFieldInstance("fr_recarga1")) {
      createRecarga(formRecarga);
      initialPanes.push({
        title: "Recarga",
        content: (
          <fieldset>
            <FormBuilder form={testform} meta={formRecarga} />
          </fieldset>
        ),
        key: "3",
      });
    }
  }

  if (!form.getFieldValue("recarga")) {
    formRecarga.forEach((e) => {
      const key = e.key;
      testform.setFieldsValue({ [key]: null });
    });
    formRecarga = [];
    initialPanes.splice(
      initialPanes.findIndex(({ key }) => key == "3"),
      1
    );
  }

  if (
    form.getFieldInstance("presion") &&
    !form.getFieldInstance("presion").props["checked"]
  ) {
    if (!form.getFieldInstance("fr_presion1")) {
      createPresion(formPresion);
      initialPanes.push({
        title: "Prueba de presión interna",
        content: (
          <fieldset>
            <FormBuilder form={testform} meta={formPresion} />
          </fieldset>
        ),
        key: "4",
      });
    }
  }

  if (!form.getFieldValue("presion")) {
    formPresion.forEach((e) => {
      const key = e.key;
      testform.setFieldsValue({ [key]: null });
    });
    formPresion = [];
    initialPanes.splice(
      initialPanes.findIndex(({ key }) => key == "4"),
      1
    );
  }

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
  } else if (currentStep === 1) {
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
            <legend>Servicio realizado</legend>
            <FormBuilder form={form} meta={formServicio} />
          </fieldset>

          <Tabs type="card" size="large">
            {initialPanes.map((pane) => (
              <TabPane tab={pane.title} key={pane.key}>
                {pane.content}
              </TabPane>
            ))}
          </Tabs>
          {/* <Tabs centered="true">
            <TabPane tab="Revision" key="1">
              <fieldset>
                <FormBuilder form={testform} meta={formRevision} />
              </fieldset>
            </TabPane>
            <TabPane tab="Mantenimiento" key="2">
              <fieldset>
                <FormBuilder form={testform} meta={formMantenimiento} />
              </fieldset>
            </TabPane>
            <TabPane tab="Recarga" key="3">
              <fieldset>
                <FormBuilder form={testform} meta={formRecarga} />
              </fieldset>
            </TabPane>
            <TabPane tab="Prueba de presion" key="4">
              <fieldset>
                <FormBuilder form={testform} meta={formPresion} />
              </fieldset>
            </TabPane>
          </Tabs> */}
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
