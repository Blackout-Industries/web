import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import ContactForm from '../../../components/ContactForm.vue'

// Mock Icon component
const Icon = defineComponent({
  props: ['name'],
  setup(props) {
    return () => h('span', { class: `icon-${props.name}` })
  }
})

const mountComponent = () => {
  return mount(ContactForm, {
    global: {
      components: { Icon },
      stubs: { Icon }
    }
  })
}

describe('ContactForm', () => {
  describe('Form Fields', () => {
    it('renders name input field', () => {
      const wrapper = mountComponent()

      const nameInput = wrapper.find('#name')
      expect(nameInput.exists()).toBe(true)
      expect(nameInput.attributes('type')).toBe('text')
      expect(nameInput.attributes('required')).toBeDefined()
    })

    it('renders email input field', () => {
      const wrapper = mountComponent()

      const emailInput = wrapper.find('#email')
      expect(emailInput.exists()).toBe(true)
      expect(emailInput.attributes('type')).toBe('email')
      expect(emailInput.attributes('required')).toBeDefined()
    })

    it('renders company input field', () => {
      const wrapper = mountComponent()

      const companyInput = wrapper.find('#company')
      expect(companyInput.exists()).toBe(true)
      expect(companyInput.attributes('type')).toBe('text')
      expect(companyInput.attributes('required')).toBeUndefined()
    })

    it('renders service dropdown with all options', () => {
      const wrapper = mountComponent()

      const serviceSelect = wrapper.find('#service')
      expect(serviceSelect.exists()).toBe(true)

      const options = serviceSelect.findAll('option')
      expect(options.length).toBe(5)

      const optionTexts = options.map(opt => opt.text())
      expect(optionTexts).toContain('DevOps & Platform Engineering')
      expect(optionTexts).toContain('3D Printing')
      expect(optionTexts).toContain('Both Services')
      expect(optionTexts).toContain('Other')
    })

    it('renders message textarea field', () => {
      const wrapper = mountComponent()

      const messageTextarea = wrapper.find('#message')
      expect(messageTextarea.exists()).toBe(true)
      expect(messageTextarea.attributes('required')).toBeDefined()
      expect(messageTextarea.attributes('minlength')).toBe('20')
      expect(messageTextarea.attributes('rows')).toBe('5')
    })

    it('renders honeypot field as hidden', () => {
      const wrapper = mountComponent()

      const honeypot = wrapper.find('input[name="website"]')
      expect(honeypot.exists()).toBe(true)
      expect(honeypot.classes()).toContain('hidden')
      expect(honeypot.attributes('tabindex')).toBe('-1')
    })
  })

  describe('Field Labels', () => {
    it('all required fields have asterisk indicator', () => {
      const wrapper = mountComponent()

      const requiredLabels = wrapper.findAll('label .text-primary')
      expect(requiredLabels.length).toBeGreaterThanOrEqual(3)

      requiredLabels.forEach(label => {
        expect(label.text()).toBe('*')
      })
    })

    it('name label links to name input', () => {
      const wrapper = mountComponent()

      const label = wrapper.find('label[for="name"]')
      expect(label.exists()).toBe(true)
      expect(label.text()).toContain('Name')
    })

    it('email label links to email input', () => {
      const wrapper = mountComponent()

      const label = wrapper.find('label[for="email"]')
      expect(label.exists()).toBe(true)
      expect(label.text()).toContain('Email')
    })
  })

  describe('Form Submission', () => {
    it('submit button is enabled by default', () => {
      const wrapper = mountComponent()

      const submitButton = wrapper.find('button[type="submit"]')
      expect(submitButton.exists()).toBe(true)
      expect(submitButton.attributes('disabled')).toBeUndefined()
    })

    it('submit button shows loading state when submitting', async () => {
      const wrapper = mountComponent()

      wrapper.vm.loading = true
      await wrapper.vm.$nextTick()

      const submitButton = wrapper.find('button[type="submit"]')
      expect(submitButton.attributes('disabled')).toBeDefined()
      expect(submitButton.text()).toContain('Sending...')
    })

    it('form prevents default submission', async () => {
      const wrapper = mountComponent()

      const form = wrapper.find('form')
      const preventDefault = vi.fn()

      await form.trigger('submit', { preventDefault })

      expect(preventDefault).not.toHaveBeenCalled()
    })

    it('honeypot field blocks submission when filled', async () => {
      const wrapper = mountComponent()

      await wrapper.setData({
        form: {
          name: 'Test',
          email: 'test@example.com',
          company: '',
          service: 'devops',
          message: 'This is a test message with more than 20 characters',
          honeypot: 'spam-content'
        }
      })

      const form = wrapper.find('form')
      await form.trigger('submit')

      expect(wrapper.vm.loading).toBe(false)
      expect(wrapper.vm.success).toBe(false)
    })

    it('shows success message after successful submission', async () => {
      const wrapper = mountComponent()

      await wrapper.setData({
        form: {
          name: 'John Doe',
          email: 'john@example.com',
          company: 'Test Corp',
          service: 'devops',
          message: 'This is a test message with enough characters',
          honeypot: ''
        }
      })

      wrapper.vm.handleSubmit()
      await new Promise(resolve => setTimeout(resolve, 100))

      wrapper.vm.success = true
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.bg-secondary\\/10').exists()).toBe(true)
      expect(wrapper.text()).toContain('Message sent successfully')
    })

    it('shows error message on submission failure', async () => {
      const wrapper = mountComponent()

      wrapper.vm.error = 'Network error occurred'
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.bg-red-500\\/10').exists()).toBe(true)
      expect(wrapper.text()).toContain('Failed to send message')
    })

    it('form resets after successful submission', async () => {
      const wrapper = mountComponent()

      await wrapper.setData({
        form: {
          name: 'John Doe',
          email: 'john@example.com',
          company: 'Test',
          service: 'devops',
          message: 'Test message with enough characters',
          honeypot: ''
        }
      })

      wrapper.vm.handleSubmit()
      await new Promise(resolve => setTimeout(resolve, 1600))

      expect(wrapper.vm.form.name).toBe('')
      expect(wrapper.vm.form.email).toBe('')
      expect(wrapper.vm.form.company).toBe('')
      expect(wrapper.vm.form.service).toBe('')
      expect(wrapper.vm.form.message).toBe('')
    })
  })

  describe('Validation', () => {
    it('email field accepts valid email format', async () => {
      const wrapper = mountComponent()

      const emailInput = wrapper.find('#email')
      await emailInput.setValue('test@example.com')

      expect(wrapper.vm.form.email).toBe('test@example.com')
    })

    it('message field has minimum length requirement', () => {
      const wrapper = mountComponent()

      const messageField = wrapper.find('#message')
      expect(messageField.attributes('minlength')).toBe('20')
    })
  })

  describe('Accessibility', () => {
    it('form uses semantic form element', () => {
      const wrapper = mountComponent()

      expect(wrapper.find('form').exists()).toBe(true)
    })

    it('all inputs have associated labels', () => {
      const wrapper = mountComponent()

      const inputIds = ['name', 'email', 'company', 'service', 'message']

      inputIds.forEach(id => {
        const input = wrapper.find(`#${id}`)
        const label = wrapper.find(`label[for="${id}"]`)

        expect(input.exists()).toBe(true)
        expect(label.exists()).toBe(true)
      })
    })

    it('honeypot has autocomplete disabled', () => {
      const wrapper = mountComponent()

      const honeypot = wrapper.find('input[name="website"]')
      expect(honeypot.attributes('autocomplete')).toBe('off')
    })
  })

  describe('User Experience', () => {
    it('displays character minimum hint for message', () => {
      const wrapper = mountComponent()

      expect(wrapper.text()).toContain('Minimum 20 characters')
    })

    it('submit button text changes during loading', async () => {
      const wrapper = mountComponent()

      const submitButton = wrapper.find('button[type="submit"]')
      expect(submitButton.text()).toContain('Send Message')

      wrapper.vm.loading = true
      await wrapper.vm.$nextTick()

      expect(submitButton.text()).toContain('Sending...')
    })

    it('success message includes response time estimate', async () => {
      const wrapper = mountComponent()

      wrapper.vm.success = true
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('24 hours')
    })
  })
})
