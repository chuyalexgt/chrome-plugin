/* eslint-disable no-console */
import { defineStore } from 'pinia'
import { createUser, getUser, loginByEmail } from '~/api/v1/user'
import type { mainStore } from '~/interfaces/mainStore'

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () =>
    ({
      authSuccess: false,
      userJwt: '',
      userData: null,
      sessionIsExpired: false,
    } as mainStore),

  actions: {
    async getUserData() {
      try {
        const response = await getUser()
        this.userData = response.data
      }
      catch (error) {
        this.sessionIsExpired = true
        return { status: 'error', message: 'La sesión ha expirado' }
      }
    },
    async login(email: string, password: string) {
      try {
        const { data } = await loginByEmail(email, password)
        this.userJwt = data.jwtToken
        localStorage.setItem('userJwt', this.userJwt)
        this.getUserData()
        setTimeout(() => {
          window.location.replace('/user')
        }, 2000)
      }
      catch (error: any) {
        console.log(error.response.data.message)
        return { status: 'error', message: error.response.data.message }
      }
    },
    async signIn(email: string, password: string) {
      try {
        await createUser(email, password)
      }
      catch (error: any) {
        const errorMsj = error.response.data.message.split('user validation failed: email:')
        return { status: 'error', message: errorMsj }
      }
    },
    logout() {
      localStorage.removeItem('userJwt')
      window.location.replace('/')
    },
  },
})
