let input: string
try {
  input = await Deno.readTextFile('input.txt')
} catch (error) {
  if (error.code === 'ENOENT') {
    console.warn('Please, provide an input.txt file with working hours.')
    Deno.exit(1)
  } else throw error
}

const dailyEntries = input
  .split('\n') // split lines
  .filter(Boolean) // remove empty entries (days not working)
  .map((entry) => entry.replace(/<br>/g, ' ').replace(/  +/g, ' ').trim()) // remove <br> elements and reduce multiple spaces to one

if (!dailyEntries.length) {
  console.warn('No hours to count. Add some in the input.txt file.')
  Deno.exit(1)
}

const hoursAndMinutes = dailyEntries.join(' ').split(' ') // break down to time entries, e.g. ['1h', '30m', '4h']

const hoursRegex = /^([1-9][0-9]?h)$/
const minutesRegex = /^([1-9][0-9]?m)$/

const isHours = (entry: string) => entry.match(hoursRegex)
const isMinutes = (entry: string) => entry.match(minutesRegex)

// transforms time entries in string format like '1h' or '30m' to hours, always number
const timeEntryToHours = (entry: string) => {
  if (isHours(entry)) return parseInt(entry)
  else if (isMinutes(entry)) return parseInt(entry) / 60
  else if (entry.includes('?'))
    throw new Error(`Unfilled value. Entry looks like this: "${entry}"`)
  else
    throw new Error(
      `Wrong input. Entry is not in hours nor minutes. Entry looks like this: "${entry}"`
    )
}

const totalHours = hoursAndMinutes.reduce(
  (hours, entry) => hours + timeEntryToHours(entry),
  0
)
const totalManDays = totalHours / 8

const humanReadableTime = (hours: number) =>
  `${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m`

console.table({
  ['Days working']: dailyEntries.length,
  ['Man Days']: Math.round(totalManDays * 100) / 100,
  ['Hours']: Math.round(totalHours * 100) / 100,
  ['Pretty hours']: humanReadableTime(totalHours),
})
