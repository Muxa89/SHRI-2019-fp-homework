/**
 * Необходимо имплементировать компонент и его логику путем композиции хоков и stateless компонента BaseButton
 */
import React from "react";
import { compose, withProps, withState, withHandlers } from "recompose";
import BaseButton from "./BaseButton";
import withSmallSize from "../hocs/withSmallSize";
import withDefaultColor from "../hocs/withDefaultColor";

const withCounter = baseComponent =>
  compose(
    withProps(({ children, counter }) => ({
      children: (
        <span
          style={{
            position: "relative"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-55px",
              margin: "auto",
              color: "black",
              backgroundColor: "lightgray",
              width: "10px",
              padding: "10px",
              left: "calc(50% - 15px)",
              borderRadius: "5px"
            }}
          >
            {counter}
          </div>
          {children}
        </span>
      )
    }))
  )(baseComponent);

export default compose(
  withSmallSize,
  withDefaultColor,
  withState("counter", "updateCounter", 5),
  withHandlers({
    onClick: ({
      counter,
      updateCounter,
      setOuterColor,
      setInnerColor
    }) => () => {
      updateCounter(n => n - 1);
      if (counter === 1) {
        setOuterColor("orange");
        setInnerColor("orange");
        updateCounter(5);
      }
    }
  }),
  withCounter
)(BaseButton);
