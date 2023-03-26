<template>
  <svg
    v-if="direction === 'asc'"
    xmlns="http://www.w3.org/2000/svg"
    class="w-5 h-5 -mb-1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M7.41 8.41L12 13l4.59-4.59L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
  <svg
    v-else-if="direction === 'desc'"
    xmlns="http://www.w3.org/2000/svg"
    class="w-5 h-5 -mb-1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M7.41 15.41L12 11l4.59 4.59L18 14l-6-6-6 6 1.41 1.41z" />
  </svg>
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    class="w-5 h-5 -mb-1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="#D6D6D6"
  >
    <path d="M7.41 15.41L12 11l4.59 4.59L18 14l-6-6-6 6 1.41 1.41z" />
  </svg>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: () => "",
    },
  },
};
</script>
