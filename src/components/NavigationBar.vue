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
  { href: '/contact/', name: 'Contact', current: props.page === '/contact/' },
  { href: '/volunteerspotlight/', name: 'Volunteer Spotlight', current: props.page === '/volunteerspotlight/' },
];
</script>

<template>
  <div ref="navContainerRef" :class="['site-nav site-nav-shell', navHidden && 'site-nav-shell--hidden']" @keydown.escape="onKeydown">
    <nav aria-label="Primary">
      <div class="inner l-container">
        <div class="bar">
          <div class="brand-wrap">
            <a href="/" class="brand">
              <div class="logo-frame">
                <img class="logo" src="/images/logo-small.jpg" alt="FUVP" width="40" height="40" />
              </div>
              <div class="wordmark">
                <span
                  >Friends of <br />
                  Ute Valley Park</span
                >
              </div>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="desktop">
            <div class="links">
              <a v-for="item in navigation" :key="item.name" :href="item.href" :aria-current="item.current ? 'page' : undefined" :class="['link', item.current && 'link current']">{{ item.name }}</a>

              <!-- Leave No Trace Dropdown -->
              <div ref="lntDropdown" class="dropdown" @keydown.escape="lntOpen = false">
                <button
                  type="button"
                  :aria-expanded="lntOpen"
                  aria-haspopup="true"
                  @click="lntOpen = !lntOpen"
                  :class="['link dropdown-button', (props.page.startsWith('/leavenotrace') || lntOpen) && 'link current']">
                  <span>Leave No Trace</span>
                  <HeroiconsChevronDown :class="['chevron', lntOpen && 'chevron open']" aria-hidden="true" />
                </button>

                <Transition
                  enter-active-class="site-nav-menu-enter-active"
                  enter-from-class="site-nav-menu-enter-from"
                  enter-to-class="site-nav-menu-enter-to"
                  leave-active-class="site-nav-menu-leave-active"
                  leave-from-class="site-nav-menu-leave-from"
                  leave-to-class="site-nav-menu-leave-to">
                  <div v-if="lntOpen" class="dropdown-panel-wrap">
                    <div class="dropdown-panel">
                      <div class="dropdown-list">
                        <a v-for="item in leaveNoTraceMenuItems" :key="item.name" :href="item.href" :aria-current="item.current ? 'page' : undefined" class="dropdown-item">
                          <div class="dropdown-icon">
                            <component :is="item.icon" class="dropdown-symbol" aria-hidden="true" />
                          </div>
                          <div>
                            <p class="dropdown-title">
                              {{ item.name }}
                            </p>
                            <p class="dropdown-description">{{ item.description }}</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <div class="social">
              <slot name="social-links" />
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="mobile-toggle-wrap">
            <button type="button" :aria-expanded="menuOpen" aria-controls="mobile-menu" class="toggle" @click="toggleMenu">
              <span class="sr-only">{{ menuOpen ? 'Close main menu' : 'Open main menu' }}</span>
              <span class="toggle-icons">
                <HeroiconsBars3 :class="['toggle-icon', menuOpen ? 'toggle-icon hidden' : 'toggle-icon visible']" aria-hidden="true" />
                <HeroiconsXMark :class="['toggle-icon', menuOpen ? 'toggle-icon visible' : 'toggle-icon hidden']" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile menu backdrop -->
    <div v-show="menuOpen" class="backdrop" aria-hidden="true" @click="closeMenu" />

    <!-- Mobile Panel -->
    <nav v-show="menuOpen" id="mobile-menu" aria-label="Mobile menu" class="mobile-panel">
      <div class="mobile-list">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          @click="closeMenu"
          :aria-current="item.current ? 'page' : undefined"
          :class="['mobile-link', item.current && 'mobile-link current']"
          >{{ item.name }}
        </a>

        <div class="mobile-kicker">
          <span>Leave No Trace</span>
        </div>

        <a
          v-for="item in leaveNoTraceMenuItems"
          :key="item.name"
          :href="item.href"
          @click="closeMenu"
          :aria-current="item.current ? 'page' : undefined"
          :class="['mobile-link sub', item.current && 'mobile-link current']"
          >{{ item.name }}
        </a>
      </div>

      <div class="mobile-social">
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

.site-nav .bar {
  display: flex;
  height: 5rem;
  align-items: center;
  justify-content: space-between;
}

.site-nav .brand-wrap {
  display: flex;
  align-items: center;
}

.site-nav .brand {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.75rem;
  color: inherit;
  text-decoration: none;
}

.site-nav .logo-frame {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 0.25rem;
  transition:
    border-color 200ms,
    transform 200ms;
}

.site-nav .brand:hover .logo-frame {
  border-color: var(--color-brand);
  transform: scale(1.05);
}

.site-nav .logo {
  display: block;
  width: 2.5rem;
  height: 2.5rem;
}

.site-nav .wordmark {
  display: none;
}

.site-nav .wordmark span {
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

.site-nav .brand:hover .wordmark span {
  color: var(--color-brand);
}

.site-nav .desktop {
  display: none;
}

.site-nav .links {
  display: flex;
  height: 100%;
  border-left: 1px solid var(--color-border);
}

.site-nav .link {
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

.site-nav .link:hover,
.site-nav .link.current {
  background: var(--color-surface);
  color: var(--color-brand);
}

.site-nav .link.current {
  border-bottom: 2px solid var(--color-brand);
}

.site-nav .dropdown {
  position: relative;
  height: 100%;
}

.site-nav .dropdown-button {
  gap: 0.5rem;
  cursor: pointer;
}

.site-nav .chevron {
  width: 1rem;
  height: 1rem;
  opacity: 0.5;
  transition: transform 200ms;
}

.site-nav .chevron.open {
  transform: rotate(180deg);
}

.site-nav .dropdown-panel-wrap {
  position: absolute;
  right: 0;
  z-index: 10;
  width: 100vw;
  max-width: 24rem;
  margin-top: 1px;
}

.site-nav .dropdown-panel {
  overflow: hidden;
  border: 2px solid var(--color-brand);
  background: var(--color-surface);
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
}

.site-nav .dropdown-list {
  display: grid;
}

.site-nav .dropdown-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--color-border-muted);
  padding: 1rem;
  color: inherit;
  text-decoration: none;
  transition: background-color 200ms;
}

.site-nav .dropdown-item:last-child {
  border-bottom: 0;
}

.site-nav .dropdown-item:hover {
  background: color-mix(in oklab, var(--color-brand) 5%, transparent);
}

.site-nav .dropdown-icon {
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

.site-nav .dropdown-item:hover .dropdown-icon {
  border-color: var(--color-brand);
  background: var(--color-surface);
  color: var(--color-brand);
}

.site-nav .dropdown-symbol {
  width: 1.25rem;
  height: 1.25rem;
}

.site-nav .dropdown-title,
.site-nav .dropdown-description {
  margin: 0;
  font-family: var(--font-label);
  font-size: var(--text-label);
  text-transform: uppercase;
}

.site-nav .dropdown-title {
  color: var(--color-text-strong);
  font-weight: 900;
  letter-spacing: 0.12em;
  transition: color 200ms;
}

.site-nav .dropdown-item:hover .dropdown-title {
  color: var(--color-brand);
}

.site-nav .dropdown-description {
  color: var(--color-text-subtle);
  letter-spacing: 0;
}

.site-nav .social {
  display: none;
  padding-left: 2rem;
}

.site-nav .mobile-toggle-wrap {
  display: flex;
}

.site-nav .toggle {
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

.site-nav .toggle:hover {
  background: var(--color-surface-muted);
  color: var(--color-brand);
}

.site-nav .toggle:active {
  transform: scale(0.96);
}

.site-nav .toggle-icons {
  position: relative;
  display: block;
  width: 1.5rem;
  height: 1.5rem;
}

.site-nav .toggle-icon {
  position: absolute;
  inset: 0;
  width: 1.5rem;
  height: 1.5rem;
  transition:
    filter 200ms cubic-bezier(0.2, 0, 0, 1),
    opacity 200ms cubic-bezier(0.2, 0, 0, 1),
    transform 200ms cubic-bezier(0.2, 0, 0, 1);
}

.site-nav .toggle-icon.visible {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}

.site-nav .toggle-icon.hidden {
  opacity: 0;
  filter: blur(4px);
  transform: scale(0.25);
}

.site-nav .backdrop {
  position: absolute;
  inset-inline: 0;
  top: 100%;
  height: 100vh;
  background: rgb(28 25 23 / 40%);
}

.site-nav .mobile-panel {
  position: absolute;
  inset-inline: 0;
  top: 100%;
  z-index: 10;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%);
}

.site-nav .mobile-list {
  display: grid;
}

.site-nav .mobile-link {
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

.site-nav .mobile-link:hover,
.site-nav .mobile-link.current {
  background: var(--color-brand-subtle);
  color: var(--color-brand);
}

.site-nav .mobile-link.current {
  border-left: 4px solid var(--color-brand);
}

.site-nav .mobile-link.sub {
  padding-inline: 2rem;
}

.site-nav .mobile-kicker {
  background: var(--color-page);
  padding: 0.5rem 1.5rem;
}

.site-nav .mobile-kicker span {
  color: var(--color-brand);
  font-family: var(--font-label);
  font-size: 0.5rem;
  font-weight: 900;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.site-nav .mobile-social {
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
  .site-nav .wordmark {
    display: block;
  }
}

@media (min-width: 64rem) {
  .site-nav-shell--hidden {
    transform: translateY(0);
  }

  .site-nav .desktop {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .site-nav .mobile-toggle-wrap,
  .site-nav .backdrop,
  .site-nav .mobile-panel {
    display: none;
  }
}

@media (min-width: 80rem) {
  .site-nav .link {
    padding-inline: 1.25rem;
  }

  .site-nav .social {
    display: block;
  }
}
</style>
