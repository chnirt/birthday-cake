import { Fragment } from "react/jsx-runtime";

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
          <button id="start" onClick={start}>
            Start
          </button>
        ) : null}
        {playing && !paused ? (
          <button id="pause" onClick={pause}>
            Pause
          </button>
        ) : null}
        {playing ? (
          <button id="stop" onClick={stop}>
            Stop
          </button>
        ) : null}
        <button id="toggle-candle" onClick={toggleLightCandle}>
          {candleVisible ? "Blow out" : "Light"}
        </button>
        <button id="user-guide" onClick={() => setRun(true)}>
          User guide
        </button>
      </Fragment>
    );
  };

  const guideActions = () => {
    return (
      <Fragment>
        <button id="start" onClick={start} disabled={run}>
          Start
        </button>
        <button id="pause" onClick={pause} disabled={run}>
          Pause
        </button>
        <button id="stop" onClick={stop} disabled={run}>
          Stop
        </button>
        <button id="toggle-candle" onClick={toggleLightCandle} disabled={run}>
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
