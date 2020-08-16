import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import Title from './title';
import List, { Item } from './list';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  school: {
    // fontFamily: 'Lato Bold',
    fontSize: 6,
    marginBottom: 10,
  },
  testContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    marginBottom: 10,
  },
  testDetailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },
});

const FormEntry = ({ field, data }) => {
  const title = `${field}: \n ${data}`;
  return (
    <List>
      <Item style={styles.school}>{title}</Item>
    </List>
  );
};
const DatosEmpresa = ({ clienteData }) => (
  <View style={styles.container}>
    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Representante</Title>
      </View>
    </View>
    {clienteData.clienteData.representanteData.map(({ field, data }) => (
      <FormEntry field={field} key={field + data} data={data} />
    ))}
    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Contacto</Title>
      </View>
    </View>
    {clienteData.clienteData.contactoData.map(({ field, data }) => (
      <FormEntry field={field} key={field + data} data={data} />
    ))}
  </View>
);
export default DatosEmpresa;
