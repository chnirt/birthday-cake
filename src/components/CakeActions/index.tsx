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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  if (!run) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 16,
          padding: 16,
          // border: "1px solid white",
        }}
      >
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
          {candleVisible ? "Blow out the candle" : "Light the candle"}
        </button>
        <button id="user-guide" onClick={() => setRun(true)}>
          User guide
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
        padding: 16,
        // border: "1px solid white",
      }}
    >
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
        {candleVisible ? "Blow out the candle" : "Light the candle"}
      </button>
    </div>
  );
};
