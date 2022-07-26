<template>
  <div id="app">
    <main class="home">
      <h1 class="home-title">
        Take the quiz <br />
        and try your first pair!
      </h1>
      <base-button class="home-button">Try on Trial</base-button>
      <p class="home-hero__text">30 Days risk free</p>
      <section class="home-hero__runner"></section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import BaseButton from './components/BaseButton.vue'
import { ITransformedQuestions, IQuestion } from '~/types'
import { transformQuestions, allStaticQuestions } from '~/helpers'

export default defineComponent({
  name: 'App',
  components: { BaseButton },
  setup() {
    const currentQuestion = ref<IQuestion | null>(null)
    const allQuestions = ref<ITransformedQuestions | null>(null)
    const getNextQuestion = (index: number): void => {
      currentQuestion.value = allQuestions.value![index]
    }

    onMounted(() => {
      allQuestions.value = transformQuestions(allStaticQuestions)
      console.log(allQuestions.value)
    })

    return {
      currentQuestion,
    }
  },
})
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  padding-top: 2.5rem;
  background: #f2f2f2;
  font-family: 'Neutraface Slab Book', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
}
* {
  box-sizing: border-box;
}
.home {
  padding: 3rem 1rem 0;
  &-title {
    font-weight: 500;
    font-size: 2rem;
  }
  &-button {
    padding: 1rem 2.5rem;
    font-size: 1.6rem;
    background: black;
    color: white;
    font-family: inherit;
  }
  &-hero {
    &__text {
      color: #c4c4c4;
      font-weight: 600;
      font-family: Avenir, Arial, Helvetica, sans-serif;
    }
    &__runner {
      height: 50vh;
      background-image: url('~@/assets/images/Background_Image_Start_Screen.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 15%;
    }
  }
}
</style>
