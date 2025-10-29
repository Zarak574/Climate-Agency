# predict.R
library(forecast)
library(jsonlite)
library(plumber)
library(anomalize)
library(tidyverse)
library(corrplot)
source("correlation_analysis.R")
source("eda.R")
source("temperature_insights.R")
source("precipitation_insights.R")
source("atmospheric_conditions.R")
source("solar_air_metrics.R")
source("satellite_sensor.R")
source("station_regional.R")
source("aggregated.R")
source("alerts.R")



#* @apiTitle Climate Forecast API

#* Forecast weather data
#* @param days Number of days to predict
#* @param type Type of forecast: daily, monthly, or yearly
#* @post /predict
function(days = 30, type = "daily") {
  days <- as.numeric(days)
  type <- tolower(type)
  
  if (type == "monthly") {
    days <- 30 * 12
  } else if (type == "yearly") {
    days <- 365 * 3
  }
  
  # Load all models
  temp_model <- readRDS("models/arima_temp.rds")
  rain_model <- readRDS("models/arima_rain.rds")
  humidity_model <- readRDS("models/arima_humidity.rds")

  # Forecast each
  temp_forecast <- forecast(temp_model, h = days)
  rain_forecast <- forecast(rain_model, h = days)
  humidity_forecast <- forecast(humidity_model, h = days)

  dates <- as.character(seq.Date(Sys.Date() + 1, by = "day", length.out = days))

  list(
    temperature = list(
      mean = as.numeric(temp_forecast$mean),
      lower = as.numeric(temp_forecast$lower[,2]),
      upper = as.numeric(temp_forecast$upper[,2])
    ),
    rainfall = list(
      mean = as.numeric(rain_forecast$mean),
      lower = as.numeric(rain_forecast$lower[,2]),
      upper = as.numeric(rain_forecast$upper[,2])
    ),
    humidity = list(
      mean = as.numeric(humidity_forecast$mean),
      lower = as.numeric(humidity_forecast$lower[,2]),
      upper = as.numeric(humidity_forecast$upper[,2])
    ),
    dates = dates
  )
}

#* @post /predict_hourly
function(hours = 24) {
  hours <- as.numeric(hours)

  temp_model <- readRDS("models/arima_temp_hourly.rds")
  rain_model <- readRDS("models/arima_rain_hourly.rds")
  humidity_model <- readRDS("models/arima_humidity_hourly.rds")

  temp_forecast <- forecast(temp_model, h = hours)
  rain_forecast <- forecast(rain_model, h = hours)
  humidity_forecast <- forecast(humidity_model, h = hours)

  timestamps <- as.character(seq.POSIXt(Sys.time() + 3600, by = "hour", length.out = hours))

  list(
    temperature = list(mean = as.numeric(temp_forecast$mean)),
    rainfall = list(mean = as.numeric(rain_forecast$mean)),
    humidity = list(mean = as.numeric(humidity_forecast$mean)),
    timestamps = timestamps
  )
}


#* @apiTitle Climate Forecast API


#* @get /correlations
function() {
  correlation_endpoint()
}

#* @get /trend
function() {
  trend_endpoint()
}

#* @get /temperature_trends
function() {
  tempminmax_endpoint()
  
}

#* @get /average_temp_by_station
function() {
  avg_temp_endpoint()
}

#* @get /temperature_variability
function() {
  tempvariable_endpoint()
}

#* @get /summary_cards
function() {
  summary_cards_endpoint()
}


#* @get /total_precipitation
function() {
  total_precip_endpoint()
}

#* @get /rainfall_vs_precip
function() {
  rainfall_comparison_endpoint()
}

#* @get /rainfall_distribution
function() {
  rainfall_distribution_endpoint()
}

#* @get /rainfall_forecast
function() {
  rainfall_forecast_endpoint()
}

#* @get /rainfall_summary_cards
function() {
  rainfall_summary_cards()
}

#* @get /wind_speed_distribution
function() {
  wind_speed_distribution()
}

#* @get /humidity_over_time
function() {
  humidity_over_time()
}

#* @get /air_pressure_trend
function() {
  air_pressure_trend()
}

#* @get /humidity_forecast
function() {
  humidity_forecast()
}

#* @get /pressure_forecast
function() {
  pressure_forecast()
}

#* @get /solar_heatmap
function() {
  solar_heatmap()
}

#* @get /co2_trend_forecast
function() {
  co2_trend_forecast()
}

#* @get /pressure_vs_solar
function() {
  pressure_vs_solar()
}

#* @get /satellite_imagery_index
function() {
  satellite_imagery_index()
}

#* @get /weather_station_scores
function() {
  weather_station_scores()
}

#* @get /sensor_reliability
function() {
  sensor_reliability()
}

#* @get /satellite_summary_cards
function() {
  satellite_summary_cards()
}

#* @get /geospatial_insights
function() {
  geospatial_insights()
}

#* @get /regions_list
function() {
  regions_list()
}

#* @get /aggregated_kpis
function() {
  aggregated_kpis()
}

#* @get /all_average_climate
function() {
  all_average_climate()
}

#* @get /alerts
function() {
  alerts()
}