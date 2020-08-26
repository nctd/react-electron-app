import React, { useCallback, useState } from 'react';
export const createMantenimiento = (meta) => {
  meta.push(
    {
      key: 'fr_mant1',
      label: 'Persona que realizó el mantenimiento',
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 },
      },
      widgetProps: { maxLength: 40 },
      required: true,
      message: 'Ingrese persona que realizó la mantenimiento',
    },
    {
      key: 'fr_mant2',
      label: 'Normas Chilenas aplicadas',
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 },
      },
      widgetProps: { maxLength: 40 },
      required: true,
      message: 'Ingrese normas aplicadas',
    },
    {
      key: 'fr_mant3',
      label: 'Se utilizó el manual del fabricante o armador',
      widget: 'radio-group',
      // forwardRef: true,
      options: [
        [true, 'Si'],
        [false, 'No'],
      ],
      labelCol: { span: 9 },
      required: true,
      message: 'Seleccione una opción',
    },
    {
      key: 'fr_mant4',
      label: 'Razon del mantenimiento',
      widget: 'radio-group',
      // forwardRef: true,
      options: [
        ['por revision', 'Como consecuencia de la revisión'],
        ['segun programa', 'Según programa'],
        ['otra', 'Otra'],
      ],
      labelCol: { span: 9 },
      required: true,
      message: 'Seleccione una opción',
    },
    {
      key: 'fr_mant5',
      label: 'Comentarios',
      widget: 'textarea',
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 },
      },
      placeholder: 'Detallar razón del mantenimiento',
      widgetProps: { maxLength: 150 },
    },
    {
      key: 'fr_mant6',
      render() {
        return (
          <fieldset>
            <legend>Acciones realizadas</legend>
          </fieldset>
        );
      },
    },
    {
      key: 'fr_mant7',
      label:
        'Equipo recuperación/vaciado agente de extinción es el adecuado',
      widget: 'radio-group',
      options: [
        [true, 'Si'],
        [false, 'No'],
      ],
      labelCol: { span: 9 },
      required: true,
      message: 'Seleccione una opción',
    },
    {
      key: 'fr_mant8',
      label: 'Reemplazo de partes',
      widget: 'radio-group',
      options: [
        [true, 'Si'],
        [false, 'No'],
      ],
      labelCol: { span: 9 },
      required: true,
      message: 'Seleccione una opción',
    },
    {
      key: 'fr_mant9',
      label: 'Repuestos según manual del fabricante, armador o importador',
      widget: 'radio-group',
      options: [
        [true, 'Si'],
        [false, 'No'],
      ],
      labelCol: { span: 9 },
      required: true,
      message: 'Seleccione una opción',
    },
    {
      key: 'fr_mant10',
      label: 'Indicador de presión de reemplazo cumple con normas',
      widget: 'radio-group',
      options: [
        [true, 'Si'],
        [false, 'No'],
      ],
      tooltip: 'NCH1180/5; NCh2056',
      labelCol: { span: 9 },
      required: true,
      message: 'Seleccione una opción',
    },
    {
      key: 'fr_mant11',
      label: 'Examen interno del cilindro/tanque',
      widget: 'radio-group',
      options: [
        [true, 'Si'],
        [false, 'No'],
      ],
      labelCol: { span: 9 },
      required: true,
      message: 'Seleccione una opción',
    },
    {
      key: 'fr_mant12',
      label: 'Examen interno del cartucho/botellín',
      widget: 'radio-group',
      options: [
        [true, 'Si'],
        [false, 'No'],
      ],
      labelCol: { span: 9 },
      required: true,
      message: 'Seleccione una opción',
    },
    {
      key: 'fr_mant13',
      label: 'Recarga/reemplazo agente de extinción',
      widget: 'radio-group',
      options: [
        [true, 'Si'],
        [false, 'No'],
      ],
      labelCol: { span: 9 },
      required: true,
      message: 'Seleccione una opción',
    },
    {
      key: 'fr_mant14',
      label: 'Se adoptaron medidas de seguridad',
      widget: 'radio-group',
      options: [
        [true, 'Si'],
        [false, 'No'],
      ],
      labelCol: { span: 9 },
      required: true,
      message: 'Seleccione una opción',
    },
    {
      key: 'fr_mant15',
      label: 'Se usaron elementos de protección personal',
      widget: 'radio-group',
      options: [
        [true, 'Si'],
        [false, 'No'],
      ],
      labelCol: { span: 9 },
      required: true,
      message: 'Seleccione una opción',
    },
    {
      key: 'fr_mant16',
      label: 'Comentarios',
      widget: 'textarea',
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 },
      },
      widgetProps: { maxLength: 150 },
      placeholder:
        'Detallar partes y piezas reemplazadas; observaciones examen interno, medidas de seguridad adoptadas, agente de extinción',
    }
  );
};
