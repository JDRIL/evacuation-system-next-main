"use client";

import React from "react";
import { useState, useEffect } from "react";

interface TimeProps {
  active?: boolean;
  from: Date | undefined;
}
const Timer = ({ active, from }: TimeProps) => {
  const [timePassed, setTimePassed] = useState(0);
  

  useEffect(() => {
    if (!from) return;
    const interval = setInterval(() => {
     //console.log(new Date().toLocaleTimeString());
     //console.log(from.toLocaleTimeString());
      setTimePassed(new Date().getTime() - from.getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [from]);

  const hours = Math.floor(
    (timePassed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timePassed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timePassed % (1000 * 60)) / 1000);

  return (
    <div className=" font-semibold text-white text-5xl">
      <span>{hours >= 10 ? hours : "0" + hours}:</span>
      <span>{minutes >= 10 ? minutes : "0" + minutes}:</span>
      <span>{seconds >= 10 ? seconds : "0" + seconds}</span>
    </div>
  );
};

export default Timer;
