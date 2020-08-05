const { ipcRenderer } = window.require('electron');
const moment = require('moment');

export const createOne = (form) => {
  const data_cli = form.getFieldValue('cliente');
  const data_ext = form.getFieldValue('extintor');
  const data_rep = form.getFieldValue('representante');
  const data_con = form.getFieldValue('contacto');
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
      razonRevision: form.getFieldValue('fr_revision4'),
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
  if (form.getFieldValue('mantenimiento')) {
    revision = {
      encargado: form.getFieldValue('fr_mant1'),
      normaChilena: form.getFieldValue('fr_mant2'),
      manual: form.getFieldValue('fr_mant3') === 'Si' ? true : false,
      razonRevision: form.getFieldValue('fr_mant4'),
      razonComentario: form.getFieldValue('fr_mant5'),
      resultados: [
        {
          descripcion: 'equipoAdecuado',
          respuesta:
            form.getFieldValue('fr_mant7') === 'Si' ? true : false,
        },
        {
          descripcion: 'reemplazoPartes',
          respuesta:
            form.getFieldValue('fr_mant8') === 'Si' ? true : false,
        },
        {
          descripcion: 'respuestosManual',
          respuesta:
            form.getFieldValue('fr_mant9') === 'Si' ? true : false,
        },
        {
          descripcion: 'indicadorNormas',
          respuesta:
            form.getFieldValue('fr_mant10') === 'Si' ? true : false,
        },
        {
          descripcion: 'examenCilindro',
          respuesta:
            form.getFieldValue('fr_mant11') === 'Si' ? true : false,
        },
        {
          descripcion: 'examenCartucho',
          respuesta:
            form.getFieldValue('fr_mant12') === 'Si' ? true : false,
        },
        {
          descripcion: 'recargaAgente',
          respuesta:
            form.getFieldValue('fr_mant13') === 'Si' ? true : false,
        },
        {
          descripcion: 'seguridad',
          respuesta:
            form.getFieldValue('fr_mant14') === 'Si' ? true : false,
        },
        {
          descripcion: 'proteccionPersonal',
          respuesta:
            form.getFieldValue('fr_mant15') === 'Si' ? true : false,
        },
      ],
      resultadoComentario: form.getFieldValue('fr_revision16'),
    };
  }

  const registro = {
    nombreRep: data_rep.nombre,
    telefonoRep: data_rep.telefono,
    correoRep: data_rep.email,
    nombreContacto: data_con.nombre,
    telefonoContacto: data_con.telefono,
    correoContacto: data_con.email,
  };

  ipcRenderer.send('add', cliente, extintor, revision, registro);
  form.submit();
  // form.reset();
};
