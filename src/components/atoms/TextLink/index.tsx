import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const TextLink = ({label, onPress, color = '#061C3D', fontSize = 14}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <Text style={[styles.link, {color, fontSize}]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextLink;

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    alignSelf: 'flex-end',
    marginVertical: 4,
    marginRight: 16,
  },
});