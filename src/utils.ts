export const dataFn = () => {
  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ]
  const date = new Date()
  const D = date.getDate()
  const M = months[date.getMonth()]
  const Y = date.getFullYear()
  return `${D} ${M.slice(0, 3)} ${Y}`
}
