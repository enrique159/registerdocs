import { AuthParams } from '@/api/interfaces'

export const signIn = async (auth: AuthParams, callback: any) => window.electron.signIn(auth, callback)