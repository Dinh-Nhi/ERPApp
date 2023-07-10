import React from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Button from '../../components/Button'

export default function Main({ navigation }) {
  return (
    <Background>
      <Logo />
    
      <Button
        mode="contained"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        }
      >
        THOÁT
      </Button>
    </Background>
  )
}
