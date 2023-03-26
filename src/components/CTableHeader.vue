<script setup>
import CTableHeaderSortIcon from "@/components/CTableHeaderSortIcon.vue";
</script>

<template>
  <thead
    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
  >
    <tr>
      <th
        rowspan="2"
        class="align-bottom text-left py-1 border-b border-b-grey"
      ></th>
      <th
        rowspan="2"
        class="align-bottom text-left px-2 py-1 border-b border-b-grey cursor-pointer"
        @click.prevent="onSort('DateSent')"
      >
        DATE SENT
        <a href="#" class="inline-block">
          <CTableHeaderSortIcon
            :direction="sort.by === 'DateSent' ? sort.direction : ''"
          />
        </a>
      </th>
      <th
        rowspan="2"
        class="align-bottom text-left px-2 py-1 border-b border-b-grey cursor-pointer"
        @click.prevent="onSort('Company')"
      >
        COMPANY
        <a href="#" class="inline-block">
          <CTableHeaderSortIcon
            :direction="sort.by === 'Company' ? sort.direction : ''"
          />
        </a>
      </th>
      <th
        v-for="year in years"
        :key="year"
        colspan="2"
        class="px-6 py-1 border-b border-b-grey text-center font-bold"
      >
        {{ year }} YRS
      </th>
    </tr>
    <tr v-if="years.length > 0">
      <template v-for="year in years">
        <th
          :key="`${year}_fix`"
          class="px-6 py-1 border-b border-b-grey text-center"
        >
          FIX
        </th>
        <th
          :key="`${year}_frn`"
          class="px-6 py-1 border-b border-b-grey text-center"
        >
          FRN
        </th>
      </template>
    </tr>
  </thead>
</template>

<script>
export default {
  emits: ["sort"],
  props: {
    years: {
      type: Array,
      default: () => [],
    },
    defaultSort: {
      type: Object,
      default: () => ({
        by: "DateSent",
        direction: "asc",
      }),
    },
  },
  data() {
    return {
      sort: this.defaultSort,
    };
  },
  methods: {
    onSort(sortBy) {
      if (this.sort.by === sortBy) {
        this.sort.direction = this.sort.direction === "asc" ? "desc" : "asc";
      } else {
        this.sort.by = sortBy;
        this.sort.direction = "asc";
      }
      this.$emit("sort", this.sort);
    },
  },
};
</script>
