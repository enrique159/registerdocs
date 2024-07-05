import { Area, AuthParams } from '@/api/interfaces'

export const signIn = async (auth: AuthParams, callback: any) => window.electron.signIn(auth, callback)

export const getAreas = async (callback: any) => window.electron.getAreas(callback)
export const createArea = async (area: Partial<Area>, callback: any) => window.electron.createArea(area, callback)
export const updateArea = async (area: Area, callback: any) => window.electron.updateArea(area, callback)
export const deleteArea = async (idArea: string, callback: any) => window.electron.deleteArea(idArea, callback)

export const getActors = async (callback: any) => window.electron.getActors(callback)