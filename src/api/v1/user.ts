import createAxiosClient from '~/utils/createAxiosClient'

const baseURL = '/api/v1/user'
const { client } = createAxiosClient({ baseURL })

const loginByEmail = async (email: string, password: string): Promise<any> => {
  const data = await client.post('/login', { email, password })
  return data
}

const createUser = async (email: string, password: string): Promise<any> => {
  const data = await client.post('/create', { email, password })
  return data
}

const getUser = async (): Promise<any> => {
  const data = await client.get('/get')
  return data
}

export { loginByEmail, createUser, getUser }
