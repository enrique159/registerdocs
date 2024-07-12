import { Area, AuthParams, Documento } from '@/api/interfaces'

/* Configuration */
export const getConfiguration = async (callback: any) => window.electron.getConfiguration(callback)
export const updateConfiguration = async (configuration: any, callback: any) => window.electron.updateConfiguration(configuration, callback)

/* Auth */
export const signIn = async (auth: AuthParams, callback: any) => window.electron.signIn(auth, callback)

/* Areas */
export const getAreas = async (callback: any) => window.electron.getAreas(callback)
export const createArea = async (area: Partial<Area>, callback: any) => window.electron.createArea(area, callback)
export const updateArea = async (area: Area, callback: any) => window.electron.updateArea(area, callback)
export const deleteArea = async (idArea: string, callback: any) => window.electron.deleteArea(idArea, callback)

/* Actors */
export const getActors = async (callback: any) => window.electron.getActors(callback)

/* Documents */
export const getDocuments = async (callback: any) => window.electron.getDocuments(callback)
export const createDocument = async (document: Partial<Documento>, callback: any) => window.electron.createDocument(document, callback)
export const openDocument = async (params: { documentRoute: string, openFolder?: boolean }, callback: any) => window.electron.openDocument(params, callback)