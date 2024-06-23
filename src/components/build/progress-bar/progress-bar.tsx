import { useEffect, useRef, useState } from "react";
type ProgressBarType = {
  length: number;
  curr: number;
  timeLeft: number;
  func: (t: number) => void;
};
const ProgressBar = ({ length, curr, timeLeft, func }: ProgressBarType) => {
  // add rest of timer
  // REFS
  const progressRef = useRef<HTMLDivElement>(null);
  //   STATE
  const [timer, setTimer] = useState(timeLeft);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = (curr * 100) / length + "%";
    }
  }, [curr]);
  //   TIMER

  useEffect(() => {
    if (curr === length + 1 || timer === 0) {
      return;
    } else {
      const timeoutId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);

      func(timer);
      return () => clearTimeout(timeoutId);
    }
  }, [timer]);

  //   FUNCTION
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <>
      {/* progress-bar / timer */}

      <div className="bg-gray-300 h-3 flex-1 rounded-full">
        <div
          ref={progressRef}
          className="bg-green-600 h-full w-0 rounded-full "
        ></div>
      </div>
      <div>{formatTime(timer)}</div>
    </>
  );
};

export default ProgressBar;
