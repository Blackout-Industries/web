import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
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

describe('TheHeader', () => {
  describe('Logo and Branding', () => {
    it('renders logo with correct text', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Blackout Industries')
      expect(wrapper.find('span').text()).toBe('B')
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
      expect(dropdownItems.length).toBe(3)

      const dropdownTexts = dropdownItems.map(item => item.text())
      expect(dropdownTexts).toEqual(
        expect.arrayContaining([
          expect.stringContaining('All Services'),
          expect.stringContaining('DevOps Consulting'),
          expect.stringContaining('3D Printing')
        ])
      )
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

      expect(wrapper.vm.mobileMenuOpen).toBe(false)
    })

    it('mobile menu button toggles menu state', async () => {
      const wrapper = mountComponent()

      const menuButton = wrapper.find('button[aria-label="Toggle menu"]')
      expect(menuButton.exists()).toBe(true)

      await menuButton.trigger('click')
      expect(wrapper.vm.mobileMenuOpen).toBe(true)

      await menuButton.trigger('click')
      expect(wrapper.vm.mobileMenuOpen).toBe(false)
    })

    it('mobile menu renders navigation links when open', async () => {
      const wrapper = mountComponent()

      await wrapper.setData({ mobileMenuOpen: true })
      await wrapper.vm.$nextTick()

      const mobileLinks = wrapper.findAll('.mobile-nav-link')
      expect(mobileLinks.length).toBeGreaterThanOrEqual(5)

      const linkTexts = mobileLinks.map(link => link.text())
      expect(linkTexts).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Home'),
          expect.stringContaining('All Services'),
          expect.stringContaining('DevOps Consulting'),
          expect.stringContaining('3D Printing'),
          expect.stringContaining('About')
        ])
      )
    })

    it('clicking mobile nav link closes menu', async () => {
      const wrapper = mountComponent()

      await wrapper.setData({ mobileMenuOpen: true })

      const mobileLink = wrapper.find('.mobile-nav-link')
      await mobileLink.trigger('click')

      expect(wrapper.vm.mobileMenuOpen).toBe(false)
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
