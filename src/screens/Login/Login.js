import React, { useState } from 'react'
import { StyleSheet ,Alert } from 'react-native'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import { theme } from '../../core/theme'
import { config } from '../../helpers/Config'
import axios from 'axios';
import { Snackbar } from 'react-native-paper';
import { UserInfor } from '../../helpers/UserInfor'
import { jsonRoot } from '../../helpers/JsonRoot'
export default function Login({ navigation }) {
  const [user, setUser] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const userlogin = {
      UserName :'AAA_SUPERADMIN2',
      Password :'123123',
      UserInfo: {}
    };

  //  const handleLogin = () => {
  //   const userlogin = {
  //     UserName :user.value,
  //     Password :password.value,
  //     UserInfo: {}
  //   };



  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
    axios({
      method: config.param.methodPOST,
      url: config.param.url +'/admin/doLogin',
      headers: headers,
      data: userlogin
    })
    .then(response => {
    const statusCode = response.data.statusCode;
    const statusText = response.data.statusText;
    if (statusCode === 5) {
      setErrorMessage(statusText);
    } else if (statusCode === 6) {
      setErrorMessage(statusText);
    } 
    else if (statusCode === 1) {
      setErrorMessage(statusText);
    } 
    else {
      UserInfor._id = response.data._id;
      UserInfor.activeFlag = response.data.activeFlag;
      UserInfor.admin = response.data.admin;
      UserInfor.agentId = response.data.agentId;
      UserInfor.agentInfo = response.data.agentInfo;
      UserInfor.email = response.data.email;
      UserInfor.fullName = response.data.fullName;
      UserInfor.fullRights = response.data.fullRights;
      UserInfor.phone = response.data.phone;
      UserInfor.root = response.data.root;
      UserInfor.token = response.data.token;
      UserInfor.userName = response.data.userName;
   
      jsonRoot.msg.header.root = response.data.root;

      jsonRoot.msg.header.Type = 'ADMIN';

      jsonRoot.msg.header.UserId = response.data._id;
      jsonRoot.msg.header.UserName = response.data.fullName;
      jsonRoot.msg.header.UserFullName = response.data.userName;
      jsonRoot.msg.header.FullRights = response.data.fullRights;
      jsonRoot.msg.header.IsRoot = response.data.root;
      jsonRoot.msg.header.IPAddress = response.data._id;
      jsonRoot.msg.header.ActionCode = 'INQUIRY';
      jsonRoot.msg.header.RqId = response.data.userName;
      jsonRoot.msg.header.AgentId = response.data.agentId;

      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      })
    }
    })
    .catch(error => {
        console.log('Error', error.message);
    });
  };
  return (
    <Background>
   
      <Logo />
      <Snackbar visible={!!errorMessage} onDismiss={() => setErrorMessage('')}>
        {errorMessage}
      </Snackbar>
      <TextInput
        label="Tài khoản"
        returnKeyType="next"
        value={user.value}
        onChangeText={(text) => setUser({ value: text, error: '' })}
        error={!!user.error}
        errorText={user.error}
      />
      <TextInput
        label="Mật khẩu"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      
      <Button mode="contained" onPress={handleLogin}>
        ĐĂNG NHẬP
      </Button>

    </Background>

    
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.login,
  },
})
