# temperature_insights.R
library(plumber)
library(dplyr)
library(readr)
library(lubridate)
library(jsonlite)

# Load data once
climate_data <- read_csv("cleaned_climate_data.csv")

#* Max/Min Temperature Trends over time
#* @get /temperature_trends
tempminmax_endpoint <- function() {
  data <- climate_data %>%
    group_by(date = as.Date(Date)) %>%
    summarise(
      max_temp = max(`TempMax(°C)`, na.rm = TRUE),
      min_temp = min(`TempMin(°C)`, na.rm = TRUE)
    )

  list(
    dates = as.character(data$date),
    max_temp = data$max_temp,
    min_temp = data$min_temp
  )
}


#* Average Daily Temperature by Region or Station
#* @get /average_temp_by_station
avg_temp_endpoint <- function() {
  data <- climate_data %>%
    mutate(avg_temp = (`TempMax(°C)` + `TempMin(°C)`) / 2) %>%
    group_by(StationID) %>%
    summarise(average_temp = mean(avg_temp, na.rm = TRUE))

  list(
    station_ids = data$StationID,
    average_temps = data$average_temp
  )
}

#* Temperature Variability (Max - Min) across months
#* @get /temperature_variability
tempvariable_endpoint <- function() {
  # Parse the Date column correctly
  data <- climate_data %>%
    mutate(
      Date = ymd(Date),  # Ensure date is parsed as yyyy-mm-dd
      month = format(Date, "%b %Y")  # Format as "Apr 2023"
    ) %>%
    group_by(month, Region) %>%
    summarise(
      variability = mean(`TempMax(°C)` - `TempMin(°C)`, na.rm = TRUE),
      .groups = 'drop'
    )

  list(
    months = data$month,
    regions = data$Region,
    variability = data$variability
  )
}


#* Summary Cards: Aggregated key temperature insights
#* @get /summary_cards
#* @serializer json
summary_cards_endpoint <- function() {
  
  max_temp <- max(climate_data$`TempMax(°C)`, na.rm = TRUE)
  date_max <- climate_data$Date[which.max(climate_data$`TempMax(°C)`)]
  
  min_temp <- min(climate_data$`TempMin(°C)`, na.rm = TRUE)
  date_min <- climate_data$Date[which.min(climate_data$`TempMin(°C)`)]
  
  avg_max <- mean(climate_data$`TempMax(°C)`, na.rm = TRUE)
  avg_min <- mean(climate_data$`TempMin(°C)`, na.rm = TRUE)
  
  avg_temp <- climate_data %>%
    mutate(avg_temp = (`TempMax(°C)` + `TempMin(°C)`) / 2) %>%
    summarise(overall_avg_temp = mean(avg_temp, na.rm = TRUE)) %>%
    pull(overall_avg_temp)
  
  variability <- climate_data$`TempMax(°C)` - climate_data$`TempMin(°C)`
  mean_var <- mean(variability, na.rm = TRUE)
  sd_var <- sd(variability, na.rm = TRUE)
  
  station_count <- climate_data %>%
    summarise(stations = n_distinct(StationID)) %>%
    pull(stations)
  
  list(
    max_temperature = list(value = max_temp, date = as.character(date_max)),
    min_temperature = list(value = min_temp, date = as.character(date_min)),
    average_max_temperature = avg_max,
    average_min_temperature = avg_min,
    average_temperature = avg_temp,
    temperature_variability = list(mean = mean_var, sd = sd_var),
    total_stations = station_count
  )
}
