library(plumber)
library(dplyr)
library(readr)
library(lubridate)
library(jsonlite)
library(forecast)
library(zoo)

# Load dataset
climate_data <- read_csv("cleaned_climate_data.csv")

#* Wind Speed Distribution by Region
#* @get /wind_speed_distribution
#* @param region Optional region filter
#* @param start Optional start date (YYYY-MM-DD)
#* @param end Optional end date (YYYY-MM-DD)
wind_speed_distribution <- function(region = NULL, start = NULL, end = NULL) {
  data <- climate_data
  
  if (!is.null(region)) {
    data <- data %>% filter(Region == region)
  }
  if (!is.null(start)) {
    data <- data %>% filter(Date >= start)
  }
  if (!is.null(end)) {
    data <- data %>% filter(Date <= end)
  }

  list(wind_speeds = data$`WindSpeed(km/h)`)
}

#* Humidity Levels Over Time
#* @get /humidity_over_time
humidity_over_time <- function(region = NULL, start = NULL, end = NULL) {
  data <- climate_data %>%
    mutate(Date = lubridate::ymd(Date))  # Ensure correct Date format

  if (!is.null(region)) {
    data <- data %>% filter(Region == region)
  }
  if (!is.null(start)) {
    data <- data %>% filter(Date >= lubridate::ymd(start))
  }
  if (!is.null(end)) {
    data <- data %>% filter(Date <= lubridate::ymd(end))
  }

  summary <- data %>%
    group_by(date = Date) %>%
    summarise(humidity = mean(`Humidity(%)`, na.rm = TRUE), .groups = "drop")

  list(
    dates = as.character(summary$date),
    humidity = summary$humidity
  )
}


#* Air Pressure Trend
#* @get /air_pressure_trend
air_pressure_trend <- function(region = NULL, start = NULL, end = NULL) {
  data <- climate_data %>%
    mutate(Date = lubridate::ymd(Date))  # Use correct parser (ymd/mdy/dmy)

  if (!is.null(region)) {
    data <- data %>% filter(Region == region)
  }
  if (!is.null(start)) {
    data <- data %>% filter(Date >= lubridate::ymd(start))
  }
  if (!is.null(end)) {
    data <- data %>% filter(Date <= lubridate::ymd(end))
  }

  summary <- data %>%
    group_by(date = Date) %>%
    summarise(pressure = mean(`AirPressure(hPa)`, na.rm = TRUE), .groups = "drop")

  list(
    dates = as.character(summary$date),  # Return as character to avoid parsing issues in frontend
    pressure = summary$pressure
  )
}


#* Forecast Humidity
#* @get /humidity_forecast
humidity_forecast <- function() {
  monthly <- climate_data %>%
    mutate(month = as.yearmon(Date)) %>%
    group_by(month) %>%
    summarise(humidity = mean(`Humidity(%)`, na.rm = TRUE))

  ts_data <- ts(monthly$humidity, frequency = 12)
  fit <- auto.arima(ts_data)
  forecasted <- forecast(fit, h = 12)

  list(
    forecast_months = as.character(time(forecasted$mean)),
    forecast_values = as.numeric(forecasted$mean)
  )
}

#* Forecast Air Pressure
#* @get /pressure_forecast
pressure_forecast <- function() {
  monthly <- climate_data %>%
    mutate(month = as.yearmon(Date)) %>%
    group_by(month) %>%
    summarise(pressure = mean(`AirPressure(hPa)`, na.rm = TRUE))

  ts_data <- ts(monthly$pressure, frequency = 12)
  fit <- auto.arima(ts_data)
  forecasted <- forecast(fit, h = 12)

  list(
    forecast_months = as.character(time(forecasted$mean)),
    forecast_values = as.numeric(forecasted$mean)
  )
}
