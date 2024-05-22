import sunny from "App/Icons/weather-sunny.svg";
import clear from "App/Icons/weather-clear-night.svg";
import clouds from "App/Icons/weather-cloudy.svg";
import rain from "App/Icons/weather-rainy.svg";
import snow from "App/Icons/weather-snowy.svg";
import fog from "App/Icons/weather-fog.svg";
import lightning from "App/Icons/weather-lightning.svg";

export function weatherIconLookup(code: number, day: boolean = true) {
  switch (code) {
    case 1000: // "Sunny" / "Clear"
      return day ? sunny : clear;

    case 1003: // "Partly cloudy"
    case 1006: // "Cloudy"
    case 1009: // "Overcast"
      return clouds;

    case 1063: // "Patchy rain possible"
    case 1072: // "Patchy freezing drizzle possible"
    case 1150: // "Patchy light drizzle"
    case 1153: // "Light drizzle"
    case 1168: // "Freezing drizzle"
    case 1171: // "Heavy freezing drizzle"
    case 1180: // "Patchy light rain"
    case 1183: // "Light rain"
    case 1186: // "Moderate rain at times"
    case 1189: // "Moderate rain"
    case 1192: // "Heavy rain at times"
    case 1195: // "Heavy rain"
    case 1198: // "Light freezing rain"
    case 1201: // "Moderate or heavy freezing rain"
    case 1240: // "Light rain shower"
    case 1243: // "Moderate or heavy rain shower"
    case 1246: // "Torrential rain shower"
      return rain;

    case 1066: // "Patchy snow possible"
    case 1069: // "Patchy sleet possible"
    case 1114: // "Blowing snow"
    case 1117: // "Blizzard"
    case 1204: // "Light sleet"
    case 1207: // "Moderate or heavy sleet"
    case 1210: // "Patchy light snow"
    case 1213: // "Light snow"
    case 1216: // "Patchy moderate snow"
    case 1219: // "Moderate snow"
    case 1222: // "Patchy heavy snow"
    case 1225: // "Heavy snow"
    case 1237: // "Ice pellets"
    case 1249: // "Light sleet showers"
    case 1252: // "Moderate or heavy sleet showers"
    case 1255: // "Light snow showers"
    case 1258: // "Moderate or heavy snow showers"
    case 1261: // "Light showers of ice pellets"
    case 1264: // "Moderate or heavy showers of ice pellets"
      return snow;

    case 1030: // "Mist"
    case 1135: // "Fog"
    case 1147: // "Freezing fog"
      return fog;

    case 1087: // "Thundery outbreaks possible"
    case 1273: // "Patchy light rain with thunder"
    case 1276: // "Moderate or heavy rain with thunder"
    case 1279: // "Patchy light snow with thunder"
    case 1282: // "Moderate or heavy snow with thunder"
      return lightning;
  }
}
