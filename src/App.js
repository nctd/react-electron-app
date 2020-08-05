const { ipcRenderer } = window.require('electron');
const moment = require('moment');

export const createOne = (form) => {
  const data_cli = form.getFieldValue('cliente');
  const data_ext = form.getFieldValue('extintor');
  let revision = null;
  const cliente = {
    nombre: data_cli.nombre,
    direccion: data_cli.direccion,
    comuna: data_cli.telefono,
    telefono: data_cli.comuna,
    correo: data_cli.email,
  };
  const extintor = {
    numExtintor: data_ext.id,
    marca: data_ext.marca,
    tipo: data_ext.tipo,
    agenteExtincion: data_ext.agente,
    presionTrabajo: data_ext.p_trabajo,
    presionPrueba: data_ext.p_prueba,
    fabricacion: moment(data_ext.fabricacion).format('MM/YYYY'),
    fechaServicio: moment(data_ext.fecha_servicio).format('DD/MM/YYYY'),
  };
  if (form.getFieldValue('revision')) {
    revision = {
      encargado: form.getFieldValue('fr_revision1'),
      normaChilena: form.getFieldValue('fr_revision2'),
      manual: form.getFieldValue('fr_revision3') === 'Si' ? true : false,
      razonRevision:
        form.getFieldValue('fr_revision4') === 'Según programa'
          ? 'Segun programa'
          : form.getFieldValue('fr_revision4'),
      razonComentario: form.getFieldValue('fr_revision5'),
      resultados: [
        {
          descripcion: 'nch2056',
          respuesta:
            form.getFieldValue('fr_revision7') === 'Si' ? true : false,
        },
        {
          descripcion: 'correcciones',
          respuesta:
            form.getFieldValue('fr_revision8') === 'Si' ? true : false,
        },
        {
          descripcion: 'mantenimiento',
          respuesta:
            form.getFieldValue('fr_revision9') === 'Si' ? true : false,
        },
        {
          descripcion: 'retirarServicio',
          respuesta:
            form.getFieldValue('fr_revision10') === 'Si' ? true : false,
        },
        {
          descripcion: 'darBaja',
          respuesta:
            form.getFieldValue('fr_revision11') === 'Si' ? true : false,
        },
      ],
      resultadoComentario: form.getFieldValue('fr_revision12'),
    };
  }

  ipcRenderer.send('add', cliente, extintor, revision);
  form.submit();
  // form.reset();
};
