const input = await Deno.readTextFile('input.txt')

const dailyEntries = input
  .split('\n')
  .filter(Boolean) // remove empty entries (days not working)
  .map((entry) => entry.trim().replaceAll('<br>', ' ').replace(/  +/g, ' ')) // remove whitespace, <br> elements and reduce multiple spaces to one

const hoursAndMinutes = dailyEntries.join(' ').split(' ') // break down to time entries, e.g. ['1h', '30m', '4h']

const hoursRegex = /^([1-9][0-9]?h)$/
const minutesRegex = /^([1-9][0-9]?m)$/

const isHours = (entry: string) => entry.match(hoursRegex)

const isMinutes = (entry: string) => entry.match(minutesRegex)

/**
 * transforms time entries in string format like '1h' or '30m' to hours, always number
 */
const timeEntryToHours = (entry: string) => {
  if (isHours(entry)) return parseInt(entry)
  else if (isMinutes(entry)) return parseInt(entry) / 60
  else throw new Error('Wrong input. Entry is not in hours nor minutes.')
}

const totalHours = hoursAndMinutes.reduce(
  (hours, entry) => hours + timeEntryToHours(entry),
  0
)

const humanReadableTime = (hours: number) =>
  `${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m`

console.table({
  ['Days']: dailyEntries.length,
  ['Hours']: Math.round(totalHours * 100) / 100,
  ['Pretty hours']: humanReadableTime(totalHours),
})
