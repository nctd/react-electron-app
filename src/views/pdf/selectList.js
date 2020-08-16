import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  itemContent: {
    flex: 1,
    fontSize: 10,
    // fontFamily: 'Lato',
  },
  box: {
    float: 'left',
    height: 10,
    width: 10,
    marginBottom: 1,
    marginRight: 4,
    border: 1,
    clear: 'both',
    borderColor: '#000000',
  },
  boxSelected: {
    float: 'left',
    height: 10,
    width: 10,
    marginBottom: 1,
    marginRight: 4,
    border: 1,
    clear: 'both',
    borderColor: '#000000',
    backgroundColor: '#000000',
  },
});

const selectList = ({ children }) => children;

export const ItemSelect = ({ children }) => (
  <View style={styles.item}>
    <Text style={styles.box} />
    <Text style={styles.itemContent}>{children}</Text>
  </View>
);
export const ItemSelected = ({ children }) => (
  <View style={styles.item}>
    <Text style={styles.boxSelected} />
    <Text style={styles.itemContent}>{children}</Text>
  </View>
);

export default selectList;
