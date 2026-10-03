import { useState, useEffect } from "react";
import { Lang, CONTENT } from "../content";

export interface OpenStatus {
  isOpen: boolean;
  statusText: string;
  tunisTimeStr: string;
}

export function useOpenNow(lang: Lang): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>({
    isOpen: false,
    statusText: "",
    tunisTimeStr: "",
  });

  useEffect(() => {
    function computeStatus() {
      try {
        const now = new Date();
        // Africa/Tunis is UTC+1 year-round (no daylight saving time)
        const tunisDateStr = now.toLocaleString("en-US", {
          timeZone: "Africa/Tunis",
          hour12: false,
          weekday: "short",
          hour: "numeric",
          minute: "numeric",
        });

        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Africa/Tunis",
          weekday: "short",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        });

        const parts = formatter.formatToParts(now);
        let weekday = "";
        let hour = 0;
        let minute = 0;

        for (const p of parts) {
          if (p.type === "weekday") weekday = p.value;
          if (p.type === "hour") hour = parseInt(p.value, 10);
          if (p.type === "minute") minute = parseInt(p.value, 10);
        }

        const isMonday = weekday.toLowerCase().startsWith("mon");
        const currentDecTime = hour + minute / 60;
        const isOpen = !isMonday && currentDecTime >= 8.0 && currentDecTime < 18.0;

        const langData = CONTENT[lang].hoursLocation;
        let statusText = "";

        if (isOpen) {
          statusText = langData.openNow;
        } else if (isMonday) {
          statusText = langData.closedMonday;
        } else if (currentDecTime >= 18.0) {
          if (weekday.toLowerCase().startsWith("sun")) {
            statusText = langData.closedMonday;
          } else {
            statusText = langData.opensTuesday;
          }
        } else {
          statusText = langData.opensTuesday;
        }

        setStatus({
          isOpen,
          statusText,
          tunisTimeStr: tunisDateStr,
        });
      } catch {
        setStatus({
          isOpen: false,
          statusText: CONTENT[lang].hoursLocation.closed,
          tunisTimeStr: "",
        });
      }
    }

    computeStatus();
    const interval = setInterval(computeStatus, 60000);
    return () => clearInterval(interval);
  }, [lang]);

  return status;
}
