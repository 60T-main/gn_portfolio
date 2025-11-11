import { useEffect, useState } from "react";
import { Pages } from "./enums/pages";

interface IphoneHeaderProps {
  page: Pages;
}

export default function IphoneHeader({ page }: IphoneHeaderProps) {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000 * 10);

    setDate(new Date());

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="iphone-header">
      <div className={`time-logo ${page === Pages.home ? "-ml-4" : "ml-4"}`}>
        {page === Pages.home
          ? "GN-CELL"
          : date
          ? date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          : "12:05"}{" "}
      </div>
      <div className="battery-wifi">
        <img src="/wifi.png" alt="" />
        <img src="/battery.png" alt="" />
      </div>
    </header>
  );
}
