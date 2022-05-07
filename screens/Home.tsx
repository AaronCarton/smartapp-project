import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View, Button } from '../components/Custom';
import { BottomTabParamList, RootStackParamList } from '../navigation/index';

import { fetchAllPets, fetchUser } from '../requests';
import { Pet } from '../types';
import { TagInput } from '../components/Tags';
import { useAuth } from '../hooks/Auth';

export default () => {
  let tabNav = useNavigation<NavigationProp<BottomTabParamList, 'Home'>>();
  const { user, setUser } = useAuth();

  return (
    <View>
      <Text className="my-4 text-center text-2xl">
        Welcome{user && `, ${user.username}`}
      </Text>
      {user && user!.favorites.length > 0 && (
        <Button
          title="Check out your favorites"
          onPress={() => tabNav.navigate('Search', { petList: user?.favorites })}
        />
      )}
    </View>
  );
};
