import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import PrintingPage from '../../../pages/services/3d-printing.vue'

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
  return mount(PrintingPage, {
    global: {
      components: { Icon, NuxtLink },
      stubs: { Icon, NuxtLink },
      mocks: {
        useHead: () => {}
      }
    }
  })
}

describe('3D Printing Page (services/3d-printing.vue)', () => {
  describe('Hero Section', () => {
    it('renders page heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Precision 3D Printing for')
      expect(wrapper.text()).toContain('Prototypes & Production')
    })

    it('renders service badge', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('3D Printing Services')
    })

    it('renders subheading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('From concept to physical product')
    })

    it('badge has icon and styling', () => {
      const wrapper = mountComponent()

      const badge = wrapper.find('.bg-secondary\\/20.border-secondary\\/50')
      expect(badge.exists()).toBe(true)
    })
  })

  describe('Service Details Section', () => {
    it('renders section heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('What We')
      expect(wrapper.text()).toContain('Offer')
    })

    it('renders rapid prototyping service', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Rapid Prototyping')
      expect(wrapper.text()).toContain('concept validation')
      expect(wrapper.text()).toContain('prototypes in days')
    })

    it('renders custom manufacturing service', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Custom Manufacturing')
      expect(wrapper.text()).toContain('batch production')
    })

    it('lists rapid prototyping features', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Functional prototypes for testing')
      expect(wrapper.text()).toContain('Iterative design refinement')
      expect(wrapper.text()).toContain('2-5 business days')
    })

    it('lists manufacturing materials', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('PLA, PETG, ABS, TPU, Nylon, Resin')
      expect(wrapper.text()).toContain('Batch sizes from 1 to 1000+')
    })

    it('service cards have checkmark icons', () => {
      const wrapper = mountComponent()

      const checkIcons = wrapper.findAllComponents(Icon).filter(icon =>
        icon.props('name') === 'heroicons:check-circle'
      )

      expect(checkIcons.length).toBeGreaterThan(10)
    })
  })

  describe('Technologies and Materials', () => {
    it('displays material information', () => {
      const wrapper = mountComponent()

      const materialTypes = ['PLA', 'PETG', 'ABS', 'TPU', 'Nylon', 'Resin']
      materialTypes.forEach(material => {
        expect(wrapper.text()).toContain(material)
      })
    })

    it('has service icons', () => {
      const wrapper = mountComponent()

      const icons = wrapper.findAllComponents(Icon)
      const serviceIcons = icons.filter(icon => {
        const name = icon.props('name')
        return name === 'heroicons:bolt' || name === 'lucide:box'
      })

      expect(serviceIcons.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Page Structure', () => {
    it('has multiple sections', () => {
      const wrapper = mountComponent()

      const sections = wrapper.findAll('section')
      expect(sections.length).toBeGreaterThanOrEqual(3)
    })

    it('uses semantic HTML structure', () => {
      const wrapper = mountComponent()

      const h1 = wrapper.find('h1')
      expect(h1.exists()).toBe(true)

      const h2s = wrapper.findAll('h2')
      expect(h2s.length).toBeGreaterThanOrEqual(1)

      const h3s = wrapper.findAll('h3')
      expect(h3s.length).toBeGreaterThanOrEqual(2)
    })

    it('sections have alternating backgrounds', () => {
      const wrapper = mountComponent()

      const darkSections = wrapper.findAll('.bg-dark-100')
      expect(darkSections.length).toBeGreaterThan(0)
    })

    it('uses card components for content', () => {
      const wrapper = mountComponent()

      const cards = wrapper.findAll('.card')
      expect(cards.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Content Quality', () => {
    it('service descriptions are detailed', () => {
      const wrapper = mountComponent()

      const descriptions = wrapper.findAll('.text-text-secondary')
      expect(descriptions.length).toBeGreaterThan(5)

      descriptions.forEach(desc => {
        expect(desc.text().length).toBeGreaterThan(20)
      })
    })

    it('has clear value propositions', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('fast, accurate, reliable')
      expect(wrapper.text()).toContain('Quick turnaround')
    })
  })

  describe('Call to Action', () => {
    it('includes contact links', () => {
      const wrapper = mountComponent()

      const contactLinks = wrapper.findAll('a[href="/contact"]')
      expect(contactLinks.length).toBeGreaterThan(0)
    })
  })
})
