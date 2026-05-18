<script setup lang="ts">
import { computed } from 'vue';
import HeroiconsArrowRight from 'virtual:icons/heroicons/arrow-right';
import { formatShortMonthDay, getDateTime } from '@/utils/date';

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
      return getDateTime(a.date) - getDateTime(b.date);
    })
    .map((item) => {
      return formatShortMonthDay(item.date);
    })
    .join(' + ');
});
</script>

<template>
  <div v-if="hasUpcomingVolunteerEvent" class="volunteer-alert">
    <div class="inner">
      <div class="content">
        <div class="message">
          <div class="pulse"></div>
          <p>
            Upcoming Volunteer Event: <span>Scheduled for {{ eventDates }}</span>
          </p>
        </div>

        <a
          href="/volunteer/"
          class="link">
          Learn More
          <HeroiconsArrowRight class="icon" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .volunteer-alert {
    position: relative;
    z-index: 50;
    border-bottom: 1px solid var(--color-brand);
    background: var(--color-brand-strong);
  }

  .volunteer-alert .inner {
    width: min(100% - (var(--space-page-x) * 2), var(--container-wide));
    margin-inline: auto;
  }

  .volunteer-alert .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-block: 0.75rem;
  }

  .volunteer-alert .message {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .volunteer-alert .pulse {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: var(--color-accent);
    animation: volunteer-alert-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .volunteer-alert .message p {
    margin: 0;
    color: var(--color-text-inverse);
    font-family: var(--font-label);
    font-size: var(--text-label);
    font-weight: 900;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
  }

  .volunteer-alert .message span {
    color: var(--color-brand-muted);
    font-variant-numeric: tabular-nums;
  }

  .volunteer-alert .link {
    display: inline-flex;
    min-height: 2.5rem;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--color-brand-hover);
    background: var(--color-brand);
    color: var(--color-text-inverse);
    padding: 0.375rem 1rem;
    font-family: var(--font-label);
    font-size: var(--text-label);
    font-weight: 900;
    letter-spacing: 0.12em;
    text-decoration: none;
    text-transform: uppercase;
    box-shadow: var(--shadow-accent-sm);
    transition:
      background-color 200ms,
      border-color 200ms,
      box-shadow 200ms,
      transform 200ms;
  }

  .volunteer-alert .link:hover {
    border-color: var(--color-text-inverse);
    background: var(--color-brand-hover);
  }

  .volunteer-alert .link:active {
    transform: scale(0.96);
  }

  .volunteer-alert .icon {
    width: 0.75rem;
    height: 0.75rem;
    transition: transform 200ms;
  }

  .volunteer-alert .link:hover .icon {
    transform: translateX(0.25rem);
  }

  @keyframes volunteer-alert-pulse {
    50% {
      opacity: 0.5;
    }
  }

  @media (min-width: 40rem) {
    .volunteer-alert .content {
      flex-direction: row;
    }
  }
</style>
