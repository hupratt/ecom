import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  margin-top: 2rem;
  margin-bottom: 2rem;

  .value {
    flex: 1;
    font-size: 2rem;
  }

  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #efefef;
    outline: none;
  }
`;

export default class Slider extends React.Component {
  state = {
    value: 50
  };

  handleOnChange = e => this.setState({ value: e.target.value });

  render() {
    return (
      <Styles color={this.props.color}>
        <input
          type="range"
          min={0}
          max={255}
          value={this.state.value}
          className="slider"
          onChange={this.handleOnChange}
        />
        <div className="value">{this.state.value}</div>
      </Styles>
    );
  }
}
