library(plumber)
library(dplyr)
library(lubridate)
library(readr)
library(jsonlite)

climate_data <- read_csv("cleaned_climate_data.csv")
climate_data$Date <- as.Date(climate_data$Date)

#* Satellite Imagery Index Trends
#* @get /satellite_imagery_index
satellite_imagery_index <- function() {
  data <- climate_data %>%
    filter(!is.na(Date), !is.na(`SatelliteImageryIndex`)) %>%
    mutate(
      Date = lubridate::ymd(Date),           # Ensure proper Date parsing
      month = format(Date, "%Y-%m")          # Format month as "YYYY-MM"
    ) %>%
    group_by(month) %>%
    summarise(index = mean(`SatelliteImageryIndex`, na.rm = TRUE)) %>%
    arrange(month)

  return(data)
}


#* Weather Station Score Distribution
#* @get /weather_station_scores
weather_station_scores <- function() {
  data <- climate_data %>%
    filter(!is.na(`WeatherStationScore`)) %>%
    group_by(Region) %>%
    summarise(score = mean(`WeatherStationScore`, na.rm = TRUE), .groups = "drop")
  
  return(data)
}

#* Sensor Reliability Index Over Time
#* @get /sensor_reliability
sensor_reliability <- function() {
  data <- climate_data %>%
    filter(!is.na(Date), !is.na(`SensorReliabilityIndex`)) %>%
    mutate(
      Date = lubridate::ymd(Date),           # Ensure proper Date parsing
      month = format(Date, "%Y-%m")          # Format month as "YYYY-MM"
    ) %>%
    group_by(month) %>%
    summarise(reliability = mean(`SensorReliabilityIndex`, na.rm = TRUE)) %>%
    arrange(month)

  return(data)
}

#* Satellite Imagery Summary Cards
#* @get /satellite_summary_cards
satellite_summary_cards <- function() {
  data <- climate_data %>%
    filter(!is.na(Date), !is.na(`SatelliteImageryIndex`)) %>%
    mutate(Date = ymd(Date))
  
  max_index <- max(data$SatelliteImageryIndex, na.rm = TRUE)
  date_max <- data$Date[which.max(data$SatelliteImageryIndex)]
  
  min_index <- min(data$SatelliteImageryIndex, na.rm = TRUE)
  date_min <- data$Date[which.min(data$SatelliteImageryIndex)]
  
  avg_index <- mean(data$SatelliteImageryIndex, na.rm = TRUE)
  stddev_index <- sd(data$SatelliteImageryIndex, na.rm = TRUE)
  
  station_count <- data %>%
    summarise(stations = n_distinct(StationID)) %>%
    pull(stations)
  
  list(
    max_satellite_index = list(value = max_index, date = as.character(date_max)),
    min_satellite_index = list(value = min_index, date = as.character(date_min)),
    average_satellite_index = avg_index,
    satellite_index_stddev = stddev_index,
    total_stations = station_count
  )
}