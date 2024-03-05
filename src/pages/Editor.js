/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { img_url } from 'src/common/Service'
import { NewsImageUpload } from 'src/store/slices/LearningSlice'

const Editor = ({ value, onChange, name, view }) => {
  // Check if running on the client side
  const isClient = typeof window !== 'undefined'

  // Return null during server-side rendering
  if (!isClient) {
    return null
  }

  const editorRef = useRef()
  const { CKEditor, Editor } = editorRef.current || {}
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  const [editorData, setEditorData] = useState('')
  const dispatch = useDispatch()

  // ** useEffect to import editor
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      Editor: require('ckeditor5-custom-build/build/ckeditor')
    }
  }, [])

  useEffect(() => {
    setIsLayoutReady(true)
    // focusEditor?.current?.focus()
  }, [])

  // ** function to upload image to the database
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData()
          loader.file.then(file => {
            body.append('NewsImage', file)
            dispatch(NewsImageUpload(body))
              .then(res => {
                resolve({
                  default: `${img_url}${res.payload.path}`
                })
              })
              .catch(err => {
                reject(err)
              })
          })
        })
      }
    }
  }

  // ** function to handle image plugin in the editor
  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
      return uploadAdapter(loader)
    }
  }
  const isDark = JSON.parse(localStorage.getItem('settings'))?.mode == 'dark' ? true : false

  function TablePlugin(editor) {
    editor.plugins.get('').createUploadAdapter = loader => {
      return uploadAdapter(loader)
    }
  }

  useEffect(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(editorData, 'text/html')

    const tables = doc.querySelectorAll('.table table')

    tables.forEach(table => {
      table.style.border = '1px solid black'
      table.style.borderCollapse = 'seprate'

      const cells = table.querySelectorAll('td')
      cells.forEach(cell => {
        cell.style.border = '1px solid black'
        cell.style.padding = '8px'
      })
    })
    onChange(doc.body.innerHTML)
  }, [editorData])

  // let a = document.querySelector('.ck.ck-input')
  // useEffect(() => {
  //   if (a) {
  //     // Focus on the selected element
  //     a.focus()
  //   } else {
  //     console.error('Element not found')
  //   }
  // }, [a])

  return isLayoutReady ? (
    <div className={isDark ? 'dark-mode-ck' : 'light-mode-ck'}>
      <CKEditor
        editor={Editor}
        config={{
          extraPlugins: [uploadPlugin],
          StyleSheet: ['./CkeditorStyle.css']
        }}
        name={name}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData()
          // console.log(data)
          setEditorData(data)
        }}
      />
    </div>
  ) : (
    <div>Editor loading</div>
  )
}

export default Editor
