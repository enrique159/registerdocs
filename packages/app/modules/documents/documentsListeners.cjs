const { ipcMain } = require('electron')
const { createDocument } = require('./documentsRepository.cjs')
const fs = require('fs')
const path = require('path')

ipcMain.on('create_document', async (event, data) => {
  try {
    const directoryPath = path.join(__dirname, '../../../../resources')
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath)
    }
    const destinationPath = path.join(__dirname, '../../../../resources', data.documento.name)
    fs.writeFile(destinationPath, Buffer.from(data.documento.content), async (err) => {
      if (err) {
        event.reply('document_created', { success: false, message: 'Error al crear documento', error: err })
        return
      }
      const document = {
        ...data,
        documento: destinationPath.toString()
      }
      await createDocument(document)
        .then((response) => {
          event.reply('document_created', response)
        })
        .catch((err) => {
          event.reply('document_created', { success: false, message: 'Error al crear documento', error: err })
        })
    })
  } catch (err) {
    event.reply('document_created', { success: false, message: 'Error al crear documento', error: err })
  }
})