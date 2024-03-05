import axios from 'axios'
import { SESSION } from './Enums'

import { JSONToFormData } from './Functions'

async function processFormData(data) {
  try {
    var form_data = new FormData()
    for (var key in data) {
      form_data.append(key, data[key])
    }

    return form_data
  } catch (error) {
    return error
  }
}

export const BASE_URL = process.env.REACT_APP_BASE_URL

let SessionData

export async function POST(url, data) {
  let formData = []
  try {
    if (data?.deepIntegrate) {
      formData = await JSONToFormData(data)
    } else {
      formData = await processFormData(data)
    }
    SessionData = JSON.parse(localStorage.getItem(SESSION))

    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${SessionData?.token}`
      }
    }

    return await axios
      .post(url, formData, config)
      .then(result => {
        if (
          (result?.data?.status_code && result?.data?.status_code !== 200) ||
          (result?.data?.status && result?.data?.status !== 'SUCCESS')
        ) {
          // eslint-disable-next-line
          throw { hasError: true, message: result.data.message }
        } else {
          return result.data
        }
      })
      .catch(error => {
        return error
      })
  } catch (error) {
    return error
  }
}
