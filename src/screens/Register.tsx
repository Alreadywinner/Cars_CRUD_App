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

  const [error, setErrors] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (entityName: string, text: string) => {
    setRegisterFormData({
      ...registerFormData,
      [entityName]: text.trim(),
    });
    setErrors({
      ...error,
      [entityName]: '',
    });
  };
  const validateUserData = () => {
    let emailError = '',
      passwordError = '',
      confirmPasswordError = '';
    const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (
      registerFormData.email === '' ||
      !emailReg.test(registerFormData.email)
    ) {
      emailError = 'Please Enter valid Email';
    }
    if (registerFormData.password === '') {
      passwordError = 'Please Enter Password';
    }
    if (registerFormData.confirmPassword === '') {
      confirmPasswordError = 'Please Enter confirm password';
    }
    if (registerFormData.password !== registerFormData.confirmPassword) {
      passwordError = 'Password dont match';
      confirmPasswordError = 'Password dont match';
    }
    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
    if (
      emailError !== '' ||
      passwordError !== '' ||
      confirmPasswordError !== ''
    ) {
      return false;
    }
    return true;
  };
  const onSubmit = () => {
    if (validateUserData()) {
      const {email, password} = registerFormData;
      dispatch(register({email, password}));
    }
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
          error={error.email !== '' ? true : false}
        />
        {error.email !== '' && (
          <HelperText type="error" visible={error.email !== '' ? true : false}>
            {error.email}
          </HelperText>
        )}
      </View>
      <View style={styles.input}>
        <TextInput
          label="Password"
          mode="outlined"
          onChangeText={text => onChange('password', text)}
          value={registerFormData.password}
          secureTextEntry
          error={error.password !== '' ? true : false}
        />
        {error.password !== '' && (
          <HelperText
            type="error"
            visible={error.password !== '' ? true : false}>
            {error.password}
          </HelperText>
        )}
      </View>
      <View style={styles.input}>
        <TextInput
          label="Confirm password"
          mode="outlined"
          onChangeText={text => onChange('confirmPassword', text)}
          value={registerFormData.confirmPassword}
          secureTextEntry
          error={error.confirmPassword !== '' ? true : false}
        />
        {error.confirmPassword !== '' && (
          <HelperText
            type="error"
            visible={error.confirmPassword !== '' ? true : false}>
            {error.confirmPassword}
          </HelperText>
        )}
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
