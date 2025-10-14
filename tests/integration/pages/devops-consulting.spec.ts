import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import DevOpsPage from '../../../pages/services/devops-consulting.vue'

// Mock Icon component
const Icon = defineComponent({
  props: ['name'],
  setup(props) {
    return () => h('span', { class: `icon-${props.name}` })
  }
})

const NuxtLink = defineComponent({
  props: ['to'],
  setup(props, { slots }) {
    return () => h('a', { href: props.to }, slots.default?.())
  }
})

const mountComponent = () => {
  return mount(DevOpsPage, {
    global: {
      components: { Icon, NuxtLink },
      stubs: { Icon, NuxtLink },
      mocks: {
        useHead: () => {}
      }
    }
  })
}

describe('DevOps Consulting Page (services/devops-consulting.vue)', () => {
  describe('Hero Section', () => {
    it('renders page heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Platform Engineering')
      expect(wrapper.text()).toContain('That Powers Growth')
    })

    it('renders service badge', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('DevOps & Platform Engineering')
    })

    it('renders subheading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Build resilient, scalable infrastructure')
    })

    it('badge has icon and styling', () => {
      const wrapper = mountComponent()

      const badge = wrapper.find('.bg-accent\\/20.border-accent\\/50')
      expect(badge.exists()).toBe(true)
    })
  })

  describe('Pain Points Section', () => {
    it('renders section heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Challenges We')
      expect(wrapper.text()).toContain('Solve')
    })

    it('renders four main pain points', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Slow Deployment Cycles')
      expect(wrapper.text()).toContain('Cloud Cost Overruns')
      expect(wrapper.text()).toContain('Lack of Observability')
      expect(wrapper.text()).toContain('Manual, Error-Prone Processes')
    })

    it('pain points have descriptions', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Manual processes causing bottlenecks')
      expect(wrapper.text()).toContain('Unoptimized infrastructure draining your budget')
      expect(wrapper.text()).toContain('Limited visibility into system health')
      expect(wrapper.text()).toContain('Human errors causing outages')
    })

    it('pain points have icons', () => {
      const wrapper = mountComponent()

      const icons = wrapper.findAllComponents(Icon)
      const painPointIcons = icons.filter(icon => {
        const name = icon.props('name')
        return name === 'heroicons:clock' ||
               name === 'heroicons:currency-dollar' ||
               name === 'heroicons:eye-slash' ||
               name === 'heroicons:exclamation-triangle'
      })

      expect(painPointIcons.length).toBe(4)
    })

    it('pain points are in responsive grid', () => {
      const wrapper = mountComponent()

      const grid = wrapper.find('.grid.grid-cols-1.md\\:grid-cols-2')
      expect(grid.exists()).toBe(true)
    })
  })

  describe('Services and Expertise', () => {
    it('renders expertise heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Our')
      expect(wrapper.text()).toContain('Expertise')
    })

    it('has multiple service category cards', () => {
      const wrapper = mountComponent()

      const cards = wrapper.findAll('.card')
      expect(cards.length).toBeGreaterThanOrEqual(6)
    })

    it('renders service categories with headings', () => {
      const wrapper = mountComponent()

      const headings = wrapper.findAll('h3.text-2xl')
      expect(headings.length).toBeGreaterThanOrEqual(6)
    })

    it('each service card has checkmark lists', () => {
      const wrapper = mountComponent()

      const checkIcons = wrapper.findAllComponents(Icon).filter(icon =>
        icon.props('name') === 'heroicons:check-circle'
      )

      expect(checkIcons.length).toBeGreaterThan(20)
    })
  })

  describe('Technologies Section', () => {
    it('renders technologies section', () => {
      const wrapper = mountComponent()

      const sections = wrapper.findAll('section')
      expect(sections.length).toBeGreaterThanOrEqual(4)
    })

    it('displays multiple technology badges', () => {
      const wrapper = mountComponent()

      const badgeElements = wrapper.findAll('.inline-flex.items-center.space-x-2')
      expect(badgeElements.length).toBeGreaterThan(15)
    })
  })

  describe('CTA Section', () => {
    it('renders final CTA', () => {
      const wrapper = mountComponent()

      const links = wrapper.findAll('a[href="/contact"]')
      expect(links.length).toBeGreaterThan(0)
    })

    it('has glass card styling for CTA', () => {
      const wrapper = mountComponent()

      const glassCards = wrapper.findAll('.card.glass')
      expect(glassCards.length).toBeGreaterThan(0)
    })
  })

  describe('Page Structure', () => {
    it('has multiple sections', () => {
      const wrapper = mountComponent()

      const sections = wrapper.findAll('section')
      expect(sections.length).toBeGreaterThanOrEqual(4)
    })

    it('uses semantic HTML structure', () => {
      const wrapper = mountComponent()

      const headings = wrapper.findAll('h1, h2, h3')
      expect(headings.length).toBeGreaterThanOrEqual(10)
    })

    it('sections alternate backgrounds', () => {
      const wrapper = mountComponent()

      const darkSections = wrapper.findAll('.bg-dark-100')
      expect(darkSections.length).toBeGreaterThan(0)
    })
  })

  describe('Content Quality', () => {
    it('hero has proper hierarchy', () => {
      const wrapper = mountComponent()

      const h1 = wrapper.find('h1')
      expect(h1.exists()).toBe(true)
      expect(h1.text()).toContain('Platform Engineering')
    })

    it('descriptions are informative', () => {
      const wrapper = mountComponent()

      const descriptions = wrapper.findAll('.text-text-secondary')
      expect(descriptions.length).toBeGreaterThan(10)
    })
  })
})
