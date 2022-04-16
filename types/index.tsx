export interface Pet {
  id: string;
  sellerId: string;
  name: string;
  gender: 'male' | 'female';
  description: string;
  location: string;
  type: string;
  age: number;
  ageType: 'days' | 'weeks' | 'months' | 'years';
  details: string[];
  image: string;
  seller: User;
}

export interface User {
  id: string;
  username: string;
  location: string;
  email: string;
  image: string;
}
