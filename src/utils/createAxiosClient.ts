import axios from 'axios'
import { axiosConstants } from '~/api/constants'
import setInterceptors from '~/utils/setInterceptors'

interface AxiosClientParams {
  baseURL: string
  version?: number
}

export default function ({ baseURL, version = 1 }: AxiosClientParams) {
  const baseURLFormatted = `${axiosConstants[`HOST_V${version}` as keyof typeof axiosConstants]}${baseURL}`
  const client = axios.create({
    baseURL: baseURLFormatted,
  })

  setInterceptors(client)

  return { client }
}
