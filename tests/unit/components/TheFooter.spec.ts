import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import TheFooter from '../../../components/TheFooter.vue'

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

const mountComponent = () => {
  return mount(TheFooter, {
    global: {
      components: { NuxtLink, Icon },
      stubs: {
        NuxtLink,
        Icon
      }
    }
  })
}

describe('TheFooter', () => {
  describe('Brand Section', () => {
    it('renders logo with correct text', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Blackout Industries')
      expect(wrapper.find('span').text()).toBe('B')
    })

    it('renders company description', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Engineering infrastructure that scales')
      expect(wrapper.text()).toContain('DevOps consulting')
      expect(wrapper.text()).toContain('platform engineering')
      expect(wrapper.text()).toContain('3D printing')
    })

    it('logo uses gradient background', () => {
      const wrapper = mountComponent()

      const logo = wrapper.find('.bg-gradient-to-br.from-primary.to-secondary')
      expect(logo.exists()).toBe(true)
    })
  })

  describe('Social Links', () => {
    it('renders GitHub social link', () => {
      const wrapper = mountComponent()

      const githubLink = wrapper.find('a[href="https://github.com/blackoutindustries"]')
      expect(githubLink.exists()).toBe(true)
      expect(githubLink.attributes('target')).toBe('_blank')
      expect(githubLink.attributes('rel')).toBe('noopener noreferrer')
      expect(githubLink.attributes('aria-label')).toBe('GitHub')
    })

    it('renders LinkedIn social link', () => {
      const wrapper = mountComponent()

      const linkedinLink = wrapper.find('a[href="https://linkedin.com/company/blackout-industries"]')
      expect(linkedinLink.exists()).toBe(true)
      expect(linkedinLink.attributes('target')).toBe('_blank')
      expect(linkedinLink.attributes('rel')).toBe('noopener noreferrer')
      expect(linkedinLink.attributes('aria-label')).toBe('LinkedIn')
    })

    it('social links have correct icons', () => {
      const wrapper = mountComponent()

      const socialLinks = wrapper.findAll('.social-link')
      expect(socialLinks.length).toBe(2)

      const icons = wrapper.findAllComponents(Icon)
      const socialIcons = icons.filter(icon =>
        icon.props('name') === 'mdi:github' || icon.props('name') === 'mdi:linkedin'
      )
      expect(socialIcons.length).toBe(2)
    })
  })

  describe('Navigation Links', () => {
    it('renders Company section heading', () => {
      const wrapper = mountComponent()

      const headings = wrapper.findAll('h3')
      const companyHeading = headings.find(h => h.text() === 'Company')
      expect(companyHeading).toBeTruthy()
    })

    it('renders company navigation links', () => {
      const wrapper = mountComponent()

      expect(wrapper.find('a[href="/about"]').exists()).toBe(true)
      expect(wrapper.find('a[href="/contact"]').exists()).toBe(true)
    })

    it('renders Services section heading', () => {
      const wrapper = mountComponent()

      const headings = wrapper.findAll('h3')
      const servicesHeading = headings.find(h => h.text() === 'Services')
      expect(servicesHeading).toBeTruthy()
    })

    it('renders service navigation links', () => {
      const wrapper = mountComponent()

      expect(wrapper.find('a[href="/services/devops-consulting"]').exists()).toBe(true)
      expect(wrapper.find('a[href="/services/3d-printing"]').exists()).toBe(true)
    })

    it('navigation links have footer-link class', () => {
      const wrapper = mountComponent()

      const footerLinks = wrapper.findAll('.footer-link')
      expect(footerLinks.length).toBeGreaterThanOrEqual(4)
    })
  })

  describe('Copyright Section', () => {
    it('renders current year dynamically', () => {
      const wrapper = mountComponent()

      const currentYear = new Date().getFullYear()
      expect(wrapper.text()).toContain(`© ${currentYear} Blackout Industries`)
    })

    it('renders all rights reserved text', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('All rights reserved')
    })
  })

  describe('Legal Links', () => {
    it('renders Privacy Policy link', () => {
      const wrapper = mountComponent()

      const privacyLink = wrapper.find('a[href="#"]')
      const allLinks = wrapper.findAll('a[href="#"]')
      const privacyLinkExists = allLinks.some(link => link.text() === 'Privacy Policy')

      expect(privacyLinkExists).toBe(true)
    })

    it('renders Terms of Service link', () => {
      const wrapper = mountComponent()

      const allLinks = wrapper.findAll('a[href="#"]')
      const termsLinkExists = allLinks.some(link => link.text() === 'Terms of Service')

      expect(termsLinkExists).toBe(true)
    })
  })

  describe('Layout Structure', () => {
    it('uses semantic footer element', () => {
      const wrapper = mountComponent()

      expect(wrapper.find('footer').exists()).toBe(true)
    })

    it('has responsive grid layout', () => {
      const wrapper = mountComponent()

      const grid = wrapper.find('.grid.grid-cols-1.md\\:grid-cols-4')
      expect(grid.exists()).toBe(true)
    })

    it('brand section spans 2 columns on desktop', () => {
      const wrapper = mountComponent()

      const brandCol = wrapper.find('.col-span-1.md\\:col-span-2')
      expect(brandCol.exists()).toBe(true)
    })

    it('has border at top', () => {
      const wrapper = mountComponent()

      const footer = wrapper.find('footer.border-t.border-dark-300')
      expect(footer.exists()).toBe(true)
    })

    it('bottom bar has border separator', () => {
      const wrapper = mountComponent()

      const bottomBar = wrapper.find('.border-t.border-dark-300')
      expect(bottomBar.exists()).toBe(true)
    })
  })

  describe('Styling', () => {
    it('uses dark background', () => {
      const wrapper = mountComponent()

      const footer = wrapper.find('footer.bg-dark-100')
      expect(footer.exists()).toBe(true)
    })

    it('has consistent spacing', () => {
      const wrapper = mountComponent()

      const container = wrapper.find('.py-12.md\\:py-16')
      expect(container.exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('social links have aria-labels', () => {
      const wrapper = mountComponent()

      const socialLinks = wrapper.findAll('.social-link')

      socialLinks.forEach(link => {
        expect(link.attributes('aria-label')).toBeDefined()
      })
    })

    it('external links have security attributes', () => {
      const wrapper = mountComponent()

      const externalLinks = wrapper.findAll('a[target="_blank"]')

      externalLinks.forEach(link => {
        expect(link.attributes('rel')).toBe('noopener noreferrer')
      })
    })
  })

  describe('Content Quality', () => {
    it('description is concise and informative', () => {
      const wrapper = mountComponent()

      const description = wrapper.find('p.text-text-secondary')
      expect(description.text().length).toBeGreaterThan(50)
      expect(description.text().length).toBeLessThan(200)
    })

    it('all navigation sections have content', () => {
      const wrapper = mountComponent()

      const navSections = wrapper.findAll('ul')
      expect(navSections.length).toBe(2)

      navSections.forEach(section => {
        const links = section.findAll('li')
        expect(links.length).toBeGreaterThan(0)
      })
    })
  })
})
