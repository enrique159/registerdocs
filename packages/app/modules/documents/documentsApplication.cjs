const { ipcMain, shell } = require('electron')
const documents = require('./documentsRepository.cjs')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const os = require('os')
const { default: logger } = require('../../helpers/logger.cjs')

ipcMain.on('get_documents', async (event) => {
  await documents.getDocuments()
    .then((response) => {
      event.reply('get_documents', response)
    })
    .catch((err) => {
      logger.error({ type: 'GET DOCUMENTS', message: 'Error al buscar documentos', error: err })
      event.reply('get_documents', { success: false, message: 'Error al buscar documentos', error: err })
    })
})

ipcMain.on('create_document', async (event, data) => {
  try {
    const id = uuidv4()
    const documentType = data.documento.name.split('.').pop()
    const directoryPath = path.join(os.homedir(), 'registerdocs-resources')
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath)
    }
    const destinationPath = path.join(os.homedir(), 'registerdocs-resources', `${id}.${documentType}`)
    fs.writeFile(destinationPath, Buffer.from(data.documento.content), async (err) => {
      if (err) {
        logger.error({ type: 'CREATE DOCUMENT FILE', message: 'Error al crear documento', error: err })
        event.reply('create_document', { success: false, message: 'Error al crear documento', error: err })
        return
      }
      const document = {
        ...data,
        id,
        documento: destinationPath.toString()
      }
      await documents.createDocument(document)
        .then((response) => {
          event.reply('create_document', response)
        })
        .catch((err) => {
          logger.error({ type: 'CREATE DOCUMENT DB', message: 'Error al crear documento', error: err })
          event.reply('create_document', { success: false, message: 'Error al crear documento', error: err })
        })
    })
  } catch (err) {
    logger.error({ type: 'CREATE DOCUMENT DB', message: 'Error al crear documento', error: err })
    event.reply('create_document', { success: false, message: 'Error al crear documento', error: err })
  }
})

ipcMain.on('open_document', async (event, params) => {
  // Verify if the document exists in first place
  if (!fs.existsSync(params.documentRoute)) {
    logger.error({ type: 'OPEN DOCUMENT', message: 'El documento no existe en la ruta especificada', error: params })
    event.reply('open_document', { success: false, message: 'El documento no existe', response: params })
    return
  }


  // Open the document in the file explorer
  try {
    if (params.openFolder) {
      shell.showItemInFolder(params.documentRoute)
      event.reply('open_document', { success: true, message: 'Carpeta abierta', response: params })
      return
    }
  } catch (err) {
    logger.error({ type: 'OPEN DOCUMENT', message: 'Error al abrir carpeta', error: err })
    event.reply('open_document', { success: false, message: 'Error al abrir carpeta', error: err })
    return
  }

  // Open the document in the default application
  await shell.openPath(params.documentRoute).then(() => {
    event.reply('open_document', { success: true, message: 'Documento abierto', response: params })
  })
  .catch((err) => {
    logger.error({ type: 'OPEN DOCUMENT', message: 'Error al abrir documento', error: err })
    event.reply('open_document', { success: false, message: 'Error al abrir documento', error: err })
  })
})