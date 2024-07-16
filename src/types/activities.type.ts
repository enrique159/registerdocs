export const ActivityTypes = Object.freeze({
  NOTE: { value: 'NOTE', label: 'Nota', color: "#737373" },
  DELIVERY: { value: 'DELIVERY', label: 'Entrega', color: "#663dec" },
  RECEPTION: { value: 'RECEPTION', label: 'Recepción', color: "#e43c7f" },
  SIGNATURE: { value: 'SIGNATURE', label: 'Firma', color: "#F5A623" },
  REVISION: { value: 'REVISION', label: 'Revisión', color: "#e8cf50" },
  APPROVAL: { value: 'APPROVAL', label: 'Aprobación', color: "#25e7b0" },
  REJECTION: { value: 'REJECTION', label: 'Rechazo', color: "#E04A48" },
  OBSERVATION: { value: 'OBSERVATION', label: 'Observación', color: "#4A90E2" },
}) 

export type ActivityType = typeof ActivityTypes[keyof typeof ActivityTypes]