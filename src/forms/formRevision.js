import React, { useCallback, useState } from 'react';
export const createRevision = (meta) => {
  meta.push(
    {
      key: 'fr_revision1',
      label: 'Persona que realizó la revisión',
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 },
      },
    },
    {
      key: 'fr_revision2',
      label: 'Norma Chilena aplicada',
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 },
      },
    },
    {
      key: 'fr_revision3',
      label: 'Se utilizó el manual del fabricante o armador',
      widget: 'radio-group',
      // forwardRef: true,
      options: ['Si', 'No'],
      labelCol: { span: 9 },
    },
    {
      key: 'fr_revision4',
      label: 'Razon de la revisión',
      widget: 'radio-group',
      // forwardRef: true,
      options: [
        ['puesta en servicio', 'Puesta en servicio'],
        ['segun programa', 'Según programa'],
        ['otra', 'Otra'],
      ],
      labelCol: { span: 9 },
    },
    {
      key: 'fr_revision5',
      label: 'Comentarios',
      widget: 'textarea',
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 },
      },
    },
    {
      key: 'fr_revision6',
      render() {
        return (
          <fieldset>
            <legend>Resultados de la revisión</legend>
          </fieldset>
        );
      },
    },
    {
      key: 'fr_revision7',
      label: 'Cumple con NCh2056, 4.2.2',
      widget: 'radio-group',
      options: ['Si', 'No'],
      labelCol: { span: 9 },
    },
    {
      key: 'fr_revision8',
      label: 'Requiere de correcciones',
      // tooltip: "Detallar correcciones en comentarios",
      widget: 'radio-group',
      options: ['Si', 'No'],
      labelCol: { span: 9 },
    },
    {
      key: 'fr_revision9',
      label: 'Requiere de mantenimiento',
      widget: 'radio-group',
      options: ['Si', 'No'],
      labelCol: { span: 9 },
    },
    {
      key: 'fr_revision10',
      label: 'Retirar de servicio',
      widget: 'radio-group',
      options: ['Si', 'No'],
      labelCol: { span: 9 },
    },
    {
      key: 'fr_revision11',
      label: 'Dar de baja',
      widget: 'radio-group',
      options: ['Si', 'No'],
      labelCol: { span: 9 },
    },
    {
      key: 'fr_revision12',
      label: 'Comentarios',
      widget: 'textarea',
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 },
      },
      placeholder: 'Detallar necesidades de mantenimiento',
    }
  );
};
