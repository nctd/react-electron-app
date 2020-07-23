import React, { useCallback, useState } from "react";
import _ from "lodash";
import { Form, Button, Steps, ConfigProvider, Input } from "antd";
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
let formPrueba = [];

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

  if (
    form.getFieldInstance("revision") &&
    !form.getFieldInstance("revision").props["checked"]
  ) {
    if (!form.getFieldInstance("fr_revision1")) {
      formRevision.push(
        {
          key: "fr_revision",
          render() {
            return (
              <fieldset>
                <legend>Revisión</legend>
              </fieldset>
            );
          },
        },
        {
          key: "fr_revision1",
          label: "Persona que realizó la revisión",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
        },
        {
          key: "fr_revision2",
          label: "Norma Chilena aplicada",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
        },
        {
          key: "fr_revision3",
          label: "Se utilizó el manual del fabricante o armador",
          widget: "radio-group",
          // forwardRef: true,
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_revision4",
          label: "Razon de la revisión",
          widget: "radio-group",
          // forwardRef: true,
          options: ["Puesta en servicio", "Según programa", "Otra"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_revision5",
          label: "Comentarios",
          widget: "textarea",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
        },
        {
          key: "fr_revision6",
          render() {
            return (
              <fieldset>
                <legend>Resultados de la revisión</legend>
              </fieldset>
            );
          },
        },
        {
          key: "fr_revision7",
          label: "Cumple con NCh2056, 4.2.2",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_revision8",
          label: "Requiere de correcciones",
          // tooltip: "Detallar correcciones en comentarios",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_revision9",
          label: "Requiere de mantenimiento",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_revision10",
          label: "Retirar de servicio",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_revision11",
          label: "Dar de baja",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_revision12",
          label: "Comentarios",
          widget: "textarea",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
          placeholder: "Detallar necesidades de mantenimiento",
        }
      );
    }
  }

  if (!form.getFieldValue("revision")) {
    formRevision.forEach((e) => {
      const key = e.key;
      testform.setFieldsValue({ [key]: null });
    });
    formRevision = [];
  }

  //TODO: REFACTORIZAR PUSH EN LOS FORM

  if (
    form.getFieldInstance("mantenimiento") &&
    !form.getFieldInstance("mantenimiento").props["checked"]
  ) {
    if (!form.getFieldInstance("fr_mant1")) {
      formMantenimiento.push(
        {
          key: "fr_mant",
          render() {
            return (
              <fieldset>
                <legend>Mantenimiento</legend>
              </fieldset>
            );
          },
        },
        {
          key: "fr_mant1",
          label: "Persona que realizó el mantenimiento",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
        },
        {
          key: "fr_mant2",
          label: "Normas Chilenas aplicadas",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
        },
        {
          key: "fr_mant3",
          label: "Se utilizó el manual del fabricante o armador",
          widget: "radio-group",
          // forwardRef: true,
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_mant4",
          label: "Razon del mantenimiento",
          widget: "radio-group",
          // forwardRef: true,
          options: [
            "Como consecuencia de la revisión",
            "Según programa",
            "Otra",
          ],
          labelCol: { span: 9 },
        },
        {
          key: "fr_mant5",
          label: "Comentarios",
          widget: "textarea",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
          placeholder: "Detallar razon del mantenimiento",
        },
        {
          key: "fr_mant6",
          render() {
            return (
              <fieldset>
                <legend>Acciones realizadas</legend>
              </fieldset>
            );
          },
        },
        {
          key: "fr_mant7",
          label:
            "Equipo recuperación/vaciado agente de extinción es el adecuado",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_mant8",
          label: "Reemplazo de partes",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_mant9",
          label: "Repuestos según manual del fabricante, armador o importador",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_mant10",
          label:
            "Indicador de presión de reemplazo cumple con normas (NCH1180/5; NCh2056)",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_mant11",
          label: "Examen interno del cilindro/tanque",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_mant12",
          label: "Examen interno del cartucho/botellín",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_mant13",
          label: "Recarga/reemplazo agente de extinción",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_mant14",
          label: "Se adoptaron medidas de seguridad",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_mant15",
          label: "Se usaron elementos de protección personal",
          widget: "radio-group",
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_mant16",
          label: "Comentarios",
          widget: "textarea",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
          placeholder:
            "Detallar partes y piezas reemplazadas; observaciones examen interno, medidas de seguridad adoptadas, agemte de extinción",
        }
      );
    }
  }

  if (!form.getFieldValue("mantenimiento")) {
    formMantenimiento.forEach((e) => {
      const key = e.key;
      testform.setFieldsValue({ [key]: null });
    });
    formMantenimiento = [];
  }

  if (
    form.getFieldInstance("recarga") &&
    !form.getFieldInstance("recarga").props["checked"]
  ) {
    if (!form.getFieldInstance("fr_recarga1")) {
      formRecarga.push(
        {
          key: "fr_recarga",
          render() {
            return (
              <fieldset>
                <legend>Recarga</legend>
              </fieldset>
            );
          },
        },
        {
          key: "fr_recarga1",
          label: "Persona que realizó la recarga",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
        },
        {
          key: "fr_recarga2",
          label: "Normas Chilenas aplicadas",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
        },
        {
          key: "fr_recarga3",
          label: "Se utilizó el manual del fabricante o armador",
          widget: "radio-group",
          // forwardRef: true,
          options: ["Si", "No"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_recarga4",
          label: "Agente de extinción utilizado",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
        },
        {
          key: "fr_recarga5",
          label: "Masa extintor antes de la recarga (Kg)",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
        },
        {
          key: "fr_recarga6",
          label: "Masa extintor después de la recarga (Kg)",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
        },
        {
          key: "fr_recarga7",
          label: "Verificación de estanqueidad después de la recarga",
          widget: "radio-group",
          // forwardRef: true,
          options: ["Si", "No", "No aplica"],
          labelCol: { span: 9 },
        },
        {
          key: "fr_recarga9",
          label: "Comentarios",
          widget: "textarea",
          formItemLayout: {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
          },
        }
      );
    }
  }

  if (!form.getFieldValue("recarga")) {
    formRecarga.forEach((e) => {
      const key = e.key;
      testform.setFieldsValue({ [key]: null });
    });
    formRecarga = [];
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
          <fieldset>
            <FormBuilder form={testform} meta={formRevision} />
          </fieldset>
          <fieldset>
            <FormBuilder form={testform} meta={formMantenimiento} />
          </fieldset>
          <fieldset>
            <FormBuilder form={testform} meta={formRecarga} />
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
