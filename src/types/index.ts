type TShoeId =
  | 'cloud'
  | 'cloudx'
  | 'cloudflow'
  | 'cloudventure'
  | 'cloudsurfer'
  | 'cloudventure_waterproof'
  | 'cloudventure_peak'
  | 'cloudflyer'
export interface IShoe {
  id: TShoeId
  name: string
  rating: number
}
export type TShoes = IShoe[]

export interface IAnswer {
  id?: number
  copy: string
  nextQuestion: number | ''
  ratingIncrease: TRatingIncrease
}

export type TRatingIncrease = { [key in TShoeId]: number }

export interface IQuestion {
  id: number
  copy: string
  answers: IAnswer[]
}
export type TQuestions = IQuestion[]

export interface ITransformedQuestions {
  [key: number]: IQuestion
}
