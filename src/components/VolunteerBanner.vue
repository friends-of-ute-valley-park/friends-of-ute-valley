<template>
  <div v-if="hasUpcomingVolunteerEvent" class="bg-stone-900 border-b border-stone-800 relative z-50">
    <div class="mx-auto max-w-(--breakpoint-2xl) px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-between py-3 gap-4">
        <div class="flex items-center gap-3">
          <div class="h-2 w-2 bg-green-500 animate-pulse rounded-full"></div>
          <p class="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-stone-100">
            Active Mobilization: <span class="text-stone-400">Scheduled for {{ eventDates }}</span>
          </p>
        </div>
        
        <a href="/volunteer/"
          class="inline-flex items-center gap-2 border border-stone-700 bg-stone-800 px-4 py-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-stone-100 hover:bg-stone-700 hover:border-stone-600 transition-all group">
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