import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import IndexPage from '../../../pages/index.vue'
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

const TechStack = defineComponent({
  setup() {
    return () => h('div', { class: 'tech-stack' }, 'TechStack Component')
  }
})

const mountComponent = () => {
  return mount(IndexPage, {
    global: {
      components: { NuxtLink, Icon, ServiceCard, TechStack, PageHero, PageSection, FeatureCard },
      stubs: {
        NuxtLink,
        Icon,
        ServiceCard,
        TechStack
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

describe('Home Page (index.vue)', () => {
  describe('Hero Section', () => {
    it('renders a single h1 with the title and highlight', () => {
      const wrapper = mountComponent()

      const h1s = wrapper.findAll('h1')
      expect(h1s.length).toBe(1)
      expect(h1s[0].text()).toContain('Engineering Infrastructure')
      expect(h1s[0].text()).toContain('That Scales')
    })

    it('renders the hero subtitle', () => {
      const wrapper = mountComponent()

      const hero = wrapper.findComponent(PageHero)
      expect(hero.find('p').text()).toBe(
        "K8s clusters that don't crash at 3am. Infrastructure as actual code. Games built for handhelds. Hardware that works."
      )
    })

    it('renders the Explore Services and Get in Touch actions', () => {
      const wrapper = mountComponent()

      const hero = wrapper.findComponent(PageHero)
      const explore = hero.find('a[href="#services"]')
      expect(explore.exists()).toBe(true)
      expect(explore.text()).toBe('Explore Services')

      const contact = hero.find('a[href="/contact"]')
      expect(contact.exists()).toBe(true)
      expect(contact.text()).toBe('Get in Touch')
    })
  })

  describe('Services Section', () => {
    it('has the services anchor target for the hero link', () => {
      const wrapper = mountComponent()

      expect(wrapper.find('section#services').exists()).toBe(true)
    })

    it('renders the section heading and subtitle', () => {
      const wrapper = mountComponent()

      const section = wrapper.find('section#services')
      expect(section.find('h2').text()).toContain('What We')
      expect(section.find('h2').text()).toContain('Actually Do')
      expect(section.text()).toContain('No fluff. No buzzwords. Just infrastructure that survives production.')
    })

    it('renders five service cards in order', () => {
      const wrapper = mountComponent()

      const cards = wrapper.findAllComponents(ServiceCard)
      expect(cards.length).toBe(5)
      expect(cards.map(card => card.props('title'))).toEqual([
        'Developer Platform',
        'DevOps Consulting',
        '3D Printing',
        'IoT & Home Automation',
        'Game Development'
      ])
    })

    it('links every service card to its detail page', () => {
      const wrapper = mountComponent()

      const links = wrapper.findAllComponents(ServiceCard).map(card => card.props('link'))
      expect(links).toEqual([
        '/services/developer-platform',
        '/services/devops-consulting',
        '/services/3d-printing',
        '/services/iot-home-automation',
        '/services/game-development'
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
        'SaaS product. Our hosted internal developer platform on Crossplane and Backstage. Catalog, golden paths and self-service infrastructure on Azure and Oracle Cloud, run by us.'
      )
      expect(platform.props('features')).toEqual([
        'Backstage catalog and golden-path templates',
        'Crossplane self-service infrastructure',
        'GitOps delivery with Argo CD and Kargo',
        'Runs in your Azure or Oracle Cloud subscription'
      ])
    })

    it('renders the DevOps card with four features', () => {
      const wrapper = mountComponent()

      const devops = wrapper.findAllComponents(ServiceCard)[1]
      expect(devops.props('features')).toHaveLength(4)
      expect(devops.props('comingSoon')).toBeFalsy()
    })

    it('renders the 3D printing card with four features', () => {
      const wrapper = mountComponent()

      const printing = wrapper.findAllComponents(ServiceCard)[2]
      expect(printing.props('features')).toHaveLength(4)
      expect(printing.props('comingSoon')).toBeFalsy()
    })

    it('keeps the IoT card marked as coming soon', () => {
      const wrapper = mountComponent()

      const iot = wrapper.findAllComponents(ServiceCard)[3]
      expect(iot.props('title')).toBe('IoT & Home Automation')
      expect(iot.props('comingSoon')).toBe(true)
    })

    it('renders the game development card unlocked with handheld content', () => {
      const wrapper = mountComponent()

      const game = wrapper.findAllComponents(ServiceCard)[4]
      expect(game.props('title')).toBe('Game Development')
      expect(game.props('link')).toBe('/services/game-development')
      expect(game.props('comingSoon')).toBeFalsy()
      expect(game.props('description')).toBe(
        'We develop Windows and Linux games built for Steam Deck, ROG Ally, Legion Go and Nintendo Switch. Frame rate and battery budgets are set on the device from day one.'
      )
      expect(game.props('features')).toEqual([
        'Handheld-first design for Steam Deck, ROG Ally and Legion Go',
        'Native Linux and Proton builds',
        'Built to Deck Verified criteria',
        'Nintendo Switch within platform budgets'
      ])
    })

    it('presents game development as own games, not a client service', () => {
      const wrapper = mountComponent()

      const game = wrapper.findAllComponents(ServiceCard)[4]
      const copy = [game.props('description'), ...game.props('features')].join(' ')
      expect(copy).not.toMatch(/readiness|client|engagement/i)
    })

    it('marks only one service card as coming soon', () => {
      const wrapper = mountComponent()

      const comingSoon = wrapper.findAllComponents(ServiceCard).filter(card => card.props('comingSoon'))
      expect(comingSoon.length).toBe(1)
    })
  })

  describe('Defense and Classified Block', () => {
    it('renders the block heading, badge and areas', () => {
      const wrapper = mountComponent()

      const section = wrapper.find('section#services')
      expect(section.text()).toContain('Defense & Classified Systems')
      expect(section.text()).toContain('Restricted')
      expect(section.text()).toContain('Autonomous systems')
      expect(section.text()).toContain('Drone infrastructure')
      expect(section.text()).toContain('Secure telemetry')
      expect(section.text()).toContain('Air-gapped networks')
    })

    it('links to the contact page', () => {
      const wrapper = mountComponent()

      const section = wrapper.find('section#services')
      const link = section.findAll('a[href="/contact"]').find(a => a.text().includes('Contact Us Directly'))
      expect(link).toBeTruthy()
    })
  })

  describe('TechStack Component Integration', () => {
    it('renders TechStack component', () => {
      const wrapper = mountComponent()

      expect(wrapper.findComponent(TechStack).exists()).toBe(true)
    })
  })

  describe('Why Us Section', () => {
    it('renders the section heading and subtitle', () => {
      const wrapper = mountComponent()

      const section = findSectionByHeading(wrapper, 'Why Us')
      expect(section).toBeTruthy()
      expect(section!.find('h2').text()).toContain('Over Them')
      expect(section!.text()).toContain("Because we've been on-call at 3am fixing someone else's mess. We know what breaks.")
    })

    it('renders three feature cards with titles', () => {
      const wrapper = mountComponent()

      const cards = wrapper.findAllComponents(FeatureCard)
      expect(cards.length).toBe(3)
      expect(cards.map(card => card.props('title'))).toEqual([
        'Battle-Tested',
        'Ship or Die',
        'No Hand-Holding'
      ])
    })

    it('feature cards carry their icons and descriptions', () => {
      const wrapper = mountComponent()

      const cards = wrapper.findAllComponents(FeatureCard)
      expect(cards.map(card => card.props('icon'))).toEqual([
        'heroicons:sparkles',
        'heroicons:rocket-launch',
        'heroicons:hand-raised'
      ])
      expect(cards[0].text()).toContain('production incidents')
      expect(cards[1].text()).toContain('MVPs in weeks')
      expect(cards[2].text()).toContain('No vendor lock-in')
    })
  })

  describe('CTA Section', () => {
    it('renders the closing CTA heading and copy', () => {
      const wrapper = mountComponent()

      const section = findSectionByHeading(wrapper, 'Tired of Infrastructure That Falls Over?')
      expect(section).toBeTruthy()
      expect(section!.text()).toContain('Stop pretending YAML files are infrastructure.')
      expect(section!.text()).toContain("Let's build something that actually works.")
    })

    it("renders the Let's Talk button linking to contact", () => {
      const wrapper = mountComponent()

      const section = findSectionByHeading(wrapper, 'Tired of Infrastructure That Falls Over?')
      const button = section!.find('a[href="/contact"]')
      expect(button.exists()).toBe(true)
      expect(button.text()).toBe("Let's Talk")
    })
  })

  describe('Page Structure', () => {
    it('renders hero, services, why us and CTA sections', () => {
      const wrapper = mountComponent()

      expect(wrapper.findAll('section').length).toBe(4)
      expect(wrapper.findAllComponents(PageSection).length).toBe(3)
    })

    it('uses a heading hierarchy', () => {
      const wrapper = mountComponent()

      expect(wrapper.findAll('h2').length).toBe(3)
      expect(wrapper.findAll('h3').length).toBeGreaterThanOrEqual(8)
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
