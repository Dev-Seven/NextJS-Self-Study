import { createContext } from 'react'

async function buildFormData(formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}` : key)
    })
  } else {
    const value = data == null ? '' : data
    formData.append(parentKey, value)
  }
}

export async function JSONToFormData(data) {
  const formData = new FormData()
  await buildFormData(formData, data)

  return formData
}

export function padLeadingZeros(num, size) {
  var s = num + ''
  while (s.length < size) s = '0' + s

  return s
}

export const DownloadURL = url => {
  fetch(`${url}`).then(response => {
    response.blob().then(blob => {
      // Creating new object of PDF file
      const fileURL = window.URL.createObjectURL(blob)

      // Setting various property values
      let alink = document.createElement('a')
      alink.href = fileURL
      alink.download = url.split('/').pop()
      alink.click()
    })
  })
}

// async function buildFormData(formData, data, parentKey) {
//   if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
//     Object.keys(data).forEach(key => {
//       buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
//     })
//   } else {
//     const value = data == null ? '' : data
//     formData.append(parentKey, value)
//   }
// }
// export async function JSONToFormData(data) {
//   const formData = new FormData()
//   await buildFormData(formData, data)
//   return formData
// }

// ** function to generate random 6 digit code

export function generateCode() {
  const codeLength = 8
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
  let code = ''
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    code += chars[randomIndex]
  }

  return code
}

export const UserIdContext = createContext(null)
