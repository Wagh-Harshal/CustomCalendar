
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Event 1',
    description: 'Event 1 decription.',
    date: todayStr,
    startHour: '10',
    startMinute: '15',
    endtHour: '11',
    endMinute: '15',
  },
  {
    id: createEventId(),
    title: 'Event 2',
    description: 'Event 2 decription.',
    date: todayStr,
    startHour: '12',
    startMinute: '30',
    endtHour: '02',
    endMinute: '30',
  }
]

export function createEventId() {
  return String(eventGuid++)
}
