import { shallowMount, Wrapper } from '@vue/test-utils'
import App from './App.vue'

function mountComponent(): Wrapper<Vue> {
  return shallowMount(App, {})
}

describe('App', () => {
  it('renders', () => {
    const wrapper = mountComponent()
    expect(wrapper.get('#app').exists()).toBeTruthy()
  })
})
