<template>
  <v-container class="grey lighten-5">
    <v-row style="height: 60px">
      <v-col cols="12">
        <h3 class="d-inline-block">お知らせ一覧</h3>

        <v-btn color="primary" class="ml-16">新しいお知らせを作る</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <form class="white" style="min-width: 1200px">
          <v-container fluid>
            <v-row>
              <v-col cols="6">
                <label class="label">お知らせ送信日</label>
                <v-text-field
                  v-model="$v.dateFrom.$model"
                  @change="(value) => setDateFrom(value)"
                  outlined
                  dense
                  :error-messages="dateFromErrors"
                  class="d-inline-flex"
                >
                  <template v-slot:append-outer>
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon large color="primary" v-bind="attrs" v-on="on">
                          mdi-calendar-month-outline
                        </v-icon>
                      </template>
                      <v-date-picker
                        v-model="date1"
                        @input="(date) => setDate1(date)"
                        no-title
                        :day-format="(date) => Number(date.split('-')[2])"
                      ></v-date-picker>
                    </v-menu>
                  </template>
                </v-text-field>

                <v-text-field
                  v-model="$v.dateTo.$model"
                  @change="(value) => setDateTo(value)"
                  outlined
                  dense
                  :error-messages="dateToErrors"
                  class="d-inline-flex ml-8"
                >
                  <template v-slot:append-outer>
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon large color="primary" v-bind="attrs" v-on="on">
                          mdi-calendar-month-outline
                        </v-icon>
                      </template>
                      <v-date-picker
                        v-model="date2"
                        @input="(date) => setDate2(date)"
                        no-title
                        :day-format="(date) => Number(date.split('-')[2])"
                      ></v-date-picker>
                    </v-menu>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="3">
                <label class="label">タイトル検索</label>
                <v-text-field
                  v-model="title"
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <label class="label">ステータス</label>
                <div class="d-flex justify-space-between" style="width: 400px">
                  <v-checkbox
                    v-model="state"
                    label="公開前"
                    value="0"
                    multiple
                    dense
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state"
                    label="公開中"
                    value="1"
                    multiple
                    dense
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state"
                    label="キャンセル"
                    value="2"
                    multiple
                    dense
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state"
                    label="完了"
                    value="3"
                    multiple
                    dense
                  ></v-checkbox>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { date } from "@/utils/validator"

export default {
  name: "NotificationList",

  data() {
    return {
      menu1: false,
      date1: "",
      dateFrom: "",

      menu2: false,
      date2: "",
      dateTo: "",

      title: "",

      state: [],
    }
  },

  validations: {
    dateFrom: {
      date,
    },
    dateTo: {
      date,
    },
  },

  computed: {
    dateFromErrors() {
      if (!this.$v.dateFrom.$dirty) return []
      let errors = []
      if (!this.$v.dateFrom.date) errors.push("年月日もしくは年/月/日で入力ください")
      return errors
    },
    dateToErrors() {
      if (!this.$v.dateTo.$dirty) return []
      let errors = []
      if (!this.$v.dateTo.date) errors.push("年月日もしくは年/月/日で入力ください")
      return errors
    },
  },

  methods: {
    setDate1(strDate) {
      this.dateFrom = this.formatJpDate(strDate)
      this.menu1 = false
    },
    setDate2(strDate) {
      this.dateTo = this.formatJpDate(strDate)
      this.menu2 = false
    },
    setDateFrom(strDate) {
      if (this.$v.dateFrom.$invalid) return
      this.date1 = this.formatIsoDate(strDate)
    },
    setDateTo(strDate) {
      if (this.$v.dateTo.$invalid) return
      this.date2 = this.formatIsoDate(strDate)
    },
    /**
     * return YYYY-MM-DD
     */
    formatIsoDate(strDate) {
      if (!strDate) return ""
      return this.$dayjs(strDate).format("YYYY-MM-DD")
    },
    /**
     * return YYYY/MM/DD
     */
    formatJpDate(strDate) {
      if (!strDate) return ""
      return this.$dayjs(strDate).format("YYYY/MM/DD")
    },
  },
}
</script>

<style lang="scss" scoped>
.label {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
}
</style>
