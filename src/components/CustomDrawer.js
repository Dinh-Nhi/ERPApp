import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import React from 'react'
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { jsonRoot } from '../helpers/JsonRoot'
import { UserInfor } from '../helpers/UserInfor'
import { theme } from '../core/theme'
import { StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'

export default function CustomDrawer(props) {
  const {
    navigation: { navigate },
  } = props
  const handleLogout = () => {
    // Info User
    UserInfor._id = ''
    UserInfor.activeFlag = ''
    UserInfor.admin = ''
    UserInfor.agentId = ''
    UserInfor.agentInfo = ''
    UserInfor.email = ''
    UserInfor.fullName = ''
    UserInfor.fullRights = ''
    UserInfor.phone = ''
    UserInfor.root = ''
    UserInfor.token = ''
    UserInfor.userName = ''
    // Info JsonRoot

    jsonRoot.msg.header.root = ''

    jsonRoot.msg.header.Type = ''

    jsonRoot.msg.header.UserId = ''
    jsonRoot.msg.header.UserName = ''
    jsonRoot.msg.header.UserFullName = ''
    jsonRoot.msg.header.FullRights = ''
    jsonRoot.msg.header.IsRoot = ''
    jsonRoot.msg.header.IPAddress = ''
    jsonRoot.msg.header.ActionCode = ''
    jsonRoot.msg.header.RqId = ''
    jsonRoot.msg.header.AgentId = ''
    navigate('Login')
    // props.navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Login' }],
    // })
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: theme.colors.primary }}
      >
        <ImageBackground
          source={require('../assets/background_dot.png')}
          resizeMode="repeat"
          style={styles.background}
        >
          <View style={styles.headerWrap}>
            <Image
              source={require('../assets/user-profile.png')}
              style={styles.avatarUser}
            />
            <Text style={styles.txtName}>{UserInfor?.userName}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.txtEmail}>{UserInfor?.email}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.drawerItem}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.drawerBottom}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('UserProfile')}
          style={{ paddingVertical: 8 }}
        >
          <View style={styles.row}>
            <IconButton icon="account-check" style={{ margin: 0 }} />
            <Text style={styles.itemMenu}>Thông tin người dùng</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={{ paddingVertical: 8 }}>
          <View style={styles.row}>
            <IconButton icon="logout-variant" style={{ margin: 0 }} />
            <Text style={styles.itemMenu}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarUser: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  headerWrap: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  txtName: {
    color: theme.colors.white,
    fontSize: 18,
    marginBottom: 5,
  },
  txtEmail: {
    color: theme.colors.white,
    marginRight: 5,
  },
  itemMenu: {
    fontSize: 15,
    marginLeft: 5,
  },
  drawerBottom: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  drawerItem: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingTop: 10,
  },
})
