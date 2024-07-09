const { ipcMain } = require('electron')
const { createDocument } = require('./documentsRepository.cjs')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const os = require('os')

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
        event.reply('create_document', { success: false, message: 'Error al crear documento', error: err })
        return
      }
      const document = {
        ...data,
        id,
        documento: destinationPath.toString()
      }
      await createDocument(document)
        .then((response) => {
          event.reply('create_document', response)
        })
        .catch((err) => {
          event.reply('create_document', { success: false, message: 'Error al crear documento', error: err })
        })
    })
  } catch (err) {
    event.reply('create_document', { success: false, message: 'Error al crear documento', error: err })
  }
})