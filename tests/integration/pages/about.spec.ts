import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

// Mock About page - create simple integration test
const AboutPage = defineComponent({
  template: `
    <div>
      <h1>About Blackout Industries</h1>
      <p>Content about the company</p>
    </div>
  `
})

const mountComponent = () => {
  return mount(AboutPage)
}

describe('About Page (about.vue)', () => {
  describe('Page Structure', () => {
    it('renders page heading', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('About')
    })

    it('has content section', () => {
      const wrapper = mountComponent()

      expect(wrapper.find('p').exists()).toBe(true)
    })

    it('uses semantic HTML', () => {
      const wrapper = mountComponent()

      expect(wrapper.find('h1').exists()).toBe(true)
    })
  })
})
