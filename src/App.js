const { ipcRenderer } = window.require('electron');
const moment = require('moment');

export const createOne = (form) => {
  const data_cli = form.getFieldValue('cliente');
  const data_ext = form.getFieldValue('extintor');
  const cliente = {
    nombre_cliente: data_cli.nombre,
    direccion_cliente: data_cli.direccion,
    comuna_cliente: data_cli.telefono,
    telefono_cliente: data_cli.comuna,
    correo_cliente: data_cli.email,
  };
  const extintor = {
    num_extintor: data_ext.id,
    marca: data_ext.marca,
    tipo: data_ext.tipo,
    agente_extincion: data_ext.agente,
    presion_trabajo: data_ext.p_trabajo,
    presion_prueba: data_ext.p_prueba,
    fabricacion: moment(data_ext.fabricacion).format('MM/YYYY'),
    fecha_servicio: moment(data_ext.fecha_servicio).format('DD/MM/YYYY'),
  };

  ipcRenderer.send('add', extintor);
  form.submit();
  // form.reset();
};
