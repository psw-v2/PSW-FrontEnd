// tour.model.ts

export interface Tour {
  id: Number;
  name: string;
  difficulty: Number;
  interest: Number;
  price: Number;
  status: Number;
  authorId: Number;
}

// export enum Difficulty {
//   EASY = 'EASY',
//   MEDIUM = 'MEDIUM',
//   HARD = 'HARD'
// }

// export enum TourStatus {
//   DRAFT = 'DRAFT',
//   PUBLISHED = 'PUBLISHED',
//   ARCHIVED = 'ARCHIVED'
// }
