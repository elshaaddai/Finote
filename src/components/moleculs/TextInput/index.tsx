import {StyleSheet, Text, View, TextInput as Input} from 'react-native';
import React from 'react';

const TextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  customStyle,
  secureTextEntry,
}) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Input
        placeholder={placeholder}
        style={[styles.input, customStyle]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: '#000',
    marginHorizontal: 17,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 17,
  },
});