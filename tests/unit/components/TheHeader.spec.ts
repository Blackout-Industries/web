import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import TheHeader from '../../../components/TheHeader.vue'

// Mock Nuxt components
const NuxtLink = defineComponent({
  props: ['to'],
  setup(props, { slots }) {
    return () => h('a', { href: props.to }, slots.default?.())
  }
})

const Icon = defineComponent({
  props: ['name'],
  setup(props) {
    return () => h('span', { class: `icon-${props.name}` })
  }
})

const mountComponent = (options = {}) => {
  return mount(TheHeader, {
    global: {
      components: { NuxtLink, Icon },
      stubs: {
        NuxtLink,
        Icon
      }
    },
    ...options
  })
}

// script setup state is not writable via setData, so drive the menu like a user
const toggleMobileMenu = async (wrapper: ReturnType<typeof mountComponent>) => {
  await wrapper.find('button[aria-label="Toggle menu"]').trigger('click')
  await nextTick()
}

const serviceRoutes = [
  '/services',
  '/services/developer-platform',
  '/services/devops-consulting',
  '/services/3d-printing',
  '/services/iot-home-automation',
  '/services/game-development'
]

describe('TheHeader', () => {
  describe('Logo and Branding', () => {
    it('renders logo with correct text', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Blackout Industries')

      const logoLink = wrapper.find('a[href="/"]')
      const wordmark = logoLink.findAll('span').map(span => span.text())
      expect(wordmark).toContain('Blackout')
      expect(wordmark).toContain('Industries')
      expect(logoLink.find('img').attributes('alt')).toBe('Blackout Industries')
    })

    it('logo links to home page', () => {
      const wrapper = mountComponent()

      const logoLink = wrapper.find('a[href="/"]')
      expect(logoLink.exists()).toBe(true)
    })
  })

  describe('Desktop Navigation', () => {
    it('renders all main navigation links', () => {
      const wrapper = mountComponent()

      const navLinks = wrapper.findAll('.nav-link')
      expect(navLinks.length).toBeGreaterThanOrEqual(3)

      const linkTexts = navLinks.map(link => link.text())
      expect(linkTexts).toContain('Home')
      expect(linkTexts).toContain('About')
    })

    it('renders services dropdown button', () => {
      const wrapper = mountComponent()

      const servicesButton = wrapper.find('button.nav-link')
      expect(servicesButton.exists()).toBe(true)
      expect(servicesButton.text()).toContain('Services')
    })

    it('renders services dropdown items', () => {
      const wrapper = mountComponent()

      const dropdownItems = wrapper.findAll('.dropdown-item')
      expect(dropdownItems.length).toBe(6)
      expect(dropdownItems.map(item => item.attributes('href'))).toEqual(serviceRoutes)

      const dropdownTexts = dropdownItems.map(item => item.text())
      expect(dropdownTexts).toEqual(
        expect.arrayContaining([
          expect.stringContaining('All Services'),
          expect.stringContaining('Developer Platform'),
          expect.stringContaining('DevOps Consulting'),
          expect.stringContaining('3D Printing'),
          expect.stringContaining('IoT & Home Automation'),
          expect.stringContaining('Game Development')
        ])
      )
    })

    it('developer platform item follows All Services and describes the SaaS', () => {
      const wrapper = mountComponent()

      const dropdownItems = wrapper.findAll('.dropdown-item')
      expect(dropdownItems[1].attributes('href')).toBe('/services/developer-platform')
      expect(dropdownItems[1].text()).toContain('Developer Platform')
      expect(dropdownItems[1].text()).toContain('Crossplane + Backstage SaaS')
    })

    it('game development item describes the handheld PC and Switch focus', () => {
      const wrapper = mountComponent()

      const gameDev = wrapper.find('.dropdown-item[href="/services/game-development"]')
      expect(gameDev.text()).toContain('Game Development')
      expect(gameDev.text()).toContain('Handheld PC and Switch')
    })

    it('dropdown items use the expected icons', () => {
      const wrapper = mountComponent()

      const iconNames = wrapper
        .findAll('.dropdown-item')
        .map(item => item.findComponent(Icon).props('name'))
      expect(iconNames).toEqual([
        'heroicons:squares-2x2',
        'heroicons:building-office-2',
        'heroicons:server-stack',
        'heroicons:cube-transparent',
        'heroicons:home-modern',
        'heroicons:puzzle-piece'
      ])
    })

    it('contact button is present', () => {
      const wrapper = mountComponent()

      const contactButton = wrapper.find('a[href="/contact"].btn-primary')
      expect(contactButton.exists()).toBe(true)
      expect(contactButton.text()).toBe('Contact')
    })
  })

  describe('Mobile Menu', () => {
    it('mobile menu is hidden by default', () => {
      const wrapper = mountComponent()

      expect(wrapper.findAll('.mobile-nav-link').length).toBe(0)
    })

    it('mobile menu button toggles menu state', async () => {
      const wrapper = mountComponent()

      const menuButton = wrapper.find('button[aria-label="Toggle menu"]')
      expect(menuButton.exists()).toBe(true)
      expect(menuButton.findComponent(Icon).props('name')).toBe('heroicons:bars-3')

      await toggleMobileMenu(wrapper)
      expect(wrapper.findAll('.mobile-nav-link').length).toBeGreaterThan(0)
      expect(menuButton.findComponent(Icon).props('name')).toBe('heroicons:x-mark')

      await toggleMobileMenu(wrapper)
      expect(wrapper.findAll('.mobile-nav-link').length).toBe(0)
      expect(menuButton.findComponent(Icon).props('name')).toBe('heroicons:bars-3')
    })

    it('mobile menu renders navigation links when open', async () => {
      const wrapper = mountComponent()

      await toggleMobileMenu(wrapper)

      const mobileLinks = wrapper.findAll('.mobile-nav-link')
      expect(mobileLinks.length).toBe(8)
      expect(mobileLinks.map(link => link.attributes('href'))).toEqual([
        '/',
        ...serviceRoutes,
        '/about'
      ])

      const linkTexts = mobileLinks.map(link => link.text())
      expect(linkTexts).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Home'),
          expect.stringContaining('All Services'),
          expect.stringContaining('Developer Platform'),
          expect.stringContaining('DevOps Consulting'),
          expect.stringContaining('3D Printing'),
          expect.stringContaining('IoT & Home Automation'),
          expect.stringContaining('Game Development'),
          expect.stringContaining('About')
        ])
      )

      expect(wrapper.findAll('a[href="/contact"].btn-primary').length).toBe(2)
    })

    it('clicking mobile nav link closes menu', async () => {
      const wrapper = mountComponent()

      await toggleMobileMenu(wrapper)
      expect(wrapper.findAll('.mobile-nav-link').length).toBeGreaterThan(0)

      await wrapper.find('.mobile-nav-link').trigger('click')
      await nextTick()

      expect(wrapper.findAll('.mobile-nav-link').length).toBe(0)
    })
  })

  describe('Responsive Behavior', () => {
    it('desktop menu has hidden class on mobile', () => {
      const wrapper = mountComponent()

      const desktopNav = wrapper.find('.hidden.md\\:flex')
      expect(desktopNav.exists()).toBe(true)
    })

    it('mobile menu button has hidden class on desktop', () => {
      const wrapper = mountComponent()

      const mobileButton = wrapper.find('button.md\\:hidden')
      expect(mobileButton.exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('mobile menu button has aria-label', () => {
      const wrapper = mountComponent()

      const menuButton = wrapper.find('button[aria-label="Toggle menu"]')
      expect(menuButton.attributes('aria-label')).toBe('Toggle menu')
    })

    it('header uses semantic nav element', () => {
      const wrapper = mountComponent()

      expect(wrapper.find('nav').exists()).toBe(true)
    })
  })
})
