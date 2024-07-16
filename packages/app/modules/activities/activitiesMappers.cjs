exports.mapToActivity = function (rawData) {
  return {
    id: rawData.id,
    accion: rawData.accion,
    descripcion: rawData.descripcion,
    user_id: rawData.user_id,
    document_id: rawData.document_id,
    created_at: rawData.created_at,
  }
}