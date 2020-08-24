import React, {Component} from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from 'react-bootstrap/Modal'
// import MenuItem from 'react-bootstrap/MenuItem'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button';
//array de eventos

let allViews = Object.keys(Views).map(k => Views[k])

const localizer = momentLocalizer(moment);


export default class theCalendar extends Component {
  state = {
    events: [],
    selectedEvent:[],
    show: false,
    selected:[]
  };
  // {
    //   start: moment().toDate(),
    //   end: moment()
    //     .add(1, "days")
    //     .toDate(),
    //   title: "Some title"
  // }
  
 componentDidMount = async () => {
     await this.props.allEvents();
     let events = this.props.events;
     let user = this.props.user;
     let availableEvents = [];
     console.log(availableEvents)
      events.forEach(event => {
          if (event.level === user.level) {
            availableEvents.push(event);
          }
      })
     this.setState({events:availableEvents})
  }

  handleSelectSlot({start, end})
  {
    // let event_content = document.getElementsByClassName('rbc-event-content');
    // console.log(event_content)
      //create an event with title "Test"
      console.log("handleSelectSlot: " + start + " - " + end);
      // this.state.events.push({start: start, end: end, title: "Test"});
      return (
          <div>Hello</div>
      )
  }

  handleSelectEvent(props)
  {
    this.setState({show:true, selectedEvent: props});
//     //   just for example
//       console.log("handleSelectEvent: " + JSON.stringify(arguments));
  }

  EventWeek(props)
  {    
    return <strong>{props.event.title}</strong>
  }
  
  EventAgenda(props)
  {
    return <em>{props.event.title}</em>
  }

  handleSelect = e => {
    //set model to true
    this.setState({
      modalIsOpen: true
    });
  }
  
  handleClose = async () => {
     let id = this.state.selectedEvent._id;
     let s = this.state.selected
     let c = s.some(v => v._id === id);
     if (c === false) { 
        await this.props.joinClass(id);
        s.push(id);
     }
     this.setState({show:false, selected:s})
   }

   handleCancel = async () => {
      this.setState({show:false})
   }

  render() {
    let { selectedEvent } = this.state
    return (
      <div style={{backgroundColor:"#bae1ff"}}>
          <div>
          {/* <button onClick={this.openModal}>Open Modal</button> */}
          {/* {this.renderModal()} */}

            <Calendar
            style={{backgroundColor:"white"}}
              selectable={true}
              events={this.state.events}
              onSelectSlot={this.handleSelectSlot.bind(this)}
              onSelectEvent={this.handleSelectEvent.bind(this)}
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              components={{
              event: this.EventWeek,
                  agenda: {
                    event: this.EventAgenda
                  }
                }}
                popup
                Views={allViews}
            />
          </div>
          <div>
          <Modal show={this.state.show} onHide={this.handleCancel.bind(this)} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Join this Class on {selectedEvent.start}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><b>Level: {selectedEvent.level} </b></p>
                <p>Topic: {selectedEvent.title}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{padding:"0.1em 0.4em"}} variant="secondary" onClick={this.handleCancel.bind(this)}>
                Cancel
              </Button>
              <Button style={{padding:"0.1em 0.4em"}} variant="primary" onClick={this.handleClose.bind(this)}>
                Join Class
              </Button>
            </Modal.Footer>
          </Modal>
          </div>
          <footer style={{"padding":"0.8em", "backgroundColor":"#AC2322", "color":"white"}}>© Vamos Academy 2020</footer>
      </div>
    );
  }
}