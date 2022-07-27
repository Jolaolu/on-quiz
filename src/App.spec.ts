import { shallowMount, Wrapper } from '@vue/test-utils'
import App from './App.vue'
import { surveyResult } from './services/mocks'

jest.useFakeTimers()

function mountComponent(): Wrapper<Vue> {
  return shallowMount(App, {})
}

describe('App', () => {
  it('renders', () => {
    const wrapper = mountComponent()
    expect(wrapper.get('#app').exists()).toBeTruthy()
  })

  it('renders survey on trial button click', async () => {
    const wrapper = mountComponent()
    wrapper.get('.home-button').vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('dynamic-survey-stub').exists()).toBeTruthy()
  })

  it('renders loading state after survey completion', async () => {
    const wrapper = mountComponent()
    wrapper.get('.home-button').vm.$emit('click')
    await wrapper.vm.$nextTick()
    wrapper.find('dynamic-survey-stub').vm.$emit('complete-survey', surveyResult)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.loader').exists()).toBeTruthy()
  })

  it('renders survey recommendation after survey completion', async () => {
    const wrapper = mountComponent()
    wrapper.get('.home-button').vm.$emit('click')
    await wrapper.vm.$nextTick()
    wrapper.find('dynamic-survey-stub').vm.$emit('complete-survey', surveyResult)
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.result').exists()).toBeTruthy()
  })

  it('restarts survey', async () => {
    const wrapper = mountComponent()
    wrapper.get('.home-button').vm.$emit('click')
    await wrapper.vm.$nextTick()
    wrapper.find('dynamic-survey-stub').vm.$emit('complete-survey', surveyResult)
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.home').exists()).toBeFalsy()
    wrapper.findComponent({ ref: 'restart' }).vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.get('.home').exists()).toBeTruthy()
  })
})
