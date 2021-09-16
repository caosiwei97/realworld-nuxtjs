import dayjs from "dayjs"
import Vue from 'vue'

export default () => {
  Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(value).format(format)
  })
}