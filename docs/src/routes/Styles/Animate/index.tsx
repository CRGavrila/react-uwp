import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router";

import Toggle from "react-uwp/Toggle";
import DropDownMenu from "react-uwp/DropDownMenu";
import Button from "react-uwp/Button";
import Slider from "react-uwp/Slider";
import Icon from "react-uwp/Icon";

import CustomAnimate from "react-uwp/Animate/CustomAnimate";
import FadeInOut from "react-uwp/Animate/FadeInOut";
import ScaleInOut from "react-uwp/Animate/ScaleInOut";
import SlideInOut from "react-uwp/Animate/SlideInOut";

export interface DataProps {}

export interface AnimateProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {}

export interface AnimateState {
  animateName?: "Fade" | "Scale" | "Slide";
  speed?: number;
  numb?: number;
  transitionTimingFunction?: string;
}

const animateNames = [
  "Fade",
  "Scale",
  "Slide"
];

const animateSpeeds = [
  "500",
  "1000",
  "2000"
];

const transitionTimingFunctions = [
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "cubic-bezier(0.4, 0, 1, 1)",
  "cubic-bezier(0.47, 0, 0.75, 0.72)",
  "cubic-bezier(0.645, 0.045, 0.355, 1)"
];

export default class Animate extends React.Component<AnimateProps, AnimateState> {
  static defaultProps: AnimateProps = {};

  state: AnimateState = {
    animateName: "Scale",
    speed: 850,
    numb: 0,
    transitionTimingFunction: "ease"
  };

  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  handleChooseAnimateMethod = (animateName: any) => {
    this.setState({ animateName });
  }

  handleChooseAnimateSpeed = (speed: any) => {
    speed = +speed;
    this.setState({ speed });
  }

  handleChooseTransitionTimingFunction = (transitionTimingFunction: any) => {
    this.setState({ transitionTimingFunction });
  }

  increaseNumb = (e?: any) => {
    this.setState((preState, preProps) => ({ numb: preState.numb + 1 }));
  }

  decreaseNumb = (e?: any) => {
    this.setState((preState, preProps) => ({ numb: preState.numb - 1 }));
  }

  render() {
    const {
      ...attributes
    } = this.props;
    const { animateName, speed, numb, transitionTimingFunction } = this.state;
    const { theme } = this.context;
    const styles = getStyles(this);
    let AnimateWrapper: any = FadeInOut;
    switch (animateName) {
      case "Fade": {
        AnimateWrapper = FadeInOut;
        break;
      }
      case "Scale": {
        AnimateWrapper = ScaleInOut;
        break;
      }
      case "Slide": {
        AnimateWrapper = SlideInOut;
        break;
      }
      default: {
        break;
      }
    }

    return (
      <div
        {...attributes}
        style={styles.root}
      >
        <div style={styles.animate}>
          <AnimateWrapper
            speed={speed}
            key={`${animateName} ${speed} ${transitionTimingFunction}`}
            wrapperStyle={{ display: "block", width: "100%", marginBottom: 40 }}
            transitionTimingFunction={transitionTimingFunction}
          >
            <div style={styles.animateTitle}>
              Animate
            </div>
          </AnimateWrapper>
          <div>
            <DropDownMenu
              style={styles.animateControls}
              defaultValue={animateName}
              values={animateNames}
              onChangeValue={this.handleChooseAnimateMethod}
            />
            <DropDownMenu
              style={styles.animateControls}
              defaultValue={transitionTimingFunction}
              values={transitionTimingFunctions}
              onChangeValue={this.handleChooseTransitionTimingFunction}
            />
          </div>
          <Slider
            style={styles.animateControls}
            showValueInfo
            unit="ms"
            minValue={150}
            initValue={speed}
            maxValue={2000}
            onChangeValue={this.handleChooseAnimateSpeed}
          />
        </div>
        <div style={styles.count}>
          <AnimateWrapper
            speed={speed}
            mode="in-out"
            wrapperStyle={{ display: "block", height: 100, overflow: "hidden" }}
            transitionTimingFunction={transitionTimingFunction}
          >
            <div style={styles.countNumb} key={`${numb} ${speed} ${transitionTimingFunction}`}>
              {numb}
            </div>
          </AnimateWrapper>
          <div style={styles.countControls}>
            <Button onClick={this.increaseNumb}>
              +
            </Button>
            <Button onClick={this.decreaseNumb}>
              -
            </Button>
          </div>
        </div>
        <p style={{ fontSize: 36, fontWeight: "lighter" }}>
          Based On The Powerful ReactTransitionGroup.
        </p>
        <p>React UWP Animate  is very easy to use.</p>
        <Link to="/components" style={{ color: theme.listAccentMedium, marginTop: 24, fontSize: 18 }}>
          --- More Animate components ---
        </Link>
      </div>
    );
  }
}

function getStyles(animate: Animate): {
  root?: React.CSSProperties;
  animate?: React.CSSProperties;
  animateTitle?: React.CSSProperties;
  animateControls?: React.CSSProperties;
  count?: React.CSSProperties;
  countNumb?: React.CSSProperties;
  countControls?: React.CSSProperties;
} {
  const {
    context: { theme },
    props: { style }
  } = animate;
  const { prepareStyles } = theme;

  return {
    root: prepareStyles({
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontWeight: "lighter",
      textAlign: "center",
      ...style
    }),
    animate: prepareStyles({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%"
    }),
    animateTitle: {
      padding: "60px 0",
      display: "block",
      textAlign: "center",
      width: "100%",
      fontSize: 80,
      textTransform: "uppercase",
      color: "#fff",
      fontWeight: "lighter",
      background: `${theme.altMediumHigh} url(${require("./images/Tactile-13-1024x683.jpeg")}) no-repeat center center / cover`
    },
    animateControls: {
      margin: 4
    },
    count: {
      margin: "40px 0"
    },
    countNumb: {
      display: "block",
      color: "#fff",
      background: theme.accent,
      width: 240,
      margin: "0 auto",
      height: 100,
      textAlign: "center",
      lineHeight: 1,
      fontSize: 100,
      fontWeight: "lighter"
    },
    countControls: prepareStyles({
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      margin: "20px 0"
    })
  };
}
