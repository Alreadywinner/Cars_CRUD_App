import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '@Redux/redux';
import {Car, deleteCar} from '@Redux/slices/cars';
import {RootStackParamList} from '../types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BinIcon, EditIcon} from '../theme';

type DashboardProps = StackScreenProps<RootStackParamList, 'Dashboard'>;
const Dashboard = ({navigation}: DashboardProps) => {
  const {cars} = useAppSelector(state => state.cars);
  const {email} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const showAlert = (index: number) => {
    Alert.alert(
      'Delete this item?',
      'Are you sure',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, delete',
          onPress: () => dispatch(deleteCar({index})),
          style: 'default',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  useCallback(() => navigation.setOptions({title: email}), [navigation, email]);
  const renderCarItem = ({item, index}: {item: Car; index: number}) => {
    return (
      <View style={[styles.row, styles.between, styles.borderBottom]}>
        <Text variant="titleMedium">
          {item.make} - {item.model}
        </Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.actionButtons}
            onPress={() => navigation.navigate('AddEditCar', {index, ...item})}>
            <EditIcon color={'#2844B2'} width={20} height={22} />
            <Text>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButtons}
            onPress={() => showAlert(index)}>
            <BinIcon color={'#dc3545'} />
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.titleText}>
        Registered cars: {cars?.length}
      </Text>
      <FlatList
        data={cars}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderCarItem}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddEditCar')}>
        Add a car
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  titleText: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  between: {
    justifyContent: 'space-between',
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    padding: 10,
  },
  borderBottom: {
    borderBottomColor: '#B2B2B2',
    borderBottomWidth: 3,
  },
});

export default Dashboard;
