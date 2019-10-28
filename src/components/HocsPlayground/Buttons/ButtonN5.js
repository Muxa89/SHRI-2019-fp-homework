/**
 * Необходимо имплементировать компонент и его логику путем композиции хоков и stateless компонента BaseButton
 */
import React from "react";
import { compose, withProps, withState, withHandlers } from "recompose";
import BaseButton from "./BaseButton";
import withPrimaryColor from "../hocs/withPrimaryColor";

const possibleColors = ["red", "blue", "orange", "gray", "green"];

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

export default compose(
  withProps({ size: "large" }),
  withPrimaryColor,
  withState("angle", "setAngle", 0),
  withHandlers({
    onClick: ({ angle, setAngle, setInnerColor, setOuterColor }) => () => {
      setAngle(n => n + 30);
      if ((angle / 30) % 12 === 11) {
        setInnerColor(possibleColors[getRandomInt(possibleColors.length)]);
        setOuterColor(possibleColors[getRandomInt(possibleColors.length)]);
      }
    }
  })
)(props => (
  <div
    style={{
      display: "inline-block",
      transform: `rotate(${props.angle}deg)`
    }}
  >
    <BaseButton {...props} />
  </div>
));
