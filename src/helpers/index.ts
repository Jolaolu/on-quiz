import staticData from '~/static/data.json'
import { TShoes, TQuestions, IQuestion, ITransformedQuestions } from '~/types'

export const allStaticShoes: TShoes = staticData.shoes as TShoes

export const allStaticQuestions: TQuestions = staticData.questions as TQuestions

export const transformQuestions = (questions: TQuestions): ITransformedQuestions => {
  const transformedQuestion: Record<number, IQuestion> = {}
  questions.forEach((question) => {
    const { id } = question
    transformedQuestion[id] = question
  })
  return transformedQuestion
}
