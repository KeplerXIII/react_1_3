/* eslint-disable react/prop-types */
import { format, addDays } from 'date-fns'
import { ru } from 'date-fns/locale'

import './Calendar.css'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Calendar ({ date }) {

    const now = date
    
    const formDate = {
        prevMonthLastDay: format(addDays(now, -format(now, 'dd')), 'dd'),
        thisDayNum: format(now, 'dd'),
        thisDayName: format(now, 'EEEE',  {locale: ru}),
        thisMonthName: format(now, 'MMMM', {locale: ru}),
        thisMonthNameBase: format(now, 'LLLL', {locale: ru}),
        thisYear: format(now, 'yyyy'),
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
                    <td className="ui-datepicker-other-month">27</td>
                    <td className="ui-datepicker-other-month">28</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>7</td>
                    <td className="ui-datepicker-today">8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}