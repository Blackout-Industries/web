import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import ServicesPage from '../../../pages/services/index.vue'

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

const ServiceCard = defineComponent({
  props: ['icon', 'title', 'description', 'link', 'features', 'variant'],
  setup(props) {
    return () => h('div', { class: 'service-card' }, [
      h('h3', props.title),
      h('p', props.description),
      h('a', { href: props.link }, 'Learn More')
    ])
  }
})

const mountComponent = () => {
  return mount(ServicesPage, {
    global: {
      components: { NuxtLink, Icon, ServiceCard },
      stubs: {
        NuxtLink,
        Icon,
        ServiceCard
      },
      mocks: {
        useHead: () => {}
      }
    }
  })
}

describe('Services Page (services/index.vue)', () => {
  describe('Hero Section', () => {
    it('renders page heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Services Built for')
      expect(wrapper.text()).toContain('Modern Teams')
    })

    it('renders descriptive subheading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('From Kubernetes to CAD models')
      expect(wrapper.text()).toContain('precision at scale')
    })

    it('hero has animated background', () => {
      const wrapper = mountComponent()

      const animatedBg = wrapper.find('.animated-gradient')
      expect(animatedBg.exists()).toBe(true)
    })
  })

  describe('Services Grid', () => {
    it('renders two main service cards', () => {
      const wrapper = mountComponent()

      const serviceCards = wrapper.findAllComponents(ServiceCard)
      expect(serviceCards.length).toBe(2)
    })

    it('renders DevOps service card with features', () => {
      const wrapper = mountComponent()

      const devopsCard = wrapper.findAllComponents(ServiceCard)[0]
      expect(devopsCard.props('title')).toBe('DevOps & Platform Engineering')
      expect(devopsCard.props('link')).toBe('/services/devops-consulting')
      expect(devopsCard.props('variant')).toBe('accent')
      expect(devopsCard.props('features')).toHaveLength(6)
      expect(devopsCard.props('features')).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Cloud infrastructure'),
          expect.stringContaining('Kubernetes'),
          expect.stringContaining('CI/CD pipeline')
        ])
      )
    })

    it('renders 3D printing service card with features', () => {
      const wrapper = mountComponent()

      const printingCard = wrapper.findAllComponents(ServiceCard)[1]
      expect(printingCard.props('title')).toBe('3D Printing Services')
      expect(printingCard.props('link')).toBe('/services/3d-printing')
      expect(printingCard.props('variant')).toBe('secondary')
      expect(printingCard.props('features')).toHaveLength(6)
      expect(printingCard.props('features')).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Rapid prototyping'),
          expect.stringContaining('CAD model optimization'),
          expect.stringContaining('Multi-material')
        ])
      )
    })

    it('service cards link to detail pages', () => {
      const wrapper = mountComponent()

      const devopsLink = wrapper.find('a[href="/services/devops-consulting"]')
      expect(devopsLink.exists()).toBe(true)

      const printingLink = wrapper.find('a[href="/services/3d-printing"]')
      expect(printingLink.exists()).toBe(true)
    })
  })

  describe('Process Section', () => {
    it('renders process heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('How We')
      expect(wrapper.text()).toContain('Work')
    })

    it('renders four process steps', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Discover')
      expect(wrapper.text()).toContain('Design')
      expect(wrapper.text()).toContain('Deliver')
      expect(wrapper.text()).toContain('Support')
    })

    it('process steps have descriptions', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Understand your needs, challenges, and goals')
      expect(wrapper.text()).toContain('Architect the solution')
      expect(wrapper.text()).toContain('Implement with precision')
      expect(wrapper.text()).toContain('Maintain and optimize')
    })

    it('process steps are numbered', () => {
      const wrapper = mountComponent()

      const numberBadges = wrapper.findAll('.text-2xl.font-bold.text-white')
      expect(numberBadges.length).toBe(4)

      const numbers = numberBadges.map(badge => badge.text())
      expect(numbers).toEqual(['1', '2', '3', '4'])
    })

    it('process steps have gradient backgrounds', () => {
      const wrapper = mountComponent()

      const gradients = wrapper.findAll('.bg-gradient-to-br')
      expect(gradients.length).toBeGreaterThanOrEqual(4)
    })

    it('process steps are in responsive grid', () => {
      const wrapper = mountComponent()

      const processGrid = wrapper.find('.grid.grid-cols-1.md\\:grid-cols-4')
      expect(processGrid.exists()).toBe(true)
    })
  })

  describe('CTA Section', () => {
    it('renders final CTA heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain("Let's Discuss Your Project")
    })

    it('renders CTA description', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Schedule a consultation')
    })

    it('renders contact button', () => {
      const wrapper = mountComponent()

      const ctaButton = wrapper.find('a[href="/contact"]')
      expect(ctaButton.exists()).toBe(true)
      expect(ctaButton.text()).toContain('Get in Touch')
    })

    it('CTA has glass card styling', () => {
      const wrapper = mountComponent()

      const glassCard = wrapper.find('.card.glass')
      expect(glassCard.exists()).toBe(true)
    })
  })

  describe('Page Structure', () => {
    it('has four main sections', () => {
      const wrapper = mountComponent()

      const sections = wrapper.findAll('section')
      expect(sections.length).toBe(4)
    })

    it('sections alternate background colors', () => {
      const wrapper = mountComponent()

      const darkSections = wrapper.findAll('.bg-dark-100')
      expect(darkSections.length).toBeGreaterThanOrEqual(2)
    })

    it('uses semantic HTML structure', () => {
      const wrapper = mountComponent()

      const headings = wrapper.findAll('h1, h2, h3')
      expect(headings.length).toBeGreaterThanOrEqual(7)
    })
  })

  describe('Responsive Design', () => {
    it('services grid is responsive', () => {
      const wrapper = mountComponent()

      const grid = wrapper.find('.grid.grid-cols-1.md\\:grid-cols-2')
      expect(grid.exists()).toBe(true)
    })

    it('hero text scales responsively', () => {
      const wrapper = mountComponent()

      const heading = wrapper.find('.text-4xl.md\\:text-6xl')
      expect(heading.exists()).toBe(true)
    })
  })
})
