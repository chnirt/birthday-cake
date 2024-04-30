import { Fragment } from "react/jsx-runtime";
import {
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
  TbPlayerStopFilled,
  TbInfoCircleFilled,
  TbFlame,
  TbFlameOff,
  TbShare3,
} from "react-icons/tb";
import { useCallback } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const buttonStyle = {
  color: "#ffffff",
  opacity: 0.9,
  borderWidth: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#000000",
};

export const CakeActions = ({
  run,
  start,
  pause,
  stop,
  toggleLightCandle,
  setRun,
  playing,
  paused,
  candleVisible,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const guide = useCallback(() => setRun(true), [setRun]);

  const actions = useCallback(() => {
    return (
      <Fragment>
        {!playing || paused ? (
          <button id="start" style={buttonStyle} onClick={start}>
            {/* Start */}
            <TbPlayerPlayFilled />
          </button>
        ) : null}
        {playing && !paused ? (
          <button id="pause" style={buttonStyle} onClick={pause}>
            {/* Pause */}
            <TbPlayerPauseFilled />
          </button>
        ) : null}
        {playing ? (
          <button id="stop" style={buttonStyle} onClick={stop}>
            {/* Stop */}
            <TbPlayerStopFilled />
          </button>
        ) : null}
        <button
          id="toggle-candle"
          style={buttonStyle}
          onClick={toggleLightCandle}
        >
          {/* {candleVisible ? "Blow out" : "Light"} */}
          {candleVisible ? <TbFlameOff /> : <TbFlame />}
        </button>
        {!playing ? (
          <button id="user-guide" style={buttonStyle} onClick={guide}>
            {/* User guide */}
            <TbInfoCircleFilled />
          </button>
        ) : null}
        <CopyToClipboard
          text={[window.location.href, "shared=true"].join("&")}
          onCopy={() => toast("Copied to clipboard!")}
        >
          <button id="share" style={buttonStyle}>
            <TbShare3 />
          </button>
        </CopyToClipboard>
      </Fragment>
    );
  }, [
    candleVisible,
    guide,
    pause,
    paused,
    playing,
    start,
    stop,
    toggleLightCandle,
  ]);

  const guideActions = useCallback(() => {
    return (
      <Fragment>
        <button id="start" style={buttonStyle} onClick={start} disabled={run}>
          {/* Start */}
          <TbPlayerPlayFilled />
        </button>
        <button id="pause" style={buttonStyle} onClick={pause} disabled={run}>
          {/* Pause */}
          <TbPlayerPauseFilled />
        </button>
        <button id="stop" style={buttonStyle} onClick={stop} disabled={run}>
          {/* Stop */}
          <TbPlayerStopFilled />
        </button>
        <button
          id="toggle-candle"
          style={buttonStyle}
          onClick={toggleLightCandle}
          disabled={run}
        >
          {/* {candleVisible ? "Blow out" : "Light"} */}
          {candleVisible ? <TbFlameOff /> : <TbFlame />}
        </button>
        <button id="share" style={buttonStyle}>
          <TbShare3 />
        </button>
      </Fragment>
    );
  }, [candleVisible, pause, run, start, stop, toggleLightCandle]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
        padding: 16,
        height: 50,
        // border: "1px solid white",
      }}
    >
      {run ? guideActions() : actions()}
    </div>
  );
};
