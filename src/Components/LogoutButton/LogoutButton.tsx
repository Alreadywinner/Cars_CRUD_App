import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LogoutIcon} from '../../theme';
import {Text} from 'react-native-paper';
import styles from './LogoutButton.styles';
import {useAppDispatch} from '../../redux/redux';
import {logout} from '../../redux/slices/auth';

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => dispatch(logout())}>
      <LogoutIcon width={20} height={20} />
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
