<template>
  <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 w-full">
    <div class="space-y-4 flex-1">
      <div class="flex items-center gap-3">
        <span class="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-accent-darker">Event</span>
        <h2 class="text-2xl font-serif font-black uppercase tracking-tight text-stone-900 leading-none">
          <a :href="'/events/' + volunteerEvent.id" class="hover:text-primary-dark transition-colors">{{
            volunteerEvent.data.title }}</a>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
        <div class="space-y-1">
          <p class="font-mono text-[10px] uppercase tracking-widest text-stone-500">Date & Time</p>
          <p class="font-mono text-sm font-black uppercase text-stone-700">
            <time :datetime="formattedDate + ' ' + volunteerEvent.data.time">{{ formattedDate }} — {{
              volunteerEvent.data.time }}</time>
          </p>
        </div>
        <div class="space-y-1">
          <p class="font-mono text-[10px] uppercase tracking-widest text-stone-500">Meeting Point</p>
          <p class="font-mono text-sm font-black uppercase text-stone-700">
            <a :href="directionsLink" class="underline hover:text-primary-dark">{{ meetingLocation }}</a>
          </p>
        </div>
      </div>

      <div v-if="volunteerEvent.data.meetingLocation.notes" class="mt-4 p-4 bg-stone-100 border-l-2 border-stone-300">
        <p class="font-mono text-[10px] uppercase tracking-widest text-stone-600 mb-1">Meeting Details</p>
        <p class="text-xs font-medium text-stone-600 leading-relaxed">{{ volunteerEvent.data.meetingLocation.notes }}
        </p>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
      <a :href="volunteerEvent.data.link" class="btn-primary-cta inline-flex items-center justify-center">
        Register
      </a>
      <a href="https://coloradosprings.gov/sites/default/files/inline-images/informed_consent_and_release_form-fillable.pdf"
        class="inline-flex items-center justify-center px-6 py-4 bg-transparent border border-stone-300 text-stone-500 font-mono text-xs font-black uppercase tracking-widest transition-all hover:bg-stone-100 active:scale-95">
        Consent and Release Form
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { MeetingLocationParser } from '@/utils/EventData';
import { MeetingLocation, VolunteerEvent } from '@/typings';

const props = defineProps<{
  volunteerEvent: VolunteerEvent;
  meetingLocations: MeetingLocation[];
}>();

const meetingLocation = ref('');
const directionsLink = ref('');

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(props.volunteerEvent.data.date));
});

onMounted(() => {
  const locationInformation = MeetingLocationParser(props.volunteerEvent.data, props.meetingLocations);
  meetingLocation.value = locationInformation.name ?? '';
  directionsLink.value = locationInformation.directionsLink ?? '';
});
</script>

<style scoped>
.font-serif {
  font-family: 'EditorialSerif', serif;
}
</style>
