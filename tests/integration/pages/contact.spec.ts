import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

const EMAIL = 'offers.blackout.industries@proton.me'

const ContactPage = defineComponent({
  template: `
    <div>
      <h1>Let's Build Something Great</h1>
      <a :href="'mailto:' + email">{{ email }}</a>
    </div>
  `,
  data() {
    return { email: EMAIL }
  }
})

const mountComponent = () => mount(ContactPage)

describe('Contact Page (contact.vue)', () => {
  describe('Page Structure', () => {
    it('renders page heading', () => {
      const wrapper = mountComponent()
      expect(wrapper.find('h1').exists()).toBe(true)
    })

    it('exposes a mailto link to the company email', () => {
      const wrapper = mountComponent()
      const link = wrapper.find(`a[href="mailto:${EMAIL}"]`)
      expect(link.exists()).toBe(true)
      expect(link.text()).toContain(EMAIL)
    })
  })
})
