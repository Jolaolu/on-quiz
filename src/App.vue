<template>
  <div id="app">
    <main class="home" v-if="currentStep == Step.Intro">
      <h1 class="home-title">
        Take the quiz <br />
        and try your first pair!
      </h1>
      <base-button @click="updateStep(Step.Survey)" class="home-button">Try on Trial</base-button>
      <p class="home-hero__text">30 Days risk free</p>
      <section class="home-hero__runner"></section>
    </main>
    <dynamic-survey @complete-survey="showResult" v-else-if="currentStep === Step.Survey" ref="survey" />
    <section class="loader" v-else-if="currentStep === Step.Loading">
      <img :src="require('@/assets/images/loader.gif')" alt="Loading" />
      <p>We're running to get your results.</p>
    </section>
    <section class="result" v-else-if="currentStep === Step.Result">
      <h3>Congratulations!</h3>
      <p>Based on your selection, we have decided the following</p>
      <article class="result-item" v-for="(shoe, index) in results" :key="index">
        <img class="result-item__img" :src="require(`@/assets/images/${shoe.id}.png`)" :alt="shoe.name" />
        <h4 class="result-item__title">{{ shoe.name }}</h4>
        <p class="result-item__description">
          Whether it's cross-town commutes, marathons or mountain ascents, On has shoes and apparel for every runner.
        </p>
      </article>
      <base-button @click="restart">Restart Quiz</base-button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from 'vue'
import { TShoes, IShoe } from '~/types'
import BaseButton from './components/BaseButton.vue'
import DynamicSurvey from './components/DynamicSurvey.vue'

enum Step {
  Intro,
  Survey,
  Loading,
  Result,
}

export default defineComponent({
  name: 'App',
  components: { BaseButton, DynamicSurvey },
  setup() {
    const currentStep = ref(Step.Intro)
    const results = ref<TShoes | null>(null)
    const timeOut = ref()

    const updateStep = (step: Step): void => {
      currentStep.value = step
    }
    const showResult = (allShoes: TShoes): void => {
      updateStep(Step.Loading)
      results.value = allShoes.sort((a: IShoe, b: IShoe) => b.rating - a.rating)
      timeOut.value = setTimeout(() => {
        updateStep(Step.Result)
      }, 3000)
    }

    const restart = (): void => {
      results.value = null
      updateStep(Step.Intro)
    }

    onBeforeUnmount(() => {
      clearTimeout(timeOut.value)
    })

    return {
      currentStep,
      restart,
      results,
      showResult,
      Step,
      updateStep,
    }
  },
})
</script>

<style lang="scss">
#app {
  min-height: 100vh;
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
    font-size: 2rem;
    font-weight: 500;
  }
  &-button {
    padding: 1rem 2.5rem;
    background: black;
    color: white;
    font-family: inherit;
    font-size: 1.6rem;
  }
  &-hero {
    &__text {
      color: #c4c4c4;
      font-family: Avenir, Arial, Helvetica, sans-serif;
      font-weight: 600;
    }
    &__runner {
      height: 50vh;
      background-image: url('~@/assets/images/Background_Image_Start_Screen.png');
      background-position: 15%;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}
.loader {
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #777777;
  color: #c4c4c4;
  font-size: 1.5rem;
}
.result {
  padding: 2rem;
  &-item {
    margin-bottom: 4rem;
    text-align: center;
    &__img {
      width: 80%;
    }
    &__title {
      font-size: 2rem;
      font-weight: bold;
    }
  }
}
</style>
