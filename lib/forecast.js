let favoritesForecast = [];

class Forecast {
  constructor(forecast, location){
    this.cityForecast = this.formatCityForecast(forecast, location);
  }

  formatCityForecast(rawForecast, locationList){
    if (rawForecast !== undefined && locationList !== undefined) {
      return {
        location: `${locationList[0]}, ${locationList[1]}`,
        currently: {
          summary: rawForecast["currently"]["summary"],
          icon: rawForecast["currently"]["icon"],
          precipIntensity: rawForecast["currently"]["precipIntensity"],
          precipProbability: rawForecast["currently"]["precipProbability"],
          temperature: rawForecast["currently"]["temperature"],
          humidity: rawForecast["currently"]["humidity"],
          pressure: rawForecast["currently"]["pressure"],
          windSpeed: rawForecast["currently"]["windSpeed"],
          windGust: rawForecast["currently"]["windGust"],
          windBearing: rawForecast["currently"]["windBearing"],
          cloudCover: rawForecast["currently"]["cloudCover"],
          visibility: rawForecast["currently"]["visibility"]
        },
        hourly: {
          summary: rawForecast["hourly"]["summary"],
          icon: rawForecast["hourly"]["icon"],
          data: rawForecast["hourly"]["data"].map(entry => {
            let trimmedData = {};
            trimmedData["summary"] = entry["summary"];
            trimmedData["icon"] = entry["icon"];
            trimmedData["precipIntensity"] = entry["precipIntensity"];
            trimmedData["precipProbability"] = entry["precipProbability"];
            trimmedData["temperature"] = entry["temperature"];
            trimmedData["humidity"] = entry["humidity"];
            trimmedData["pressure"] = entry["pressure"];
            trimmedData["windSpeed"] = entry["windSpeed"];
            trimmedData["windGust"] = entry["windGust"];
            trimmedData["windBearing"] = entry["windBearing"];
            trimmedData["cloudCover"] = entry["cloudCover"];
            trimmedData["visibility"] = entry["visibility"];
            return trimmedData;
          })
        },
        daily: {
          summary: rawForecast["daily"]["summary"],
          icon: rawForecast["daily"]["icon"],
          data: rawForecast["hourly"]["data"].map(entry => {
            let trimmedData = {};
            trimmedData["summary"] = entry["summary"];
            trimmedData["icon"] = entry["icon"];
            trimmedData["precipIntensity"] = entry["precipIntensity"];
            trimmedData["precipProbability"] = entry["precipProbability"];
            trimmedData["temperature"] = entry["temperature"];
            trimmedData["humidity"] = entry["humidity"];
            trimmedData["pressure"] = entry["pressure"];
            trimmedData["windSpeed"] = entry["windSpeed"];
            trimmedData["windGust"] = entry["windGust"];
            trimmedData["windBearing"] = entry["windBearing"];
            trimmedData["cloudCover"] = entry["cloudCover"];
            trimmedData["visibility"] = entry["visibility"];
            return trimmedData;
          })
        }
      }
    }
  }

  addFavorite(forecast, location){
    favoritesForecast.push({
    location: location,
    currently: {
      summary: forecast["currently"]["summary"],
      icon: forecast["currently"]["icon"],
      precipIntensity: forecast["currently"]["precipIntensity"],
      precipProbability: forecast["currently"]["precipProbability"],
      temperature: forecast["currently"]["temperature"],
      humidity: forecast["currently"]["humidity"],
      pressure: forecast["currently"]["pressure"],
      windSpeed: forecast["currently"]["windSpeed"],
      windGust: forecast["currently"]["windGust"],
      windBearing: forecast["currently"]["windBearing"],
      cloudCover: forecast["currently"]["cloudCover"],
      visibility: forecast["currently"]["visibility"]
      }
    });
  }

  favoritesForecast(){
    return favoritesForecast;
  }
}

module.exports = Forecast
