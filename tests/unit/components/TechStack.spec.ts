import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import TechStack from '../../../components/TechStack.vue'

// Mock Icon component
const Icon = defineComponent({
  props: ['name'],
  setup(props) {
    return () => h('span', { class: `icon-${props.name}` })
  }
})

const mountComponent = () => {
  return mount(TechStack, {
    global: {
      components: { Icon },
      stubs: { Icon }
    }
  })
}

describe('TechStack', () => {
  describe('Section Structure', () => {
    it('renders main heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Powered By')
      expect(wrapper.text()).toContain('Modern Tech')
    })

    it('renders subtitle description', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('cutting-edge technologies')
      expect(wrapper.text()).toContain('robust, scalable solutions')
    })
  })

  describe('Technology Icons Grid', () => {
    it('renders all cloud provider icons', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('AWS')
      expect(wrapper.text()).toContain('Azure')
      expect(wrapper.text()).toContain('GCP')
    })

    it('renders container and orchestration technologies', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Docker')
      expect(wrapper.text()).toContain('Kubernetes')
      expect(wrapper.text()).toContain('Helm')
    })

    it('renders IaC and configuration tools', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Terraform')
      expect(wrapper.text()).toContain('Ansible')
      expect(wrapper.text()).toContain('Pulumi')
    })

    it('renders CI/CD platforms', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('GitHub Actions')
      expect(wrapper.text()).toContain('GitLab CI')
      expect(wrapper.text()).toContain('Jenkins')
    })

    it('renders monitoring and observability tools', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Prometheus')
      expect(wrapper.text()).toContain('Grafana')
      expect(wrapper.text()).toContain('Datadog')
    })

    it('renders security and secrets management tools', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Vault')
      expect(wrapper.text()).toContain('SOPS')
      expect(wrapper.text()).toContain('ArgoCD')
    })

    it('renders correct number of technology items', () => {
      const wrapper = mountComponent()

      const techItems = wrapper.findAll('.tech-item')
      expect(techItems.length).toBe(18)
    })

    it('each tech item has icon and label', () => {
      const wrapper = mountComponent()

      const techItems = wrapper.findAll('.tech-item')

      techItems.forEach(item => {
        expect(item.find('.tech-icon-wrapper').exists()).toBe(true)
        expect(item.find('.tech-label').exists()).toBe(true)
      })
    })
  })

  describe('Technology Categories', () => {
    it('renders four category cards', () => {
      const wrapper = mountComponent()

      const categoryCards = wrapper.findAll('.glass.rounded-lg.p-6')
      expect(categoryCards.length).toBe(4)
    })

    it('renders Infrastructure category', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Infrastructure')
      expect(wrapper.text()).toContain('Cloud-native architectures')
    })

    it('renders Orchestration category', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Orchestration')
      expect(wrapper.text()).toContain('Container management')
    })

    it('renders Observability category', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Observability')
      expect(wrapper.text()).toContain('Metrics & monitoring')
    })

    it('renders Security category', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Security')
      expect(wrapper.text()).toContain('Compliance & secrets')
    })

    it('each category has icon and description', () => {
      const wrapper = mountComponent()

      const categoryCards = wrapper.findAll('.glass.rounded-lg.p-6')

      categoryCards.forEach(card => {
        const icons = card.findAllComponents(Icon)
        expect(icons.length).toBeGreaterThan(0)

        const heading = card.find('h3')
        expect(heading.exists()).toBe(true)

        const description = card.find('p')
        expect(description.exists()).toBe(true)
      })
    })
  })

  describe('Styling and Layout', () => {
    it('uses section class for container', () => {
      const wrapper = mountComponent()

      expect(wrapper.find('.section').exists()).toBe(true)
    })

    it('has responsive grid layout for tech items', () => {
      const wrapper = mountComponent()

      const grid = wrapper.find('.grid.grid-cols-2.md\\:grid-cols-3.lg\\:grid-cols-6')
      expect(grid.exists()).toBe(true)
    })

    it('tech items have group class for hover effects', () => {
      const wrapper = mountComponent()

      const techItems = wrapper.findAll('.tech-item.group')
      expect(techItems.length).toBe(18)
    })

    it('category cards have responsive grid', () => {
      const wrapper = mountComponent()

      const categoryGrid = wrapper.find('.grid.grid-cols-1.md\\:grid-cols-4')
      expect(categoryGrid.exists()).toBe(true)
    })
  })

  describe('Visual Hierarchy', () => {
    it('main heading uses gradient text', () => {
      const wrapper = mountComponent()

      const gradientText = wrapper.find('.gradient-text')
      expect(gradientText.exists()).toBe(true)
      expect(gradientText.text()).toBe('Modern Tech')
    })

    it('section has background styling', () => {
      const wrapper = mountComponent()

      const section = wrapper.find('.bg-dark-100')
      expect(section.exists()).toBe(true)
    })
  })
})
