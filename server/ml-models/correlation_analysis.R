library(corrplot)
library(readr)
library(dplyr)
library(jsonlite)


#* @get /correlations
#* @serializer unboxedJSON
correlation_endpoint <- function() {
  climate_data <- read_csv("cleaned_climate_data.csv")

  names(climate_data) <- make.names(names(climate_data))

  num_data <- climate_data %>% select(where(is.numeric))
  cor_matrix <- cor(num_data, use = "complete.obs")

  output <- list(
    labels = colnames(cor_matrix),
    matrix = unname(asplit(cor_matrix, 1)) 
  )

  return(output)
}
