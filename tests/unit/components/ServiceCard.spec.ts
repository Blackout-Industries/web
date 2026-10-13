import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import ServiceCard from '../../../components/ServiceCard.vue'

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

const mountComponent = (props = {}) => {
  return mount(ServiceCard, {
    props: {
      icon: 'heroicons:server-stack',
      title: 'Test Service',
      description: 'Test description',
      link: '/test-link',
      ...props
    },
    global: {
      components: { NuxtLink, Icon },
      stubs: {
        NuxtLink,
        Icon
      }
    }
  })
}

describe('ServiceCard', () => {
  describe('Props Rendering', () => {
    it('renders title correctly', () => {
      const wrapper = mountComponent({ title: 'DevOps Consulting' })

      expect(wrapper.text()).toContain('DevOps Consulting')
    })

    it('renders description correctly', () => {
      const wrapper = mountComponent({
        description: 'Custom description for testing'
      })

      expect(wrapper.text()).toContain('Custom description for testing')
    })

    it('renders icon with correct name', () => {
      const wrapper = mountComponent({ icon: 'heroicons:cube-transparent' })

      const icon = wrapper.findComponent(Icon)
      expect(icon.exists()).toBe(true)
      expect(icon.props('name')).toBe('heroicons:cube-transparent')
    })

    it('link has correct href', () => {
      const wrapper = mountComponent({ link: '/services/devops' })

      const link = wrapper.find('a[href="/services/devops"]')
      expect(link.exists()).toBe(true)
      expect(link.text()).toContain('Learn More')
    })

    it('renders Coming soon inside a badge when comingSoon is set', () => {
      const wrapper = mountComponent({ comingSoon: true })

      const badge = wrapper.find('.badge')
      expect(badge.exists()).toBe(true)
      expect(badge.text()).toBe('Coming soon')
    })
  })

  describe('Features List', () => {
    it('renders features when provided', () => {
      const features = [
        'Feature 1',
        'Feature 2',
        'Feature 3'
      ]

      const wrapper = mountComponent({ features })

      const featureItems = wrapper.findAll('li')
      expect(featureItems.length).toBe(3)

      features.forEach(feature => {
        expect(wrapper.text()).toContain(feature)
      })
    })

    it('does not render features list when empty', () => {
      const wrapper = mountComponent({ features: [] })

      expect(wrapper.findAll('li').length).toBe(0)
    })

    it('renders checkmark icons for features', () => {
      const wrapper = mountComponent({
        features: ['Feature 1', 'Feature 2']
      })

      const checkIcons = wrapper.findAll('[class*="icon-heroicons:check-circle"]')
      expect(checkIcons.length).toBe(2)
    })
  })

  describe('Structure', () => {
    it('uses card class for container', () => {
      const wrapper = mountComponent()

      expect(wrapper.find('.card').exists()).toBe(true)
    })

    it('root has service-card class', () => {
      const wrapper = mountComponent()

      expect(wrapper.classes()).toContain('service-card')
    })

    it('displays learn more link with arrow icon', () => {
      const wrapper = mountComponent()

      const learnMore = wrapper.find('a')
      expect(learnMore.text()).toContain('Learn More')

      const arrowIcon = learnMore.findComponent(Icon)
      expect(arrowIcon.exists()).toBe(true)
      expect(arrowIcon.props('name')).toBe('mdi:arrow-right')
    })
  })

  describe('Accessibility', () => {
    it('renders semantic heading for title', () => {
      const wrapper = mountComponent({ title: 'Service Title' })

      const heading = wrapper.find('h3')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBe('Service Title')
    })

    it('link is keyboard accessible', () => {
      const wrapper = mountComponent()

      const link = wrapper.find('a')
      expect(link.element.tagName).toBe('A')
    })
  })
})
