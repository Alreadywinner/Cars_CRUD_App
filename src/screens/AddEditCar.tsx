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
  const [error, setErrors] = useState<Car>({
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
    setErrors({
      ...error,
      [entityName]: '',
    });
  };
  const validateCarData = () => {
    let colorError = '',
      modelError = '',
      makeError = '',
      categoryError = '',
      regNoError = '';

    if (carInfo.color === '') {
      colorError = 'Please Enter Color';
    }
    if (carInfo.model === '') {
      modelError = 'Please Enter Model';
    }
    if (carInfo.make === '') {
      makeError = 'Please Enter Make';
    }
    if (carInfo.category === '') {
      categoryError = 'Please Enter Category';
    }
    if (carInfo.registrationNo === '') {
      regNoError = 'Please Enter registration No';
    }
    setErrors({
      category: categoryError,
      registrationNo: regNoError,
      make: makeError,
      model: modelError,
      color: colorError,
    });
    if (
      categoryError !== '' ||
      regNoError !== '' ||
      makeError !== '' ||
      modelError !== '' ||
      colorError !== ''
    ) {
      return false;
    }
    return true;
  };
  const onSubmit = () => {
    if (validateCarData()) {
      params?.index
        ? dispatch(updateCar({index: params?.index, ...carInfo}))
        : dispatch(addCar(carInfo));
      navigation.goBack();
    }
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
          error={error.color !== '' ? true : false}
        />
        {error.color !== '' && (
          <HelperText type="error" visible={error.color !== '' ? true : false}>
            {error.color}
          </HelperText>
        )}
      </View>
      <View style={styles.input}>
        <TextInput
          label="Make"
          mode="outlined"
          onChangeText={text => onChange('make', text)}
          value={carInfo.make}
          error={error.make !== '' ? true : false}
        />
        {error.make !== '' && (
          <HelperText type="error" visible={error.make !== '' ? true : false}>
            {error.make}
          </HelperText>
        )}
      </View>
      <View style={styles.input}>
        <TextInput
          label="Model"
          mode="outlined"
          onChangeText={text => onChange('model', text)}
          value={carInfo.model}
          error={error.model !== '' ? true : false}
        />
        {error.model !== '' && (
          <HelperText type="error" visible={error.model !== '' ? true : false}>
            {error.model}
          </HelperText>
        )}
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
              error={error.category !== '' ? true : false}
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
      {error.category !== '' && (
        <HelperText type="error" visible={error.category !== '' ? true : false}>
          {error.category}
        </HelperText>
      )}
      <View style={styles.input}>
        <TextInput
          label="Registration No"
          mode="outlined"
          onChangeText={text => onChange('registrationNo', text)}
          value={carInfo.registrationNo}
          error={error.registrationNo !== '' ? true : false}
        />
        {error.registrationNo !== '' && (
          <HelperText
            type="error"
            visible={error.registrationNo !== '' ? true : false}>
            {error.registrationNo}
          </HelperText>
        )}
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
