library(plumber)
library(dplyr)
library(lubridate)
library(readr)
library(jsonlite)
library(ggplot2)
library(forecast)
library(zoo)

climate_data <- read_csv("cleaned_climate_data.csv")
climate_data$Date <- as.Date(climate_data$Date)


#* @serializer unboxedJSON
#* @get /solar_heatmap
solar_heatmap <- function() {
  cleaned <- climate_data %>%
    filter(!is.na(Date), !is.na(`SolarRadiation(kWh/m²)`)) %>%
    mutate(
      Date = lubridate::ymd(Date),                      # Parse Date correctly
      month = format(Date, "%Y-%m")                     # Format as YYYY-MM
    ) %>%
    group_by(Region, month) %>%
    summarise(
      solar = mean(`SolarRadiation(kWh/m²)`, na.rm = TRUE),
      .groups = "drop"
    )

  return(cleaned)
}



#* CO2 Level Trend and Forecast
#* @get /co2_trend_forecast
co2_trend_forecast <- function() {
  library(zoo)  # Ensure this is loaded for as.yearmon

  co2_monthly <- climate_data %>%
    filter(!is.na(Date), !is.na(`CO2(ppm)`)) %>%
    mutate(
      Date = lubridate::ymd(Date),
      month = zoo::as.yearmon(Date)
    ) %>%
    group_by(month) %>%
    summarise(co2 = mean(`CO2(ppm)`, na.rm = TRUE), .groups = "drop")

  ts_data <- ts(co2_monthly$co2, frequency = 12)
  fit <- forecast::auto.arima(ts_data)
  forecasted <- forecast::forecast(fit, h = 12)

  list(
    months = c(
      format(co2_monthly$month, "%Y-%m"),                    # Format yearmon to character
      format(as.yearmon(time(forecasted$mean)), "%Y-%m")     # Format forecast time
    ),
    co2 = c(as.numeric(co2_monthly$co2), as.numeric(forecasted$mean)),
    forecast_start = length(co2_monthly$co2) + 1
  )
}

#* Air Pressure vs Solar Radiation (Scatter Plot)
#* @get /pressure_vs_solar
pressure_vs_solar <- function() {
  data <- climate_data %>%
    filter(!is.na(`AirPressure(hPa)`), !is.na(`SolarRadiation(kWh/m²)`)) %>%
    select(`AirPressure(hPa)`, `SolarRadiation(kWh/m²)`)

  list(
    pressure = data$`AirPressure(hPa)`,
    solar = data$`SolarRadiation(kWh/m²)`
  )
}
