import axios from 'axios'

export default (data, token = null) => {
  if (token) {
    return axios.create({
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  } else if (data === 'users') {
    return axios.create({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
  else {
    return axios()
  }
}