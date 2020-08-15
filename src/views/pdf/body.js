import React from 'react';

import Title from './title';
import List, { Item } from './list';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
    '@media max-width: 400': {
      paddingTop: 10,
      paddingLeft: 0,
    },
  },
  entryContainer: {
    // marginBottom: 10,
  },
  detailContainer: {
    flexDirection: 'row',
  },

  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  title: {
    fontSize: 11,
    color: 'black',
    textDecoration: 'none',
    // fontFamily: 'Lato Bold',
  },
  testContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
  },
  testDetailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },

  MarkUpContainer: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    borderWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    borderColor: '#000000',
    // borderTopColor: '#000000',
    borderStyle: 'solid',
    alignItems: 'stretch',
  },
  textFont: {
    fontSize: 10,
  },
});

const ExperienceEntry = ({ field, data }) => {
  const title = `${field}: ${data}`;
  return (
    <View style={styles.entryContainer}>
      <View style={styles.headerContainer}></View>
      <List>
        <Item style={styles.detailContainer}>{title}</Item>
      </List>
    </View>
  );
};
const LargeTextEntry = ({ data }) => {
  return (
    <View style={styles.entryContainer}>
      <View style={styles.headerContainer}></View>
      <List>
        <Item style={styles.detailContainer}>{data}</Item>
      </List>
    </View>
  );
};

const clienteData = [
  {
    field: 'Nombre o razon social del cliente',
    data: 'Nicolas Torres',
  },
  {
    field: 'Direccion',
    data: 'La floresta 3 pasaje 13',
  },
  {
    field: 'Comuna',
    data: 'Concepcion',
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

const extintorData = [
  {
    field: 'Numero de identificacion del extintor',
    data: 'MKVB2132131',
  },
  {
    field: 'Marca del extintor',
    data: 'TOYOTOMI',
  },
  {
    field: 'Fecha del servicio',
    data: '23/07/2020',
  },
  {
    field: 'Nombre de la persona que realizo el servicio',
    data: 'Nicolas Torres Diaz',
  },
];

const servicioData = [
  {
    data: 'Revision',
  },
  {
    data: 'Mantenimiento',
  },
  {
    data: 'Recarga',
  },
  {
    data: 'Prueba de presion interna',
  },
];

const obsData =
  'and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

const Experience = () => (
  <View style={styles.container}>
    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Datos del cliente</Title>
      </View>
    </View>
    {clienteData.map(({ field, data }) => (
      <ExperienceEntry field={field} key={field + data} data={data} />
    ))}

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Extintor</Title>
      </View>
    </View>
    {extintorData.map(({ field, data }) => (
      <ExperienceEntry field={field} key={field + data} data={data} />
    ))}

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Servicio realizado</Title>
      </View>
    </View>
    {servicioData.map(({ data }) => (
      <LargeTextEntry data={data} />
    ))}

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Observaciones</Title>
      </View>
    </View>
    <LargeTextEntry data={obsData} />

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Conclusiones</Title>
      </View>
    </View>
    <LargeTextEntry data={obsData} />

    <View style={styles.MarkUpContainer}>
      {/* <View style={styles.testDetailColumn}> */}
      <Text style={styles.textFont}>Mantener en servicio</Text>
      {/* </View> */}
    </View>
    <View style={styles.MarkUpContainer}>
      <Text style={styles.textFont}>
        Retirar de servicio para mantenimiento y/o prueba de presion
        interna
      </Text>
    </View>
    <View style={styles.MarkUpContainer}>
      <Text style={styles.textFont}>Ser dado de baja</Text>
    </View>

    <LargeTextEntry data={obsData} />
    {/* RAZONES */}
    {/* <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Razones</Title>
      </View>
    </View> */}
  </View>
);

export default Experience;
