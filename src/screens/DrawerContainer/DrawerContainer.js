import {
  DrawerToggleButton,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { IconButton } from 'react-native-paper'
import BackButton from '../../components/BackButton'
import CustomDrawer from '../../components/CustomDrawer'
import { theme } from '../../core/theme'
import { UserInfor } from '../../helpers/UserInfor'
import Login from '../Login/Login'
import Main from '../Main/Main'
import Task from '../Task/Task'
import UserProfile from '../UserProfile/UserProfile'

const Drawer = createDrawerNavigator()
const DrawerContainer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Login"
      drawerContent={(props) => {
        return (
          <>
            <CustomDrawer {...props} />
          </>
        )
      }}
      screenOptions={(props) => ({
        swipeEdgeWidth: 0,
        drawerStyle: {
          backgroundColor: theme.colors.white,
          width: 260,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
          display: 'none',
        },
        drawerLabelStyle: {
          color: theme.colors.text,
          marginLeft: -25,
          fontSize: 15,
        },
        headerLeft: () => <BackButton {...props} />,
        headerRight: () => <DrawerToggleButton tintColor="white" />,
      })}
    >
      <Drawer.Screen
        name="Main"
        options={(props) => ({
          title: 'Trang chủ',
          headerLeft: () => (
            <Text style={styles.welcomeMain}>
              Hello{' '}
              <Text style={styles.welcomeName}>{UserInfor?.userName}</Text>
            </Text>
          ),
          drawerIcon: () => <IconButton icon="home" style={{ margin: 0 }} />,
        })}
        component={Main}
      />
        <Drawer.Screen
        name="Task"
        options={(props) => ({
          title: 'Công việc',
          drawerIcon: () => <IconButton icon="home" style={{ margin: 0 }} />,
        })}
        component={Task}
      />
      <Drawer.Screen
        name="Login"
        options={{
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
        component={Login}
      />

      <Drawer.Screen
        name="UserProfile"
        options={{
          title: 'Thông tin cá nhân',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerItemStyle: { display: 'none' },
        }}
        component={UserProfile}
      />
    </Drawer.Navigator>
  )
}
export default DrawerContainer

const styles = StyleSheet.create({
  welcomeMain: {
    fontSize: 18,
    color: theme.colors.white,
    paddingLeft: 20,
  },
  welcomeName: {
    fontWeight: 'bold',
  },
})
