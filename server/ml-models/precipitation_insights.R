library(plumber)
library(dplyr)
library(readr)
library(lubridate)
library(jsonlite)
library(forecast)
library(zoo) 

# Load dataset
climate_data <- read_csv("cleaned_climate_data.csv")

#* Total Precipitation over Months
#* @get /total_precipitation
total_precip_endpoint <- function() {
  data <- climate_data %>%
    mutate(
      Date = ymd(Date),  # Adjust if format is not "YYYY-MM-DD"
      month = format(Date, "%Y-%m")
    ) %>%
    group_by(month) %>%
    summarise(
      total_precip = sum(`Precipitation(mm)`, na.rm = TRUE),
      .groups = 'drop'
    )

  list(
    months = data$month,
    total_precip = data$total_precip
  )
}


#* Rainfall vs Precipitation (Assume Rainfall is derived as Precipitation × 0.8)
#* @get /rainfall_vs_precip
rainfall_comparison_endpoint <- function() {
  data <- climate_data %>%
    mutate(
      Date = ymd(Date),  # Adjust to mdy(Date) or dmy(Date) if needed
      month = format(Date, "%Y-%m")
    ) %>%
    group_by(month) %>%
    summarise(
      total_precip = sum(`Precipitation(mm)`, na.rm = TRUE),
      total_rainfall = sum(`Precipitation(mm)`, na.rm = TRUE) * 0.8,
      .groups = 'drop'
    )

  list(
    months = data$month,
    precipitation = data$total_precip,
    rainfall = data$total_rainfall
  )
}

#* Rainfall Distribution by Region
#* @get /rainfall_distribution
rainfall_distribution_endpoint <- function() {
  region_data <- climate_data %>%
    mutate(Rainfall_mm = `Precipitation(mm)` * 0.8) %>%  # compute rainfall
    group_by(Region) %>%
    summarise(total_rainfall = sum(Rainfall_mm, na.rm = TRUE))

  list(
    regions = region_data$Region,
    rainfall = region_data$total_rainfall
  )
}


#* Forecast Rainfall Trends
#* @get /rainfall_forecast
rainfall_forecast_endpoint <- function() {
  library(forecast)
  library(zoo)

  monthly_data <- climate_data %>%
    mutate(Rainfall_mm = `Precipitation(mm)` * 0.8,
           month = as.yearmon(Date)) %>%
    group_by(month) %>%
    summarise(rainfall = sum(Rainfall_mm, na.rm = TRUE))

  ts_data <- ts(monthly_data$rainfall, frequency = 12)
  fit <- auto.arima(ts_data)
  forecasted <- forecast(fit, h = 12)

  list(
    forecast_months = as.character(time(forecasted$mean)),
    forecast_values = as.numeric(forecasted$mean)
  )
}

#* Summary Cards for Rainfall Insights
#* @get /rainfall_summary_cards
rainfall_summary_cards <- function() {
  # Calculate total rainfall (assuming rainfall = Precipitation * 0.8)
  climate_data <- climate_data %>%
    mutate(Rainfall_mm = `Precipitation(mm)` * 0.8)
  
  max_rainfall <- max(climate_data$Rainfall_mm, na.rm = TRUE)
  date_max_rainfall <- climate_data$Date[which.max(climate_data$Rainfall_mm)]
  
  min_rainfall <- min(climate_data$Rainfall_mm, na.rm = TRUE)
  date_min_rainfall <- climate_data$Date[which.min(climate_data$Rainfall_mm)]
  
  avg_rainfall <- mean(climate_data$Rainfall_mm, na.rm = TRUE)
  
  sd_rainfall <- sd(climate_data$Rainfall_mm, na.rm = TRUE)
  
  total_stations <- climate_data %>%
    summarise(stations = n_distinct(StationID)) %>%
    pull(stations)
  
  list(
    max_rainfall = list(value = max_rainfall, date = as.character(date_max_rainfall)),
    min_rainfall = list(value = min_rainfall, date = as.character(date_min_rainfall)),
    average_rainfall = avg_rainfall,
    rainfall_std_dev = sd_rainfall,
    total_stations = total_stations
  )
}
