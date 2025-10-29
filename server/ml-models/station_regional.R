library(plumber)
library(dplyr)
library(lubridate)
library(readr)
library(jsonlite)

climate_data <- read_csv("cleaned_climate_data.csv")
climate_data$Date <- as.Date(climate_data$Date)

region_coords <- tibble::tibble(
  Region = c("North America", "Asia", "Europe", "Africa"),
  Latitude = c(54.5260, 34.0479, 54.5260, 1.6508),
  Longitude = c(-105.2551, 100.6197, 15.2551, 17.6874)
)

climate_data <- climate_data %>%
  left_join(region_coords, by = "Region")

#* @serializer unboxedJSON
#* @get /geospatial_insights
geospatial_insights <- function(req, region = "") {
  data <- climate_data %>%
    filter(!is.na(Region))

  if (region != "") {
    data <- data %>% filter(Region == region)
  }

  data <- data %>%
    group_by(StationID, Region, Latitude, Longitude) %>%
    summarise(
      avg_temp = mean(`TempMax(°C)`, na.rm = TRUE),
      avg_rainfall = mean(`Precipitation(mm)`, na.rm = TRUE),
      avg_co2 = mean(`CO2(ppm)`, na.rm = TRUE),
      .groups = "drop"
    ) %>%
    mutate(Station = StationID)

  return(data)
}

#* @serializer unboxedJSON
#* @get /regions_list
regions_list <- function() {
  unique(climate_data$Region)
}
