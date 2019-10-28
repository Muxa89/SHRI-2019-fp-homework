/**
 * Необходимо имплементировать компонент и его логику путем композиции хоков и stateless компонента BaseButton
 */
import {
  compose,
  withHandlers,
  withState,
  withProps,
  renameProp
} from "recompose";
import BaseButton from "./BaseButton";
import withPrimaryColor from "../hocs/withPrimaryColor";
import withSmallSize from "../hocs/withSmallSize";

export default compose(
  withPrimaryColor,
  withSmallSize,
  renameProp("children", "baseText"),
  withState("clickCounter", "setClickCounter", 0),
  withProps(({ baseText, clickCounter }) => ({
    children: `${clickCounter} ${baseText}`
  })),
  withHandlers({
    onClick: ({
      setOuterColor,
      setInnerColor,
      setClickCounter,
      clickCounter
    }) => () => {
      setOuterColor(clickCounter & 1 ? "gray" : "green");
      setInnerColor(clickCounter & 1 ? "gray" : "green");
      setClickCounter(n => n + 1);
    }
  })
)(BaseButton);
