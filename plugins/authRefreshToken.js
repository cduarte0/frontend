import axios from 'axios'
let refreshingToken = false
const subscribers = []

async function refreshToken({ token, baseURL }) {
  const headers = { Authorization: token }
  const config = { baseURL, headers }
  const {
    data: { accessToken },
  } = await axios.patch('/auth', {}, config)
  return `Bearer ${accessToken}`
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

function onAccessTokenFetched(token) {
  while (subscribers.length) {
    subscribers.pop()(token)
  }
}

export default function ({ $axios, app, redirect }) {
  $axios.onError((error) => {
    const code = error.response.status
    const config = error.response.config
    const token = app.$auth.getToken('local')
    const originalRequest = config
    if ([401].includes(code) && token) {
      if (!refreshingToken) {
        console.log('refreshing token')
        refreshingToken = true
        refreshToken({
          token,
          config,
          baseURL: config.baseURL,
        })
          .then((accessToken) => {
            app.$auth.setToken('local', accessToken)
            $axios.defaults.headers.common.Authorization = accessToken
            console.log('Token successfully refreshed')
            onAccessTokenFetched(accessToken)
            refreshingToken = false
          })
          .catch(() => {
            refreshingToken = false
            onAccessTokenFetched(Promise.reject(error))
            if (!('propertyName' in config)) {
              redirect(301, '/login')
            }
          })
      }
      return new Promise((resolve, reject) => {
        addSubscriber((accessToken) => {
          try {
            originalRequest.headers.Authorization = accessToken
            // originalRequest.baseURL = null
            resolve(axios(originalRequest))
          } catch (e) {
            reject(error)
          }
        })
      })
    }
    return Promise.reject(error)
  })
}