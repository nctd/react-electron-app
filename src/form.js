import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import { Form, Button, Steps, Tabs, Modal } from 'antd';
import FormBuilder from 'antd-form-builder';
import locale from 'antd/lib/date-picker/locale/es_ES';
import moment from 'moment';
import { createRevision } from './forms/formRevision';
import { createMantenimiento } from './forms/formMantenimiento';
import { createPresion } from './forms/formPresion';
import { createRecarga } from './forms/formRecarga';
import { createOne } from './app';

const { Step } = Steps;
const DateView = ({ value }) =>
  value ? value.format('MMM Do YYYY') : 'N/A';

FormBuilder.defineWidget('date-view', DateView);

const checkServicios = (form) => {
  const values = form.getFieldsValue('revision');
  if (
    values.revision != true &&
    values.mantenimiento != true &&
    values.recarga != true &&
    values.presion != true
  ) {
    return Modal.error({
      title: 'Error',
      content: 'Seleccione un servicio',
    });
  }
};

const formCliente = {
  columns: 2,
  fields: [
    {
      key: 'cliente.nombre',
      label: 'Nombre o razón social',
      clear: 'both',
      // required: true,
      wrapperCol: { span: 12 },
    },
    {
      key: 'cliente.direccion',
      label: 'Dirección',
      wrapperCol: { span: 12 },
    },
    {
      key: 'cliente.comuna',
      label: 'Comuna',
      wrapperCol: { span: 12 },
      // labelCol: { span: 6 },
    },
    {
      key: 'cliente.telefono',
      label: 'Teléfono',
      wrapperCol: { span: 12 },
    },
    {
      key: 'cliente.email',
      label: 'Correo electrónico',
      wrapperCol: { span: 12 },
    },
  ],
};

const formRepresentante = {
  columns: 2,
  fields: [
    {
      key: 'representante.nombre',
      label: 'Nombre representante de la empresa',
      clear: 'both',
      wrapperCol: { span: 12 },
    },
    {
      key: 'representante.telefono',
      label: 'Teléfono',
      wrapperCol: { span: 12 },
    },
    {
      key: 'representante.email',
      label: 'Correo electrónico',
      wrapperCol: { span: 12 },
    },
  ],
};

const formContacto = {
  columns: 2,
  fields: [
    {
      key: 'contacto.nombre',
      label: 'Nombre contacto en la empresa',
      clear: 'both',
      wrapperCol: { span: 12 },
    },
    {
      key: 'contacto.telefono',
      label: 'Teléfono',
      wrapperCol: { span: 12 },
    },
    {
      key: 'contacto.email',
      label: 'Correo electrónico',
      wrapperCol: { span: 12 },
    },
  ],
};

const formExtintor = {
  columns: 2,
  fields: [
    {
      key: 'extintor.id',
      label: 'N° de identificacion',
      clear: 'both',
      // required: true,
      wrapperCol: { span: 12 },
    },
    {
      key: 'extintor.marca',
      label: 'Marca',
      clear: 'both',
      wrapperCol: { span: 12 },
    },
    {
      key: 'extintor.tipo',
      label: 'Tipo',
      widget: 'radio-group',
      forwardRef: true,
      options: ['Recargable', 'No recargable'],
    },
    {
      key: 'extintor.agente',
      label: 'Naturaleza agente de extinción',
      extra: 'NCh1430, cláusula 5',
      clear: 'both',
      wrapperCol: { span: 12 },
    },
    {
      key: 'extintor.p_trabajo',
      label: 'Presión de trabajo',
      wrapperCol: { span: 12 },
    },
    {
      key: 'extintor.p_prueba',
      label: 'Presión de prueba',
      wrapperCol: { span: 12 },
    },
    {
      key: 'extintor.fabricacion',
      label: 'Fabricación del cílindro ',
      placeholder: 'Seleccionar fecha',
      widget: 'date-picker',
      widgetProps: {
        style: { width: '100%' },
        picker: 'month',
        locale: moment.locale(locale, {
          months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
            '_'
          ),
          monthsShort: 'Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sept._Oct._Nov._Dic.'.split(
            '_'
          ),
          monthsParseExact: true,
          weekdaysShort: 'dom._lun._mar._mie._jue._vie._sáb.'.split('_'),
          weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
          weekdaysParseExact: true,
          week: {
            dow: 1,
          },
        }),
        format: 'MM/YYYY',
      },
      wrapperCol: { span: 8 },
    },
    {
      key: 'extintor.fecha_servicio',
      label: 'Fecha del servicio',
      placeholder: 'Seleccionar fecha',
      widget: 'date-picker',
      widgetProps: {
        style: { width: '100%' },
        locale: moment.locale(locale, {
          months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
            '_'
          ),
          monthsShort: 'Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sept._Oct._Nov._Dic.'.split(
            '_'
          ),
          monthsParseExact: true,
          weekdaysShort: 'dom._lun._mar._mie._jue._vie._sáb.'.split('_'),
          weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
          weekdaysParseExact: true,
          week: {
            dow: 1,
          },
        }),
        format: 'DD/MM/YYYY',
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
      key: 'revision',
      label: 'Revisión',
      widget: 'checkbox',
      formItemLayout: {
        labelCol: { span: 8 },
      },
    },
    {
      key: 'mantenimiento',
      label: 'Mantenimiento',
      widget: 'checkbox',
      formItemLayout: {
        labelCol: { span: 8 },
      },
    },
    {
      key: 'recarga',
      label: 'Recarga',
      widget: 'checkbox',
      formItemLayout: {
        labelCol: { span: 8 },
      },
    },
    {
      key: 'presion',
      label: 'Prueba de presión interna',
      widget: 'checkbox',
      formItemLayout: {
        labelCol: { span: 10 },
      },
    },
  ],
};

let formRevision = [];
let formMantenimiento = [];
let formRecarga = [];
let formPresion = [];

const wizardMeta = {
  steps: [
    {
      title: 'Registro de cliente',
      formMeta: formCliente,
    },
    {
      title: 'Servicio',
      formMeta: formServicio,
    },
  ],
};

const resumeForm = {
  steps: [
    {
      title: 'Registro de cliente',
      formMeta: formCliente,
    },
    {
      title: 'Extintor',
      formMeta: formExtintor,
    },
    {
      title: 'Servicio',
      formMeta: formServicio,
    },
  ],
};

export default () => {
  const [form] = FormBuilder.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  // const forceUpdate = FormBuilder.useForceUpdate()
  const handleFinish = useCallback(() => {
    console.log('Submit: ', form.getFieldsValue(true));
  }, [form]);

  // Clone the meta for dynamic change
  const newWizardMeta = JSON.parse(JSON.stringify(wizardMeta));
  // In a wizard, every field should be preserved when swtich steps.
  // newWizardMeta.steps.forEach(s => s.formMeta.fields.forEach(f => (f.preserve = true)))

  // Generate a general review step
  const reviewFields = [];
  resumeForm.steps.forEach((s, i) => {
    reviewFields.push(
      {
        key: 'review' + i,
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
    key: 'review',
    title: 'Resumen',
    formMeta: {
      columns: 2,
      fields: reviewFields,
    },
  });

  const stepsLength = newWizardMeta.steps.length;

  const handleNext = () => {
    if (currentStep == 0) {
      if (checkServicios(form)) return;
    }

    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });

    if (currentStep == 1) {
      formServicio.fields[3].formItemLayout = {
        labelCol: { span: 8 },
      };
      formExtintor.fields[3].extra = null;
    }
  };

  const handleBack = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep - 1);
    });
    formServicio.fields[3].formItemLayout = {
      labelCol: { span: 10 },
    };
    formExtintor.fields[3].extra = 'NCh1430, cláusula 5';
  };

  const isReview = currentStep === stepsLength - 1;

  const testform = { ...form };

  const { TabPane } = Tabs;

  const initialPanes = [
    {
      title: 'Revision',
      content: (
        <fieldset>
          <FormBuilder form={testform} meta={formRevision} />
        </fieldset>
      ),
      key: '1',
    },
    {
      title: 'Mantenimiento',
      content: (
        <fieldset>
          <FormBuilder form={testform} meta={formMantenimiento} />
        </fieldset>
      ),
      key: '2',
    },
    {
      title: 'Recarga',
      content: (
        <fieldset>
          <FormBuilder form={testform} meta={formRecarga} />
        </fieldset>
      ),
      key: '3',
    },
    {
      title: 'Prueba de presión interna',
      content: (
        <fieldset>
          <FormBuilder form={testform} meta={formPresion} />
        </fieldset>
      ),
      key: '4',
    },
  ];

  let cliente;
  let extintor;
  let revision;
  let mant;
  let recarga;
  let presion;
  let dataForms = [];
  if (form.getFieldValue('cliente')) {
    cliente = form.getFieldValue('cliente');
    extintor = form.getFieldValue('extintor');
    revision = form.getFieldValue('revision') ? 'Si' : 'No';
    mant = form.getFieldValue('mantenimiento') ? 'Si' : 'No';
    recarga = form.getFieldValue('recarga') ? 'Si' : 'No';
    presion = form.getFieldValue('presion') ? 'Si' : 'No';

    let fabricacion = 'N/A';
    if (extintor.fabricacion != undefined) {
      fabricacion = moment(extintor.fabricacion).format('MM/YYYY');
    }
    let fecha_servicio = 'N/A';
    if (extintor.fecha_servicio != undefined) {
      fecha_servicio = moment(extintor.fecha_servicio).format(
        'DD/MM/YYYY'
      );
    }
    dataForms = {
      cliente: {
        nombre: cliente.nombre == '' ? 'N/A' : cliente.nombre,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        comuna: cliente.comuna,
        email: cliente.email,
      },
      extintor: {
        id: extintor.id,
        marca: extintor.marca,
        tipo: extintor.tipo,
        agente: extintor.agente,
        p_trabajo: extintor.p_trabajo,
        p_prueba: extintor.p_prueba,
        fabricacion: fabricacion,
        fecha_servicio: fecha_servicio,
      },
      revision: revision,
      mantenimiento: mant,
      recarga: recarga,
      presion: presion,
    };
  }

  if (
    form.getFieldInstance('revision') &&
    !form.getFieldInstance('revision').props['checked']
  ) {
    if (!form.getFieldInstance('fr_revision1')) {
      createRevision(formRevision);
    }
  }

  if (!form.getFieldValue('revision')) {
    formRevision.forEach((e) => {
      const key = e.key;
      testform.setFieldsValue({ [key]: null });
    });
    formRevision = [];
    initialPanes.splice(
      initialPanes.findIndex(({ key }) => key == '1'),
      1
    );
  }

  //TODO: REFACTORIZAR PUSH EN LOS FORM

  if (
    form.getFieldInstance('mantenimiento') &&
    !form.getFieldInstance('mantenimiento').props['checked']
  ) {
    if (!form.getFieldInstance('fr_mant1')) {
      createMantenimiento(formMantenimiento);
    }
  }

  if (!form.getFieldValue('mantenimiento')) {
    formMantenimiento.forEach((e) => {
      const key = e.key;
      testform.setFieldsValue({ [key]: null });
    });
    formMantenimiento = [];
    initialPanes.splice(
      initialPanes.findIndex(({ key }) => key == '2'),
      1
    );
  }

  if (
    form.getFieldInstance('recarga') &&
    !form.getFieldInstance('recarga').props['checked']
  ) {
    if (!form.getFieldInstance('fr_recarga1')) {
      createRecarga(formRecarga);
    }
  }

  if (!form.getFieldValue('recarga')) {
    formRecarga.forEach((e) => {
      const key = e.key;
      testform.setFieldsValue({ [key]: null });
    });
    formRecarga = [];
    initialPanes.splice(
      initialPanes.findIndex(({ key }) => key == '3'),
      1
    );
  }

  if (
    form.getFieldInstance('presion') &&
    !form.getFieldInstance('presion').props['checked']
  ) {
    if (!form.getFieldInstance('fr_presion1')) {
      createPresion(formPresion);
    }
  }

  if (!form.getFieldValue('presion')) {
    formPresion.forEach((e) => {
      const key = e.key;
      testform.setFieldsValue({ [key]: null });
    });
    formPresion = [];
    initialPanes.splice(
      initialPanes.findIndex(({ key }) => key == '4'),
      1
    );
  }

  // document
  //   .querySelector('ant-form')
  //   .addEventListener('submit', function (e) {
  //     if (!isValid) {
  //       e.preventDefault(); //stop form from submitting
  //       ipcRenderer.send('add');
  //     }
  //   });

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
          style={{
            background: '#f7f7f7',
            padding: '20px',
            margin: '30px 0',
          }}
        >
          <fieldset>
            <legend>Información del cliente</legend>
            <FormBuilder form={form} meta={formCliente} />
          </fieldset>
          <fieldset>
            <legend>Información del representante</legend>
            <FormBuilder form={form} meta={formRepresentante} />
          </fieldset>
          <fieldset>
            <legend>Contacto</legend>
            <FormBuilder form={form} meta={formContacto} />
          </fieldset>
          <fieldset>
            <legend>Extintor</legend>
            <FormBuilder form={form} meta={formExtintor} />
          </fieldset>
          <fieldset>
            <legend>Servicio realizado</legend>
            <FormBuilder form={form} meta={formServicio} />
          </fieldset>
        </div>
        <Form.Item className="form-footer" style={{ textAlign: 'right' }}>
          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              style={{ float: 'left', marginTop: '5px' }}
            >
              Atras
            </Button>
          )}
          <Button>Cancelar</Button>&nbsp; &nbsp;
          <Button
            type="primary"
            onClick={isReview ? () => form.submit() : handleNext}
          >
            {isReview ? 'Guardar' : 'Siguiente'}
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
          style={{
            background: '#f7f7f7',
            padding: '20px',
            margin: '30px 0',
          }}
        >
          <Tabs type="card" size="large">
            {initialPanes.map((pane) => (
              <TabPane tab={pane.title} key={pane.key}>
                {pane.content}
              </TabPane>
            ))}
          </Tabs>
        </div>
        <Form.Item className="form-footer" style={{ textAlign: 'right' }}>
          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              style={{ float: 'left', marginTop: '5px' }}
            >
              Atras
            </Button>
          )}
          <Button>Cancelar</Button>&nbsp; &nbsp;
          <Button
            type="primary"
            onClick={isReview ? () => form.submit() : handleNext}
          >
            {isReview ? 'Guardar' : 'Siguiente'}
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
          style={{
            background: '#f7f7f7',
            padding: '20px',
            margin: '30px 0',
          }}
        >
          <FormBuilder
            viewMode={currentStep === stepsLength - 1}
            form={form}
            meta={newWizardMeta.steps[currentStep].formMeta}
            initialValues={dataForms}
          />
        </div>
        <Form.Item className="form-footer" style={{ textAlign: 'right' }}>
          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              style={{ float: 'left', marginTop: '5px' }}
            >
              Atras
            </Button>
          )}
          <Button>Cancelar</Button>&nbsp; &nbsp;
          <Button
            type="primary"
            onClick={isReview ? () => createOne(form) : handleNext}
          >
            {isReview ? 'Guardar' : 'Siguiente'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
};

// TODO: CAMBIAR COLORES
// TODO: SELECT OBLIGATORIO SERVICIOS
