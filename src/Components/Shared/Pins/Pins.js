import React from 'react';
import PropTypes from 'prop-types';
import pinShape from '../../../Helpers/propz/pinShape';

class Pins extends React.Component {
  state = {
    pin: [],
  }

  propTypes = {
    pin: pinShape.pinShape,
    deletePin: PropTypes.func,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { deletePin, pin } = this.props;
    deletePin(pin.id);
  }

  render() {
    const { pin } = this.props;
    return (
      <div className="Pins col-3">
      <div class="card">
        <button className="btn btn-danger deletePinButton" onClick={this.deletePinEvent}>X</button>
      <img src={pin.imageUrl} class="card-img-top" alt=""></img>
      <div class="card-body">
        <h5 class="card-title">{pin.title}</h5>
      </div>
    </div>
      </div>
    );
  }
}

export default Pins;
