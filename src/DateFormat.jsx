export const getFormatedDateTime = () => {
  const date = new Date()
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
