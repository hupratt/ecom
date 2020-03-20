import React from "react";
import { Slider, Rail, Handles } from "react-compound-slider";

const sliderStyle = {
  position: "relative",
  width: "100%",
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
export default class MySlider extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="filter-title">Price</div>

        <Slider
          rootStyle={sliderStyle}
          domain={[0, 100]}
          step={1}
          mode={2}
          values={[10, 30]}
        >
          {/* Make rail + make it clickeable */}
          <Rail>
            {({ getRailProps }) => (
              <div style={railStyle} {...getRailProps()} />
            )}
          </Rail>
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

export function Handle({ handle: { id, value, percent }, getHandleProps }) {
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
}
