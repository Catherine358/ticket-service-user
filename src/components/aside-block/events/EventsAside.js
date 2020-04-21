import React from "react";
import './upcomingEvents.less';
import ErrorIndicator from "../../error-indicator";
import Grid from "@material-ui/core/Grid";
import billie from "../../../img/size=708x398.jpg";

const EventsAside = (props) => {
    return (
        <Grid container direction="column">
            <aside>
                <div className="event"
                     style={{backgroundImage: `url(${billie})`, backgroundSize: "210px", backgroundPosition: "top"}}>
                    <p className="event-name">World tour 2020</p>
                </div>
                <Grid container direction="row" justify="space-between" className="event-date">
                    <p>22 December</p>
                    <p>18:00</p>
                    <p className="event-buy">BUY</p>
                </Grid>
            </aside>
            <aside>
                <div className="event"
                     style={{backgroundImage: `url(${billie})`, backgroundSize: "210px", backgroundPosition: "top"}}>
                    <p className="event-name">World tour 2020</p>
                </div>
                <Grid container direction="row" justify="space-between" className="event-date">
                    <p>22 December</p>
                    <p>18:00</p>
                    <p className="event-buy">BUY</p>
                </Grid>
            </aside>
            <aside>
                <div className="event"
                     style={{backgroundImage: `url(${billie})`, backgroundSize: "210px", backgroundPosition: "top"}}>
                    <p className="event-name">World tour 2020</p>
                </div>
                <Grid container direction="row" justify="space-between" className="event-date">
                    <p>22 December</p>
                    <p>18:00</p>
                    <p className="event-sold">SOLD OUT</p>
                </Grid>
            </aside>
        </Grid>
    );
};

export default EventsAside;

// class EventsAside extends React.Component{
//
//      componentDidMount() {
//          this.props.fetchEvents();
//          this.interval = setInterval(() => this.props.fetchEvents(), 60000);
//      }
//
//      componentWillUnmount() {
//          clearInterval(this.interval);
//      }
//
//     Row = ({events, soldPlacesPercentage}) => {
//          let arr = events.slice(0, 5);
//          let newEvent = arr.map((data) => {
//              let res = data.eventStart;
//              let date2 = new Date(parseInt(res)).toLocaleString('default', {month: 'long'});
//              let day = new Date(parseInt(res)).getDate();
//              let date = day + " " + date2;
//              let hours = new Date(parseInt(res)).getHours();
//              if(hours < 10){
//                  hours = "0" + hours;
//              }
//              let minutes = new Date(parseInt(res)).getMinutes();
//              if(minutes < 10){
//                  minutes = "0" + minutes;
//              }
//              let time = hours + ":" + minutes;
//              let preview = data.images[data.images.length - 1];
//              return (
//                  <aside key={data.eventId}>
//                      <div className="event" style={{backgroundImage: `url(${preview})`, backgroundSize: "175px", backgroundPosition: "top"}}>
//                          <p id="first1">{data.eventName}</p>
//                          <p className="spanh"/>
//                          <div className="event-date">
//                              <p>{date}</p>
//                              <p>{time}</p>
//                              {soldPlacesPercentage >= 100 && <p id="sold1">SOLD OUT</p>}
//                          </div>
//                      </div>
//                  </aside>
//              );
//          });
//         return (
//             <div className="events">
//                 {newEvent}
//             </div>
//         );
//     };
//
//      render() {
//          const {eventsAside, error, soldPlacesPercentage } = this.props;
//          return (
//              <Context.Consumer>{value => (
//                  <div className="row justify-content-center justify-content-md-around mr-lg-4 mr-0 ml-0 left-toggles-wrapper">
//                      <div className="left-toggles">
//                          <button id="dates" className="dates-left-toggle inactive-left-toggle" onClick={() => {
//                              value.aside = "calendar";
//                              value.toggleAside("calendar");
//                          }}><img src={calendar}
//                                  className="img-thumbnail" alt="list"/><br/>Dates
//                          </button>
//                          <button id="events" className="events-left-toggle active-left-toggle">
//                              <img src={list} className="img-thumbnail" alt="list"/><br/>Events
//                          </button>
//                      </div>
//                      {error ? <ErrorIndicator error={error}/> :
//                      eventsAside.length > 0 ? <this.Row events={eventsAside} soldPlacesPercentage={soldPlacesPercentage}/>
//                      : <Spinner/>}
//                  </div>
//              )
//              }
//              </Context.Consumer>
//          );
//      }
//
// }
//
// const mapStateToProps = ({eventsAside: {eventsAside, error}, tickets: {soldPlacesPercentage}}) => {
//     return {
//         eventsAside, error, soldPlacesPercentage
//     }
// };
//
// const mapDispatchToProps = (dispatch, {swapi}) => {
//     return {
//         fetchEvents: fetchEventsAside(swapi, dispatch)
//     };
// };
//
// export default compose(withServices(), connect(mapStateToProps, mapDispatchToProps))(EventsAside);