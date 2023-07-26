import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Chip, List, ProgressBar } from 'react-native-paper'
import NotFoundData from '../../components/NotFoundData'
import { theme } from '../../core/theme'
import { config } from '../../helpers/Config'
import { jsonRoot } from '../../helpers/JsonRoot'
import { UserInfor } from '../../helpers/UserInfor'
import RichTextEditor from './RichTextEditor'

export default function TaskDetail({ navigation, route }) {
  const [task, setTask] = useState(null)
  const [expanded, setExpanded] = React.useState(true)

  const handlePress = () => setExpanded(!expanded)
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'api-license-key': config.param.apilicensekey,
    Authorization: UserInfor.token,
  }
  const getTask = async () => {
    await axios({
      method: config.param.methodPOST,
      url: config.param.url + `/admin/Task/detailTask/${route.params.item._id}`,
      headers: headers,
      data: jsonRoot,
    })
      .then((response) => {
        setTask(response.data.data)
        console.log('Hello', JSON.stringify(response.data.data))
      })
      .catch((error) => {
        // Handle any errors here
        console.log('Error', error.message)
      })
  }
  useEffect(() => {
    getTask()
  }, [route.params.item._id])

  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.section}>
            <Text style={styles.label}>Tên công việc</Text>
            <Text style={styles.desc}>{task?.TaskName}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Nội công việc</Text>
            <View style={styles.descView}>
              <RichTextEditor
                taskContent={decodeURIComponent(task?.TaskContent).toString()}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Ghi chú</Text>
            <View style={styles.descView}>
              {task?.TaskRemark !== undefined ? (
                <RichTextEditor
                  taskContent={decodeURIComponent(task?.TaskRemark).toString()}
                />
              ) : (
                <NotFoundData />
              )}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Dịch vụ liên quan</Text>
            <Text style={styles.desc}>
              {task?.TaskServiceRelate?.ProductName !== undefined ? (
                task?.TaskServiceRelate?.ProductName
              ) : (
                <NotFoundData />
              )}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Người giao việc</Text>
            <Text style={styles.desc}>
              {task?.TaskFromFullName !== '' ? (
                task?.TaskFromFullName
              ) : (
                <NotFoundData />
              )}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Loại công việc</Text>
            <Text style={styles.desc}>
              {task?.TaskType?.Name !== '' ? (
                task?.TaskType?.Name
              ) : (
                <NotFoundData />
              )}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Nhân viên phối hợp</Text>
            <View style={styles.desc}>
              {task?.TaskHandleCombinationUsers?.length > 0 ? (
                task?.TaskHandleCombinationUsers?.map((user) => (
                  <Text key={user?._id}>
                    <List.Item
                      title={user?.FullName}
                      titleStyle={{ fontWeight: 'bold' }}
                      description={user?.UserName}
                      left={(props) => <List.Icon {...props} icon="account" />}
                    />
                  </Text>
                ))
              ) : (
                <NotFoundData />
              )}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Nhân viên xử lý</Text>
            <View style={styles.desc}>
              {task?.TaskForUsers?.length > 0 ? (
                task?.TaskForUsers?.map((user) => (
                  <Text key={user?._id}>
                    <List.Item
                      title={user?.FullName}
                      titleStyle={{ fontWeight: 'bold' }}
                      description={user?.UserName}
                      left={(props) => <List.Icon {...props} icon="account" />}
                    />
                  </Text>
                ))
              ) : (
                <NotFoundData />
              )}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>File đính kèm</Text>
            <View style={styles.desc}>
              {task?.AttachFiles?.length > 0 ? (
                task?.AttachFiles?.map((user, idx) => (
                  <Text key={idx}>
                    <List.Item
                      title={user?.AttachFileName}
                      titleStyle={{ fontWeight: 'bold' }}
                      left={(props) => <List.Icon {...props} icon="file" />}
                      right={(props) => (
                        <List.Icon {...props} icon="download" />
                      )}
                    />
                  </Text>
                ))
              ) : (
                <NotFoundData />
              )}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>
              Tiến độ{' '}
              {task?.TaskProgress?.slice(0, task?.TaskProgress?.length - 1) !==
              '' ? (
                <Text style={styles.labelPersent}>
                  (
                  {task?.TaskProgress?.slice(0, task?.TaskProgress?.length - 1)}
                  %)
                </Text>
              ) : null}
            </Text>
            <View style={styles.desc}>
              {task?.TaskProgress?.slice(0, task?.TaskProgress?.length - 1) !==
              '' ? (
                <ProgressBar
                  style={styles.progressBar}
                  progress={
                    task?.TaskProgress?.slice(
                      0,
                      task?.TaskProgress?.length - 1
                    ) &&
                    task?.TaskProgress?.slice(
                      0,
                      task?.TaskProgress?.length - 1
                    ) / 100
                  }
                  color={theme.colors.primary}
                />
              ) : (
                <NotFoundData />
              )}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Trạng thái công việc</Text>
            <View style={styles.descView}>
              {task?.TaskStatusName !== '' ? (
                <Text>
                  {' '}
                  <Chip
                    textStyle={{ color: 'white' }}
                    style={{
                      backgroundColor: `${
                        task?.TaskStatus === 'PROCESSING'
                          ? '#FFB302'
                          : task?.TaskStatus === 'COMPLETED'
                          ? theme.colors.primary
                          : '#7B818A'
                      }`,
                    }}
                    icon={
                      task?.TaskStatus === 'PROCESSING'
                        ? 'progress-clock'
                        : task?.TaskStatus === 'COMPLETED'
                        ? 'progress-check'
                        : 'progress-pencil'
                    }
                  >
                    {task?.TaskStatusName}
                  </Chip>
                </Text>
              ) : (
                <NotFoundData />
              )}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Độ ưu tiên</Text>
            <Text style={styles.desc}>
              {task?.TaskPriority !== '' ? (
                task?.TaskPriority
              ) : (
                <NotFoundData />
              )}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Thời gian</Text>
            <Text style={styles.desc}>
              <List.Item
                title={`Ngày giao việc: ` + task?.TaskCreateDate}
                titleStyle={{ fontWeight: 'bold' }}
                left={(props) => <List.Icon {...props} icon="clock" />}
              />
              <List.Item
                title={`Ngày triển khai: ` + task?.TaskDeploymentDate}
                titleStyle={{ fontWeight: 'bold' }}
                left={(props) => <List.Icon {...props} icon="clock" />}
              />
              <List.Item
                title={
                  `Ngày nghiệm thu: ` +
                  (task?.TaskAcceptanceDate !== undefined
                    ? task?.TaskAcceptanceDate
                    : 'Chưa có dữ liệu')
                }
                titleStyle={{ fontWeight: 'bold' }}
                left={(props) => <List.Icon {...props} icon="clock" />}
              />
              <List.Item
                title={`Ngày bàn giao: ` + task?.TaskDeliveryDate}
                titleStyle={{ fontWeight: 'bold' }}
                left={(props) => <List.Icon {...props} icon="clock" />}
              />
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Khách hàng</Text>
            <View style={styles.desc}>
              {task?.Customer?.CustomerName !== undefined ? (
                <List.Item
                  title={task?.Customer?.CustomerName}
                  titleStyle={{ fontWeight: 'bold' }}
                  left={(props) => <List.Icon {...props} icon="account" />}
                />
              ) : (
                <NotFoundData />
              )}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Đại lý</Text>
            <View style={styles.desc}>
              {task?.AgentIds?.length > 0 ? (
                task?.AgentIds?.map((user) => (
                  <Text key={user?.AgentId}>
                    <List.Item
                      title={user?.AgentName}
                      titleStyle={{ fontWeight: 'bold' }}
                      left={(props) => (
                        <List.Icon {...props} icon="account-cog" />
                      )}
                    />
                  </Text>
                ))
              ) : (
                <NotFoundData />
              )}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Cộng tác viên</Text>
            <View style={styles.desc}>
              {task?.CollaboratorIds?.length > 0 ? (
                task?.CollaboratorIds?.map((user) => (
                  <Text key={user?.CollaboratorId}>
                    <List.Item
                      title={user?.CollaboratorName}
                      titleStyle={{ fontWeight: 'bold' }}
                      left={(props) => (
                        <List.Icon {...props} icon="account-plus" />
                      )}
                    />
                  </Text>
                ))
              ) : (
                <NotFoundData />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: theme.colors.white,
  },
  scrollView: {
    flex: 1,
    padding: 8,
  },
  section: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  itemWrap: {
    flex: 1,
  },
  progressBar: {
    marginTop: 10,
    marginBottom: 10,
  },
  labelPersent: {
    fontSize: 17,
    fontWeight: 400,
  },
  label: {
    fontWeight: 500,
    fontSize: 20,
    marginBottom: 6,
  },
  desc: {
    fontWeight: 400,
    fontSize: 14,
    color: '#333',
  },
  descView: {
    fontWeight: 400,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    color: '#333',
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#312921',
    marginBottom: 10,
  },

  htmlBoxStyle: {
    height: 200,
    width: 330,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },

  richTextContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    width: '100%',
    marginBottom: 10,
  },

  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#ccaf9b',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    display: 'none',
    backgroundColor: '#c6c3b3',
    borderColor: '#c6c3b3',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },
})
