import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Card, Snackbar } from 'react-native-paper'
import { config } from '../../helpers/Config'
import { UserInfor } from '../../helpers/UserInfor'
import { jsonRoot } from '../../helpers/JsonRoot'
import axios from 'axios'
import { theme } from '../../core/theme'
export default function CardMainItem() {
  const [statistical, setStatistical] = useState(null)
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'api-license-key': config.param.apilicensekey,
    Authorization: UserInfor.token,
  }
  const getStatisticalERP = async () => {
    await axios({
      method: config.param.methodPOST,
      url: config.param.url + '/admin/Common/getPackageUseInfo',
      headers: headers,
      data: jsonRoot,
    })
      .then((response) => {
        setStatistical(response.data.data.PackageUse)
      })
      .catch((error) => {
        // Handle any errors here
        console.log('Error', error.message)
      })
  }

  useEffect(() => {
    getStatisticalERP()
  }, [])
  return (
    <>
      <Card style={styles.cardItem}>
        <Card.Content>
          <Card.Title
            title="Hóa đơn đầu vào"
            titleVariant="titleLarge"
            left={(props) => (
              <Avatar.Icon {...props} icon="ballot-recount" color="#fff" />
            )}
          />
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Tổng gói
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              {statistical?.InvSave?.Quantum !== undefined
                ? statistical?.InvSave?.Quantum
                : 'Unlimited'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Đã sử dụng
            </Text>
            <Text variant="bodyMedium" style={styles.descSpe}>
              {statistical?.InvSave?.Used !== undefined &&
                statistical?.InvSave?.Used}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Còn lại
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              {statistical?.InvSave?.Quantum !== undefined
                ? statistical?.InvSave?.Quantum - statistical?.InvSave?.Used
                : 'Unlimited'}
            </Text>
          </View>
        </Card.Content>
      </Card>
      <Card style={styles.cardItem}>
        <Card.Content>
          <Card.Title
            title="Ký file điện tử"
            titleVariant="titleLarge"
            left={(props) => (
              <Avatar.Icon {...props} icon="file-edit" color="#fff" />
            )}
          />
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Tổng gói
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              {statistical?.SignFile?.Quantum !== undefined
                ? statistical?.SignFile?.Quantum
                : 'Unlimited'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Đã sử dụng
            </Text>
            <Text variant="bodyMedium" style={styles.descSpe}>
              {statistical?.SignFile?.Used !== undefined &&
                statistical?.SignFile?.Used}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Còn lại
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              {statistical?.SignFile?.Quantum !== undefined
                ? statistical?.SignFile?.Quantum - statistical?.SignFile?.Used
                : 'Unlimited'}
            </Text>
          </View>
        </Card.Content>
      </Card>
      <Card style={styles.cardItem}>
        <Card.Content>
          <Card.Title
            title="Hợp đồng điện tử"
            titleVariant="titleLarge"
            left={(props) => (
              <Avatar.Icon {...props} icon="file-document" color="#fff" />
            )}
          />
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Tổng gói
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              {statistical?.EContract?.Quantum !== undefined
                ? statistical?.EContract?.Quantum
                : 'Unlimited'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Đã sử dụng
            </Text>
            <Text variant="bodyMedium" style={styles.descSpe}>
              {statistical?.EContract?.Used !== undefined &&
                statistical?.EContract?.Used}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Còn lại
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              {statistical?.EContract?.Quantum !== undefined
                ? statistical?.EContract?.Quantum - statistical?.EContract?.Used
                : 'Unlimited'}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </>
  )
}
const styles = StyleSheet.create({
  cardItem: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 500,
    color: theme.colors.text,
  },
  descSpe: {
    fontSize: 18,
    fontWeight: 500,
    color: '#3fb658',
  },
  desc: {
    fontSize: 18,
    fontWeight: 500,
    color: 'red',
  },
})
