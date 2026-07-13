<script setup lang="ts">
import { computed } from 'vue';
import { MeetingLocationParser, type MeetingLocation, type VolunteerEvent } from '@/utils/EventData';
import { formatShortMonthDayYear } from '@/utils/date';

const props = defineProps<{
  volunteerEvent: VolunteerEvent;
  meetingLocations: MeetingLocation[];
}>();

const locationInformation = computed(() => MeetingLocationParser(props.volunteerEvent.data, props.meetingLocations));
const meetingLocation = computed(() => locationInformation.value.name ?? '');
const directionsLink = computed(() => locationInformation.value.directionsLink ?? '');

const formattedDate = computed(() => {
  return formatShortMonthDayYear(props.volunteerEvent.data.date);
});
</script>

<template>
  <div class="volunteer-item">
    <div class="details">
      <div class="heading">
        <h2>
          <a :href="'/events/' + volunteerEvent.id">{{ volunteerEvent.data.title }}</a>
        </h2>
      </div>

      <div class="meta">
        <div>
          <p>Date & Time</p>
          <p>
            <time :datetime="formattedDate + ' ' + volunteerEvent.data.time">{{ formattedDate }} — {{ volunteerEvent.data.time }}</time>
          </p>
        </div>
        <div>
          <p>Meeting Point</p>
          <p>
            <a :href="directionsLink">{{ meetingLocation }}</a>
          </p>
        </div>
      </div>

      <div v-if="volunteerEvent.data.meetingLocation.notes" class="notes">
        <p>Meeting Details</p>
        <p>{{ volunteerEvent.data.meetingLocation.notes }}</p>
      </div>
    </div>

    <div class="actions">
      <a :href="volunteerEvent.data.link" class="button button--brand register"> Register </a>
      <a href="https://coloradosprings.gov/sites/default/files/inline-images/informed_consent_and_release_form-fillable.pdf" class="button button--quiet release"> Consent and Release Form </a>
    </div>
  </div>
</template>

<style scoped>
.volunteer-item {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
}

.volunteer-item .details {
  display: grid;
  flex: 1;
  gap: 1rem;
}

.volunteer-item .heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.volunteer-item .heading h2 {
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: 0;
  text-wrap: balance;
}

.volunteer-item .heading a,
.volunteer-item .meta a {
  color: inherit;
  transition: color var(--duration-fast);
}

.volunteer-item .heading a {
  text-decoration: none;
}

.volunteer-item .heading a:hover,
.volunteer-item .meta a:hover {
  color: var(--color-brand-strong);
}

.volunteer-item .meta {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding-top: 0.5rem;
}

.volunteer-item .meta div,
.volunteer-item .notes {
  display: grid;
  gap: 0.25rem;
}

.volunteer-item .meta p,
.volunteer-item .notes p {
  margin: 0;
}

.volunteer-item .meta p:first-child,
.volunteer-item .notes p:first-child {
  color: var(--color-text-subtle);
  font-family: var(--font-label);
  font-size: var(--text-label);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.volunteer-item .meta p:last-child {
  color: var(--color-text-strong);
  font-family: var(--font-label);
  font-size: var(--text-body-small);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.volunteer-item .meta a {
  text-decoration: underline;
}

.volunteer-item .notes {
  margin-top: 1rem;
  border-left: 2px solid var(--color-border);
  background: var(--color-surface-muted);
  padding: 1rem;
}

.volunteer-item .notes p:last-child {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: var(--leading-body);
}

.volunteer-item .actions {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
}

.volunteer-item .register {
  align-items: center;
  justify-content: center;
}

.volunteer-item .release {
  padding: 1rem 1.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-align: center;
  transition:
    background-color var(--duration-fast),
    border-color var(--duration-fast),
    color var(--duration-fast),
    transform var(--duration-fast);
}

.volunteer-item .release:hover {
  background: var(--color-surface-muted);
}

.volunteer-item .release:active {
  transform: scale(0.96);
}

@media (min-width: 40rem) {
  .volunteer-item .meta {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .volunteer-item .actions {
    flex-direction: row;
  }
}

@media (min-width: 64rem) {
  .volunteer-item {
    flex-direction: row;
    align-items: center;
  }

  .volunteer-item .actions {
    width: auto;
  }
}
</style>
