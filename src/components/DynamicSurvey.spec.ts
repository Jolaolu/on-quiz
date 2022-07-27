import { shallowMount, Wrapper } from '@vue/test-utils'
import { allStaticQuestions } from '~/helpers'
import DynamicSurvey from './DynamicSurvey.vue'

const surveyQuestions = allStaticQuestions
const firstQuestion = surveyQuestions[0]

function mountComponent(): Wrapper<Vue> {
  return shallowMount(DynamicSurvey)
}

describe('DynamicSurvey', () => {
  let wrapper: Wrapper<Vue>
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('diplays question', async () => {
    wrapper = mountComponent()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.survey-item').exists()).toBeTruthy()
    expect(wrapper.find('.survey-title').element.textContent).toBe(firstQuestion.copy)
  })

  it("emits 'complete-survey' event on survey completion", async () => {
    wrapper = mountComponent()
    await wrapper.vm.$nextTick()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const i of surveyQuestions) {
      await goToNextQuestion(wrapper)
    }
    expect(wrapper.emitted('complete-survey')).toBeDefined()
  })
})

async function goToNextQuestion(wrapper: Wrapper<Vue>): Promise<void> {
  wrapper.findAll('.survey-answers__item').at(0).vm.$emit('click')
  await wrapper.vm.$nextTick()
}
