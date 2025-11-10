import { useEffect, useState } from "react";
import { Pages } from "./enums/pages";
import type { PageProps } from "../props/Props";
import { fadeBodyBackground } from "../utils/BodyFade";

export default function HomePage({ setPage }: PageProps) {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000 * 10);

    setDate(new Date());

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fadeBodyBackground("none");
  }, []);

  return (
    <div className="screen-parent">
      <div className="screen-time-div flex flex-col">
        <h2 className="select-none text-[150px] mx-auto font-bold text-white">
          {date
            ? date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : "12:05"}
        </h2>
      </div>
      <div className="img-div w-150 mx-auto">
        <img
          src="/photo.png"
          alt="photo"
          className="rounded-[90%] bg-white/10 w-full h-full"
          draggable="false"
        />
      </div>
      <div className="info-div mt-10 flex flex-col gap-10">
        <p className="text-7xl text-center text-white font-bold mb-6">
          Guga Nadirashvili
        </p>
        <p className="text-5xl ml-15 text-white">
          <span className="font-bold">Role:</span> Full Stack Developer
        </p>
        <p className="text-5xl ml-15 text-white">
          <span className="font-bold">Age:</span> 28
        </p>
        <p className="text-5xl ml-15 text-white">
          <span className="font-bold">Location:</span> Tbilisi, Georgia
        </p>
        <p className="text-5xl ml-15 text-white">
          <span className="font-bold">Hobbies:</span> not sleeping at night
        </p>
      </div>
      <div className="buttons-div">
        <div className="button-div">
          <button
            onClick={() => {
              setPage(Pages.projects);
            }}
            className="text-6xl bg-gray-500 py-6 px-20 rounded-4xl cursor-pointer"
          >
            Projects →
          </button>
        </div>
      </div>
    </div>
  );
}
