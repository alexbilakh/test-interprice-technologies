<template>
  <input
    v-model="input"
    placeholder="Filter by company name ..."
    class="border border-gray rounded focus:outline-none px-3 py-1.5 text-sm max-w-xs"
    autofocus
    type="search"
  />
</template>

<script>
export default {
  emits: ["change"],
  props: {
    default: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      timeout: null,
      debouncedInput: "",
    };
  },
  computed: {
    input: {
      // debounce change event
      get() {
        return this.debouncedInput;
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.debouncedInput = val;
          this.$emit("change", val);
        }, 300);
      },
    },
  },
};
</script>
