<template>
  <svg
    v-if="expanded"
    xmlns="http://www.w3.org/2000/svg"
    class="w-6 h-6 -mb-1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M7.41 8.41L12 13l4.59-4.59L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    class="w-6 h-6 -mb-1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M9.71 16.29L14.29 12 9.71 7.71 11.12 6.3l5.59 5.59-5.59 5.59z" />
  </svg>
</template>

<script>
export default {
  props: {
    expanded: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>
