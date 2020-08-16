import React from 'react';

import {
  Text,
  Document,
  Font,
  Page,
  StyleSheet,
  Image,
  View,
} from '@react-pdf/renderer';
import Header from './header';
import Detalle from './detalle';
import Education from './education';

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

const Resume = (clienteData) => (
  <Page style={styles.page}>
    <Header />
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image src="./public/sercoin.png" style={styles.image} />
        <Education />
      </View>
      <Detalle clienteData={clienteData} />
    </View>
  </Page>
);

const Output = (clienteData) => (
  <Document
    author="SERCOIN"
    keywords="awesome, resume, start wars"
    subject="Informe al cliente"
    title="Informe"
  >
    <Resume size="A4" clienteData={clienteData} />
  </Document>
);
const xf = Date.now();

export const renderPDF = (clienteData) => {
  ReactPDF.render(
    <Output clienteData={clienteData} />,
    `${__dirname}/informe-${xf}.pdf`
  );
};
