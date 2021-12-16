import dayjs from "dayjs"

export const date = (strDate) => {
  if (!strDate) return true
  return dayjs(strDate, ["YYYY/MM/DD", "YYYYMMDD"], true).isValid()
}
