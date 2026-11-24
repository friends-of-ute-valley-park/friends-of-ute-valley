<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef, useTemplateRef, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import LucidePawPrint from 'virtual:icons/lucide/paw-print';
import LucideBird from 'virtual:icons/lucide/bird';
import LucideCamera from 'virtual:icons/lucide/camera';
import LucideMap from 'virtual:icons/lucide/map';
import HeroiconsBars3 from 'virtual:icons/heroicons/bars-3';
import HeroiconsChevronDown from 'virtual:icons/heroicons/chevron-down';
import HeroiconsXMark from 'virtual:icons/heroicons/x-mark';

const props = defineProps<{ page: string; immersive?: boolean }>();

const menuOpen = shallowRef(false);
const lntOpen = shallowRef(false);
const scrolledPastTop = shallowRef(typeof window !== 'undefined' && window.scrollY > 16);
const navContainerRef = useTemplateRef<HTMLElement>('navContainerRef');
const lntDropdown = useTemplateRef<HTMLElement>('lntDropdown');
const toggleButtonRef = useTemplateRef<HTMLButtonElement>('toggleButtonRef');

const syncScroll = () => {
  if (typeof window !== 'undefined') {
    scrolledPastTop.value = window.scrollY > 16;
  }
};

onMounted(() => {
  syncScroll();
  window.addEventListener('scroll', syncScroll, { passive: true });
  document.addEventListener('astro:page-load', syncScroll);
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', syncScroll);
  }
  if (typeof document !== 'undefined') {
    document.removeEventListener('astro:page-load', syncScroll);
  }
});

const isScrolled = computed(() => !props.immersive || scrolledPastTop.value || menuOpen.value || lntOpen.value);

watch(
  () => props.page,
  () => {
    menuOpen.value = false;
    lntOpen.value = false;
    syncScroll();
  },
);

function toggleMenu() {
  if (menuOpen.value) {
    closeMenu();
    return;
  }

  menuOpen.value = true;
}

function closeMenu(restoreFocus = true) {
  const wasOpen = menuOpen.value;
  menuOpen.value = false;

  if (restoreFocus && wasOpen) {
    toggleButtonRef.value?.focus({ preventScroll: true });
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    event.preventDefault();
    closeMenu();
  }
}

onClickOutside(navContainerRef, () => {
  if (menuOpen.value) closeMenu();
});

onClickOutside(lntDropdown, () => {
  lntOpen.value = false;
});

const leaveNoTraceMenuItems = [
  { name: 'Dog Etiquette', href: '/leavenotrace/dogs/', current: props.page === '/leavenotrace/dogs/', icon: LucidePawPrint },
  {
    name: 'Travel on Durable Surfaces',
    href: '/leavenotrace/travel-on-durable-surfaces/',
    current: props.page === '/leavenotrace/travel-on-durable-surfaces/',
    icon: LucideMap,
  },
  {
    name: 'Leave What You Find',
    href: '/leavenotrace/leave-what-you-find/',
    current: props.page === '/leavenotrace/leave-what-you-find/',
    icon: LucideCamera,
  },
  {
    name: 'Respect Wildlife',
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
];
</script>

<template>
  <div
    ref="navContainerRef"
    :class="['site-nav site-nav-shell', props.immersive ? 'site-nav-shell--immersive' : 'site-nav-shell--solid', props.immersive && isScrolled && 'site-nav-shell--scrolled']"
    @keydown.escape="onKeydown">
    <nav aria-label="Primary">
      <div class="inner l-container">
        <div class="bar">
          <div class="brand-wrap">
            <a href="/" class="brand">
              <div class="logo-frame">
                <img class="logo" src="/images/logo-small.jpg" alt="FUVP" width="40" height="40" />
              </div>
              <div class="wordmark">
                <span>Friends of Ute Valley Park</span>
              </div>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="desktop">
            <div class="links">
              <a v-for="item in navigation" :key="item.name" :href="item.href" :aria-current="item.current ? 'page' : undefined" :class="['link', item.current && 'current']">
                {{ item.name }}
              </a>

              <!-- Leave No Trace Dropdown -->
              <div ref="lntDropdown" class="dropdown" @keydown.escape="lntOpen = false">
                <button
                  type="button"
                  :aria-expanded="lntOpen"
                  aria-haspopup="true"
                  @click="lntOpen = !lntOpen"
                  :class="['link dropdown-button', (props.page.startsWith('/leavenotrace') || lntOpen) && 'current']">
                  <span>Leave No Trace</span>
                  <HeroiconsChevronDown :class="['chevron', lntOpen && 'open']" aria-hidden="true" />
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
            <button ref="toggleButtonRef" type="button" :aria-expanded="menuOpen" aria-controls="mobile-menu" class="toggle" @click="toggleMenu">
              <span class="sr-only">{{ menuOpen ? 'Close main menu' : 'Open main menu' }}</span>
              <span class="toggle-icons">
                <HeroiconsBars3 :class="['toggle-icon', menuOpen ? 'hidden' : 'visible']" aria-hidden="true" />
                <HeroiconsXMark :class="['toggle-icon', menuOpen ? 'visible' : 'hidden']" aria-hidden="true" />
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
          @click="closeMenu(false)"
          :aria-current="item.current ? 'page' : undefined"
          :class="['mobile-link', item.current && 'current']">
          {{ item.name }}
        </a>

        <div class="mobile-kicker">
          <span>Leave No Trace</span>
        </div>

        <a
          v-for="item in leaveNoTraceMenuItems"
          :key="item.name"
          :href="item.href"
          @click="closeMenu(false)"
          :aria-current="item.current ? 'page' : undefined"
          :class="['mobile-link sub', item.current && 'current']">
          {{ item.name }}
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
  z-index: 50;
  transition:
    background-color var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out),
    color var(--duration-base) var(--ease-out),
    backdrop-filter var(--duration-base) var(--ease-out);
}

.site-nav-shell--solid {
  position: sticky;
  top: 0;
  border-bottom: 1px solid var(--color-border);
  background: color-mix(in oklab, var(--color-page) 95%, transparent);
  backdrop-filter: blur(12px);
}

.site-nav-shell--immersive {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
}

.site-nav .bar {
  display: flex;
  height: 4.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.site-nav .brand-wrap {
  display: flex;
  min-width: 0;
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
    border-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.site-nav .brand:hover .logo-frame {
  border-color: var(--color-brand);
  transform: scale(1.04);
}

.site-nav .logo {
  display: block;
  width: 2.25rem;
  height: 2.25rem;
}

.site-nav .wordmark {
  display: block;
}

.site-nav .wordmark span {
  display: block;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: clamp(1rem, 3.6vw, 1.25rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-transform: none;
  white-space: nowrap;
  transition: color var(--duration-fast) var(--ease-out);
}

.site-nav .brand:hover .wordmark span {
  color: var(--color-brand-strong);
}

.site-nav .desktop {
  display: none;
}

.site-nav .links {
  display: flex;
  height: 100%;
  align-items: center;
  gap: 0.25rem;
}

.site-nav .link {
  display: inline-flex;
  height: 100%;
  align-items: center;
  border: 0;
  background: transparent;
  color: var(--color-text-muted);
  padding-inline: 0.875rem;
  font-family: var(--font-body);
  font-size: var(--text-body-small);
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.site-nav .link:hover,
.site-nav .link.current {
  background: color-mix(in oklab, var(--color-surface) 75%, transparent);
  color: var(--color-brand-strong);
}

.site-nav .link.current {
  border-bottom: 2px solid var(--color-brand-strong);
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
  opacity: 0.6;
  transition: transform var(--duration-fast) var(--ease-out);
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
  border: 1px solid var(--color-border-strong);
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
  transition: background-color var(--duration-fast) var(--ease-out);
}

.site-nav .dropdown-item:last-child {
  border-bottom: 0;
}

.site-nav .dropdown-item:hover {
  background: color-mix(in oklab, var(--color-brand) 6%, transparent);
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
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
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

.site-nav .dropdown-title {
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-body);
  font-size: var(--text-body-small);
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.site-nav .dropdown-item:hover .dropdown-title {
  color: var(--color-brand-strong);
}

.site-nav .social {
  display: none;
  padding-left: 1.5rem;
}

.site-nav .mobile-toggle-wrap {
  display: flex;
}

.site-nav .toggle {
  display: inline-flex;
  min-width: 2.75rem;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  padding: 0.5rem;
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.site-nav .toggle:hover {
  background: var(--color-surface-muted);
  color: var(--color-brand-strong);
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
    filter var(--duration-fast) var(--ease-out),
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
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
  background: var(--color-scrim);
}

.site-nav .mobile-panel {
  position: absolute;
  inset-inline: 0;
  top: 100%;
  z-index: 10;
  max-height: calc(100vh - 4.5rem);
  max-height: calc(100dvh - 4.5rem);
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  overflow-y: auto;
  overscroll-behavior: contain;
  scroll-padding-block: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%);
}

.site-nav .mobile-list {
  display: grid;
}

.site-nav .mobile-link {
  display: block;
  min-height: 2.75rem;
  border-bottom: 1px solid var(--color-border-muted);
  color: var(--color-text-muted);
  padding: 1rem 1.5rem;
  font-family: var(--font-body);
  font-size: var(--text-body-small);
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
  text-decoration: none;
}

.site-nav .mobile-link:hover,
.site-nav .mobile-link.current {
  background: var(--color-brand-subtle);
  color: var(--color-brand-strong);
}

.site-nav .mobile-link.sub {
  padding-inline: 2rem;
}

.site-nav .mobile-kicker {
  background: var(--color-page);
  padding: 0.5rem 1.5rem;
}

.site-nav .mobile-kicker span {
  color: var(--color-brand-strong);
  font-family: var(--font-body);
  font-size: var(--text-body-small);
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
}

.site-nav .mobile-social {
  border-top: 1px solid var(--color-border);
  background: var(--color-page);
  padding: 1.5rem;
}

.site-nav .mobile-social :deep(.social-links .link.button) {
  min-width: 2.75rem;
  min-height: 2.75rem;
}

.site-nav-menu-enter-active,
.site-nav-menu-leave-active {
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
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

@media (min-width: 64rem) {
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
    padding-inline: 1.125rem;
  }

  .site-nav .social {
    display: block;
  }
}

.site-nav-shell--immersive:not(.site-nav-shell--scrolled) {
  border-bottom-color: transparent;
  background: transparent;
}

.site-nav-shell--immersive:not(.site-nav-shell--scrolled) .logo-frame {
  border-color: color-mix(in oklab, var(--color-text-inverse) 35%, transparent);
  background: color-mix(in oklab, var(--color-surface) 92%, transparent);
}

.site-nav-shell--immersive:not(.site-nav-shell--scrolled) .wordmark span {
  color: var(--color-text-inverse);
  text-shadow: 0 1px 12px color-mix(in oklab, var(--color-text) 45%, transparent);
}

.site-nav-shell--immersive:not(.site-nav-shell--scrolled) .link {
  color: color-mix(in oklab, var(--color-text-inverse) 92%, transparent);
}

.site-nav-shell--immersive:not(.site-nav-shell--scrolled) .link:hover,
.site-nav-shell--immersive:not(.site-nav-shell--scrolled) .link.current {
  background: color-mix(in oklab, var(--color-surface) 14%, transparent);
  color: var(--color-text-inverse);
}

.site-nav-shell--immersive:not(.site-nav-shell--scrolled) .link.current {
  border-bottom: 2px solid var(--color-accent);
}

.site-nav-shell--immersive:not(.site-nav-shell--scrolled) .toggle {
  border-color: color-mix(in oklab, var(--color-text-inverse) 35%, transparent);
  background: color-mix(in oklab, var(--color-text) 20%, transparent);
  color: var(--color-text-inverse);
}

.site-nav-shell--immersive:not(.site-nav-shell--scrolled) .toggle:hover {
  background: color-mix(in oklab, var(--color-surface) 18%, transparent);
  color: var(--color-text-inverse);
}

.site-nav-shell--immersive:not(.site-nav-shell--scrolled) :deep(.social-links .link.button) {
  border-color: color-mix(in oklab, var(--color-text-inverse) 32%, transparent);
  background: color-mix(in oklab, var(--color-text) 18%, transparent);
  color: var(--color-text-inverse);
}

.site-nav-shell--immersive:not(.site-nav-shell--scrolled) :deep(.social-links .link.button:hover) {
  border-color: var(--color-text-inverse);
  background: color-mix(in oklab, var(--color-surface) 16%, transparent);
  color: var(--color-text-inverse);
}

.site-nav-shell--immersive.site-nav-shell--scrolled {
  border-bottom: 1px solid var(--color-border-muted);
  background: color-mix(in oklab, var(--color-page) 95%, transparent);
  backdrop-filter: blur(12px);
}

.site-nav-shell--immersive.site-nav-shell--scrolled .wordmark span {
  color: var(--color-text-strong);
  text-shadow: none;
}

.site-nav-shell--immersive.site-nav-shell--scrolled .link {
  color: var(--color-text-muted);
}

.site-nav-shell--immersive.site-nav-shell--scrolled .link:hover,
.site-nav-shell--immersive.site-nav-shell--scrolled .link.current {
  color: var(--color-brand-strong);
}

.site-nav-shell--immersive.site-nav-shell--scrolled .link.current {
  border-bottom: 2px solid var(--color-brand-strong);
}
</style>
