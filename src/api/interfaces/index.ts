import { AuthParams } from './auth'
import { Area } from './areas'
import { Documento } from './documents'
import { Configuration } from './configuration'
import { Actor } from './actors'

interface Response<T> {
  success: boolean
  message: string
  response: T
}

export type { AuthParams, Area, Documento, Configuration, Actor, Response }
