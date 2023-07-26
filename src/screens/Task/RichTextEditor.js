import { useEffect, useRef, useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'

export default function RichTextEditor({ taskContent }) {
  const richText = useRef()
  const changeTaskContent = () => {
    if (taskContent !== '<p>&nbsp;</p>') {
      richText.current.setContentHTML(taskContent)
    } else {
      richText.current.setContentHTML('Không có dữ liệu')
    }
  }
  useEffect(() => {
    changeTaskContent()
  }, [taskContent])

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1 }}>
      <View style={styles.richTextContainer}>
        <ScrollView>
          <RichEditor
            ref={richText}
            androidHardwareAccelerationDisabled={true}
            style={styles.richTextEditorStyle}
            disabled
            scrollEnabled={true}
          />
        </ScrollView>
        <RichToolbar
          editor={richText}
          selectedIconTint="#873c1e"
          iconTint="#312921"
          actions={[
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.setStrikethrough,
            actions.setUnderline,
          ]}
          style={styles.richTextToolbarStyle}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  richTextContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    width: '100%',
  },

  richTextEditorStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#ccc',
    fontSize: 20,
    // maxHeight: 500,
    // overflow: 'scroll',
  },

  richTextToolbarStyle: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },
})
