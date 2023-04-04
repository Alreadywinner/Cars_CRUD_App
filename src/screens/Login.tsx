import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '@Redux/redux';
import {login} from '@Redux/slices/auth';
import {RootStackParamList} from '../types';

interface LoginFormData {
  email: string;
  password: string;
}
type LoginProps = StackScreenProps<RootStackParamList, 'Login'>;
const Login = ({navigation}: LoginProps) => {
  const dispatch = useAppDispatch();
  const {error} = useAppSelector(state => state.auth);

  const {control, handleSubmit} = useForm<LoginFormData>();
  const onSubmit = (data: LoginFormData) => {
    dispatch(login(data));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'handled'}>
      <Controller
        control={control}
        render={({
          field: {onChange, onBlur, value},
          fieldState: {error, invalid},
        }) => (
          <View style={styles.input}>
            <TextInput
              label="Email"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              error={invalid}
              placeholder={'user@example.com'}
            />
            {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
        name="email"
        rules={{required: 'Invalid email address', pattern: /^\S+@\S+$/i}}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({
          field: {onChange, onBlur, value},
          fieldState: {error, invalid},
        }) => (
          <View style={styles.input}>
            <TextInput
              label="Password"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              error={invalid}
            />
            {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
        name="password"
        rules={{required: 'Password is required'}}
        defaultValue=""
      />
      <View style={styles.row}>
        <Text>Don't have an account?</Text>
        <Button mode="text" onPress={() => navigation.navigate('Register')}>
          Sign up here
        </Button>
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}>
        Login
      </Button>
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 16,
  },
});

export default Login;
