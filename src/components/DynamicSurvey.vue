<template>
  <section class="survey">
    <p class="title">TRY ON QUIZ</p>
    <p class="title">30 DAYS RISK FREE</p>
    <template v-for="(question, index) in allQuestions">
      <article class="survey-item" :key="index" v-if="question.id == currentQuestion">
        <h3 class="survey-title">{{ question.copy }}</h3>
        <div class="survey-answers">
          <base-button
            class="survey-answers__item"
            v-for="(answer, index) in question.answers"
            :key="index"
            @click="updateStep(answer)"
          >
            {{ answer.copy }}
          </base-button>
        </div>
      </article>
    </template>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { ITransformedQuestions, IAnswer, TShoes, IShoe, TRatingIncrease } from '~/types'
import { transformQuestions, allStaticQuestions, allStaticShoes } from '~/helpers'
import BaseButton from './BaseButton.vue'

export default defineComponent({
  emits: ['complete-survey'],
  components: { BaseButton },
  setup(_, { emit }) {
    const currentQuestion = ref(0)
    const allQuestions = ref<ITransformedQuestions | null>(null)
    const allShoes = ref<TShoes | null>(null)

    const updateShoeRatings = (rating: TRatingIncrease): void => {
      allShoes.value?.forEach((element: IShoe) => {
        element.rating += rating[element.id]
      })
    }

    const updateStep = (answer: IAnswer): void => {
      updateShoeRatings(answer.ratingIncrease)
      if (answer.nextQuestion === '') {
        emit('complete-survey', allShoes.value)
      } else {
        currentQuestion.value = answer.nextQuestion
      }
    }

    onMounted(() => {
      allQuestions.value = transformQuestions(allStaticQuestions)
      allShoes.value = allStaticShoes
    })

    return {
      allQuestions,
      currentQuestion,
      updateStep,
    }
  },
})
</script>
<style lang="scss">
.survey {
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  background: #777777;
  color: white;
  text-align: center;
  &-title {
    font-size: 2rem;
  }
  &-item {
    padding: 0 1.5rem;
  }
  &-answers {
    margin-top: 4rem;
    &__item {
      width: 45%;
      padding: 1rem 2rem;
      border: 1px solid white;
      background: transparent;
      color: white;
      &:first-of-type {
        margin-right: 1rem;
      }
    }
  }
  .title {
    margin: 0;
    color: white;
    font-family: Avenir, Arial, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    word-spacing: 0.4rem;
    &:last-of-type {
      margin-bottom: 60%;
    }
  }
}
</style>
