import { useState, useEffect } from "react";

const SaleTimer = ({ deadline }) => {

  if(!deadline) return;

  const calculateTimeLeft = () => {
    const difference = new Date(deadline) - new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <p className="text-red-500 font-semibold">Sale Ended!</p>;
  }

  return (
    <div className="bg-[red] text-white px-4 py-2 shadow-md text-center flex items-center justify-center gap-3">
      <p className="font-semibold text-lg">Hurry! Sale Ends In:</p>
      <div className="flex gap-2 text-lg font-bold">
        <div className="bg-black/30 px-3 py-1 rounded shadow">
          {timeLeft.days}d
        </div>
        <div className="bg-black/30 px-3 py-1 rounded shadow">
          {timeLeft.hours}h
        </div>
        <div className="bg-black/30 px-3 py-1 rounded shadow">
          {timeLeft.minutes}m
        </div>
        <div className="bg-black/30 px-3 py-1 rounded shadow">
          {timeLeft.seconds}s
        </div>
      </div>
    </div>
  );
};

export default SaleTimer
