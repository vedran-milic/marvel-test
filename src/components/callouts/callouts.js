import React, {Component} from 'react';
import './callouts.css';

class Callout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: false
    }
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.dismiss();
    }, 3000);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.props.dismiss();
      }, 3000);
    }
  }

  render() {
    return(
      <div className={'callout' + (this.props.type === 'success' ? ' success' : ' warning')}>
        <div className="message">{this.props.message}</div>
        <button className="close" onClick={this.props.dismiss}>&times;</button>
      </div>
    );
  }
}

export default Callout;