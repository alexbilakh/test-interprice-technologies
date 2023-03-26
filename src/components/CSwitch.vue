<template>
  <div class="flex">
    <button
      v-for="({ label, value }, index) in options"
      :key="value"
      :class="`py-1.5 px-3 text-xs border-cyanblue border-l border-y last:border-r last:rounded-r first:rounded-l ${
        selected.includes(value)
          ? `bg-cyanblue text-white ${
              selected.includes(options[index - 1]?.value)
                ? 'border-l-white'
                : ''
            }`
          : 'bg-white text-cyanblue'
      }`"
      @click="onSelect(value)"
    >
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  emits: ["change"],
  props: {
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: () => false,
    },
    selected: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  methods: {
    onSelect(val) {
      const existingIndex = this.selected.indexOf(val);
      let newSelected = [...this.selected];
      if (this.multiple) {
        // multiple select
        if (existingIndex == -1) {
          newSelected.push(val);
        } else {
          newSelected.splice(existingIndex, 1);
        }
        this.$emit("change", newSelected);
      } else {
        // single select
        if (existingIndex == -1) {
          newSelected = [val];
        }
        this.$emit("change", newSelected?.[0] || null);
      }
    },
  },
};
</script>
