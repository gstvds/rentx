export interface CarDTO {
  about: string;
  accessories: Array<{name: string; type: string}>;
  brand: string;
  fuel_type: string;
  id: string;
  name: string;
  photos: string[];
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
};
