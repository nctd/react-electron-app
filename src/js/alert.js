import { Modal } from 'antd';

const { ipcRenderer } = window.require('electron');

export const showAlert = () => {
  ipcRenderer.on('add-reply', (e, type, err) => {
    if (type === 'success') {
      return Modal.success({
        title: 'Operación exitosa',
        content: 'Registro de cliente guardado',
      });
    } else {
      return Modal.error({
        title: 'Ocurrio un error al guardar',
        content: `${err}`,
      });
    }
  });
};
