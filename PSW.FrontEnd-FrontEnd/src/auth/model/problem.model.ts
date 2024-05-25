export interface Problem {
  id: number;
  name: string;
  description: string;
  status: number;
  tourId: number;
  authorId: number;
  isSeen: boolean;
}

// export enum ProblemStatusDto {
//   ON_WAIT = 'ON_WAIT',
//   SOLVED = 'SOLVED',
//   ON_REVISION = 'ON_REVISION',
//   DISCARDED = 'DISCARDED'
// }
