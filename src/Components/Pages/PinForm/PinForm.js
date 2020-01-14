import React from 'react';
import authData from '../../../Helpers/data/authData';
import pinData from '../../../Helpers/data/pinData';

class PinForm extends React.Component {
  state = {
    pinTitle: '',
    pinImageUrl: '',
  }

  pinTitleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  pinImageChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const { boardId } = this.props.match.params;
    const newPin = {
      title: this.state.pinTitle,
      imageUrl: this.state.pinImageUrl,
      uid: authData.getUid(),
      boardId,
    };
    pinData.savePin(newPin)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((errorFromSavePin) => console.error(errorFromSavePin));
  }

  render() {
    return (
      <div className="PinForm">
      <form className="col-6 offset-3">
        <div className="form-group">
          <label htmlFor="pin-name">Pin Name</label>
          <input
            type="text"
            className="form-control"
            id="Pin-name"
            placeholder="Enter Pin Name"
            value={this.state.pinTitle}
            onChange={this.pinTitleChange}
            />
        </div>
        <div className="form-group">
          <label htmlFor="Pin-image">Pin Image Url</label>
          <input
            type="text"
            className="form-control"
            id="Pin-image"
            placeholder="Enter Pin Image Url"
            value={this.state.pinImageUrl}
            onChange={this.pinImageChange}
            />
        </div>
        <button className="btn btn-outline-primary" onClick={this.savePinEvent}>Save Pin</button>
      </form>
    </div>
    );
  }
}

export default PinForm;
