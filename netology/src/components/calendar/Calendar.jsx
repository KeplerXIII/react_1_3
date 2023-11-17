import PropTypes from 'prop-types';
import { format, addDays } from 'date-fns'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import { ru } from 'date-fns/locale'

import './Calendar.css'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const weekData = {
    'понедельник': 6,
    'вторник': 5,
    'среда': 4,
    'четверг': 3,
    'пятница':2,
    'суббота': 1,
    'воскресенье': 0,

}

Calendar.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  }

export default function Calendar ({ date }) {

    const now = date

    const formDate = {
        daysInMonth: getDaysInMonth(now),
        thisDayNum: format(now, 'dd'),
        thisDayName: format(now, 'EEEE',  {locale: ru}),
        thisMonthName: format(now, 'MMMM', {locale: ru}),
        thisMonthNameBase: format(now, 'LLLL', {locale: ru}),
        thisYear: format(now, 'yyyy'),
        dayStartDif: 7 - ((Number(format(now, 'dd')) +  weekData[format(now, 'EEEE',  {locale: ru})])  % 7)
      }

    let beginDate = addDays(now, - (Number(formDate.thisDayNum) + formDate.dayStartDif))
    let monthDates = []

    while (monthDates.length < ((formDate.dayStartDif + formDate.daysInMonth) > 35 ? 43 : 35)) {
        beginDate = addDays(beginDate, 1)
        monthDates.push({number: format(beginDate, 'dd'), month: format(beginDate, 'MMMM', {locale: ru})})
    }

    const otherMonthClass = 'ui-datepicker-other-month'
    const todayDayClass = 'ui-datepicker-today'

    function DateFormer(index, date, begin, end) {
            if (index >= begin && index < end) {
                if (index >= monthDates.length) {
                    return
                }
                if (date.month != formDate.thisMonthName) {
                    return <td key={index} className={otherMonthClass}> {Number(date.number)} </td>
                }
                if (date.number === formDate.thisDayNum) {
                    return <td key={index} className={todayDayClass}> {Number(date.number)} </td>
                }
                return <td key={index}> {Number(date.number)} </td>
            }
        }

    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{capitalizeFirstLetter(formDate.thisDayName)}</div>
                <div className="ui-datepicker-material-date">
                <div className="ui-datepicker-material-day-num">{formDate.thisDayNum}</div>
                <div className="ui-datepicker-material-month">{formDate.thisMonthName}</div>
                <div className="ui-datepicker-material-year">{formDate.thisYear}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                <span className="ui-datepicker-month">{capitalizeFirstLetter(formDate.thisMonthNameBase)}</span>&nbsp;<span className="ui-datepicker-year">{formDate.thisYear}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col className="ui-datepicker-week-end"></col>
                    <col className="ui-datepicker-week-end"></col>
                </colgroup>
                <thead>
                <tr>
                    <th scope="col" title="Понедельник">Пн</th>
                    <th scope="col" title="Вторник">Вт</th>
                    <th scope="col" title="Среда">Ср</th>
                    <th scope="col" title="Четверг">Чт</th>
                    <th scope="col" title="Пятница">Пт</th>
                    <th scope="col" title="Суббота">Сб</th>
                    <th scope="col" title="Воскресенье">Вс</th>
                </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 6 }, (_, row) => (
                        <tr key={row}>
                        {monthDates.map((date, index) =>
                            DateFormer(index, date, row * 7, (row + 1) * 7)
                        )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
