//@flow

import * as React from "react";
import { Table } from "reactstrap";
import "./Settings.scss";
import "../UI/Buttons.scss";
import QRCode from "qrcode.react";

type Props = {
  createMasterSecret: Fucntion
};

type State = {
  masterSecret: String,
  did: String
};

class Settings extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      masterSecret: ""
    };
  }

  handleUpdateMasterSecret = event => {
    this.setState({ masterSecret: event.target.value });
  };

  componentDidMount() {
    const { sessionID } = this.props;
    this.props.fetchNotifications(sessionID);
  }

  clipboard = e => {
    document.getElementById("did").select();
    document.execCommand("copy");
    e.target.focus();
  };

  render() {
    const { createMasterSecret, did } = this.props;
    return (
      <div className="Settings__container">
        <div className="Flex__Column">
          <div
            className="Flex__Blue Flex__Centered Flex__Double"
            style={{ padding: "5px 38px" }}
          >
            <h1 className="Page__Title">{`Settings`}</h1>
          </div>
          <div className="Settings__inner_container">
            <div className="Settings__row">
              <div className="Settings__row_inner">
                <h3>Your unique Decentralized Identifier (DID)</h3>
                <div className="separator" />
              </div>
            </div>
            <div className="Settings__row">
              <div className="Settings__row__name">Your DID</div>
              <QRCode value={did} />

              <div className="Settings__input__container">
                <input style={{ width: "80%" }} value={did} readOnly id="did" />{" "}
              </div>
            </div>
            <div className="Settings__row" style={{ marginTop: "20px" }}>
              {" "}
              <div className="Settings__input__container">
                <a
                  style={{ width: "80%" }}
                  href={`mailto:?body=Hello, your doctor's DID is ${did}&subject=Your doctor's HealthClaim ID`}
                >
                  <button
                    style={{ width: "100%" }}
                    className="Button Button__Secondary"
                    href={`mailto:?body=Hello, your doctor's DID is ${did}&subject=Your doctor's HealthClaim ID`}
                  >
                    e-mail DID
                  </button>
                </a>
              </div>
              <div className="Settings__input__container">
                <button
                  className="Button Button__Secondary"
                  style={{ width: "80%" }}
                  onClick={this.clipboard}
                >
                  copy DID to clipboard
                </button>
              </div>
            </div>
            <div className="Settings__row" style={{ marginTop: "20px" }}>
              <div className="Settings__row_inner">
                <h3>Your Master Secret key</h3>
                <div className="separator" />
              </div>
            </div>
            <div className="Settings__row">
              <div className="Settings__row__name">Master secret</div>
              <div className="Settings__input__container">
                <input
                  value={this.state.masterSecret}
                  onChange={this.handleUpdateMasterSecret}
                />
              </div>
            </div>
            <div className="Settings__row">
              <div
                className="Button Button__Green"
                style={{ marginTop: "10px" }}
                onClick={() => createMasterSecret(this.state.masterSecret)}
              >
                Update
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
