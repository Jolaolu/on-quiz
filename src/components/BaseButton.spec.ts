import { shallowMount, Wrapper } from '@vue/test-utils'

import Button from './BaseButton.vue'

function mountComponent(slots = {}): Wrapper<Vue> {
  return shallowMount(Button, {
    slots,
  })
}

describe('BaseButton', () => {
  it('displays slot content', async () => {
    const wrapper = mountComponent({ default: '1234' })
    expect(wrapper.find('.button').element.textContent).toContain('1234')
  })
})
