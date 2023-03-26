/* eslint-disable prefer-promise-reject-errors */
export default function (axiosCient: any) {
  axiosCient.interceptors.request.use((config: any) => {
    // config.headers.common.Authorization = `MeddiTest ${localStorage.getItem('jwtToken')}`
    config.headers.common.Authorization = `${localStorage.getItem('jwtToken')}`
    return config
  }, (error: any) => {
    return Promise.reject(error)
  })

  axiosCient.interceptors.response.use((response: any) => {
    return response
  }, (error: any) => {
    if (error.response.status === 401) {
      localStorage.removeItem('jwtToken')
      window.location.replace('/sesionExpirada')
    }

    return Promise.reject({
      message: error.response.data,
    })
  })
}
