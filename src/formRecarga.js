import React, { useCallback, useState } from "react";
export const createRecarga = (meta) => {
  meta.push(
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
      key: "fr_recarga8",
      label: "Comentarios",
      widget: "textarea",
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 },
      },
    }
  );
};
