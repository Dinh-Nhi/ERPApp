import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List } from 'react-native-paper'
import { theme } from '../core/theme'

function NotFoundData(props) {
  return (
    <View style={styles.foundData}>
      <Text>
        {' '}
        <List.Item
          title={'Không có dữ liệu'}
          titleStyle={{ fontWeight: 400, fontSize: 14 }}
          left={(props) => <List.Icon {...props} icon="cancel" />}
        />
      </Text>
    </View>
  )
}

export default NotFoundData

const styles = StyleSheet.create({
  foundData: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: theme.colors.text,
    fontSize: 14,
  },
})
