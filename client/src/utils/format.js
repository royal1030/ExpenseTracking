export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }



  // nums <- function(n) {
  //   dec <- round(n %% 1, 2)
  //   dec <- ifelse(dec < 0.01, "", substr(dec, 2, 4))
  //   int <- n %/% 1
  //   ints <- vapply(int, function(x) {
  //     x <- as.character(x)
  //     len <- nchar(x)
  //     if(len <= 3) return(x)
  //     rev_x <- paste(rev(unlist(strsplit(x, ""))), collapse = "")
  //     str   <- paste0(substr(rev_x, 1, 3), ",")
  //     str2  <- substr(rev_x, 4, 100)
  //     str2  <- gsub("(\\d{2})", "\\1,", str2)
  //     rev_x <- paste0(str, str2)
  //     return(paste(rev(unlist(strsplit(rev_x, ""))), collapse = ""))
  //   }, character(1))
  
  //   return(sub("^,", "", paste0(ints, dec)))
  // }