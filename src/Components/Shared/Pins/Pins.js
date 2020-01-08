import React from 'react';

class Pins extends React.Component {
  state = {
    pin: [],
  }

  render() {
    const { pin } = this.props;
    return (
      <div className="Pins col-3">
      <div class="card">
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
