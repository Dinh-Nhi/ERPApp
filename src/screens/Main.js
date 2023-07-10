import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Logo />
    
      <Button
        mode="contained"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        }
      >
        THOÁT
      </Button>
    </Background>
  )
}
