export interface KeyPoint {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description?: string;
  image: string;
  tourId: number;
}
