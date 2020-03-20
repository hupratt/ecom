import React from "react";
import { Slider, Handles } from "react-compound-slider";
import _ from "lodash";

const sliderStyle = {
  position: "relative",
  width: "50%",
  height: 70
};

const railStyle = {
  position: "absolute",
  width: "100%",
  height: 10,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: "rgb(225, 225, 225)"
};

const domain = [0, 100];
const defaultValues = [10, 30];
const sendQuery = query => console.log(`Querying for ${query}`);

export default class MySlider extends React.Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice()
  };
  delayedQuery = _.debounce(q => sendQuery(q), 500);

  onUpdate = update => {
    this.setState({ update }, () =>
      console.log(_.debounce(q => sendQuery(q), 500))
    );
  };

  onChange = values => {
    this.setState({ values });
  };
  render() {
    return (
      <React.Fragment>
        <div className="filter-title">Price</div>
        {/* Wrapper */}
        <Slider
          rootStyle={sliderStyle}
          domain={domain}
          step={1}
          mode={2}
          values={this.state.values}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          ref={this.componentRef}
        >
          {/* Make rail + make it clickeable */}
          <div style={railStyle} />
          {/* Define handles */}
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
        </Slider>
      </React.Fragment>
    );
  }
}

const Handle = ({ handle: { id, value, percent }, getHandleProps }) => {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: "absolute",
        marginLeft: -15,
        marginTop: 30,
        zIndex: 2,
        width: 20,
        height: 20,
        border: 0,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: "rgb(200, 197, 197)",
        color: "#333"
      }}
      {...getHandleProps(id)}
    >
      <div
        style={{
          marginTop: -35,
          color: "#636363"
        }}
      >
        {value}
      </div>
    </div>
  );
};
