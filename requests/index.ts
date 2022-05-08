import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../hooks/Auth';
import { FormError, Pet, User, ApiError, SearchQuery } from '../types';

const BASE_URL = `http://192.168.0.120:5035`;
//? 192.168.0.120
//? 172.30.22.47

/**
 * Fetch pet from API, returns Pet if found
 * @param petID - The ID of the pet to fetch
 */
export const fetchPet = async (petID: string): Promise<Pet | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/pets/${petID}`);
    const json = await response.json();
    return await json;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetch User from API, returns User if found
 * @param userID ID of the user
 */
export const fetchUser = async (userID: string): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/profile/${userID}`);
    var user: User = await response.json();
    user.image = `${BASE_URL}/images/users/${user.id}.webp`;
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch all pets from API, returns array of Pets
 */
export const fetchAllPets = async (): Promise<Pet[]> => {
  try {
    const response = await fetch(`${BASE_URL}/pets`);
    var json = await response.json();
    var pets = await json.map(async (pet: Pet) => {
      pet.image = `${BASE_URL}/images/pets/${pet.id}.webp`;
      pet.seller = await fetchUser(pet.sellerId);
      return pet;
    });
    return Promise.all(pets);
  } catch (error) {
    console.error(error);
    return [] as Pet[];
  }
};

export const fetchPetBySeller = async (seller: User): Promise<Pet[]> => {
  try {
    const response = await fetch(`${BASE_URL}/profile/${seller.id}/pets`);
    var json = await response.json();
    var pets = await json.map((pet: Pet) => {
      pet.image = `${BASE_URL}/images/pets/${pet.id}.webp`;
      pet.seller = seller;
      return pet;
    });
    return pets;
  } catch (error) {
    console.error(error);
    return [] as Pet[];
  }
};

export const postUser = async (
  user: User,
  method: 'POST' | 'PUT' = 'POST',
): Promise<User | FormError> => {
  // get image data
  let localUri = user.image;
  let filename = localUri.split('/').pop();
  let match = /\.(\w+)$/.exec(filename!);
  let type = match ? `image/${match[1]}` : `image`;

  let formdata = new FormData();
  formdata.append('username', user.username.trim());
  formdata.append('password', user.password!.trim());
  formdata.append('email', user.email.trim());
  formdata.append('location', user.location.trim());
  formdata.append('bio', user.bio.trim());
  // @ts-ignore
  formdata.append('image', { uri: localUri, name: filename, type });
  const response = await fetch(`${BASE_URL}/profile/register`, {
    method: method,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
  });

  if (response.status === 400) {
    const json = await response.json();
    const error: FormError = {
      generic: { message: 'An error occured', title: 'Error' },
      fields: {},
    };
    json.forEach((err: ApiError) => {
      error.fields[err.field.toLowerCase()] = {
        hasError: true,
        inlineErrorMessage: err.error,
      };
    });
    return error;
  }

  var user: User = await response.json();
  user.image = `${BASE_URL}/images/users/${user.id}.webp`;
  user.favorites = [];
  user.pets = [];
  return user;
};

export const searchPet = async (searchParams: SearchQuery): Promise<Pet[]> => {
  try {
    // create a GraphQL query string based on given search params
    let filters = [];
    for (var prop in searchParams) {
      if (Object.prototype.hasOwnProperty.call(searchParams, prop)) {
        // @ts-ignore
        if (searchParams[prop]) {
          if (prop === 'details') {
            // @ts-ignore
            if (searchParams[prop].length > 0) {
              filters.push(
                `details: {some: {in: ${JSON.stringify(
                  searchParams[prop],
                ).toLowerCase()}}}`,
              );
            }
          } else {
            filters.push(
              // @ts-ignore
              `${prop}: {eq: ${JSON.stringify(searchParams[prop]).toLowerCase()}}`,
            );
          }
        }
      }
    }

    const query = `{
      pets${filters.length > 0 ? `(where: {${filters.join(', ')}})` : ''} {
        id,created,details,sellerId,name,gender,description,price,location,type,age,ageType
      }
    }`;

    // post query string to API
    const response = await fetch(`${BASE_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
      }),
    });
    let json = await response.json();

    var pets = await json.data.pets.map(async (pet: Pet) => {
      pet.image = `${BASE_URL}/images/pets/${pet.id}.webp`;
      pet.seller = await fetchUser(pet.sellerId);
      return pet;
    });
    return Promise.all(pets);
  } catch (error) {
    console.error(error);
    return [] as Pet[];
  }
};

export const postPet = async (
  pet: Pet,
  user: User,
  method: 'POST' | 'PUT' = 'POST',
): Promise<Pet | FormError> => {
  // get image data
  let localUri = pet.image;
  let filename = localUri.split('/').pop();
  let match = /\.(\w+)$/.exec(filename!);
  let type = match ? `image/${match[1]}` : `image`;

  // create formdata
  let formdata = new FormData();
  formdata.append('name', pet.name.trim());
  formdata.append('description', pet.description.trim());
  formdata.append('type', pet.type);
  formdata.append('age', pet.age.toString());
  formdata.append('ageType', pet.ageType);
  formdata.append('details', pet.details.join(','));
  formdata.append('gender', pet.gender);
  formdata.append('location', pet.location);
  formdata.append('price', '0');
  // @ts-ignore
  formdata.append('image', { uri: localUri, name: filename, type });

  // post to API
  const response = await fetch(`${BASE_URL}/pets/register`, {
    method: method,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user.token}`,
    },
    body: formdata,
  });

  // if unsuccessful, return error
  if (response.status === 400) {
    const json = await response.json();
    const error: FormError = {
      generic: { message: 'An error occured', title: 'Error' },
      fields: {},
    };
    json.forEach((err: ApiError) => {
      error.fields[err.field.toLowerCase()] = {
        hasError: true,
        inlineErrorMessage: err.error,
      };
    });
    return error;
  }

  var resPet: Pet = await response.json();
  resPet.image = `${BASE_URL}/images/pets/${resPet.id}.webp`;
  resPet.seller = user;
  return resPet;
};

export const deletePet = async (pet: Pet, userToken: string) => {
  try {
    // delete pet from database
    const response = await fetch(`${BASE_URL}/pets/${pet.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (loginBody: {
  email: string;
  password: string;
}): Promise<User | FormError> => {
  const error: FormError = {
    generic: { message: '', title: '' },
    fields: {
      email: {
        hasError: false,
        inlineErrorMessage: '',
      },
      password: {
        hasError: false,
        inlineErrorMessage: '',
      },
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginBody),
    });

    // if user not found, return error
    if (response.status === 404)
      return {
        ...error,
        fields: {
          ...error.fields,
          email: { hasError: true, inlineErrorMessage: 'Email not found' },
        },
      };
    // if password incorrect, return error
    if (response.status === 401)
      return {
        ...error,
        fields: {
          ...error.fields,
          password: { hasError: true, inlineErrorMessage: 'Incorrect password' },
        },
      };
    // if any other error, return error
    if (response.status !== 200)
      return { ...error, generic: { message: 'An error occured', title: 'Error' } };
    // if successful, return user
    var user: User = await response.json();
    user.image = `${BASE_URL}/images/users/${user.id}.webp`;
    user.favorites = [];
    user.pets = await fetchPetBySeller(user);
    return user;
  } catch (e) {
    console.error(e);
    return { ...error, generic: { message: 'An error occured', title: 'Error' } };
  }
};
