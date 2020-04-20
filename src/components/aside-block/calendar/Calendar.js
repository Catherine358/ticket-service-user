import React from "react";
import moment from "moment";
import './calendar.less';

export default class Calendar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            dateContext: moment(),
            today: moment(),
            events: [],
            error: ''
        };
    }

    componentDidMount() {
        // this.updateEvent();
        // this.interval = setInterval(() => this.updateEvent, 5000);
    }

    componentWillUnmount() {
       // clearInterval(this.interval);
    }

    updateEvent = () => {
        this.swapi.updateEvents()
            .then((data) => {
                    let arr = [];
                    for (let i = 0; i < data.length; i++) {
                        arr.push(data[i]);
                    }
                    this.setState({events: arr});
            })
            .catch(error => {
                this.setState({error: error.message});
            });
    };

    weekdays = moment.weekdays();
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();

    year = () => {
        return this.state.dateContext.format("YY");
    };

    month = () => {
        return this.state.dateContext.format("MMMM");
    };

    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    };

    currentDate = () => {
        return this.state.dateContext.get("date");
    };

    currentEvents = (index) => {
        const { hall } = this.props;
        const { events } = this.state;
        if(events[index].hall === hall) {
            let year = new Date(events[index].eventStart).getFullYear().toString().substring(2, 4);
            let month = new Date(events[index].eventStart)
                .toLocaleString('default', {month: 'long'});
            if (this.year() === year) {
                if (this.month() === month) {
                    return true;
                }
            } else {
                return false;
            }
        }else{
            return false;
        }
    };

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        return moment(dateContext).startOf('month').format('d');
    };

    MonthNav = () => {
        return (
          <span className="label-month">
              {this.month()}
          </span>
        );
    };

    YearNav = () => {
        return (
            <span className="label-year">
                {this.year()}
            </span>
        );
    };

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        });
    };

    nextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        });
    };

    render() {
        const {events, error} = this.state;
        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day">{day.substring(0,1)}</td>
            )
        });

        let blanks = [];

        for(let i = 0; i < this.firstDayOfMonth(); i++){
            blanks.push(<td key={i*80} className="empty-slot">{""}</td>);
        }

        let daysInMonth = [];
            for (let d = 1; d <= this.daysInMonth(); d++) {
                let className = "day";
                if (!error) {
                    for (let i = 0; i < events.length; i++) {
                        // if (this.currentEvents(i)) {
                        //     let day = new Date(events[i].eventStart).getDate();
                        //     if (d === day) {
                        //         className = "day current-day";
                        //     }
                        // }
                    }
                }
                daysInMonth.push(<td key={d} className={className}>
                    <span>{d}</span></td>)
            }

        let totalSlots = [...blanks, ...daysInMonth];

        let rows =[];

        let cells = [];

        totalSlots.forEach((row, i) => {
            if((i % 7) !== 0){
                cells.push(row);
            }else{
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if(i === totalSlots.length - 1){
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d, i) => {
            return (
              <tr key={i*100}>{d}</tr>
            );
        });

        return(
            <div className="calendar-container">
                <table className="calendar2">
                    <thead>
                    <tr className="calendar-header">
                        <td colSpan="7">
                            <div className="prev-aside">
                                <button  onClick={() => {this.prevMonth()}}>&#10094;</button>
                            </div>
                            <this.MonthNav/>
                            <span className="her">&#x000B4;</span>
                            <this.YearNav/>
                            <div className="next-aside">
                                <button  onClick={() => {this.nextMonth()}}>&#10095;</button>
                            </div>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    {weekdays}
                    </tr>
                    {trElems}
                    </tbody>
                </table>
            </div>
        );
    }
}