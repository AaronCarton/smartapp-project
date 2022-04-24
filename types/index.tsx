import * as ImagePicker from 'expo-image-picker';

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
  password?: string;
  token?: string;
}

export interface ImageData {
  uri: string;
  type?: string;
  filename?: string;
  height?: number;
  width?: number;
}

interface GenericError {
  title: string;
  message: string;
}

interface FormFieldError {
  hasError: boolean;
  inlineErrorMessage: string;
}

interface FormFields {
  [field: string]: FormFieldError;
}

export interface FormError {
  generic: GenericError;
  fields: FormFields;
}
