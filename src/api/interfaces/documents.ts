export interface Documento {
  id?: string
  fecha: Date
  numero_oficio: string
  enviado_por: string
  cargo: string
  asunto: string
  dirigido_a: string
  documento: any
  area_id: number
  user_id?: number
  created_at?: Date
}