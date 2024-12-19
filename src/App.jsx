import { useEffect, useState } from "react";
import "./App.css";
import useSound from "use-sound";
import SoundPlay from "../public/short-beep-countdown-81121.mp3";
import Clock from "./components/Clock";
import City from "./components/CityTime";
function App() {
  const [sekund, setSekund] = useState(0);
  const [timer, setTimer] = useState(false);
  const [play] = useSound(SoundPlay, { volume: 0.9 });
  useEffect(() => {
    let interval;
    if (timer) {
      interval = setInterval(() => {
        setSekund((prevSecund) => {
          if (prevSecund == 4) {
            play();
          }
          if (prevSecund <= 0) {
            clearInterval(interval);
            setSekund(1500);
            setTimer(false);
            return 0;
          }
          return prevSecund - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  function handleStart() {
    setTimer(!timer);
  }
  function handleReset() {
    setTimer(false);
    setSekund(0);
  }

  let minutes = Math.floor(sekund / 60);
  let seconds = sekund % 60;

  return (
    <div>
      <Clock></Clock>

      <div className="mx-auto container flex items-center justify-center gap-10 mt-28">
        <City></City>
        <div className="flex bg-red-400 justify-center w-96  py-5  rounded-lg">
          <div className="flex items-center flex-col justify-between gap-20">
            <div className="flex items-center justify-between gap-4 ">
              <button
                onClick={() => {
                  setSekund(1500);
                  setTimer(false);
                }}
                className="button px-2 hover:bg-red-800 hover:text-white transition-all duration-300   rounded-md border-red text-white  "
              >
                Pomodoro
              </button>
              <button
                onClick={() => {
                  setSekund(300);
                  setTimer(false);
                }}
                className="button px-2 hover:bg-blue-300 hover:text-white transition-all duration-300   rounded-md border-red text-white  "
              >
                Short Break
              </button>
              <button
                onClick={() => {
                  setSekund(900);
                  setTimer(false);
                }}
                className="button px-2 hover:bg-green-400 hover:text-white transition-all duration-300   rounded-md border-red text-white  "
              >
                Long Break
              </button>
            </div>

            <h1 className="text-white font-sans text-8xl font-bold  ">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h1>
            {timer ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    handleStart();
                  }}
                  className="button w-40 rounded-md border-red text-red-800 px-3 py-1 bg-white"
                >
                  Pauza
                </button>
                <button
                  onClick={() => {
                    handleReset();
                  }}
                  className="button w-40 rounded-md border-red text-red-800 px-3 py-1 bg-white"
                >
                  Reset
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <input
                  className="w-40 py-2 px-2 rounded-lg"
                  type="number"
                  placeholder="Enter number"
                  onChange={(e) => {
                    setSekund(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    handleStart();
                  }}
                  className="button w-40 rounded-md hover:text-white hover:bg-red-500 hover:border-none  transition-all duration-500 border-black text-slate-800 px-3 py-1 bg-white"
                >
                  Start
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
