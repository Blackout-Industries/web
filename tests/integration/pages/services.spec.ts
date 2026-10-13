import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import ServicesPage from '../../../pages/services/index.vue'
import PageHero from '../../../components/PageHero.vue'
import PageSection from '../../../components/PageSection.vue'
import FeatureCard from '../../../components/FeatureCard.vue'

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
  props: ['icon', 'title', 'description', 'link', 'features', 'comingSoon'],
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
      components: { NuxtLink, Icon, ServiceCard, PageHero, PageSection, FeatureCard },
      stubs: {
        NuxtLink,
        Icon,
        ServiceCard
      }
    }
  })
}

const findSectionByHeading = (wrapper: ReturnType<typeof mountComponent>, heading: string) => {
  return wrapper.findAll('section').find(section => {
    const h2 = section.find('h2')
    return h2.exists() && h2.text().includes(heading)
  })
}

describe('Services Page (services/index.vue)', () => {
  describe('Hero Section', () => {
    it('renders a single h1 with the title and highlight', () => {
      const wrapper = mountComponent()

      const h1s = wrapper.findAll('h1')
      expect(h1s.length).toBe(1)
      expect(h1s[0].text()).toContain('Services Built for')
      expect(h1s[0].text()).toContain('Modern Teams')
    })

    it('renders the descriptive subtitle', () => {
      const wrapper = mountComponent()

      const hero = wrapper.findComponent(PageHero)
      expect(hero.find('p').text()).toBe(
        'From cloud infrastructure to smart homes, our own games to precision 3D printing - we deliver expertise at scale.'
      )
    })
  })

  describe('Services Grid', () => {
    it('renders five service cards in order', () => {
      const wrapper = mountComponent()

      const cards = wrapper.findAllComponents(ServiceCard)
      expect(cards.length).toBe(5)
      expect(cards.map(card => card.props('title'))).toEqual([
        'Developer Platform',
        'DevOps & Platform Engineering',
        '3D Printing Services',
        'IoT & Home Automation',
        'Game Development'
      ])
    })

    it('renders the Developer Platform SaaS card first', () => {
      const wrapper = mountComponent()

      const platform = wrapper.findAllComponents(ServiceCard)[0]
      expect(platform.props('title')).toBe('Developer Platform')
      expect(platform.props('icon')).toBe('heroicons:building-office-2')
      expect(platform.props('link')).toBe('/services/developer-platform')
      expect(platform.props('comingSoon')).toBeFalsy()
      expect(platform.props('description')).toMatch(/^SaaS product\. /)
      expect(platform.props('description')).toBe(
        'SaaS product. Internal developer platform as a service. Backstage in front, Crossplane underneath, GitOps in between; we operate it, you own the resources.'
      )
      expect(platform.props('features')).toEqual([
        'Software catalog with ownership and docs',
        'Golden-path templates for new services',
        'Self-service databases, clusters and queues',
        'Argo CD and Kargo promotion pipelines',
        'Kyverno guardrails and signed images',
        'Azure AKS and Oracle OKE from one control plane'
      ])
    })

    it('renders the DevOps card with its features', () => {
      const wrapper = mountComponent()

      const devops = wrapper.findAllComponents(ServiceCard)[1]
      expect(devops.props('link')).toBe('/services/devops-consulting')
      expect(devops.props('comingSoon')).toBeFalsy()
      expect(devops.props('features')).toHaveLength(6)
      expect(devops.props('features')).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Cloud infrastructure'),
          expect.stringContaining('Kubernetes'),
          expect.stringContaining('CI/CD pipeline'),
          'Infrastructure as Code (Terraform CDK, Crossplane)'
        ])
      )
    })

    it('renders the 3D printing card with its features', () => {
      const wrapper = mountComponent()

      const printing = wrapper.findAllComponents(ServiceCard)[2]
      expect(printing.props('link')).toBe('/services/3d-printing')
      expect(printing.props('comingSoon')).toBeFalsy()
      expect(printing.props('features')).toHaveLength(6)
      expect(printing.props('features')).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Rapid prototyping'),
          expect.stringContaining('CAD model optimization'),
          expect.stringContaining('Multi-material')
        ])
      )
    })

    it('keeps the IoT card marked as coming soon', () => {
      const wrapper = mountComponent()

      const iot = wrapper.findAllComponents(ServiceCard)[3]
      expect(iot.props('link')).toBe('/services/iot-home-automation')
      expect(iot.props('comingSoon')).toBe(true)
    })

    it('renders the game development card unlocked with handheld content', () => {
      const wrapper = mountComponent()

      const game = wrapper.findAllComponents(ServiceCard)[4]
      expect(game.props('title')).toBe('Game Development')
      expect(game.props('link')).toBe('/services/game-development')
      expect(game.props('comingSoon')).toBeFalsy()
      expect(game.props('description')).toBe(
        'Our own Windows and Linux games, designed for handheld PCs and Nintendo Switch. Performance, battery and input are tuned on the device, not on a spec sheet.'
      )
      expect(game.props('features')).toEqual([
        'Handheld-first design for Steam Deck, ROG Ally and Legion Go',
        'Windows and Linux builds, native or Proton',
        'Built to Deck Verified criteria',
        'Nintendo Switch within platform budgets',
        'Frame pacing, battery and thermal budgets',
        'CI pipelines for every build'
      ])
    })

    it('presents game development as own games, not a client service', () => {
      const wrapper = mountComponent()

      const game = wrapper.findAllComponents(ServiceCard)[4]
      const copy = [game.props('description'), ...game.props('features')].join(' ')
      expect(copy).not.toMatch(/readiness|client|engagement/i)
    })

    it('service cards link to all five detail pages', () => {
      const wrapper = mountComponent()

      for (const href of [
        '/services/developer-platform',
        '/services/devops-consulting',
        '/services/3d-printing',
        '/services/iot-home-automation',
        '/services/game-development'
      ]) {
        expect(wrapper.find(`a[href="${href}"]`).exists()).toBe(true)
      }
    })
  })

  describe('Process Section', () => {
    it('renders the process heading and subtitle', () => {
      const wrapper = mountComponent()

      const section = findSectionByHeading(wrapper, 'How We')
      expect(section).toBeTruthy()
      expect(section!.find('h2').text()).toContain('Work')
      expect(section!.text()).toContain('Our proven process ensures smooth delivery from discovery to ongoing support.')
    })

    it('renders four process steps in order', () => {
      const wrapper = mountComponent()

      const section = findSectionByHeading(wrapper, 'How We')
      expect(section!.findAll('h3').map(step => step.text())).toEqual([
        'Discover',
        'Design',
        'Deliver',
        'Support'
      ])
    })

    it('process steps have their descriptions', () => {
      const wrapper = mountComponent()

      const section = findSectionByHeading(wrapper, 'How We')
      expect(section!.text()).toContain('Understand your needs, challenges, and goals.')
      expect(section!.text()).toContain('Architect the solution with best practices.')
      expect(section!.text()).toContain('Implement with precision and attention to detail.')
      expect(section!.text()).toContain('Maintain and optimize for continuous improvement.')
    })

    it('process steps are numbered 1 to 4', () => {
      const wrapper = mountComponent()

      const section = findSectionByHeading(wrapper, 'How We')
      const chips = section!.findAll('.icon-tile')
      expect(chips.map(chip => chip.text())).toEqual(['1', '2', '3', '4'])
    })
  })

  describe('CTA Section', () => {
    it('renders the CTA heading and copy', () => {
      const wrapper = mountComponent()

      const section = findSectionByHeading(wrapper, "Let's Discuss Your Project")
      expect(section).toBeTruthy()
      expect(section!.text()).toContain('Schedule a consultation to explore how we can help you succeed.')
    })

    it('renders the Get in Touch button linking to contact', () => {
      const wrapper = mountComponent()

      const section = findSectionByHeading(wrapper, "Let's Discuss Your Project")
      const button = section!.find('a[href="/contact"]')
      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('Get in Touch')
    })
  })

  describe('Page Structure', () => {
    it('renders hero, services, process and CTA sections', () => {
      const wrapper = mountComponent()

      expect(wrapper.findAll('section').length).toBe(4)
      expect(wrapper.findAllComponents(PageSection).length).toBe(3)
    })

    it('uses a heading hierarchy', () => {
      const wrapper = mountComponent()

      expect(wrapper.findAll('h2').length).toBe(2)
      expect(wrapper.findAll('h3').length).toBe(9)
    })
  })

  describe('Content Rules', () => {
    it('renders ASCII-only text', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).not.toMatch(/[^\x00-\x7F]/)
    })

    it('never uses the word AI', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).not.toMatch(/\bAI\b/)
    })
  })
})
