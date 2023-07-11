import React from 'react'
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Avatar, Card } from 'react-native-paper'
import { theme } from '../../core/theme'
import CardMainItem from './CardMainItem'

export default function Main({ navigation }) {
  const heightScreen = Dimensions.get('window').height
  return (
    <ImageBackground
      source={require('../../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <View
        style={{
          marginTop: 0.1 * heightScreen,
          marginBottom: 0.1 * heightScreen,
          flex: 1,
          padding: 20,
          width: '100%',
        }}
      >
        <CardMainItem />
      </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
  },
})
