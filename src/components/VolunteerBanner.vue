<template>
  <div v-if="hasUpcomingVolunteerEvent" class="relative z-50 border-b border-primary bg-primary-dark">
    <div class="mx-auto max-w-(--breakpoint-2xl) px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-4 py-3 sm:flex-row">
        <div class="flex items-center gap-3">
          <div class="h-2 w-2 animate-pulse rounded-full bg-accent"></div>
          <p class="font-mono text-[10px] font-black tracking-[0.2em] text-white uppercase">
            Upcoming Volunteer Event: <span class="text-primary-100">Scheduled for {{ eventDates }}</span>
          </p>
        </div>

        <a
          href="/volunteer/"
          class="group inline-flex items-center gap-2 border border-primary-light bg-primary px-4 py-1.5 font-mono text-[10px] font-black tracking-widest text-white uppercase shadow-[4px_4px_0px_0px_var(--color-accent)] transition-all hover:border-white hover:bg-primary-light">
          Learn More
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
