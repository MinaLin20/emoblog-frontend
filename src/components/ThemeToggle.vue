<template>
  <button
    type="button"
    class="theme-toggle inline-flex items-center gap-2 rounded-pill border border-border-default bg-surface-card/80 px-4 py-2 text-sm font-semibold text-btn-primary-fg shadow-elevation-1 backdrop-blur transition-colors hover:bg-surface-card disabled:opacity-disabled"
    @click="toggleTheme"
    :disabled="locked"
    :title="locked ? 'Theme locked' : ''"
  >
    <span class="inline-block h-2 w-2 rounded-full" :class="theme === 'dark' ? 'bg-accent-info' : 'bg-accent-warning'"></span>
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme, locked } = useTheme()

const label = computed(() => (theme.value === 'dark' ? 'Night Mood' : 'Dawn Mood'))
</script>
