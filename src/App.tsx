// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useCallback, useEffect, useRef, useState } from "react";
// import Lottie from "react-lottie";
// import confettiData from "./assets/confetti.json";
// import hbdData from "./assets/hbd.json";
import "@dotlottie/player-component";
import "./App.css";
import { Cake } from "./components/Cake";
import { CakeActions } from "./components/CakeActions";

// const src = "/assets/korea-hbd.mp3";
const src = new URL("/assets/korea-hbd.mp3", import.meta.url).href;

const steps = [
  {
    target: "#start",
    content: "Press start to play music and light the candle",
  },
  {
    target: "#pause",
    content: "Press pause if you want the music to pause temporarily",
  },
  {
    target: "#stop",
    content: "Press stop if you want to cancel temporarily",
  },
  {
    target: "#toggle-candle",
    content: "Press light if you want to light or blow out the candle",
  },
];

function App() {
  const [candleVisible, setCandleVisible] = useState(false);

  // const [isBlowing, setIsBlowing] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio(src));
  const microphoneStreamRef = useRef<MediaStream | null>(null);

  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [run, setRun] = useState(true);

  const lightCandle = useCallback(() => setCandleVisible(true), []);

  const toggleLightCandle = useCallback(
    () => setCandleVisible((prevState) => !prevState),
    []
  );

  const turnOffTheCandle = useCallback(() => setCandleVisible(false), []);

  const startAudio = useCallback(() => {
    setPlaying(true);
    audioRef.current.play();
    setPaused(false);
  }, []);

  const pause = useCallback(() => {
    audioRef.current.pause();
    setPaused(true);
  }, []);

  const stopAudio = useCallback(() => {
    setPlaying(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setPaused(false);
  }, []);

  const start = useCallback(() => {
    startAudio();
    lightCandle();
  }, [lightCandle, startAudio]);

  const stop = useCallback(() => {
    stopAudio();
    turnOffTheCandle();
  }, [stopAudio, turnOffTheCandle]);

  const blowCandles = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      microphoneStreamRef.current = stream;

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
        const threshold = 43;

        if (average > threshold) {
          // setIsBlowing(true);
          setCandleVisible(false);
        } else {
          // setIsBlowing(false);
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
      if (microphoneStreamRef.current) {
        microphoneStreamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [blowCandles]);

  useEffect(() => {
    audioRef.current.preload = "auto";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        // border: "1px solid red",
      }}
    >
      <Cake {...{ candleVisible }} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          // border: "1px solid blue",
        }}
      >
        <dotlottie-player
          src="/assets/hbd.lottie"
          autoplay
          loop
          style={{
            zIndex: 20,
            visibility: playing ? "visible" : "hidden",
            width: 400,
          }}
        />

        <dotlottie-player
          src="/assets/confetti.lottie"
          autoplay
          loop
          style={{
            zIndex: 30,
            visibility: playing ? "visible" : "hidden",
            width: 400,
          }}
        />
      </div>

      <CakeActions
        {...{
          steps,
          run,
          start,
          pause,
          stop,
          toggleLightCandle,
          setRun,
          playing,
          paused,
          candleVisible,
        }}
      />
    </div>
  );
}

export default App;
