<script setup lang="ts">
import { computed } from 'vue';
import { MeetingLocationParser } from '@/utils/EventData';
import { formatShortMonthDayYear } from '@/utils/date';
import type { MeetingLocation, VolunteerEvent } from '@/typings';

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
    <div class="volunteer-item__details">
      <div class="volunteer-item__heading">
        <span>Event</span>
        <h2>
          <a :href="'/events/' + volunteerEvent.id">{{ volunteerEvent.data.title }}</a>
        </h2>
      </div>

      <div class="volunteer-item__meta">
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

      <div v-if="volunteerEvent.data.meetingLocation.notes" class="volunteer-item__notes">
        <p>Meeting Details</p>
        <p>{{ volunteerEvent.data.meetingLocation.notes }}</p>
      </div>
    </div>

    <div class="volunteer-item__actions">
      <a :href="volunteerEvent.data.link" class="button button--brand volunteer-item__register"> Register </a>
      <a
        href="https://coloradosprings.gov/sites/default/files/inline-images/informed_consent_and_release_form-fillable.pdf"
        class="button button--quiet volunteer-item__release">
        Consent and Release Form
      </a>
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

  .volunteer-item__details {
    display: grid;
    flex: 1;
    gap: 1rem;
  }

  .volunteer-item__heading {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .volunteer-item__heading > span {
    color: var(--color-accent-strong);
    font-family: var(--font-label);
    font-size: var(--text-label);
    font-weight: 900;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
  }

  .volunteer-item__heading h2 {
    margin: 0;
    color: var(--color-text-strong);
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 1;
    letter-spacing: 0;
    text-wrap: balance;
    text-transform: uppercase;
  }

  .volunteer-item__heading a,
  .volunteer-item__meta a {
    color: inherit;
    transition: color 200ms;
  }

  .volunteer-item__heading a {
    text-decoration: none;
  }

  .volunteer-item__heading a:hover,
  .volunteer-item__meta a:hover {
    color: var(--color-brand-strong);
  }

  .volunteer-item__meta {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-top: 0.5rem;
  }

  .volunteer-item__meta div,
  .volunteer-item__notes {
    display: grid;
    gap: 0.25rem;
  }

  .volunteer-item__meta p,
  .volunteer-item__notes p {
    margin: 0;
  }

  .volunteer-item__meta p:first-child,
  .volunteer-item__notes p:first-child {
    color: var(--color-text-subtle);
    font-family: var(--font-label);
    font-size: var(--text-label);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .volunteer-item__meta p:last-child {
    color: var(--color-text-muted);
    font-family: var(--font-label);
    font-size: var(--text-body-small);
    font-weight: 900;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
  }

  .volunteer-item__meta a {
    text-decoration: underline;
  }

  .volunteer-item__notes {
    margin-top: 1rem;
    border-left: 2px solid var(--color-border);
    background: var(--color-surface-muted);
    padding: 1rem;
  }

  .volunteer-item__notes p:last-child {
    color: var(--color-text-muted);
    font-size: 0.75rem;
    font-weight: 500;
    line-height: var(--leading-body);
  }

  .volunteer-item__actions {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
  }

  .volunteer-item__register {
    align-items: center;
    justify-content: center;
  }

  .volunteer-item__release {
    padding: 1rem 1.5rem;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-align: center;
    transition:
      background-color 200ms,
      border-color 200ms,
      color 200ms,
      transform 200ms;
  }

  .volunteer-item__release:hover {
    background: var(--color-surface-muted);
  }

  .volunteer-item__release:active {
    transform: scale(0.96);
  }

  @media (min-width: 40rem) {
    .volunteer-item__meta {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .volunteer-item__actions {
      flex-direction: row;
    }
  }

  @media (min-width: 64rem) {
    .volunteer-item {
      flex-direction: row;
      align-items: center;
    }

    .volunteer-item__actions {
      width: auto;
    }
  }
</style>
