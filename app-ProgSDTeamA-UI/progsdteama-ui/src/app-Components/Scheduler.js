import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

// Localization
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru)

class Scheduler extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectDate: new Date()
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);

    setDefaultLocale('ru');
  }

  onDateChange(date) {
    this.setState({
      selectDate: date
    })
    var date_str = date.getFullYear() + "-" + parseInt(date.getMonth()+1) + "-" + date.getDate()
    this.props.parentFDCallback(this.props.id + ":" + date_str);
  }

  onSubmitForm(event) {
    event.preventDefault();
    alert(this.state.selectDate)
  }
 
  render() {
    return (
      <div className="calendarApp xs-2">
        <form onSubmit={ this.onSubmitForm }>
            <div className="input-group xs-3">
              <DatePicker
                  locale="en"
                  className="form-control"
                  selected={ this.state.selectDate }
                  onChange={ this.onDateChange }
                  name="selectDate"
                  dateFormat="yyyy-MM-dd"
                />
            </div>
        </form>
      </div>
    );
  }
  
}

export default Scheduler;