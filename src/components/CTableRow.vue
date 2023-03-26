<script setup>
import CTableBodyRowExpandIcon from "@/components/CTableBodyRowExpandIcon.vue";
import moment from "moment";
import { Fragment } from "vue-fragment";
</script>

<template>
  <tr
    class="bg-white border-b border-b-lightgrey"
    v-show="display === mainDisplay || expanded"
  >
    <td class="cursor-pointer" @click="onExpand">
      <CTableBodyRowExpandIcon
        v-if="display === mainDisplay && item.Quote?.length > 0"
        :expanded="expanded"
      />
    </td>
    <td class="px-2 py-1">
      {{
        display === mainDisplay ? item.DateSent : "" | formatDate("DD-MMM-YY")
      }}
    </td>
    <td
      :class="`px-2 py-1 ${display === mainDisplay ? 'font-bold' : ''} ${
        item.Quote ? 'text-black' : 'text-gray'
      }`"
    >
      {{ display === mainDisplay ? item.Company : display }}
    </td>

    <fragment v-for="year in years" :key="year">
      <td
        :class="`px-2 py-1 text-center ${
          display === mainDisplay &&
          quoteData[year]?.FIX?.[display] &&
          quoteData[year]?.FIX?.[display] === minimumData?.[year]
            ? 'bg-yellow'
            : ''
        }`"
      >
        {{ quoteData[year]?.FIX?.[display] | formatDisplayValue(display) }}
      </td>

      <td class="px-2 py-1 text-center">
        {{ quoteData[year]?.FRN?.[display] | formatDisplayValue(display) }}
      </td>
    </fragment>
  </tr>
</template>

<script>
export default {
  components: { Fragment },
  emits: ["expand"],
  props: {
    item: {
      type: Object,
      required: true,
    },
    display: {
      type: String,
      required: true,
    },
    mainDisplay: {
      type: String,
      required: true,
    },
    years: {
      type: Array,
      required: true,
    },
    minimumData: {
      type: Object,
      required: true,
    },
    expanded: {
      type: Boolean,
    },
  },
  filters: {
    formatDate(value, format) {
      if (value) {
        return moment(String(value)).format(format || "MM/DD/YYYY hh:mm");
      }
    },
  },
  methods: {
    onExpand() {
      if (!this.item.Quote) return;
      this.$emit("expand", this.item);
    },
  },
  computed: {
    quoteData() {
      // make obj hash data
      const quoteObj = {};
      this.item.Quote?.forEach((qt) => {
        if (!quoteObj[qt.Years]) quoteObj[qt.Years] = {};
        quoteObj[qt.Years][qt.CouponType] = qt;
      });

      return quoteObj;
    },
  },
};
</script>
