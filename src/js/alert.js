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
            field: 'Nombre o razón social del cliente',
            data: cliente.nombre,
          },
          {
            field: 'Dirección',
            data: cliente.direccion,
          },
          {
            field: 'Comuna',
            data: cliente.comuna,
          },
          {
            field: 'Teléfono',
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
        let revisionData = [];
        let mantenimientoData = [];
        let recargaData = [];
        let presionData = [];

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
              field: 'Revisión',
              data:
                registro.revision.razonComentario != undefined
                  ? registro.revision.razonComentario
                  : 'N/A',
            });
          }
          if (registro.mantenimiento) {
            comentariosData.push({
              field: 'Mantenimiento',
              data:
                registro.mantenimiento.razonComentario != undefined
                  ? registro.mantenimiento.razonComentario
                  : 'N/A',
            });
          }
          if (registro.recarga) {
            comentariosData.push({
              field: 'Recarga',
              data:
                registro.recarga.comentarios != undefined
                  ? registro.recarga.comentarios
                  : 'N/A',
            });
          }
          if (registro.presion) {
            comentariosData.push({
              field: 'Prueba de presión interna',
              data: 'N/A',
            });
          }
          return comentariosData;
        };

        const resultadosServicio = () => {
          if (registro.revision) {
            resultadosData.push({
              field: 'Revisión',
              data:
                registro.revision.resultadoComentario != undefined
                  ? registro.revision.resultadoComentario
                  : 'N/A',
            });
          }
          if (registro.mantenimiento) {
            resultadosData.push({
              field: 'Mantenimiento',
              data:
                registro.mantenimiento.resultadoComentario != undefined
                  ? registro.mantenimiento.resultadoComentario
                  : 'N/A',
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
              field: 'Prueba de presión interna',
              data:
                registro.presion.resultadoComentario != undefined
                  ? registro.presion.resultadoComentario
                  : 'N/A',
            });
          }
          return resultadosData;
        };

        const extintorData = [
          {
            field: 'Número de identificación del extintor',
            data: extintor.numExtintor,
          },
          {
            field: 'Marca del extintor',
            data: extintor.marca,
          },
          {
            field: 'Tipo del extintor',
            data: extintor.tipo,
          },
          {
            field: 'Naturaleza agente de extinción (NCh1430, cláusula 5)',
            data: extintor.agenteExtincion,
          },
          {
            field: 'Presión de trabajo',
            data: extintor.presionTrabajo,
          },
          {
            field: 'Presión de prueba',
            data: extintor.presionPrueba,
          },
          {
            field: 'Año y mes de fabricación del cilindro',
            data: extintor.fabricacion,
          },
          {
            field: 'Fecha del servicio',
            data: moment.utc(extintor.fechaServicio).format('DD/MM/YYYY'),
          },
          {
            field: 'Nombre de la persona que realizó el servicio',
            data: realizoServicio(),
          },
        ];

        const servicioData = [
          {
            data: 'Revisión',
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
            data: 'Prueba de presión interna',
            option: registro.presion ? 'ItemSelected' : 'ItemSelect',
          },
        ];

        const representanteData = [
          {
            field: 'Representante de la empresa',
            data: registro.nombreRep,
          },
          {
            field: 'Teléfono',
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
            field: 'Teléfono',
            data: registro.telefonoContacto,
          },
          {
            field: 'Correo electrónico',
            data: registro.correoContacto,
          },
        ];

        const conclusionData = [
          {
            data: 'Mantener en servicio',
            option:
              registro.extintorDebe === 'mantener en servicio'
                ? 'ItemSelected'
                : 'ItemSelect',
          },
          {
            data:
              'Retirar de servicio para mantenimiento y/o prueba de presión interna',
            option:
              registro.extintorDebe === 'retirar de servicio'
                ? 'ItemSelected'
                : 'ItemSelect',
          },
          {
            data: 'Ser dado de baja',
            option:
              registro.extintorDebe === 'ser dado de baja'
                ? 'ItemSelected'
                : 'ItemSelect',
          },
        ];

        if (registro.revision) {
          const razon = () => {
            if (registro.revision.razonRevision === 'puesta en servicio')
              return 'Puesta en servicio';
            if (registro.revision.razonRevision === 'segun programa')
              return 'Según programa';
            if (registro.revision.razonRevision === 'otra') return 'Otra';
          };
          revisionData = [
            {
              field: 'Persona que realizó la revisión',
              data: registro.revision.encargado,
            },
            {
              field: 'Normas Chilenas aplicadas',
              data: registro.revision.normaChilena,
            },
            {
              field: 'Se utilizo el manual del fabricante o armador',
              data: registro.revision.manual === true ? 'Si' : 'No',
            },
            {
              field: 'Razon de la revision',
              data: razon(),
            },
            {
              field: 'Comentarios',
              data:
                registro.revision.razonComentario != undefined
                  ? registro.revision.razonComentario
                  : 'N/A',
            },
            {
              field: 'Cumple con NCh2056, 4.2.2',
              data:
                registro.revision.resultados[0].respuesta === true
                  ? 'Si'
                  : 'No',
            },
            {
              field: 'Requiere de correcciones',
              data:
                registro.revision.resultados[1].respuesta === true
                  ? 'Si'
                  : 'No',
            },
            {
              field: 'Requiere de mantenimiento',
              data:
                registro.revision.resultados[2].respuesta === true
                  ? 'Si'
                  : 'No',
            },
            {
              field: 'Retirar de servicio (extintor desechable)',
              data:
                registro.revision.resultados[3].respuesta === true
                  ? 'Si'
                  : 'No',
            },
            {
              field: 'Dar de baja (Obsolencia u otra razón)',
              data:
                registro.revision.resultados[4].respuesta === true
                  ? 'Si'
                  : 'No',
            },
            {
              field: 'Comentarios',
              data:
                registro.revision.resultadoComentario != undefined
                  ? registro.revision.resultadoComentario
                  : 'N/A',
            },
          ];
        }

        if (registro.mantenimiento) {
          const razon = () => {
            if (registro.revision.razonMantenimiento === 'por revision')
              return 'Como consecuencia de la revisión';
            if (registro.revision.razonMantenimiento === 'segun programa')
              return 'Según programa';
            if (registro.revision.razonMantenimiento === 'otra')
              return 'Otra';
          };
          mantenimientoData = [
            {
              field: 'Persona que realizó el mantenimiento',
              data: registro.mantenimiento.encargado,
            },
            {
              field: 'Normas Chilenas aplicadas',
              data: registro.mantenimiento.normaChilena,
            },
            {
              field: 'Se utilizo el manual del fabricante o armador',
              data: registro.mantenimiento.manual === true ? 'Si' : 'No',
            },
            {
              field: 'Razon del mantenimiento',
              data: razon(),
            },
            {
              field: 'Comentarios',
              data:
                registro.mantenimiento.razonComentario != undefined
                  ? registro.mantenimiento.razonComentario
                  : 'N/A',
            },
            {
              field:
                'Equipo recuperación/vaciado agente de extinción es el adecuado',
              data:
                registro.mantenimiento.resultados[0] === true
                  ? 'Si'
                  : 'No',
            },
            {
              field: 'Reemplazo de partes',
              data:
                registro.mantenimiento.resultados[1] === true
                  ? 'Si'
                  : 'No',
            },
            {
              field:
                'Repuestos según manual del fabricante, armador o importador',
              data:
                registro.mantenimiento.resultados[2] === true
                  ? 'Si'
                  : 'No',
            },
            {
              field:
                'Indicador de presión de reemplazo cumple con normas (NCh1180/5; NCh2056)',
              data:
                registro.mantenimiento.resultados[3] === true
                  ? 'Si'
                  : 'No',
            },
            {
              field: 'Examen interno del cilindro/tanque',
              data:
                registro.mantenimiento.resultados[4] === true
                  ? 'Si'
                  : 'No',
            },
            {
              field: 'Examen interno del cartucho/botellín',
              data:
                registro.mantenimiento.resultados[5] === true
                  ? 'Si'
                  : 'No',
            },
            {
              field: 'Recarga/reemplazo agente de extinción',
              data:
                registro.mantenimiento.resultados[6] === true
                  ? 'Si'
                  : 'No',
            },
            {
              field: 'Se adoptaron medidas de seguridad',
              data:
                registro.mantenimiento.resultados[7] === true
                  ? 'Si'
                  : 'No',
            },
            {
              field: 'Se usaron elementos de protección personal',
              data:
                registro.mantenimiento.resultados[8] === true
                  ? 'Si'
                  : 'No',
            },
            {
              field: 'Comentarios',
              data:
                registro.mantenimiento.resultadoComentario != undefined
                  ? registro.mantenimiento.resultadoComentario
                  : 'N/A',
            },
          ];
        }

        if (registro.recarga) {
          const estanqueidad = () => {
            if (registro.recarga.verificaEstanqueidad === 'si')
              return 'Si';
            if (registro.recarga.verificaEstanqueidad === 'no')
              return 'No';
            if (registro.recarga.verificaEstanqueidad === 'no aplica')
              return 'No aplica';
          };
          recargaData = [
            {
              field: 'Persona que realizó la recarga',
              data: registro.recarga.encargado,
            },
            {
              field: 'Normas Chilenas aplicadas',
              data: registro.recarga.normaChilena,
            },
            {
              field:
                'Se utilizo el manual del fabricante, armador o importador',
              data: registro.recarga.manual === true ? 'Si' : 'No',
            },
            {
              field: 'Agente de extinción utilizado',
              data: registro.recarga.agenteUtilizado,
            },
            {
              field: 'Masa extintor antes de la recarga (kg)',
              data: registro.recarga.masaExtAntes,
            },
            {
              field: 'Masa extintor después de la recarga (kg)',
              data: registro.recarga.masaExtDespues,
            },
            {
              field: 'Verificación de estanqueidad después de la recarga',
              data: estanqueidad(),
            },
            {
              field: 'Comentarios',
              data:
                registro.recarga.comentarios != undefined
                  ? registro.recarga.comentarios
                  : 'N/A',
            },
          ];
        }

        if (registro.presion) {
          presionData = [
            {
              field: 'Persona que realizó la prueba',
              data: registro.presion.encargado,
            },
            {
              field: 'Normas Chilenas aplicadas',
              data: registro.presion.normaChilena,
            },
            {
              field: 'Examen previo conforme a NCh2056, 5.1.3',
              data: registro.presion.examenPrevio === true ? 'Si' : 'No',
            },
            {
              field: 'Cilindro/tanque',
              data:
                registro.presion.resultados[0] === true
                  ? 'Aceptado'
                  : 'Rechazado',
            },
            {
              field: 'Cilindro/cartucho gas expelente',
              data:
                registro.presion.resultados[1] === true
                  ? 'Aceptado'
                  : 'Rechazado',
            },
            {
              field: 'Conjunto manguera',
              data:
                registro.presion.resultados[2] === true
                  ? 'Aceptado'
                  : 'Rechazado',
            },
            {
              field: 'Comentarios',
              data:
                registro.presion.resultadoComentario != undefined
                  ? registro.presion.resultadoComentario
                  : 'N/A',
            },
          ];
        }

        const razonesData = registro.razones;

        comentariosServicio();
        resultadosServicio();
        renderPDF(
          clienteData,
          extintorData,
          servicioData,
          representanteData,
          contactoData,
          comentariosData,
          resultadosData,
          conclusionData,
          razonesData,
          revisionData,
          mantenimientoData,
          recargaData,
          presionData
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
