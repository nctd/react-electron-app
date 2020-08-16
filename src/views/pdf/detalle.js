import React from 'react';

import Title from './title';
import List, { Item } from './list';
import { ItemSelect, ItemSelected } from './selectList';
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
  detailContainer: {
    flexDirection: 'row',
  },

  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
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
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
    alignItems: 'stretch',
  },
  textFont: {
    fontSize: 10,
  },
});

const FormEntry = ({ field, data }) => {
  const title = `${field}: ${data}`;
  return (
    <View>
      <View style={styles.headerContainer}></View>
      <List>
        <Item style={styles.detailContainer}>{title}</Item>
      </List>
    </View>
  );
};
const LargeTextEntry = ({ data }) => {
  return (
    <View>
      <View style={styles.headerContainer}></View>
      <List>
        <Item style={styles.detailContainer}>{data}</Item>
      </List>
    </View>
  );
};
const SelectEntry = ({ data }) => {
  return (
    <View>
      <View style={styles.headerContainer}></View>
      <List>
        <ItemSelect style={styles.detailContainer}>{data}</ItemSelect>
      </List>
    </View>
  );
};

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

const testData = 'Mantener en servicio';
const testData2 =
  'Retirar de servicio para mantenimiento y/o prueba de presion interna';
const testData3 = 'Ser dado de baja';

const Detalle = ({ clienteData }) => (
  <View style={styles.container}>
    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Datos del cliente</Title>
      </View>
    </View>
    {clienteData.clienteData.clienteData.map(({ field, data }) => (
      <FormEntry field={field} key={field + data} data={data} />
    ))}
    {console.log(clienteData.clienteData.clienteData)}

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Extintor</Title>
      </View>
    </View>
    {extintorData.map(({ field, data }) => (
      <FormEntry field={field} key={field + data} data={data} />
    ))}

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Servicio realizado</Title>
      </View>
    </View>
    {servicioData.map(({ data }) => (
      <SelectEntry data={data} />
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

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>El extintor se debe</Title>
      </View>
    </View>

    <SelectEntry data={testData} />
    <SelectEntry data={testData2} />
    <SelectEntry data={testData3} />

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Razones</Title>
      </View>
    </View>
    <LargeTextEntry data={obsData} />
  </View>
);

export default Detalle;
