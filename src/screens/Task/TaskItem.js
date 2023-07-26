import React from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { theme } from '../../core/theme'
import { Card, Chip, Text } from 'react-native-paper'

const TaskItem = ({ item, onPress }) => {
  const {
    TaskName,
    TaskStatus,
    TaskPriorityDesc,
    TaskProgress,
    TaskStatusDesc,
    TaskCreateDate,
    TaskDeliveryDate,
  } = item
  return (
    <TouchableOpacity ho onPress={onPress} style={styles.container}>
      <View style={styles.taskItem}>
        <View>
          <View style={styles.cardItem}>
            <Card.Title
              title={TaskPriorityDesc}
              style={styles.cardHeader}
              right={() => (
                <>
                  <View style={styles.cardHeaderRight}>
                    <Chip
                      textStyle={{ color: 'white' }}
                      style={{
                        backgroundColor: `${
                          TaskStatus === 'PROCESSING'
                            ? '#FFB302'
                            : TaskStatus === 'COMPLETED'
                            ? theme.colors.primary
                            : '#7B818A'
                        }`,
                      }}
                    >
                      {TaskStatusDesc}
                    </Chip>
                  </View>
                </>
              )}
            />

            <Card.Content style={styles.content}>
              <Text variant="titleLarge" style={styles.title} numberOfLines={2}>
                {TaskName}
              </Text>
              <View style={styles.row}>
                <Text variant="titleLarge" style={styles.label}>
                  Ngày tạo
                </Text>
                <Text variant="bodyMedium" style={styles.descSpe}>
                  {TaskCreateDate}
                </Text>
              </View>
              <View style={styles.row}>
                <Text variant="titleLarge" style={styles.label}>
                  Deadline
                </Text>
                <Text variant="bodyMedium" style={styles.descSpe}>
                  {TaskDeliveryDate}
                </Text>
              </View>
            </Card.Content>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const width = Dimensions.get('window').width - 40

const styles = StyleSheet.create({
  taskItem: {
    flex: 1,
    padding: 8,
    backgroundColor: theme.colors.white,
  },
  cardHeader: {
    backgroundColor: '#daf7ee',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  cardHeaderRight: {
    marginRight: 20,
  },
  content: {},
  cardItem: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderRadius: 10,
  },
  container: {
    padding: 0,
    margin: 0,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.colors.text,
    marginTop: 8,
    marginBottom: 8,
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

  desc: {
    fontSize: 18,
    fontWeight: 500,
    color: 'red',
  },
})

export default TaskItem
