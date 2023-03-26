export interface mainStore {
  authSuccess: boolean
  userJwt: string
  userData: UserData | null
  sessionIsExpired: boolean
}

export interface UserData {
  _id: string
  email: string
  registerDate: Date
  __v: number
}
