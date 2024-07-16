exports.mapToDocument = function (rawData) {
  return {
    id: rawData.id,
    fecha: rawData.fecha,
    numero_oficio: rawData.numero_oficio,
    enviado_por: rawData.enviado_por,
    cargo: rawData.cargo,
    asunto: rawData.asunto,
    dirigido_a: rawData.dirigido_a,
    documento: rawData.documento,
    area_id: rawData.area_id,
    user_id: rawData.user_id,
    created_at: rawData.created_at,
  }
}