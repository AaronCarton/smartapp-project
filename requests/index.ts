import { Pet, User } from '../types';

const BASE_URL = 'http://192.168.0.120:5003';

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
