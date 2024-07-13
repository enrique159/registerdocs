import moment from 'moment-timezone'

export const useFormat = () => {
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
  
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`
  }

  const formatDatefull = (date: Date) => {
    return moment(date).format('D MMMM YYYY')
  }


  const formatFileSize = (size: number) => {
    if (size === 0) return '0 Bytes'

    const k = 1024
    const dm = 2
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(size) / Math.log(k))

    return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  return {
    formatDate,
    formatDatefull,
    formatFileSize,
  }
}