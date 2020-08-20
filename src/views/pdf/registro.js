import React from 'react';

import Title from './title';
import List, { Item } from './list';
import { ItemSelect, ItemSelected } from './selectList';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

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
    fontSize: 2,
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

const revisionTitle = (data) => {
  if (data.length > 0) {
    return (
      <View style={styles.testContainer}>
        <View style={styles.testDetailColumn}>
          <Title>Revisión</Title>
        </View>
      </View>
    );
  }
};
const revisionInfo = (data) => {
  if (data.length > 0) {
    return data
      .splice(0, 5)
      .map(({ field, data }) => (
        <FormEntry field={field} key={field + data} data={data} />
      ));
  }
};

const revisionTitleResultado = (data) => {
  if (data.length > 0) {
    return (
      <View style={styles.testContainer} break>
        <View style={styles.testDetailColumn}>
          <Title>Resultados revisión</Title>
        </View>
      </View>
    );
  }
};

const revisionResultado = (data) => {
  if (data.length > 0) {
    return data.map(({ field, data }) => (
      <FormEntry field={field} key={field + data} data={data} />
    ));
  }
};

const RegistroCliente = ({ clienteData }) => (
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
    {clienteData.clienteData.extintorData
      .slice(0, 8)
      .map(({ field, data }) => (
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
    {revisionTitle(clienteData.clienteData.revisionData)}
    {revisionInfo(clienteData.clienteData.revisionData)}
    {revisionTitleResultado(clienteData.clienteData.revisionData)}
    {revisionResultado(clienteData.clienteData.revisionData)}
    {console.log(clienteData.clienteData.revisionData)}

    {/* {clienteData.clienteData.mantenimientoData.length > 0 ? (
      <View style={styles.testContainer}>
        <View style={styles.testDetailColumn}>
          <Title>Mantenimiento</Title>
        </View>
      </View>
    ) : null}
    {clienteData.clienteData.mantenimientoData.length > 0
      ? clienteData.clienteData.revisionData.map(({ field, data }) => (
          <FormEntry field={field} key={field + data} data={data} />
        ))
      : null}
    {clienteData.clienteData.recargaData.length > 0 ? (
      <View style={styles.testContainer} break>
        <View style={styles.testDetailColumn}>
          <Title>Recarga</Title>
        </View>
      </View>
    ) : null}
    {clienteData.clienteData.recargaData.length > 0
      ? clienteData.clienteData.revisionData.map(({ field, data }) => (
          <FormEntry field={field} key={field + data} data={data} />
        ))
      : null}
    {clienteData.clienteData.presionData.length > 0 ? (
      <View style={styles.testContainer} break>
        <View style={styles.testDetailColumn}>
          <Title>Prueba de presión interna</Title>
        </View>
      </View>
    ) : null}
    {clienteData.clienteData.presionData.length > 0
      ? clienteData.clienteData.revisionData.map(({ field, data }) => (
          <FormEntry field={field} key={field + data} data={data} />
        ))
      : null} */}
  </View>
);

export default RegistroCliente;
