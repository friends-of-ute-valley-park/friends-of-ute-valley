<template>
  <div v-if="hasUpcomingVolunteerEvent" class="bg-primary-dark border-b border-primary relative z-50">
    <div class="mx-auto max-w-(--breakpoint-2xl) px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-between py-3 gap-4">
        <div class="flex items-center gap-3">
          <div class="h-2 w-2 bg-accent animate-pulse rounded-full"></div>
          <p class="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-white">
            Active Mobilization: <span class="text-primary-100">Scheduled for {{ eventDates }}</span>
          </p>
        </div>
        
        <a href="/volunteer/"
          class="inline-flex items-center gap-2 border border-primary-light bg-primary px-4 py-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-white hover:bg-primary-light hover:border-white transition-all group shadow-[4px_4px_0px_0px_var(--color-accent)]">
          Join Field Crew
          <i-heroicons-arrow-right class="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Event {
  date: Date;
}

const props = defineProps<{
  events: Array<Event>;
}>();

const hasUpcomingVolunteerEvent = computed(() => {
  return props.events?.length > 0;
});

const eventDates = computed(() => {
  if (props.events === undefined) {
    return '';
  }

  return [...props.events]
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    .map((item) => {
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(new Date(item.date));
    })
    .join(' + ');
});
</script>
