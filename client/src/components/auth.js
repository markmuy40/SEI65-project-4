import { Buffer } from 'buffer'

export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const getPayload = () => {
  const token = getToken()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length !== 3) return
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

// verifying the token
export const authUser = () => {
  const payload = getPayload()
  if (!payload) return
  const currentTime = Math.round(Date.now() / 1000)
  return currentTime < payload.exp
}

// Checks the logged in user against the owner 
export const userIsOwner = (data) => {
  const payload = getPayload()
  if (!payload) return
  console.log('payload sub', payload.sub)
  console.log('data.owner.id', data.owner.id)
  return payload.sub === data.owner.id
}

export const getUserId = () => {
  const payload = getPayload()
  console.log('payload', payload)
  console.log('payload sub', payload.sub)
  console.log('both', payload && payload.sub)
  return payload && payload.sub

}