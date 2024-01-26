export interface ICartItem {
  id: string;
  mealId: string;
  mealPrice: number;
  pictureUrl: string | undefined;
  // size: ISize;
  count: number;
  title: string;
}
