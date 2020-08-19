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
const SelectEntry = ({ data, OptionSelect }) => {
  if (OptionSelect == 'ItemSelected')
    return (
      <View>
        <View style={styles.headerContainer}></View>
        <List>
          <ItemSelected style={styles.detailContainer}>
            {data}
          </ItemSelected>
        </List>
      </View>
    );
  else {
    return (
      <View>
        <View style={styles.headerContainer}></View>
        <List>
          <ItemSelect style={styles.detailContainer}>{data}</ItemSelect>
        </List>
      </View>
    );
  }
};

const obsData =
  'and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

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

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Extintor</Title>
      </View>
    </View>
    {clienteData.clienteData.extintorData.map(({ field, data }) => (
      <FormEntry field={field} key={field + data} data={data} />
    ))}

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Servicio realizado</Title>
      </View>
    </View>
    {clienteData.clienteData.servicioData.map(({ data, option }) => (
      <SelectEntry data={data} key={data + option} OptionSelect={option} />
    ))}

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Observaciones</Title>
      </View>
    </View>
    {/* <LargeTextEntry data={obsData} /> */}
    {clienteData.clienteData.comentariosData.map(({ field, data }) => (
      <FormEntry field={field} key={field + data} data={data} />
    ))}

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Conclusiones</Title>
      </View>
    </View>
    {clienteData.clienteData.resultadosData.map(({ field, data }) => (
      <FormEntry field={field} key={field + data} data={data} />
    ))}

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>El extintor se debe</Title>
      </View>
    </View>

    {clienteData.clienteData.conclusionData.map(({ data, option }) => (
      <SelectEntry data={data} key={data + option} OptionSelect={option} />
    ))}
    {/* <SelectEntry data={testData} OptionSelect="ItemSelect" />
    <SelectEntry data={testData2} OptionSelect="ItemSelect" />
    <SelectEntry data={testData3} OptionSelect="ItemSelect" /> */}

    <View style={styles.testContainer}>
      <View style={styles.testDetailColumn}>
        <Title>Razones</Title>
      </View>
    </View>
    <LargeTextEntry data={clienteData.clienteData.razonesData} />
  </View>
);

export default Detalle;
