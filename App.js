import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-native-paper'
import { theme } from './src/core/theme'
import DrawerContainer from './src/screens/DrawerContainer/DrawerContainer'

const App = () => {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <DrawerContainer />
      </NavigationContainer>
    </Provider>
  )
}
export default App
