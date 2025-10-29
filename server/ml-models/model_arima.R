
# combined_arima_models.R
library(forecast)
library(readr)
library(dplyr)

climate_data <- read_csv("cleaned_climate_data.csv")

# Model 1: Temperature (TempMax)
climate_data_temp <- climate_data %>%
  rename(TempMax = `TempMax(°C)`)

ts_temp <- ts(climate_data_temp$TempMax, start = min(climate_data_temp$Year), frequency = 1)

model_temp <- auto.arima(ts_temp)

dir.create("models", showWarnings = FALSE)
saveRDS(model_temp, file = "models/arima_temp.rds")


# Model 2: Rainfall (Rainfall in mm)
climate_data_rain <- climate_data %>%
  rename(Rainfall = `Rainfall(mm)`)

ts_rain <- ts(climate_data_rain$Rainfall, start = min(climate_data_rain$Year), frequency = 1)

model_rain <- auto.arima(ts_rain)

saveRDS(model_rain, file = "models/arima_rain.rds")


# Model 3: Humidity (Humidity %)
climate_data_humidity <- climate_data %>%
  rename(Humidity = `Humidity(%)`)

ts_humidity <- ts(climate_data_humidity$Humidity, start = min(climate_data_humidity$Year), frequency = 1)

model_humidity <- auto.arima(ts_humidity)

saveRDS(model_humidity, file = "models/arima_humidity.rds")

cat("All ARIMA models (Temperature, Rainfall, and Humidity) have been saved successfully!\n")
