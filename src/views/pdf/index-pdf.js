import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Text,
  Document,
  Page,
  StyleSheet,
  Image,
  View,
  PDFViewer,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { Button } from 'antd';
import Header from './header';
import Detalle from './detalle';
import DatosEmpresa from './datosEmpresa';
import RegistroCliente from './registro';

const ReactPDF = window.require('@react-pdf/renderer');

const styles = StyleSheet.create({
  page: {
    padding: 28,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column',
    },
  },
  image: {
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
    '@media max-width: 400': {
      width: '100%',
      paddingRight: 0,
    },
    '@media orientation: landscape': {
      width: 200,
    },
  },
});

const Registro = (
  clienteData,
  extintorData,
  servicioData,
  representanteData,
  contactoData,
  revisionData,
  mantenimientoData,
  recargaData,
  presionData
) => (
  <Page style={styles.page}>
    <Header title={'Registro de cliente'} />
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image src={'sercoinb.png'} style={styles.image} />
        <DatosEmpresa
          clienteData={clienteData}
          representanteData={representanteData}
          contactoData={contactoData}
        />
      </View>
      <RegistroCliente
        clienteData={clienteData}
        extintorData={extintorData}
        servicioData={servicioData}
        revisionData={revisionData}
        mantenimientoData={mantenimientoData}
        recargaData={recargaData}
        presionData={presionData}
      />
    </View>
  </Page>
);

const Resume = (
  clienteData,
  extintorData,
  servicioData,
  representanteData,
  contactoData,
  comentariosData,
  resultadosData,
  conclusionData,
  razonesData
) => (
  <Page style={styles.page}>
    <Header title={'Informe al cliente'} />
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image src={'sercoinb.png'} style={styles.image} />
        <DatosEmpresa
          clienteData={clienteData}
          representanteData={representanteData}
          contactoData={contactoData}
        />
      </View>
      <Detalle
        clienteData={clienteData}
        extintorData={extintorData}
        servicioData={servicioData}
        comentariosData={comentariosData}
        resultadosData={resultadosData}
        conclusionData={conclusionData}
        razonesData={razonesData}
      />
    </View>
  </Page>
);

const Output = (
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
) => (
  <Document
    author="SERCOIN"
    keywords="informe,registro"
    subject="Informe al cliente"
    title="Informe"
  >
    <Registro
      size="A4"
      clienteData={clienteData}
      extintorData={extintorData}
      servicioData={servicioData}
      representanteData={representanteData}
      contactoData={contactoData}
      revisionData={revisionData}
      mantenimientoData={mantenimientoData}
      recargaData={recargaData}
      presionData={presionData}
    />

    <Resume
      size="A4"
      clienteData={clienteData}
      extintorData={extintorData}
      servicioData={servicioData}
      representanteData={representanteData}
      contactoData={contactoData}
      comentariosData={comentariosData}
      resultadosData={resultadosData}
      conclusionData={conclusionData}
      razonesData={razonesData}
    />
  </Document>
);
const date = Date.now();

export const renderPDF = (
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
  presionData,
  reg
) => {
  ReactDOM.render(
    <div>
      <PDFViewer style={{ width: '100%', height: '800px' }}>
        <Output
          clienteData={clienteData}
          extintorData={extintorData}
          servicioData={servicioData}
          representanteData={representanteData}
          contactoData={contactoData}
          comentariosData={comentariosData}
          resultadosData={resultadosData}
          conclusionData={conclusionData}
          razonesData={razonesData}
          revisionData={revisionData}
          mantenimientoData={mantenimientoData}
          recargaData={recargaData}
          presionData={presionData}
        />
      </PDFViewer>
      <PDFDownloadLink
        document={
          <Output
            clienteData={clienteData}
            extintorData={extintorData}
            servicioData={servicioData}
            representanteData={representanteData}
            contactoData={contactoData}
            comentariosData={comentariosData}
            resultadosData={resultadosData}
            conclusionData={conclusionData}
            razonesData={razonesData}
            revisionData={revisionData}
            mantenimientoData={mantenimientoData}
            recargaData={recargaData}
            presionData={presionData}
          />
        }
        fileName={`informe-${reg}-${date}`}
      >
        <Button type="primary">Descargar PDF</Button>
      </PDFDownloadLink>
    </div>,
    document.getElementById('root')
    // `${__dirname}/informe-${reg}-${date}.pdf`
  );
};
