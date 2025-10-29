#preprocessing.R
library(readr)
library(dplyr)
library(lubridate)

climate_data <- read_csv("climate_data.csv")

climate_data$Date <- dmy(climate_data$Date)

climate_data <- climate_data %>%
  mutate(across(where(is.numeric), ~ifelse(is.na(.), median(., na.rm = TRUE), .)))

write_csv(climate_data, "cleaned_climate_data.csv")
