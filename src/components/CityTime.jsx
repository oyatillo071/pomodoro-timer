import { useEffect, useState } from "react";

export default function LocalTime() {
  const [selectedCity, setSelectedCity] = useState("Tokyo");
  const [currentTime, setCurrentTime] = useState("");
  const [error, setError] = useState(null);

  const cityLocations = {
    Tokyo: "Tokyo, Japan",
    London: "London, UK",
    NewYork: "New York, USA",
    Sydney: "Sydney, Australia",
    Paris: "Paris, France",
    Berlin: "Berlin, Germany",
    Dubai: "Dubai, UAE",
    Moscow: "Moscow, Russia",
    Beijing: "Beijing, China",
    Singapore: "Singapore, Singapore",
    RioDeJaneiro: "Rio de Janeiro, Brazil",
    CapeTown: "Cape Town, South Africa",
    Cairo: "Cairo, Egypt",
  };

  useEffect(() => {
    const fetchTime = async () => {
      const location = cityLocations[selectedCity];

      const apiKey = `${import.meta.env.VITE_TIME_API_KEY}`;

      const url = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&location=${encodeURIComponent(
        location
      )}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          redirect: "follow",
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentTime(data.date_time_txt);
          console.log(data);

          setError(null);
        } else {
          const errorText = await response.text();
          setError(`Error: ${response.status} ${errorText}`);
          setCurrentTime("");
        }
      } catch (err) {
        setError(`Fetch error: ${err.message}`);
        setCurrentTime("");
      }
    };

    fetchTime();
  }, [selectedCity]);

  return (
    <div className="flex p-6 flex-col border w-52 rounded-lg">
      <input
        type="text"
        className="border border-black rounded-md max-w-36 w-full mb-3 px-3 py-2"
        placeholder="Enter city name"
        onBlur={(e) => setSelectedCity(e.target.value)}
      />
      <label className="text-white mb-2" htmlFor="city-select">
        Or choose a city:
      </label>
      <select
        className="rounded-md max-w-36 bg-white w-full px-4 py-2 mb-3"
        id="city-select"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        {Object.keys(cityLocations).map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-white">
          Current date in <br /> <strong>{selectedCity}</strong>: {currentTime}
        </p>
      )}
    </div>
  );
}
