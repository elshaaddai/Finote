import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../atoms/Button';

const CardKebutuhan = ({
  title,
  description,
  amount,
  onPress,
  onDelete,
  showDelete = true,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {showDelete && (
          <TouchableOpacity onPress={onDelete}>
            <Icon name="delete" size={20} color="red" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.footer}>
        <Text style={styles.amount}>Rp.{amount}</Text>
        <Button label="Pengeluaran" onPress={onPress} width={150} height={45} />
      </View>
    </View>
  );
};

export default CardKebutuhan;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderColor: '#001E4D',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    width: '97%',
    alignSelf: 'center',
    height: 150,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  description: {
    color: '#555',
    fontSize: 14,
    marginVertical: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontWeight: '600',
    fontSize: 14,
  },
});
