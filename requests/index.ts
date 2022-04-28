import * as ImagePicker from 'expo-image-picker';
import { FormError, Pet, User } from '../types';

const BASE_URL = `http://172.30.22.44:5003`;
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

// export const postUser = async (user: User): Promise<User> => {
//   try {
//     let formdata = new FormData();
//     let imageData = user.image;
//     formdata.append('username', user.username);
//     formdata.append('password', user.password!);
//     formdata.append('email', user.email);
//     formdata.append('location', user.location);
//     formdata.append('image', {
//       // @ts-ignore
//       uri: imageData.uri,
//       name: imageData.filename,
//       type: imageData.type!,
//     });
//     const response = await fetch(`${BASE_URL}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: new FormData(),
//     });

//     var user: User = await response.json();
//     user.image = `${BASE_URL}/images/users/${user.id}.webp`;
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };

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
    return user;
  } catch (e) {
    console.error(e);
    return { ...error, generic: { message: 'An error occured', title: 'Error' } };
  }
};
