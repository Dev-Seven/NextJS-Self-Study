// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 07-03-2023            change x-access token to bearer token             DHRUV

import axios from 'axios'

export const POST = async (url, data) => {
  const token = JSON.parse(localStorage.getItem('userToken'))
  try {
    // 1001 START
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    return await axios
      .post(url, data, config)
      .then(result => {
        if (result && !result.data) {
          throw result
        } else {
          return result
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.clear()
          window.location.href = '/login'
        }

        return error
      })
  } catch (error) {
    return error
  }
}

export const AUTH = async (url, data) => {
  try {
    return await axios
      .post(url, data)
      .then(result => {
        if (result && !result.data) {
          throw result
        } else {
          return result
        }
      })
      .catch(error => {
        return error
      })
  } catch (error) {
    return error
  }
}

export const GET = async (url, data) => {
  try {
    return await axios
      .get(url, data)
      .then(result => {
        if (result && !result.data) {
          throw result
        } else {
          return result
        }
      })
      .catch(error => {
        return error
      })
  } catch (error) {
    return error
  }
}
