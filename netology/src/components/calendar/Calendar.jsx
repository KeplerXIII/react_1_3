/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { format, addDays } from 'date-fns'
import { ru } from 'date-fns/locale'

import './Calendar.css'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const weekData = {
    'понедельник': 1,
    'вторник': 2,
    'среда': 3,
    'четверг': 4,
    'пятница': 5,
    'суббота': 6,
    'воскресенье': 7,

}

export default function Calendar ({ date }) {

    const now = date

    const formDate = {
        thisDayNum: format(now, 'dd'),
        thisDayName: format(now, 'EEEE',  {locale: ru}),
        thisMonthName: format(now, 'MMMM', {locale: ru}),
        thisMonthNameBase: format(now, 'LLLL', {locale: ru}),
        thisYear: format(now, 'yyyy'),
        dayStartDif: weekData[format(now, 'EEEE',  {locale: ru})] - format(now, 'dd') % 7
      }

    let beginDate = addDays(now, - (Number(formDate.thisDayNum) + formDate.dayStartDif) + 1)
    let monthDates = [Number(format(beginDate, 'dd'))]

    while (monthDates.length < 35) {
        beginDate = addDays(beginDate, 1)
        monthDates.push(Number(format(beginDate, 'dd')))
    }

    function DateFormer(index, date, begin, end, classNameBefore, classNameAfter) {
            if (index >= begin && index < end) {
                if (date === Number(formDate.thisDayNum)) {
                    return <td className="ui-datepicker-today"> {date} </td>
                } 
                if (date < Number(monthDates[begin])) {
                    return <td className={classNameBefore}> {date} </td>
                }
                return <td className={classNameAfter}> {date} </td>
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
                <tr>
                    {monthDates.map((date, index) => DateFormer(index, date, 0, 7, '', 'ui-datepicker-other-month'))}
                </tr>
                <tr>
                    {monthDates.map((date, index) => DateFormer(index, date, 7, 14, 'ui-datepicker-other-month', ''))}
                </tr>
                <tr>
                    {monthDates.map((date, index) => DateFormer(index, date, 14, 21, 'ui-datepicker-other-month', ''))}
                </tr>
                <tr>
                    {monthDates.map((date, index) => DateFormer(index, date, 21, 28, 'ui-datepicker-other-month', ''))}
                </tr>
                <tr>
                    {monthDates.map((date, index) => DateFormer(index, date, 28, 35, 'ui-datepicker-other-month', ''))}
                </tr>
                </tbody>
            </table>
        </div>
    )
}