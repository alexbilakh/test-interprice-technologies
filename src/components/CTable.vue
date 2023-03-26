<script setup>
import CSwitch from "@/components/CSwitch.vue";
import CSearch from "@/components/CSearch.vue";
import CTableHeader from "@/components/CTableHeader.vue";
import CTableRow from "@/components/CTableRow.vue";
import CTableFooter from "@/components/CTableFooter.vue";
import data from "../assets/data.json";
</script>

<template>
  <div class="flex flex-col space-y-5">
    <div class="flex space-x-8">
      <CSwitch
        :options="
          Object.keys(currencyYears).map((c) => ({
            label: c,
            value: c,
          }))
        "
        @change="onCurrencyChange"
        :selected="[currency]"
      />

      <CSwitch
        :options="
          currencyYears[currency].map((year) => ({
            label: `${year} YRS`,
            value: year,
          }))
        "
        @change="onYearsChange"
        :selected="years"
        multiple
      />

      <CSwitch
        :options="displayOptions.map((d) => ({ label: d, value: d }))"
        @change="onDisplayChange"
        :selected="[display]"
      />
    </div>

    <CSearch @change="onSearchChange" />

    <table class="table-auto">
      <CTableHeader
        :years="years"
        @sort="onSort"
        :defaultSort="{
          by: 'DateSent',
          direction: 'asc',
        }"
      />
      <tbody>
        <template v-for="item in tableData.list">
          <CTableRow
            v-for="d in sortedDisplayOptions"
            :key="`${item.Id}_${d}_${item.Company}`"
            :expanded="expandedRows.includes(`${item.Id}_${item.Company}`)"
            @expand="onExpand(item)"
            :item="item"
            :years="years"
            :display="d"
            :mainDisplay="display"
            :displayOptions="displayOptions"
            :minimumData="tableData.minimumData"
            v-show="
              d === display ||
              expandedRows.includes(`${item.Id}_${item.Company}`)
            "
          />
        </template>
      </tbody>
      <CTableFooter
        :averageData="tableData.averageData"
        :years="years"
        :display="display"
      />
    </table>
  </div>
</template>

<script>
export default {
  data() {
    // Get years set by currencies from data
    const currencyYears = {};
    data.Items.forEach((item) => {
      item.Quote?.forEach((quote) => {
        if (!currencyYears[quote.Currency]) {
          currencyYears[quote.Currency] = [quote.Years];
        } else {
          // distinct years
          currencyYears[quote.Currency].push(quote.Years);
        }
        currencyYears[quote.Currency] = Object.values([
          ...new Set(currencyYears[quote.Currency]),
        ]);
      });
    });

    return {
      currency: "USD",
      currencyYears: currencyYears,
      search: "",
      sort: {
        by: "DateSent",
        direction: "asc",
      },
      years: [...(currencyYears?.USD || [])],
      display: "Spread",
      displayOptions: ["Spread", "Yield", "3MLSpread"],
      expandedRows: [],
    };
  },
  methods: {
    onCurrencyChange(newCurrency) {
      this.currency = newCurrency;
      this.years = [...(this.currencyYears[newCurrency] || [])];
    },
    onSearchChange(searchVal) {
      this.search = searchVal;
    },
    onSort(sortVal) {
      this.sort = sortVal;
    },
    onYearsChange(yearsVal) {
      this.years = yearsVal.sort((a, b) => a - b);
    },
    onDisplayChange(displayVal) {
      this.display = displayVal;
    },
    onExpand(item) {
      const existingIndex = this.expandedRows.indexOf(
        `${item.Id}_${item.Company}`
      );

      if (existingIndex === -1) {
        this.expandedRows.push(`${item.Id}_${item.Company}`);
      } else {
        this.expandedRows.splice(existingIndex, 1);
      }
    },
  },
  computed: {
    tableData() {
      let tableDataList = [...data.Items];

      // filter by company name
      tableDataList = tableDataList.filter((item) =>
        item.Company.toLocaleLowerCase().includes(
          this.search.toLocaleLowerCase()
        )
      );

      // sort by sorting column, and then by Preferred
      tableDataList.sort((a, b) => {
        if (a.Quote && !b.Quote) return -1;
        if (!a.Quote && b.Quote) return 1;

        if (a[this.sort.by] < b[this.sort.by]) {
          return this.sort.direction === "asc" ? 1 : -1;
        }
        if (a[this.sort.by] > b[this.sort.by]) {
          return this.sort.direction === "asc" ? -1 : 1;
        }

        return b.Preferred - a.Preferred;
      });

      // make obj data
      const averageData = {};
      const minimumData = {};
      tableDataList.forEach((item) => {
        item.Quote?.forEach((qt) => {
          if (qt.Currency !== this.currency) return;

          if (!averageData[qt.Years]) {
            averageData[qt.Years] = {};
            minimumData[qt.Years] = Infinity;
          }
          if (!averageData[qt.Years]?.[qt.CouponType]) {
            averageData[qt.Years][qt.CouponType] = [];
          }

          averageData[qt.Years][qt.CouponType].push(qt[this.display]);

          if (qt.CouponType === "FIX") {
            minimumData[qt.Years] = Math.min(
              minimumData[qt.Years],
              qt[this.display]
            );
          }
        });
      });

      for (const y in averageData) {
        for (const ct in averageData[y]) {
          averageData[y][ct] =
            averageData[y][ct].reduce((t, c) => t + c, 0) /
            averageData[y][ct].length;
        }
      }

      return {
        list: tableDataList,
        averageData: averageData,
        minimumData: minimumData,
      };
    },
    sortedDisplayOptions() {
      return [...this.displayOptions].sort((a, b) => {
        if (a === this.display) return -1;
        if (b === this.display) return 1;
        return 0;
      });
    },
  },
};
</script>
