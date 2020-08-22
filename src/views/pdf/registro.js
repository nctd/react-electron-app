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

const serviceTitle = (data, { title }) => {
  if (data.length > 0) {
    return (
      <View style={styles.testContainer}>
        <View style={styles.testDetailColumn}>
          <Title>{title}</Title>
        </View>
      </View>
    );
  }
};

const serviceTitleResultado = (data, { title }) => {
  if (data.length > 0) {
    return (
      <View style={styles.testContainer} break>
        <View style={styles.testDetailColumn}>
          <Title>{title}</Title>
        </View>
      </View>
    );
  }
};

const serviceInfo = (data, { cant }) => {
  if (data.length > 0) {
    return data
      .splice(0, cant)
      .map(({ field, data }) => (
        <FormEntry field={field} key={field + data} data={data} />
      ));
  }
};

const serviceResultado = (data) => {
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
    {/* REVISION */}
    {serviceTitle(clienteData.clienteData.revisionData, {
      title: 'Revisión',
    })}

    {serviceInfo(clienteData.clienteData.revisionData, { cant: 5 })}

    {serviceTitleResultado(clienteData.clienteData.revisionData, {
      title: 'Resultados revisión',
    })}

    {serviceResultado(clienteData.clienteData.revisionData)}
    {console.log(clienteData.clienteData.mantenimientoData)}
    {/* MANTENIMIENTO */}
    {serviceTitle(clienteData.clienteData.mantenimientoData, {
      title: 'Mantenimiento',
    })}

    {serviceInfo(clienteData.clienteData.mantenimientoData, { cant: 5 })}

    {serviceTitleResultado(clienteData.clienteData.mantenimientoData, {
      title: 'Acciones realizadas',
    })}

    {serviceResultado(clienteData.clienteData.mantenimientoData)}

    {/* RECARGA */}
    {serviceTitle(clienteData.clienteData.recargaData, {
      title: 'Recarga',
    })}

    {serviceResultado(clienteData.clienteData.recargaData)}

    {/* PRUEBA DE PRESION INTERNA */}
    {serviceTitle(clienteData.clienteData.presionData, {
      title: 'Prueba de presión interna',
    })}

    {serviceInfo(clienteData.clienteData.presionData, { cant: 3 })}

    {serviceTitleResultado(clienteData.clienteData.presionData, {
      title: 'Resultados prueba',
    })}

    {serviceResultado(clienteData.clienteData.presionData)}
  </View>
);

export default RegistroCliente;