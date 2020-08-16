import { Modal } from 'antd';
import { renderPDF } from '../views/pdf/index-pdf';
const { ipcRenderer } = window.require('electron');

export const showAlert = () => {
  ipcRenderer.on('add-reply', (e, type, cliente, err) => {
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

      renderPDF(clienteData);
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
  });
};
