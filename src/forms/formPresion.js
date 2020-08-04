import React, { useCallback, useState } from "react";
export const createPresion = (meta) => {
  meta.push(
    {
      key: "fr_presion1",
      label: "Persona que realizó la recarga",
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 },
      },
    },
    {
      key: "fr_presion2",
      label: "Normas Chilenas aplicadas",
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 },
      },
    },
    {
      key: "fr_presion3",
      label: "Examen previo conforme a NCh2056, 5.1.3",
      widget: "radio-group",
      // forwardRef: true,
      options: ["Si", "No"],
      labelCol: { span: 9 },
    },
    {
      key: "fr_presion4",
      render() {
        return (
          <fieldset>
            <legend>Resultados prueba</legend>
          </fieldset>
        );
      },
    },
    {
      key: "fr_presion5",
      label: "Cilindro/tanque",
      widget: "radio-group",
      // forwardRef: true,
      options: ["Aceptado", "Rechazado"],
      labelCol: { span: 9 },
    },
    {
      key: "fr_presion6",
      label: "Cilindro/cartucho gas expelente",
      widget: "radio-group",
      // forwardRef: true,
      options: ["Aceptado", "Rechazado"],
      labelCol: { span: 9 },
    },
    {
      key: "fr_presion7",
      label: "Conjunto manguera",
      widget: "radio-group",
      // forwardRef: true,
      options: ["Aceptado", "Rechazado"],
      labelCol: { span: 9 },
    },
    {
      key: "fr_presion8",
      label: "Comentarios y sugerencias",
      widget: "textarea",
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 8 },
      },
      tooltip: "En caso de rechazo, indicar forma y responsable de destrucción",
    }
  );
};
