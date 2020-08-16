import React from 'react';

import { Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  title: {
    // fontFamily: 'Lato Bold',
    fontSize: 11,
    marginBottom: 1,
    textTransform: 'uppercase',
  },
});

const Title = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

export default Title;
