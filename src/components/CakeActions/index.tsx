import { Fragment } from "react/jsx-runtime";

const buttonStyle = {
  color: "#ffffff",
  opacity: 0.9,
  borderWidth: 0,
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
  const actions = () => {
    return (
      <Fragment>
        {!playing || paused ? (
          <button id="start" style={buttonStyle} onClick={start}>
            Start
          </button>
        ) : null}
        {playing && !paused ? (
          <button id="pause" style={buttonStyle} onClick={pause}>
            Pause
          </button>
        ) : null}
        {playing ? (
          <button id="stop" style={buttonStyle} onClick={stop}>
            Stop
          </button>
        ) : null}
        <button
          id="toggle-candle"
          style={buttonStyle}
          onClick={toggleLightCandle}
        >
          {candleVisible ? "Blow out" : "Light"}
        </button>
        <button
          id="user-guide"
          style={buttonStyle}
          onClick={() => setRun(true)}
        >
          User guide
        </button>
      </Fragment>
    );
  };

  const guideActions = () => {
    return (
      <Fragment>
        <button id="start" style={buttonStyle} onClick={start} disabled={run}>
          Start
        </button>
        <button id="pause" style={buttonStyle} onClick={pause} disabled={run}>
          Pause
        </button>
        <button id="stop" style={buttonStyle} onClick={stop} disabled={run}>
          Stop
        </button>
        <button
          id="toggle-candle"
          style={buttonStyle}
          onClick={toggleLightCandle}
          disabled={run}
        >
          {candleVisible ? "Blow out" : "Light"}
        </button>
      </Fragment>
    );
  };

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
