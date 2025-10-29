
# eda.R
library(readr)
library(ggplot2)

trend_endpoint <- function() {
  climate_data <- read_csv("cleaned_climate_data.csv")

   list(
    dates = as.character(climate_data$Date),
    temperature = climate_data$`TempMax(°C)`
  )
}
