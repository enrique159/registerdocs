const { v4: uuidv4 } = require('uuid')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Configuration
  await knex('configuration').del()
  await knex('configuration').insert({ inicializado: false, ruta_recursos: null })
  // Areas
  await knex('areas').del()
  await knex('areas').insert([
    {id: uuidv4(), nombre: 'Dirección General'},
    {id: uuidv4(), nombre: 'Dirección de Administración y Finanzas'},
    {id: uuidv4(), nombre: 'Dirección Técnica'},
    {id: uuidv4(), nombre: 'Dirección de Promoción Social'},
    {id: uuidv4(), nombre: 'Área Jurídica'},
    {id: uuidv4(), nombre: 'Área de Control Presupuestal'},
    {id: uuidv4(), nombre: 'Departamento de Contabilidad'},
    {id: uuidv4(), nombre: 'Departamento de Recursos Humanos'},
    {id: uuidv4(), nombre: 'Departamento de Servicios Generales'},
    {id: uuidv4(), nombre: 'Finanzas'},
    {id: uuidv4(), nombre: 'Contraloría del Estado'},
    {id: uuidv4(), nombre: 'Auditoría Superior del Estado'},
    {id: uuidv4(), nombre: 'Auditoría Superior de la Federación'},
  ])
}
