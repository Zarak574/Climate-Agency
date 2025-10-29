library(readr)
library(dplyr)
library(tibbletime)
library(timetk)
library(lubridate)
library(imputeTS)
library(forecast)
library(anomalize)

climate_data <- read_csv("cleaned_climate_data.csv") %>%
  rename(TempMax = `TempMax(°C)`) %>%
  mutate(Date = mdy(Date)) %>%
  filter(!is.na(Date)) %>%
  select(Date, TempMax) %>%
  group_by(Date) %>%
  summarise(TempMax = mean(TempMax, na.rm = TRUE)) %>%
  ungroup() %>%
  arrange(Date)

climate_tbl <- climate_data %>%
  as_tbl_time(index = Date) %>%
  pad_by_time(.date_var = Date, .by = "day") %>%
  arrange(Date)

climate_tbl <- climate_tbl %>%
  mutate(TempMax = na_interpolation(TempMax))

decomposed <- climate_tbl %>%
  time_decompose(TempMax, method = "stl", merge = FALSE)

iqr_vals <- quantile(decomposed$remainder, probs = c(0.25, 0.75), na.rm = TRUE)
Q1 <- iqr_vals[1]
Q3 <- iqr_vals[2]
IQR <- Q3 - Q1

multiplier <- 3 
decomposed <- decomposed %>%
  mutate(
    anomaly = case_when(
      remainder < Q1 - multiplier * IQR ~ "Yes",
      remainder > Q3 + multiplier * IQR ~ "Yes",
      TRUE ~ "No"
    )
  )

alerts <- decomposed %>%
  filter(anomaly == "Yes") %>%
  mutate(
    magnitude = abs(remainder),
    year = year(Date),
    temperature = observed
  ) %>%
  arrange(desc(magnitude)) %>%
  slice_head(n = 4) %>% 
  select(year, temperature, Date, anomaly)

fit <- auto.arima(climate_tbl$TempMax)
future <- forecast(fit, h = 365)

future_dates <- seq(max(climate_tbl$Date) + 1, by = "day", length.out = 365)

future_alerts <- data.frame(
  Date = future_dates,
  temperature = as.numeric(future$mean),
  year = as.numeric(format(future_dates, "%Y")),
  anomaly = "Yes"
) %>%
  filter(year == 2025) %>%
  arrange(desc(temperature)) %>% 
  slice_head(n = 4)             

final_alerts <- bind_rows(alerts, future_alerts)

write_csv(final_alerts, "alerts.csv")

print(final_alerts)