import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import IndexPage from '../../../pages/index.vue'

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

const TechStack = defineComponent({
  setup() {
    return () => h('div', { class: 'tech-stack' }, 'TechStack Component')
  }
})

const mountComponent = () => {
  return mount(IndexPage, {
    global: {
      components: { NuxtLink, Icon, ServiceCard, TechStack },
      stubs: {
        NuxtLink,
        Icon,
        ServiceCard,
        TechStack
      },
      mocks: {
        useHead: () => {}
      }
    }
  })
}

describe('Home Page (index.vue)', () => {
  describe('Hero Section', () => {
    it('renders main hero heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Engineering Infrastructure')
      expect(wrapper.text()).toContain('That Scales')
    })

    it('renders hero subheading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('DevOps consulting')
      expect(wrapper.text()).toContain('platform engineering')
      expect(wrapper.text()).toContain('precision 3D printing')
    })

    it('hero section has minimum height', () => {
      const wrapper = mountComponent()

      const heroSection = wrapper.find('.min-h-\\[80vh\\]')
      expect(heroSection.exists()).toBe(true)
    })

    it('renders CTA buttons in hero', () => {
      const wrapper = mountComponent()

      const exploreButton = wrapper.find('a[href="#services"]')
      expect(exploreButton.exists()).toBe(true)
      expect(exploreButton.text()).toContain('Explore Services')

      const contactButton = wrapper.find('a[href="/contact"]')
      expect(contactButton.exists()).toBe(true)
      expect(contactButton.text()).toContain('Get in Touch')
    })

    it('renders scroll indicator', () => {
      const wrapper = mountComponent()

      const scrollIndicator = wrapper.find('.animate-bounce')
      expect(scrollIndicator.exists()).toBe(true)
    })
  })

  describe('Services Preview Section', () => {
    it('renders services section heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Our')
      expect(wrapper.text()).toContain('Services')
    })

    it('services section has id for anchor navigation', () => {
      const wrapper = mountComponent()

      const servicesSection = wrapper.find('#services')
      expect(servicesSection.exists()).toBe(true)
    })

    it('renders two service cards', () => {
      const wrapper = mountComponent()

      const serviceCards = wrapper.findAllComponents(ServiceCard)
      expect(serviceCards.length).toBe(2)
    })

    it('renders DevOps consulting service card', () => {
      const wrapper = mountComponent()

      const devopsCard = wrapper.findAllComponents(ServiceCard)[0]
      expect(devopsCard.props('title')).toBe('DevOps Consulting')
      expect(devopsCard.props('link')).toBe('/services/devops-consulting')
      expect(devopsCard.props('variant')).toBe('accent')
      expect(devopsCard.props('features')).toHaveLength(4)
    })

    it('renders 3D printing service card', () => {
      const wrapper = mountComponent()

      const printingCard = wrapper.findAllComponents(ServiceCard)[1]
      expect(printingCard.props('title')).toBe('3D Printing Services')
      expect(printingCard.props('link')).toBe('/services/3d-printing')
      expect(printingCard.props('variant')).toBe('secondary')
      expect(printingCard.props('features')).toHaveLength(4)
    })

    it('service cards are in responsive grid', () => {
      const wrapper = mountComponent()

      const grid = wrapper.find('.grid.grid-cols-1.md\\:grid-cols-2')
      expect(grid.exists()).toBe(true)
    })
  })

  describe('TechStack Component Integration', () => {
    it('renders TechStack component', () => {
      const wrapper = mountComponent()

      const techStack = wrapper.findComponent(TechStack)
      expect(techStack.exists()).toBe(true)
    })
  })

  describe('Why Blackout Industries Section', () => {
    it('renders section heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Why')
      expect(wrapper.text()).toContain('Blackout Industries')
    })

    it('renders three value proposition cards', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Technical Excellence')
      expect(wrapper.text()).toContain('Rapid Execution')
      expect(wrapper.text()).toContain('End-to-End Support')
    })

    it('value cards have descriptive content', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Deep expertise in cloud-native')
      expect(wrapper.text()).toContain('Deliver MVPs in weeks')
      expect(wrapper.text()).toContain('From strategy to implementation')
    })

    it('value cards have icons', () => {
      const wrapper = mountComponent()

      const icons = wrapper.findAllComponents(Icon)
      const valueIcons = icons.filter(icon => {
        const name = icon.props('name')
        return name === 'heroicons:sparkles' ||
               name === 'heroicons:rocket-launch' ||
               name === 'heroicons:hand-raised'
      })

      expect(valueIcons.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('CTA Section', () => {
    it('renders final CTA heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Ready to Transform Your Infrastructure')
    })

    it('renders consultation CTA button', () => {
      const wrapper = mountComponent()

      const ctaButton = wrapper.findAll('a[href="/contact"]')
      const consultationButton = ctaButton.find(btn =>
        btn.text().includes('Schedule a Consultation')
      )

      expect(consultationButton).toBeTruthy()
    })

    it('CTA section has glass card styling', () => {
      const wrapper = mountComponent()

      const glassCards = wrapper.findAll('.card.glass')
      expect(glassCards.length).toBeGreaterThan(0)
    })
  })

  describe('Page Structure', () => {
    it('has multiple sections', () => {
      const wrapper = mountComponent()

      const sections = wrapper.findAll('section')
      expect(sections.length).toBeGreaterThanOrEqual(5)
    })

    it('sections alternate background colors', () => {
      const wrapper = mountComponent()

      const darkSections = wrapper.findAll('.bg-dark-100')
      expect(darkSections.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Design', () => {
    it('uses container-custom for consistent width', () => {
      const wrapper = mountComponent()

      const containers = wrapper.findAll('.container-custom')
      expect(containers.length).toBeGreaterThan(0)
    })

    it('hero text scales responsively', () => {
      const wrapper = mountComponent()

      const heroHeading = wrapper.find('.text-4xl.md\\:text-6xl.lg\\:text-7xl')
      expect(heroHeading.exists()).toBe(true)
    })

    it('CTA buttons stack on mobile', () => {
      const wrapper = mountComponent()

      const buttonContainer = wrapper.find('.flex-col.sm\\:flex-row')
      expect(buttonContainer.exists()).toBe(true)
    })
  })

  describe('SEO and Metadata', () => {
    it('page has semantic structure', () => {
      const wrapper = mountComponent()

      const headings = wrapper.findAll('h1, h2, h3')
      expect(headings.length).toBeGreaterThan(5)
    })

    it('uses text-balance for better readability', () => {
      const wrapper = mountComponent()

      const balancedText = wrapper.findAll('.text-balance')
      expect(balancedText.length).toBeGreaterThan(0)
    })
  })
})
