import { Text, View, Dimensions, Platform, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fetchPersonDetails, fetchPersonMovies, image185, image342 } from '../api/moviedb';
import axios from 'axios';
import { ModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
verticalMargin = ios ? '' : 'my-3';

export default function PersonScreen() {
    const route = useRoute(); 
    const navigation = useNavigation();
    const [isFavorite, toggleFavorite] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [person,setPerson] =useState([]);
    const [loading, setLoading] = useState(true);
    let id = route?.params?.person?.id;
    // console.log(id);
    

    useEffect(() => {
        const api = async () => {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/person/${id}?language=en-US`,
              {
                headers: {
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTA4MTdmNDk0ZDVjN2E1Y2EzYzI5YjhjNDEyYWNhYiIsIm5iZiI6MTcyNjE2MzM3NS4yNDE5OTIsInN1YiI6IjY2ZGZkZmY4MDAwMDAwMDAwMDljZjM1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ywa-1LFm4JFnfykwyB-0WfUAoSaQ2aRI7YWmONKDPqA',
                  'Content-Type': 'application/json',
                },
              }
            );
    
            setPerson(response.data); 
          } catch (error) {
            console.log('Error', error.message);
          } finally {
            setLoading(false); 
          }
        };
    
        api();


        const personmovie = async () => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`,
                {
                  headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTA4MTdmNDk0ZDVjN2E1Y2EzYzI5YjhjNDEyYWNhYiIsIm5iZiI6MTcyNjE2MzM3NS4yNDE5OTIsInN1YiI6IjY2ZGZkZmY4MDAwMDAwMDAwMDljZjM1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ywa-1LFm4JFnfykwyB-0WfUAoSaQ2aRI7YWmONKDPqA',
                    'Content-Type': 'application/json',
                  },
                }
              );
            //   console.log(response);

              if(response && response.data.cast) setPersonMovies(response.data.cast);
      
               
            } catch (error) {
              console.log('Error', error.message);
            } finally {
              setLoading(false); 
            }
          };
      
          personmovie();
      }, [id]); 
     

    

    return (
        <ScrollView className="flex-1 bg-neutral-900 " contentContainerStyle={{ paddingBottom: 20 }}>

            <SafeAreaView className={" z-20 w-full flex-row justify-between items-center px-4" + verticalMargin}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'yellow' }} className="rounded-xl p-1" >

                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
                    <HeartIcon size="35" color={isFavorite ? "red" : "white"}></HeartIcon>
                </TouchableOpacity>

            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        <View style={styles.shadow} className="flex-row justify-center">
                            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500  ">
                                <Image
                                    // source={require('../assets/images/poster_1.jpeg')}
                                    // source={{uri: image500(item.poster_path)}}
                                    source={{uri: image342(person.profile_path)}}
                                    style={{ width: width * 0.79, height: height * 0.43 }}

                                ></Image>
                            </View>
                        </View>

                        <View className="mt-6">
                            <Text className="text-3xl text-white font-bold text-center">{person.name}</Text>
                            <Text className="text-base text-neutral-500 text-center">{person.place_of_birth}</Text>
                        </View>

                        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">

                            <View className="border-r-2 border-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-white font-semibold">{person.gender==1?('Female'):'Male'}</Text>

                            </View>
                            <View className="border-r-2 border-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-white font-semibold">{person.birthday}</Text>

                            </View>
                            <View className="border-r-2 border-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">known for</Text>
                                <Text className="text-white font-semibold">{person.known_for_department}</Text>

                            </View>
                            <View className=" px-2 items-center">
                                <Text className="text-white font-semibold">Popularity</Text>
                                <Text className="text-white font-semibold">{person.popularity}</Text>

                            </View>
                        </View>
                        <View className="mt-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-400 tracking-wide">{person.biography}</Text>
                        </View>

                        <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />

                    </View>


                )
            }

        </ScrollView>
    )

}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'white',
        shadowRadius: 40,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
    }
})