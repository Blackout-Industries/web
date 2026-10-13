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

const expectedTechs: Array<[string, string]> = [
  ['AWS', 'heroicons:cloud'],
  ['Azure', 'heroicons:cloud'],
  ['Python', 'simple-icons:python'],
  ['Docker', 'simple-icons:docker'],
  ['Kubernetes', 'simple-icons:kubernetes'],
  ['Helm', 'lucide:container'],
  ['Terraform CDK', 'simple-icons:terraform'],
  ['Ansible', 'simple-icons:ansible'],
  ['Crossplane', 'heroicons:puzzle-piece'],
  ['GitHub Actions', 'simple-icons:githubactions'],
  ['GitLab CI', 'simple-icons:gitlab'],
  ['Backstage', 'heroicons:building-office-2'],
  ['Prometheus', 'simple-icons:prometheus'],
  ['Grafana', 'simple-icons:grafana'],
  ['Loki', 'heroicons:document-text'],
  ['Vault', 'heroicons:lock-closed'],
  ['NGINX', 'simple-icons:nginx'],
  ['ArgoCD', 'lucide:server']
]

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
    it('renders cloud providers and languages', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('AWS')
      expect(wrapper.text()).toContain('Azure')
      expect(wrapper.text()).toContain('Python')
    })

    it('renders container and orchestration technologies', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Docker')
      expect(wrapper.text()).toContain('Kubernetes')
      expect(wrapper.text()).toContain('Helm')
    })

    it('renders IaC and configuration tools', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Terraform CDK')
      expect(wrapper.text()).toContain('Ansible')
      expect(wrapper.text()).toContain('Crossplane')
    })

    it('renders CI/CD and platform tools', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('GitHub Actions')
      expect(wrapper.text()).toContain('GitLab CI')
      expect(wrapper.text()).toContain('Backstage')
    })

    it('renders monitoring and observability tools', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Prometheus')
      expect(wrapper.text()).toContain('Grafana')
      expect(wrapper.text()).toContain('Loki')
    })

    it('renders security, networking and delivery tools', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Vault')
      expect(wrapper.text()).toContain('NGINX')
      expect(wrapper.text()).toContain('ArgoCD')
    })

    it('renders correct number of technology items', () => {
      const wrapper = mountComponent()

      const techItems = wrapper.findAll('.tech-item')
      expect(techItems.length).toBe(18)
    })

    it('renders every label in order', () => {
      const wrapper = mountComponent()

      const labels = wrapper.findAll('.tech-label').map(label => label.text())
      expect(labels).toEqual(expectedTechs.map(([label]) => label))
    })

    it('each tech item has icon and label', () => {
      const wrapper = mountComponent()

      const techItems = wrapper.findAll('.tech-item')

      techItems.forEach(item => {
        expect(item.findComponent(Icon).exists()).toBe(true)
        expect(item.find('.tech-label').text().length).toBeGreaterThan(0)
      })
    })

    it('each tech item uses the expected icon', () => {
      const wrapper = mountComponent()

      const pairs = wrapper.findAll('.tech-item').map(item => [
        item.find('.tech-label').text(),
        item.findComponent(Icon).props('name')
      ])
      expect(pairs).toEqual(expectedTechs)
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
  })

  describe('Visual Hierarchy', () => {
    it('main heading highlights Modern Tech', () => {
      const wrapper = mountComponent()

      const heading = wrapper.find('h2')
      expect(heading.text()).toContain('Powered By')
      expect(heading.find('span').text()).toBe('Modern Tech')
    })

    it('root is a semantic section with the tech-stack class', () => {
      const wrapper = mountComponent()

      expect(wrapper.element.tagName).toBe('SECTION')
      expect(wrapper.classes()).toContain('tech-stack')
    })
  })
})
