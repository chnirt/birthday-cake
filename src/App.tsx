// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import confettiData from "./assets/confetti.json";
import hbdData from "./assets/hbd.json";
import "./App.css";

// const src = "/assets/korea-hbd.mp3";
const src = new URL("./assets/korea-hbd.mp3", import.meta.url).href;

function App() {
  const [candleVisible, setCandleVisible] = useState(false);

  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(
    null
  );
  const [isBlowing, setIsBlowing] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio(src));
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  const lightCandle = useCallback(() => {
    setCandleVisible(true);
  }, []);

  const turnOffTheCandle = useCallback(() => setCandleVisible(false), []);

  const startAudio = useCallback(() => {
    setPlaying(true);
    audioRef.current.play();
    setPaused(false);
  }, []);

  const pause = useCallback(() => {
    // audioRef.current.pause();
    // setPaused(true);
  }, []);

  const stopAudio = useCallback(() => {
    setPlaying(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setPaused(false);
  }, []);

  const start = useCallback(() => {
    // startAudio();
    lightCandle();
  }, [lightCandle, startAudio]);

  const stop = useCallback(() => {
    // stopAudio();
    turnOffTheCandle();
  }, [stopAudio, turnOffTheCandle]);

  const blowCandles = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setMicrophoneStream(stream);

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.fftSize = 2048;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const detectBlow = () => {
        analyser.getByteFrequencyData(dataArray);
        const average =
          dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
        const threshold = 40;

        if (average > threshold) {
          setIsBlowing(true);
        } else {
          setIsBlowing(false);
        }
      };

      setInterval(detectBlow, 100);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }, []);

  useEffect(() => {
    blowCandles();

    return () => {
      if (microphoneStream) {
        microphoneStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [blowCandles, microphoneStream]);

  useEffect(() => {
    if (isBlowing === true) {
      setCandleVisible(false);
    }
  }, [isBlowing]);

  useEffect(() => {
    // audioRef.current.preload = "auto";
  }, []);

  const confettiOptions = {
    loop: true,
    autoplay: true,
    animationData: confettiData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const hbdOptions = {
    loop: true,
    autoplay: true,
    animationData: hbdData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={
        {
          // border: "1px solid red",
        }
      }
    >
      <div className="cake">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        <div className="candle">
          {candleVisible && !isBlowing ? <div className="flame"></div> : null}
        </div>
      </div>

      <div
        style={
          {
            // border: "1px solid blue",
          }
        }
      >
        <Lottie
          style={{
            zIndex: 20,
            visibility: candleVisible ? "visible" : "hidden",
          }}
          options={hbdOptions}
          // height={200}
          width={400}
          isClickToPauseDisabled
        />

        <Lottie
          style={{
            zIndex: 30,
            visibility: candleVisible ? "visible" : "hidden",
          }}
          options={confettiOptions}
          // height={200}
          width={400}
          // isStopped={this.state.isStopped}
          // isPaused={this.state.isPaused}
          isClickToPauseDisabled
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 16,
          // border: "1px solid white",
        }}
      >
        <button onClick={playing ? (paused ? start : pause) : start}>
          {playing ? (paused ? "Play" : "Pause") : "Start"}
        </button>
        {playing ? <button onClick={stop}>Stop</button> : null}
        <button onClick={lightCandle} disabled={candleVisible}>
          Light candle
        </button>
      </div>
    </div>
  );
}

export default App;
