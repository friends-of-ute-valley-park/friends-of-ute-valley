<script setup lang="ts">
import { shallowRef, useTemplateRef, watch, type Ref } from 'vue';
import { useScroll, onClickOutside } from '@vueuse/core';
import LucidePawPrint from 'virtual:icons/lucide/paw-print';
import LucideBird from 'virtual:icons/lucide/bird';
import LucideCamera from 'virtual:icons/lucide/camera';
import LucideMap from 'virtual:icons/lucide/map';
import HeroiconsBars3 from 'virtual:icons/heroicons/bars-3';
import HeroiconsChevronDown from 'virtual:icons/heroicons/chevron-down';
import HeroiconsXMark from 'virtual:icons/heroicons/x-mark';

const props = defineProps<{ page: string }>();

const menuOpen = shallowRef(false);
const lntOpen = shallowRef(false);
const navContainerRef = useTemplateRef<HTMLElement>('navContainerRef');
const lntDropdown = useTemplateRef<HTMLElement>('lntDropdown');
const navHidden = shallowRef(false);
let lastScrollY = 0;
let scrollY: Ref<number> = shallowRef(0);
if (typeof window !== 'undefined') {
  const { y } = useScroll(window, { throttle: 50 });
  scrollY = y;
}

watch(scrollY, (current) => {
  if (menuOpen.value) return;
  if (current > lastScrollY && current > 80) {
    navHidden.value = true;
  } else if (current < lastScrollY) {
    navHidden.value = false;
  }
  lastScrollY = current;
});

watch(menuOpen, (open) => {
  if (open) navHidden.value = false;
});

watch(navHidden, (hidden) => {
  if (hidden) lntOpen.value = false;
});

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
  navHidden.value = false;
}

function closeMenu() {
  menuOpen.value = false;
  navHidden.value = false;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    closeMenu();
  }
}

onClickOutside(navContainerRef, () => {
  closeMenu();
});

onClickOutside(lntDropdown, () => {
  lntOpen.value = false;
});

const leaveNoTraceMenuItems = [
  { name: 'Dog Etiquette', description: 'Rules & Etiquette', href: '/leavenotrace/dogs/', current: props.page === '/leavenotrace/dogs/', icon: LucidePawPrint },
  {
    name: 'Travel on Durable Surfaces',
    description: 'Durable Travel',
    href: '/leavenotrace/travel-on-durable-surfaces/',
    current: props.page === '/leavenotrace/travel-on-durable-surfaces/',
    icon: LucideMap,
  },
  {
    name: 'Leave What You Find',
    description: 'Leave What You Find',
    href: '/leavenotrace/leave-what-you-find/',
    current: props.page === '/leavenotrace/leave-what-you-find/',
    icon: LucideCamera,
  },
  {
    name: 'Respect Wildlife',
    description: 'Respecting Wildlife',
    href: '/leavenotrace/respect-wildlife/',
    current: props.page === '/leavenotrace/respect-wildlife/',
    icon: LucideBird,
  },
];

const navigation = [
  { href: '/', name: 'Home', current: props.page === '/' },
  { href: '/visit/', name: 'Visit', current: props.page === '/visit/' },
  { href: '/volunteer/', name: 'Volunteer', current: props.page === '/volunteer/' },
  { href: '/donate/', name: 'Donate', current: props.page === '/donate/' },
  { href: '/contact/', name: 'Contact', current: props.page === '/contact/' },
  { href: '/volunteerspotlight/', name: 'Volunteer Spotlight', current: props.page === '/volunteerspotlight/' },
];
</script>

<template>
  <div ref="navContainerRef" :class="['site-nav-shell', navHidden && 'site-nav-shell--hidden']" @keydown.escape="onKeydown">
    <nav aria-label="Primary" class="site-nav">
      <div class="site-nav__inner">
        <div class="site-nav__bar">
          <div class="site-nav__brand-wrap">
            <a href="/" class="site-nav__brand">
              <div class="site-nav__logo-frame">
                <img class="site-nav__logo" src="/images/logo-small.jpg" alt="FUVP" width="40" height="40" />
              </div>
              <div class="site-nav__wordmark">
                <span
                  >Friends of <br />
                  Ute Valley Park</span
                >
              </div>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="site-nav__desktop">
            <div class="site-nav__links">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :aria-current="item.current ? 'page' : undefined"
                :class="[
                  'site-nav__link',
                  item.current && 'site-nav__link--current',
                ]"
                >{{ item.name }}</a
              >

              <!-- Leave No Trace Dropdown -->
              <div ref="lntDropdown" class="site-nav__dropdown" @keydown.escape="lntOpen = false">
                <button
                  type="button"
                  :aria-expanded="lntOpen"
                  aria-haspopup="true"
                  @click="lntOpen = !lntOpen"
                  :class="[
                    'site-nav__link site-nav__dropdown-button',
                    (props.page.startsWith('/leavenotrace') || lntOpen) && 'site-nav__link--current',
                  ]">
                  <span>Leave No Trace</span>
                  <HeroiconsChevronDown :class="['site-nav__chevron', lntOpen && 'site-nav__chevron--open']" aria-hidden="true" />
                </button>

                <Transition
                  enter-active-class="site-nav-menu-enter-active"
                  enter-from-class="site-nav-menu-enter-from"
                  enter-to-class="site-nav-menu-enter-to"
                  leave-active-class="site-nav-menu-leave-active"
                  leave-from-class="site-nav-menu-leave-from"
                  leave-to-class="site-nav-menu-leave-to">
                  <div v-if="lntOpen" class="site-nav__dropdown-panel-wrap">
                    <div class="site-nav__dropdown-panel">
                      <div class="site-nav__dropdown-list">
                        <a
                          v-for="item in leaveNoTraceMenuItems"
                          :key="item.name"
                          :href="item.href"
                          :aria-current="item.current ? 'page' : undefined"
                          class="site-nav__dropdown-item">
                          <div class="site-nav__dropdown-icon">
                            <component :is="item.icon" class="site-nav__dropdown-symbol" aria-hidden="true" />
                          </div>
                          <div>
                            <p class="site-nav__dropdown-title">
                              {{ item.name }}
                            </p>
                            <p class="site-nav__dropdown-description">{{ item.description }}</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <div class="site-nav__social">
              <slot name="social-links" />
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="site-nav__mobile-toggle-wrap">
            <button
              type="button"
              :aria-expanded="menuOpen"
              aria-controls="mobile-menu"
              class="site-nav__toggle"
              @click="toggleMenu">
              <span class="site-nav__sr-label">{{ menuOpen ? 'Close main menu' : 'Open main menu' }}</span>
              <span class="site-nav__toggle-icons">
                <HeroiconsBars3 :class="['site-nav__toggle-icon', menuOpen ? 'site-nav__toggle-icon--hidden' : 'site-nav__toggle-icon--visible']" aria-hidden="true" />
                <HeroiconsXMark :class="['site-nav__toggle-icon', menuOpen ? 'site-nav__toggle-icon--visible' : 'site-nav__toggle-icon--hidden']" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile menu backdrop -->
    <div v-show="menuOpen" class="site-nav__backdrop" aria-hidden="true" @click="closeMenu" />

    <!-- Mobile Panel -->
    <nav v-show="menuOpen" id="mobile-menu" aria-label="Mobile menu" class="site-nav__mobile-panel">
      <div class="site-nav__mobile-list">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          @click="closeMenu"
          :aria-current="item.current ? 'page' : undefined"
          :class="[
            'site-nav__mobile-link',
            item.current && 'site-nav__mobile-link--current',
          ]"
          >{{ item.name }}
        </a>

        <div class="site-nav__mobile-kicker">
          <span>Leave No Trace</span>
        </div>

        <a
          v-for="item in leaveNoTraceMenuItems"
          :key="item.name"
          :href="item.href"
          @click="closeMenu"
          :aria-current="item.current ? 'page' : undefined"
          :class="[
            'site-nav__mobile-link site-nav__mobile-link--sub',
            item.current && 'site-nav__mobile-link--current',
          ]"
          >{{ item.name }}
        </a>
      </div>

      <div class="site-nav__mobile-social">
        <slot name="social-links" />
      </div>
    </nav>
  </div>
</template>

<style scoped>
  .site-nav-shell {
    position: sticky;
    top: 0;
    z-index: 50;
    transition: transform 300ms;
  }

  .site-nav-shell--hidden {
    transform: translateY(-100%);
  }

  .site-nav {
    border-bottom: 1px solid var(--color-border);
    background: var(--color-page);
  }

  .site-nav__inner {
    width: min(100% - (var(--space-page-x) * 2), var(--container-wide));
    margin-inline: auto;
  }

  .site-nav__bar {
    display: flex;
    height: 5rem;
    align-items: center;
    justify-content: space-between;
  }

  .site-nav__brand-wrap {
    display: flex;
    align-items: center;
  }

  .site-nav__brand {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 0.75rem;
    color: inherit;
    text-decoration: none;
  }

  .site-nav__logo-frame {
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    padding: 0.25rem;
    transition:
      border-color 200ms,
      transform 200ms;
  }

  .site-nav__brand:hover .site-nav__logo-frame {
    border-color: var(--color-brand);
    transform: scale(1.05);
  }

  .site-nav__logo {
    display: block;
    width: 2.5rem;
    height: 2.5rem;
  }

  .site-nav__wordmark {
    display: none;
  }

  .site-nav__wordmark span {
    display: block;
    color: var(--color-text-strong);
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 900;
    line-height: 1;
    letter-spacing: 0;
    text-transform: uppercase;
    transition: color 200ms;
  }

  .site-nav__brand:hover .site-nav__wordmark span {
    color: var(--color-brand);
  }

  .site-nav__desktop {
    display: none;
  }

  .site-nav__links {
    display: flex;
    height: 100%;
    border-left: 1px solid var(--color-border);
  }

  .site-nav__link {
    display: inline-flex;
    height: 100%;
    align-items: center;
    border: 0;
    border-right: 1px solid var(--color-border);
    background: transparent;
    color: var(--color-text-subtle);
    padding-inline: 1rem;
    font-family: var(--font-label);
    font-size: var(--text-label);
    font-weight: 900;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    text-decoration: none;
    transition:
      background-color 200ms,
      color 200ms;
  }

  .site-nav__link:hover,
  .site-nav__link--current {
    background: var(--color-surface);
    color: var(--color-brand);
  }

  .site-nav__link--current {
    border-bottom: 2px solid var(--color-brand);
  }

  .site-nav__dropdown {
    position: relative;
    height: 100%;
  }

  .site-nav__dropdown-button {
    gap: 0.5rem;
    cursor: pointer;
  }

  .site-nav__chevron {
    width: 1rem;
    height: 1rem;
    opacity: 0.5;
    transition: transform 200ms;
  }

  .site-nav__chevron--open {
    transform: rotate(180deg);
  }

  .site-nav__dropdown-panel-wrap {
    position: absolute;
    right: 0;
    z-index: 10;
    width: 100vw;
    max-width: 24rem;
    margin-top: 1px;
  }

  .site-nav__dropdown-panel {
    overflow: hidden;
    border: 2px solid var(--color-brand);
    background: var(--color-surface);
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
  }

  .site-nav__dropdown-list {
    display: grid;
  }

  .site-nav__dropdown-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid var(--color-border-muted);
    padding: 1rem;
    color: inherit;
    text-decoration: none;
    transition: background-color 200ms;
  }

  .site-nav__dropdown-item:last-child {
    border-bottom: 0;
  }

  .site-nav__dropdown-item:hover {
    background: color-mix(in oklab, var(--color-brand) 5%, transparent);
  }

  .site-nav__dropdown-icon {
    display: flex;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-border-muted);
    background: var(--color-page);
    color: var(--color-text-subtle);
    transition:
      background-color 200ms,
      border-color 200ms,
      color 200ms;
  }

  .site-nav__dropdown-item:hover .site-nav__dropdown-icon {
    border-color: var(--color-brand);
    background: var(--color-surface);
    color: var(--color-brand);
  }

  .site-nav__dropdown-symbol {
    width: 1.25rem;
    height: 1.25rem;
  }

  .site-nav__dropdown-title,
  .site-nav__dropdown-description {
    margin: 0;
    font-family: var(--font-label);
    font-size: var(--text-label);
    text-transform: uppercase;
  }

  .site-nav__dropdown-title {
    color: var(--color-text-strong);
    font-weight: 900;
    letter-spacing: 0.12em;
    transition: color 200ms;
  }

  .site-nav__dropdown-item:hover .site-nav__dropdown-title {
    color: var(--color-brand);
  }

  .site-nav__dropdown-description {
    color: var(--color-text-subtle);
    letter-spacing: 0;
  }

  .site-nav__social {
    display: none;
    padding-left: 2rem;
  }

  .site-nav__mobile-toggle-wrap {
    display: flex;
  }

  .site-nav__toggle {
    display: inline-flex;
    min-width: 2.5rem;
    min-height: 2.5rem;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-border);
    background: transparent;
    color: var(--color-text-subtle);
    padding: 0.5rem;
    transition:
      background-color 200ms,
      border-color 200ms,
      color 200ms,
      transform 200ms;
  }

  .site-nav__toggle:hover {
    background: var(--color-surface-muted);
    color: var(--color-brand);
  }

  .site-nav__toggle:active {
    transform: scale(0.96);
  }

  .site-nav__sr-label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .site-nav__toggle-icons {
    position: relative;
    display: block;
    width: 1.5rem;
    height: 1.5rem;
  }

  .site-nav__toggle-icon {
    position: absolute;
    inset: 0;
    width: 1.5rem;
    height: 1.5rem;
    transition:
      filter 200ms cubic-bezier(0.2, 0, 0, 1),
      opacity 200ms cubic-bezier(0.2, 0, 0, 1),
      transform 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  .site-nav__toggle-icon--visible {
    opacity: 1;
    filter: blur(0);
    transform: scale(1);
  }

  .site-nav__toggle-icon--hidden {
    opacity: 0;
    filter: blur(4px);
    transform: scale(0.25);
  }

  .site-nav__backdrop {
    position: absolute;
    inset-inline: 0;
    top: 100%;
    height: 100vh;
    background: rgb(28 25 23 / 40%);
  }

  .site-nav__mobile-panel {
    position: absolute;
    inset-inline: 0;
    top: 100%;
    z-index: 10;
    border-top: 1px solid var(--color-border);
    background: var(--color-surface);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%);
  }

  .site-nav__mobile-list {
    display: grid;
  }

  .site-nav__mobile-link {
    display: block;
    border-bottom: 1px solid var(--color-border-muted);
    color: var(--color-text-muted);
    padding: 1rem 1.5rem;
    font-family: var(--font-label);
    font-size: var(--text-label);
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
  }

  .site-nav__mobile-link:hover,
  .site-nav__mobile-link--current {
    background: var(--color-brand-subtle);
    color: var(--color-brand);
  }

  .site-nav__mobile-link--current {
    border-left: 4px solid var(--color-brand);
  }

  .site-nav__mobile-link--sub {
    padding-inline: 2rem;
  }

  .site-nav__mobile-kicker {
    background: var(--color-page);
    padding: 0.5rem 1.5rem;
  }

  .site-nav__mobile-kicker span {
    color: var(--color-brand);
    font-family: var(--font-label);
    font-size: 0.5rem;
    font-weight: 900;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }

  .site-nav__mobile-social {
    border-top: 1px solid var(--color-border);
    background: var(--color-page);
    padding: 1.5rem;
  }

  .site-nav-menu-enter-active,
  .site-nav-menu-leave-active {
    transition:
      opacity 200ms,
      transform 200ms;
  }

  .site-nav-menu-leave-active {
    transition-duration: 150ms;
  }

  .site-nav-menu-enter-from,
  .site-nav-menu-leave-to {
    opacity: 0;
    transform: translateY(0.25rem);
  }

  .site-nav-menu-enter-to,
  .site-nav-menu-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 48rem) {
    .site-nav__wordmark {
      display: block;
    }
  }

  @media (min-width: 64rem) {
    .site-nav-shell--hidden {
      transform: translateY(0);
    }

    .site-nav__desktop {
      display: flex;
      height: 100%;
      align-items: center;
    }

    .site-nav__mobile-toggle-wrap,
    .site-nav__backdrop,
    .site-nav__mobile-panel {
      display: none;
    }
  }

  @media (min-width: 80rem) {
    .site-nav__link {
      padding-inline: 1.25rem;
    }

    .site-nav__social {
      display: block;
    }
  }
</style>
