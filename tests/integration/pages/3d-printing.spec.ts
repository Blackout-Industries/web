import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import PrintingPage from '../../../pages/services/3d-printing.vue'
import PageHero from '../../../components/PageHero.vue'
import PageSection from '../../../components/PageSection.vue'
import FeatureCard from '../../../components/FeatureCard.vue'

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
      components: { Icon, NuxtLink, PageHero, PageSection, FeatureCard },
      stubs: { Icon, NuxtLink },
      mocks: {
        useHead: () => {}
      }
    }
  })
}

const findSection = (wrapper: ReturnType<typeof mountComponent>, highlight: string) =>
  wrapper.findAllComponents(PageSection).find(section => section.props('highlight') === highlight)

describe('3D Printing Page (services/3d-printing.vue)', () => {
  describe('Hero Section', () => {
    it('renders page heading', () => {
      const wrapper = mountComponent()

      const h1 = wrapper.find('h1')
      expect(h1.text()).toContain('Precision 3D Printing for')
      expect(h1.text()).toContain('Prototypes & Production')
    })

    it('renders service badge', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('3D Printing Services')
    })

    it('renders subheading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('From concept to physical product')
    })

    it('renders the hero through PageHero with its eyebrow', () => {
      const wrapper = mountComponent()

      const hero = wrapper.findComponent(PageHero)
      expect(hero.exists()).toBe(true)
      expect(hero.props('eyebrow')).toBe('3D Printing Services')
      expect(hero.props('highlight')).toBe('Prototypes & Production')
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

    it('renders three offers with three checklist items each', () => {
      const wrapper = mountComponent()

      const offers = findSection(wrapper, 'Offer')!.findAllComponents(FeatureCard)
      expect(offers.map(card => card.props('title'))).toEqual([
        'Rapid Prototyping',
        'Custom Manufacturing',
        'Design Optimization'
      ])
      offers.forEach(card => {
        expect(card.findAll('li').length).toBe(3)
      })

      const checkIcons = wrapper.findAllComponents(Icon).filter(icon =>
        icon.props('name') === 'heroicons:check-circle'
      )
      expect(checkIcons.length).toBe(9)
    })

    it('marks custom manufacturing as coming soon in ASCII', () => {
      const wrapper = mountComponent()

      const manufacturing = wrapper.findAllComponents(FeatureCard)
        .find(card => card.props('title') === 'Custom Manufacturing')
      expect(manufacturing!.props('badge')).toBe('Coming soon')
      expect(manufacturing!.text()).toContain('Coming soon')
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

    it('renders the three printing technologies', () => {
      const wrapper = mountComponent()

      const technologies = findSection(wrapper, 'Technology')!.findAllComponents(FeatureCard)
      expect(technologies.map(card => card.props('title'))).toEqual([
        'FDM Printing',
        'Resin Printing',
        'Multi-Material'
      ])
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

  describe('Use Cases', () => {
    it('renders the four use cases', () => {
      const wrapper = mountComponent()

      const useCases = findSection(wrapper, 'Use Cases')!.findAllComponents(FeatureCard)
      expect(useCases.map(card => card.props('title'))).toEqual([
        'Engineering Prototypes',
        'Custom Enclosures',
        'Replacement Parts',
        'Art & Design Projects'
      ])
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

      const altFlags = wrapper.findAllComponents(PageSection).map(section => section.props('alt'))
      expect(altFlags).toEqual([true, false, true, false])
    })

    it('uses FeatureCards for content', () => {
      const wrapper = mountComponent()

      expect(wrapper.findAllComponents(FeatureCard).length).toBe(10)
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

    it('renders ASCII-only text', () => {
      const wrapper = mountComponent()

      expect(/[^\x00-\x7F]/.test(wrapper.text())).toBe(false)
    })
  })

  describe('Call to Action', () => {
    it('includes contact links', () => {
      const wrapper = mountComponent()

      const contactLinks = wrapper.findAll('a[href="/contact"]')
      expect(contactLinks.length).toBeGreaterThan(0)
    })

    it('CTA asks for a quote', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Request a Quote')
      const cta = wrapper.findAll('a[href="/contact"]').find(link => link.text() === 'Get Started')
      expect(cta).toBeDefined()
    })
  })
})
