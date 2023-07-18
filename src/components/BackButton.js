import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'
import { theme } from '../core/theme'

export default function BackButton(props) {
  const {
    navigation: { goBack },
  } = props
  return (
    <TouchableOpacity onPress={() => goBack()} style={styles.container}>
      <IconButton
        icon="arrow-left"
        style={styles.iconBack}
        iconColor="white"
        size={24}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 10 + getStatusBarHeight(),
    // left: 4,
  },

  iconBack: {
    marginRight: 0,
    color: theme.colors.white,
  },
})
