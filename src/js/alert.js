import { Modal } from 'antd';
import { renderPDF } from '../views/pdf/index-pdf';

const { ipcRenderer } = window.require('electron');
const moment = require('moment');

export const showAlert = () => {
  ipcRenderer.on(
    'add-reply',
    (e, type, cliente, extintor, registro, err) => {
      if (type === 'success') {
        const clienteData = [
          {
            field: 'Nombre o razon social del cliente',
            data: cliente.nombre,
          },
          {
            field: 'Direccion',
            data: cliente.direccion,
          },
          {
            field: 'Comuna',
            data: cliente.comuna,
          },
          {
            field: 'Telefono',
            data: cliente.telefono,
          },
          {
            field: 'Correo electrónico',
            data: cliente.correo,
          },
        ];
        let serviciosRealizados = [];
        let comentariosData = [];
        let resultadosData = [];

        const realizoServicio = () => {
          if (registro.revision) {
            serviciosRealizados.push(registro.revision.encargado);
          }
          if (registro.mantenimiento) {
            serviciosRealizados.push(registro.mantenimiento.encargado);
          }
          if (registro.recarga) {
            serviciosRealizados.push(registro.recarga.encargado);
          }
          if (registro.presion) {
            serviciosRealizados.push(registro.presion.encargado);
          }
          return serviciosRealizados;
        };

        const comentariosServicio = () => {
          if (registro.revision) {
            comentariosData.push({
              field: 'Revision',
              data: registro.revision.razonComentario,
            });
          }
          if (registro.mantenimiento) {
            comentariosData.push({
              field: 'Mantenimiento',
              data: registro.mantenimiento.razonComentario,
            });
          }
          if (registro.recarga) {
            comentariosData.push({
              field: 'Recarga',
              data: registro.recarga.comentarios,
            });
          }
          if (registro.presion) {
            comentariosData.push({
              field: 'Prueba de presion interna',
              data: 'N/A',
            });
          }
          return comentariosData;
        };

        const resultadosServicio = () => {
          if (registro.revision) {
            resultadosData.push({
              field: 'Revision',
              data: registro.revision.resultadoComentario,
            });
          }
          if (registro.mantenimiento) {
            resultadosData.push({
              field: 'Mantenimiento',
              data: registro.mantenimiento.resultadoComentario,
            });
          }
          if (registro.recarga) {
            resultadosData.push({
              field: 'Recarga',
              data: 'N/A',
            });
          }
          if (registro.presion) {
            resultadosData.push({
              field: 'Prueba de presion interna',
              data: registro.presion.resultadoComentario,
            });
          }
          return resultadosData;
        };

        const extintorData = [
          {
            field: 'Numero de identificacion del extintor',
            data: extintor.numExtintor,
          },
          {
            field: 'Marca del extintor',
            data: extintor.marca,
          },
          {
            field: 'Fecha del servicio',
            data: moment.utc(extintor.fechaServicio).format('DD/MM/YYYY'),
          },
          {
            field: 'Nombre de la persona que realizo el servicio',
            data: realizoServicio(),
          },
        ];

        const servicioData = [
          {
            data: 'Revision',
            option: registro.revision ? 'ItemSelected' : 'ItemSelect',
          },
          {
            data: 'Mantenimiento',
            option: registro.mantenimiento ? 'ItemSelected' : 'ItemSelect',
          },
          {
            data: 'Recarga',
            option: registro.recarga ? 'ItemSelected' : 'ItemSelect',
          },
          {
            data: 'Prueba de presion interna',
            option: registro.presion ? 'ItemSelected' : 'ItemSelect',
          },
        ];

        const representanteData = [
          {
            field: 'Representante de la empresa',
            data: registro.nombreRep,
          },
          {
            field: 'Telefono',
            data: registro.telefonoRep,
          },
          {
            field: 'Correo electrónico',
            data: registro.correoRep,
          },
        ];

        const contactoData = [
          {
            field: 'Contacto en la empresa',
            data: registro.nombreContacto,
          },
          {
            field: 'Telefono',
            data: registro.telefonoContacto,
          },
          {
            field: 'Correo electrónico',
            data: registro.correoContacto,
          },
        ];
        comentariosServicio();
        resultadosServicio();
        renderPDF(
          clienteData,
          extintorData,
          servicioData,
          representanteData,
          contactoData,
          comentariosData,
          resultadosData
        );
        return Modal.success({
          title: 'Operación exitosa',
          content: 'Registro de cliente guardado',
        });
      } else {
        return Modal.error({
          title: 'Error!',
          content: `${err}`,
        });
      }
    }
  );
};
