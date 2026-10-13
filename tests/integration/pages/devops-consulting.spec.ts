import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import DevOpsPage from '../../../pages/services/devops-consulting.vue'
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
  return mount(DevOpsPage, {
    global: {
      components: { Icon, NuxtLink, PageHero, PageSection, FeatureCard },
      stubs: { Icon, NuxtLink },
      mocks: {
        useHead: () => {}
      }
    }
  })
}

const findSection = (wrapper: ReturnType<typeof mountComponent>, title: string) =>
  wrapper.findAllComponents(PageSection).find(section => section.props('title') === title)

const painPointTitles = [
  'Slow Deployment Cycles',
  'Cloud Cost Overruns',
  'Lack of Observability',
  'Manual, Error-Prone Processes'
]

const expertiseTitles = [
  'Cloud Infrastructure Design',
  'Kubernetes & Containerization',
  'CI/CD Pipelines',
  'Monitoring & Observability',
  'Security & Compliance',
  'Networking & Service Mesh'
]

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

    it('renders the hero through PageHero with its eyebrow', () => {
      const wrapper = mountComponent()

      const hero = wrapper.findComponent(PageHero)
      expect(hero.exists()).toBe(true)
      expect(hero.props('eyebrow')).toBe('DevOps & Platform Engineering')
      expect(hero.props('highlight')).toBe('That Powers Growth')
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

      painPointTitles.forEach(title => {
        expect(wrapper.text()).toContain(title)
      })
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

    it('renders the pain points as four FeatureCards', () => {
      const wrapper = mountComponent()

      const section = findSection(wrapper, 'Challenges We')
      expect(section).toBeDefined()

      const cards = section!.findAllComponents(FeatureCard)
      expect(cards.map(card => card.props('title'))).toEqual(painPointTitles)
    })
  })

  describe('Services and Expertise', () => {
    it('renders expertise heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Our')
      expect(wrapper.text()).toContain('Expertise')
    })

    it('renders ten FeatureCards across pain points and expertise', () => {
      const wrapper = mountComponent()

      expect(wrapper.findAllComponents(FeatureCard).length).toBe(10)
    })

    it('renders the six expertise areas as card headings', () => {
      const wrapper = mountComponent()

      const section = findSection(wrapper, 'Our')
      expect(section).toBeDefined()

      const headings = section!.findAll('h3').map(heading => heading.text())
      expect(headings).toEqual(expertiseTitles)
    })

    it('every expertise card carries a description and technology tags', () => {
      const wrapper = mountComponent()

      const cards = findSection(wrapper, 'Our')!.findAllComponents(FeatureCard)
      expect(cards.length).toBe(6)
      cards.forEach(card => {
        expect(card.props('description').length).toBeGreaterThan(20)
        expect(card.props('tags').length).toBeGreaterThanOrEqual(5)
      })
    })
  })

  describe('Technologies Section', () => {
    it('renders one tag per technology', () => {
      const wrapper = mountComponent()

      expect(wrapper.findAll('.tag').length).toBe(31)
    })

    it('displays the key technologies', () => {
      const wrapper = mountComponent()

      const tags = wrapper.findAll('.tag').map(tag => tag.text())
      ;['Terraform CDK', 'Kubernetes', 'ArgoCD', 'GitHub Actions', 'OpenTelemetry', 'Vault', 'Linkerd'].forEach(tech => {
        expect(tags).toContain(tech)
      })
    })
  })

  describe('CTA Section', () => {
    it('renders final CTA', () => {
      const wrapper = mountComponent()

      const links = wrapper.findAll('a[href="/contact"]')
      expect(links.length).toBeGreaterThan(0)
    })

    it('CTA has heading, copy and a Get Started link to contact', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain("Let's Discuss Your Infrastructure Needs")
      expect(wrapper.text()).toContain('Schedule a consultation to explore how we can optimize your DevOps workflows.')

      const cta = wrapper.findAll('a[href="/contact"]').find(link => link.text() === 'Get Started')
      expect(cta).toBeDefined()
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
      expect(wrapper.findAll('h1').length).toBe(1)
    })

    it('sections alternate backgrounds', () => {
      const wrapper = mountComponent()

      const altFlags = wrapper.findAllComponents(PageSection).map(section => section.props('alt'))
      expect(altFlags).toEqual([true, false, true])
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

      const cards = wrapper.findAllComponents(FeatureCard)
      cards.forEach(card => {
        expect(card.props('description').length).toBeGreaterThan(20)
      })
    })

    it('renders ASCII-only text', () => {
      const wrapper = mountComponent()

      expect(/[^\x00-\x7F]/.test(wrapper.text())).toBe(false)
    })
  })
})
