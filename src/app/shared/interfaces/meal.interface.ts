export interface IMeal {
  id: string,
  category: string,
  title: string;
  subtitle: string;
  price: number;
  size: ISize[];
  pictureUrl?: string;
}

export interface ISize {
  s: string;
  m: string;
  l: string;
}
