import clearDay from "../assets/icons/clear-day.png";
import clearNight from "../assets/icons/clear-night.png";
import fewCloudsDay from "../assets/icons/few-clouds-day.png";
import fewCloudsNight from "../assets/icons/few-clouds-night.png";
import scatteredClouds from "../assets/icons/scattered-clouds.png";
import brokenCloudsDay from "../assets/icons/broken-clouds-day.png";
import brokenCloudsNight from "../assets/icons/broken-clouds-night.png";
import showerRain from "../assets/icons/shower-rain.png";
import rain from "../assets/icons/rain.png";
import thunderstorm from "../assets/icons/thunderstorm.png";
import snow from "../assets/icons/snow.png";
import mist from "../assets/icons/mist.png";
import fallback from "../assets/icons/default.png";

const iconMap = {
  clearDay,
  clearNight,
  fewCloudsDay,
  fewCloudsNight,
  scatteredClouds,
  brokenCloudsDay,
  brokenCloudsNight,
  showerRain,
  rain,
  thunderstorm,
  snow,
  mist,
  fallback,
};

const iconCodeMap = {
  "01d": "clearDay",
  "01n": "clearDay",
  "02d": "fewCloudsDay",
  "02n": "fewCloudsDay",
  "03d": "scatteredClouds",
  "03n": "scatteredClouds",
  "04d": "brokenCloudsDay",
  "04n": "brokenCloudsDay",
  "09d": "showerRain",
  "09n": "showerRain",
  "10d": "rain",
  "10n": "rain",
  "11d": "thunderstorm",
  "11n": "thunderstorm",
  "13d": "snow",
  "13n": "snow",
  "50d": "mist",
  "50n": "mist",
};

const getWeatherIcon = (iconCode) => {
  const iconKey = iconCodeMap[iconCode] || "fallback";
  return iconMap[iconKey];
};

export default getWeatherIcon;
