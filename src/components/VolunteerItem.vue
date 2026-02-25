<script setup lang="ts">
import { computed } from 'vue';
import { MeetingLocationParser } from '@/utils/EventData';
import { MeetingLocation, VolunteerEvent } from '@/typings';

const props = defineProps<{
  volunteerEvent: VolunteerEvent;
  meetingLocations: MeetingLocation[];
}>();

const locationInformation = computed(() => MeetingLocationParser(props.volunteerEvent.data, props.meetingLocations));
const meetingLocation = computed(() => locationInformation.value.name ?? '');
const directionsLink = computed(() => locationInformation.value.directionsLink ?? '');

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(props.volunteerEvent.data.date));
});
</script>

<template>
  <div class="flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
    <div class="flex-1 space-y-4">
      <div class="flex items-center gap-3">
        <span class="font-mono text-[10px] font-black tracking-[0.2em] text-accent-darker uppercase">Event</span>
        <h2 class="font-serif text-2xl leading-none font-black tracking-tight text-stone-900 uppercase">
          <a :href="'/events/' + volunteerEvent.id" class="transition-colors hover:text-primary-dark">{{ volunteerEvent.data.title }}</a>
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-2">
        <div class="space-y-1">
          <p class="font-mono text-[10px] tracking-widest text-stone-500 uppercase">Date & Time</p>
          <p class="font-mono text-sm font-black text-stone-700 uppercase">
            <time :datetime="formattedDate + ' ' + volunteerEvent.data.time">{{ formattedDate }} — {{ volunteerEvent.data.time }}</time>
          </p>
        </div>
        <div class="space-y-1">
          <p class="font-mono text-[10px] tracking-widest text-stone-500 uppercase">Meeting Point</p>
          <p class="font-mono text-sm font-black text-stone-700 uppercase">
            <a :href="directionsLink" class="underline hover:text-primary-dark">{{ meetingLocation }}</a>
          </p>
        </div>
      </div>

      <div v-if="volunteerEvent.data.meetingLocation.notes" class="mt-4 border-l-2 border-stone-300 bg-stone-100 p-4">
        <p class="mb-1 font-mono text-[10px] tracking-widest text-stone-600 uppercase">Meeting Details</p>
        <p class="text-xs leading-relaxed font-medium text-stone-600">{{ volunteerEvent.data.meetingLocation.notes }}</p>
      </div>
    </div>

    <div class="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
      <a :href="volunteerEvent.data.link" class="btn-primary-cta inline-flex items-center justify-center"> Register </a>
      <a
        href="https://coloradosprings.gov/sites/default/files/inline-images/informed_consent_and_release_form-fillable.pdf"
        class="inline-flex items-center justify-center border border-stone-300 bg-transparent px-6 py-4 font-mono text-xs font-black tracking-widest text-stone-500 uppercase transition-all hover:bg-stone-100 active:scale-95">
        Consent and Release Form
      </a>
    </div>
  </div>
</template>

<style scoped>
.font-serif {
  font-family: 'EditorialSerif', serif;
}
</style>
