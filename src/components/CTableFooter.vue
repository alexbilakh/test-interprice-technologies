<template>
  <tfoot>
    <tr class="border-x border-grey">
      <td class="py-1.5 border-y border-grey"></td>
      <td class="py-1.5 border-y border-grey"></td>
      <td class="py-1.5 border-y border-grey">Average by {{ display }}</td>

      <fragment v-for="year in years" :key="year">
        <td class="py-1.5 border-y border-grey text-center">
          {{ averageData[year]?.FIX | formatDisplayValue(display) }}
        </td>
        <td class="py-1.5 border-y border-grey text-center">
          {{ averageData[year]?.FRN | formatDisplayValue(display) }}
        </td>
      </fragment>
    </tr>
  </tfoot>
</template>

<script>
export default {
  props: {
    averageData: {
      type: Object,
      required: true,
    },
    display: {
      type: String,
      required: true,
    },
    years: {
      type: Array,
      required: true,
    },
  },
};
</script>
