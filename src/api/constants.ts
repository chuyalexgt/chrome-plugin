export const axiosConstants = {
  HOST_V0: import.meta.env?.VITE_ENV === 'development' ? 'http://localhost:8001' : 'https://meddi.app',
  HOST_V1: import.meta.env?.VITE_ENV === 'development' ? 'http://localhost:9009' : 'https://vercel-meddi-expediente-api-prod.vercel.app',
}
