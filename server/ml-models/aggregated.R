
library(plumber)
library(dplyr)
library(lubridate)
library(readr)
library(jsonlite)

#* @serializer unboxedJSON
#* @get /aggregated_kpis
aggregated_kpis <- function() {
  result <- climate_data %>%
    summarise(
      avg_temp = mean(`TempMax(°C)`, na.rm = TRUE),
      total_rainfall = sum(`Rainfall(mm)`, na.rm = TRUE),
      avg_co2 = mean(`CO2(ppm)`, na.rm = TRUE),
      num_stations = n_distinct(StationID),
      avg_sensor_reliability = mean(SensorReliabilityIndex, na.rm = TRUE)
    )
  as.list(result)
}



