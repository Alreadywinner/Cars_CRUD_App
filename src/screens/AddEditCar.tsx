import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {Button, HelperText, Menu, TextInput} from 'react-native-paper';
import {useAppDispatch} from '@Redux/redux';
import {addCar, updateCar} from '@Redux/slices/cars';
import {RootStackParamList} from '../types';
interface Car {
  color: string;
  model: string;
  make: string;
  category: string;
  registrationNo: string;
}

type AddEditCarProps = StackScreenProps<RootStackParamList, 'AddEditCar'>;
const AddEditCar = ({navigation, route}: AddEditCarProps) => {
  const params = route?.params;
  const [visible, setVisible] = useState(false);
  const [carInfo, setCarInfo] = useState<Car>({
    color: '',
    model: '',
    make: '',
    category: '',
    registrationNo: '',
  });
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const dispatch = useAppDispatch();

  const onChange = (entityName: string, text: string) => {
    setCarInfo({
      ...carInfo,
      [entityName]: text,
    });
  };
  const onSubmit = () => {
    // const {data} =
    if (params?.index) {
      dispatch(updateCar({index: params?.index, ...carInfo}));
    } else {
      dispatch(addCar(carInfo));
    }
    navigation.goBack();
  };

  useEffect(() => {
    if (params) {
      const {color, model, make, category, registrationNo} = params;
      setCarInfo({
        color: color ? color : '',
        model: model ? model : '',
        make: make ? make : '',
        category: category ? category : '',
        registrationNo: registrationNo ? registrationNo : '',
      });
    }
  }, [params]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'handled'}>
      <View style={styles.input}>
        <TextInput
          label="Color"
          mode="outlined"
          onChangeText={text => onChange('color', text)}
          value={carInfo.color}
          // error={invalid}
        />
        {/* {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )} */}
      </View>
      <View style={styles.input}>
        <TextInput
          label="Make"
          mode="outlined"
          // onChangeText={onChange}
          value={carInfo.make}
          // error={invalid}
        />
        {/* {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )} */}
      </View>
      <View style={styles.input}>
        <TextInput
          label="Model"
          mode="outlined"
          onChangeText={text => onChange('model', text)}
          value={carInfo.model}
          // error={invalid}
        />
        {/* {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )} */}
      </View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Pressable onPress={openMenu} style={styles.input}>
            <TextInput
              label="Category"
              mode="outlined"
              editable={false}
              onPressIn={openMenu}
              value={carInfo.category}
              // error={invalid}
              // right={<TextInput.Icon onPress={openMenu} icon="eye" />}
            />
          </Pressable>
        }>
        {[
          {value: 'sedan', label: 'Sedan'},
          {value: 'suv', label: 'SUV'},
          {value: 'hatchback', label: 'Hatchback'},
        ]?.map(({label, value}) => (
          <Menu.Item
            key={value}
            onPress={() => {
              onChange('category', value);
              closeMenu();
            }}
            title={label}
          />
        ))}
      </Menu>
      <View style={styles.input}>
        <TextInput
          label="Registration No"
          mode="outlined"
          onChangeText={text => onChange('registrationNo', text)}
          value={carInfo.registrationNo}
          // error={invalid}
        />
        {/* {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )} */}
      </View>
      <Button mode="contained" onPress={() => onSubmit()} style={styles.button}>
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 16,
  },
});

export default AddEditCar;
