export interface Plant {
  id: number;
  name: string;
  price: string;
  like: boolean;
  img: any;
  about: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Details: any;
  Cart: undefined;
};
