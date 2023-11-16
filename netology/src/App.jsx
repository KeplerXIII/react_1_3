import './App.css'
import Calendar from './components/calendar/Calendar'

const now = new Date("2023-02-01")


function App() {
  return (
    <Calendar date={now} />
  )
}

export default App
