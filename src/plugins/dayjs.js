import Vue from "vue"
import "dayjs/locale/ja"
import dayjs from "dayjs"

dayjs.locale("ja")

import CustomParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(CustomParseFormat)

Vue.prototype.$dayjs = dayjs
