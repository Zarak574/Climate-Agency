library(plumber)
library(readr)

#* @filter cors
cors <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")  
  res$setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res$setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req$REQUEST_METHOD == "OPTIONS") {
    res$status <- 200
    return(list())
  } else {
    plumber::forward()
  }
}

#* @get /alerts
alerts <- function() {
  if (file.exists("alerts.csv")) {
    alerts <- read_csv("alerts.csv")
    print(head(alerts))
    return(alerts)
  } else {
    print("No alerts.csv file found")
    return(list(message = "No alerts found"))
  }
}

