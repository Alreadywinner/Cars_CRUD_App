import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import {useAppDispatch} from '@Redux/redux';
import {register} from '@Redux/slices/auth';
import {RootStackParamList} from '../types';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}
type RegisterProps = StackScreenProps<RootStackParamList, 'Register'>;

const Register = ({navigation}: RegisterProps) => {
  const dispatch = useAppDispatch();
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const onSubmit = () => {
    const {email, password} = registerFormData;
    dispatch(register({email, password}));
  };

  const onChange = (entityName: string, text: string) => {
    setRegisterFormData({
      ...registerFormData,
      [entityName]: text.trim(),
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'handled'}>
      <View style={styles.input}>
        <TextInput
          label="Email"
          mode="outlined"
          onChangeText={text => onChange('email', text)}
          value={registerFormData.email}
          keyboardType="email-address"
          // error={invalid}
        />
        {/* <HelperText type="error" visible={hasErrors('email')}>
          Please Enter a valid email
        </HelperText> */}
      </View>
      <View style={styles.input}>
        <TextInput
          label="Password"
          mode="outlined"
          onChangeText={text => onChange('password', text)}
          value={registerFormData.password}
          secureTextEntry
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
          label="Confirm password"
          mode="outlined"
          onChangeText={text => onChange('confirmPassword', text)}
          value={registerFormData.confirmPassword}
          secureTextEntry
          // error={invalid}
        />
      </View>
      <View style={styles.row}>
        <Text>Already have an account?</Text>
        <Button mode="text" onPress={() => navigation.navigate('Login')}>
          Sign in here
        </Button>
      </View>
      <Button mode="contained" onPress={() => onSubmit()} style={styles.button}>
        Register
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Register;
