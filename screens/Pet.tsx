import { Ionicons } from '@expo/vector-icons';
import { Text, View, Image, ScrollView } from 'react-native';
import tw from 'twrnc';

import Title from '../components/Pet/Title';
import Details from '../components/Pet/Details';
import AdoptButton from '../components/Pet/AdoptButton';
import Seller from '../components/Pet/Seller';
import { SafeAreaView } from 'react-native-safe-area-context';

function Pet() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          style={tw`w-full h-[35%] rounded-b-3xl`}
          source={{
            uri: 'https://www.nieuwehond.nl/wp-content/uploads/2016/09/Rottweiler-1200x675.jpg',
          }}
        />
        <View style={tw`mx-4`}>
          <Title name="Bailey" gender="female" />
          <Details
            details={[
              '4 years',
              'Rottweiler',
              'Sterile',
              'Cuddly',
              'Good with kids',
            ]}
          />
          <AdoptButton />
          <Text style={tw`text-slate-500 mb-3`}>
            Some description here Lorem ipsum dolor sit amet, consectetuer
            adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
            sociis natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
            pretium quis, sem. Nulla consequat massa quis enim. Donec pede
            justo, fringilla vel, aliquet nec
          </Text>
          <Text style={tw`text-xl font-bold`}>Location</Text>
          <Text style={tw`text-base text-slate-500`}>
            <Ionicons name="location" color={'#64748B'} size={15} />
            KortrijkStraat 123, Kortrijk
          </Text>
          <Seller
            name={'Aestas'}
            location={'Kortrijk'}
            avatar={
              'https://i1.sndcdn.com/avatars-000215336869-y6fda2-t500x500.jpg'
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Pet;
