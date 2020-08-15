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
  degree: {
    // fontFamily: 'Lato',
    fontSize: 10,
  },
  candidate: {
    // fontFamily: 'Lato Italic',
    fontSize: 10,
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

const representanteData = [
  {
    field: 'Representante de la empresa',
    data: 'Nicolas Torres',
  },
  {
    field: 'Telefono',
    data: '+56956517901',
  },
  {
    field: 'Correo electrónico',
    data: 'nicotorresdiaz19@gmail.com',
  },
];
const contactoData = [
  {
    field: 'Contacto en la empresa',
    data: 'Nicolas Torres',
  },
  {
    field: 'Telefono',
    data: '+56956517901',
  },
  {
    field: 'Correo electrónico',
    data: 'nicotorresdiaz19@gmail.com',
  },
];

const ExperienceEntry = ({ field, data }) => {
  const title = `${field}: \n ${data}`;
  return (
    <List>
      <Item style={styles.school}>{title}</Item>
    </List>
  );
};
export default () => (
  <View style={styles.container}>
    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Representante</Title>
      </View>
    </View>
    {representanteData.map(({ field, data }) => (
      <ExperienceEntry field={field} key={field + data} data={data} />
    ))}
    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Contacto</Title>
      </View>
    </View>
    {contactoData.map(({ field, data }) => (
      <ExperienceEntry field={field} key={field + data} data={data} />
    ))}
  </View>
);
