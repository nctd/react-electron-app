import React from 'react';
import ReactDOM from 'react-dom';
import { ExclamationCircleTwoTone } from '@ant-design/icons';

export const addIcon = (key) => {
  let tabPane;
  let servicio;

  const query = document.querySelectorAll('.ant-tabs-tab');
  query.forEach((e) => {
    if ((key === 1) & (e.textContent === 'Revisión')) {
      tabPane = e.children[0];
      servicio = 'Revisión';
    }
    if ((key === 2) & (e.textContent === 'Mantenimiento')) {
      tabPane = e.children[0];
      servicio = 'Mantenimiento';
    }
    if ((key === 3) & (e.textContent === 'Recarga')) {
      tabPane = e.children[0];
      servicio = 'Recarga';
    }
    if ((key === 4) & (e.textContent === 'Prueba de presión interna')) {
      tabPane = e.children[0];
      servicio = 'Prueba de presión interna';
    }
  });

  const markup = (
    <span>
      <ExclamationCircleTwoTone twoToneColor="#ff4d4f" />
      {servicio}
    </span>
  );

  ReactDOM.render(markup, tabPane);
};
