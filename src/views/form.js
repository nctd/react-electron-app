import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import { Form, Button, Steps, Tabs, Modal, message } from 'antd';
import FormBuilder from 'antd-form-builder';
import locale from 'antd/lib/date-picker/locale/es_ES';
import moment from 'moment';
import { createRevision } from '../forms/formRevision';
import { createMantenimiento } from '../forms/formMantenimiento';
import { createPresion } from '../forms/formPresion';
import { createRecarga } from '../forms/formRecarga';
import { createOne } from '../js/app';
import { addIcon } from '../js/icon';

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
      wrapperCol: { span: 12 },
      widgetProps: { maxLength: 40 },
      required: true,
      message: 'Ingrese nombre o razón social',
    },
    {
      key: 'cliente.direccion',
      label: 'Dirección',
      wrapperCol: { span: 12 },
      widgetProps: { maxLength: 40 },
      required: true,
      message: 'Ingrese dirección del cliente',
    },
    {
      key: 'cliente.comuna',
      label: 'Comuna',
      wrapperCol: { span: 12 },
      widgetProps: { maxLength: 40 },
      required: true,
      message: 'Ingrese comuna del cliente',
    },
    {
      key: 'cliente.telefono',
      label: 'Teléfono',
      wrapperCol: { span: 12 },
      widgetProps: { addonBefore: '+569', type: 'number' },
      rules: [{ len: 8, message: 'El número de teléfono es incorrecto' }],
      required: true,
      message: 'Ingrese teléfono del cliente',
    },
    {
      key: 'cliente.email',
      label: 'Correo electrónico',
      wrapperCol: { span: 12 },
      widgetProps: { maxLength: 40 },
      rules: [{ type: 'email', message: 'El correo no es valido' }],
      required: true,
      message: 'Ingrese correo electrónico del cliente',
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
      widgetProps: { maxLength: 40 },
      required: true,
      message: 'Ingrese nombre del representante',
    },
    {
      key: 'representante.telefono',
      label: 'Teléfono',
      wrapperCol: { span: 12 },
      widgetProps: { addonBefore: '+569', type: 'number' },
      rules: [{ len: 8, message: 'El número de teléfono es incorrecto' }],
      required: true,
      message: 'Ingrese teléfono del representante',
    },
    {
      key: 'representante.email',
      label: 'Correo electrónico',
      wrapperCol: { span: 12 },
      widgetProps: { maxLength: 40 },
      rules: [{ type: 'email', message: 'El correo no es valido' }],
      required: true,
      message: 'Ingrese correo electrónico del representante',
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
      widgetProps: { maxLength: 40 },
      required: true,
      message: 'Ingrese nombre del contacto',
    },
    {
      key: 'contacto.telefono',
      label: 'Teléfono',
      wrapperCol: { span: 12 },
      widgetProps: { addonBefore: '+569', type: 'number' },
      rules: [{ len: 8, message: 'El número de teléfono es incorrecto' }],
      required: true,
      message: 'Ingrese teléfono del contacto',
    },
    {
      key: 'contacto.email',
      label: 'Correo electrónico',
      wrapperCol: { span: 12 },
      widgetProps: { maxLength: 40 },
      rules: [{ type: 'email', message: 'El correo no es valido' }],
      required: true,
      message: 'Ingrese correo electrónico del contacto',
    },
  ],
};

const formExtintor = {
  columns: 2,
  fields: [
    {
      key: 'extintor.id',
      label: 'N° de identificación',
      clear: 'both',
      wrapperCol: { span: 12 },
      widgetProps: { maxLength: 40 },
      required: true,
      message: 'Ingrese n° de identificación del extintor',
    },
    {
      key: 'extintor.marca',
      label: 'Marca',
      clear: 'both',
      wrapperCol: { span: 12 },
      widgetProps: { maxLength: 40 },
      required: true,
      message: 'Ingrese marca del extintor',
    },
    {
      key: 'extintor.tipo',
      label: 'Tipo',
      widget: 'radio-group',
      forwardRef: true,
      options: ['Recargable', 'No recargable'],
      required: true,
      message: 'Ingrese tipo del extintor',
    },
    {
      key: 'extintor.agente',
      label: 'Naturaleza agente de extinción',
      extra: 'NCh1430, cláusula 5',
      clear: 'both',
      wrapperCol: { span: 12 },
      widgetProps: { maxLength: 40 },
      required: true,
      message: 'Ingrese agente de extinción del extintor',
    },
    {
      key: 'extintor.p_trabajo',
      label: 'Presión de trabajo',
      wrapperCol: { span: 12 },
      widgetProps: { maxLength: 10 },
      required: true,
      message: 'Ingrese presión de trabajo',
    },
    {
      key: 'extintor.p_prueba',
      label: 'Presión de prueba',
      wrapperCol: { span: 12 },
      widgetProps: { maxLength: 10 },
      required: true,
      message: 'Ingrese presión de prueba',
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
      required: true,
      message: 'Ingrese fecha de fabricación',
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
      required: true,
      message: 'Ingrese fecha de servicio',
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

const formConclusion = {
  columns: 1,
  fields: [
    {
      key: 'fr_conclusion1',
      label: 'El extintor se debe',
      widget: 'radio-group',
      clear: 'both',
      options: [
        ['mantener en servicio', 'Mantener en servicio'],
        [
          'retirar de servicio',
          'Retirar de servicio para mantenimiento y/o prueba de presión interna',
        ],
        ['ser dado de baja', 'Ser dado de baja'],
      ],
      labelCol: { span: 6 },
      required: true,
      message: 'Debe seleccionar una opción',
    },
    {
      key: 'fr_conclusion2',
      label: 'Razones',
      widget: 'textarea',
      clear: 'both',
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 8 },
      },
      required: true,
      message: 'Ingrese razones',
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
    {
      title: 'Conclusión',
      formMeta: formConclusion,
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

  const handleFinish = useCallback(() => {
    console.log('Submit: ', form.getFieldsValue(true));
  }, [form]);

  const newWizardMeta = JSON.parse(JSON.stringify(wizardMeta));

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

    form
      .validateFields()
      .then(() => {
        setCurrentStep(currentStep + 1);
      })
      .catch((err) => {
        err.errorFields.forEach((e) => {
          if (e.name[0].includes('revision')) addIcon(1);
          if (e.name[0].includes('mant')) addIcon(2);
          if (e.name[0].includes('recarga')) addIcon(3);
          if (e.name[0].includes('presion')) addIcon(4);
        });

        return Modal.error({
          title: 'Error',
          content: `Complete los campos requeridos`,
        });
      });

    if (currentStep == 1) {
      formServicio.fields[3].formItemLayout = {
        labelCol: { span: 8 },
      };
      formExtintor.fields[3].extra = null;
    }
  };

  const handleBack = () => {
    // form.validateFields().then(() => {});
    setCurrentStep(currentStep - 1);

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
      title: 'Revisión',
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
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        telefono: `+569${cliente.telefono}`,
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
              <TabPane tab={pane.title} key={pane.key} forceRender={true}>
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

          <Button
            type="primary"
            onClick={isReview ? () => form.submit() : handleNext}
          >
            {isReview ? 'Guardar' : 'Siguiente'}
          </Button>
        </Form.Item>
      </Form>
    );
  } else if (currentStep === 2) {
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
            <legend>Conclusión</legend>
            <FormBuilder form={form} meta={formConclusion} />
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
