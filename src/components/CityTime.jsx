import { useEffect, useState } from "react";

export default function LocalTime() {
  const [selectedCity, setSelectedCity] = useState("Fergana");
  const [currentTime, setCurrentTime] = useState("");

  const cityTimezones = {
    Fergana: "Asia/Tashkent",
    London: "Europe/London",
    Tokyo: "Asia/Tokyo",
    NewYork: "America/New_York",
    Sydney: "Australia/Sydney",
    Paris: "Europe/Paris",
    Berlin: "Europe/Berlin",
    Dubai: "Asia/Dubai",
    Moscow: "Europe/Moscow",
    Beijing: "Asia/Shanghai",
    Singapore: "Asia/Singapore",
    RioDeJaneiro: "America/Sao_Paulo",
    CapeTown: "Africa/Johannesburg",
    Cairo: "Africa/Cairo",
  };

  useEffect(() => {
    const updateTime = () => {
      const timezone = cityTimezones[selectedCity];
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const formattedTime = formatter.format(new Date());
      setCurrentTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  return (
    <div className="flex p-6 flex-col">
      <label className="text-white" htmlFor="city-select">
        Choose a city:
      </label>
      <select
        className="rounded-md max-w-36 w-full px-2 py-1"
        id="city-select"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        {Object.keys(cityTimezones).map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <p className="text-white">
        Current time in <br /> <strong>{selectedCity}</strong>: {currentTime}
      </p>
    </div>
  );
}
