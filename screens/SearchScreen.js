import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import { debounce } from 'lodash'
import axios from 'axios'
import { image185 } from '../api/moviedb'
const { width, height } = Dimensions.get('window')

export default function SearchScreen() {
  const navigation = useNavigation()
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  let movieName = 'Avengers Age of Ultron'


  useEffect(() => {
    if (value && value.length >= 3) {
      const searchmovie = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`,
            {
              headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTA4MTdmNDk0ZDVjN2E1Y2EzYzI5YjhjNDEyYWNhYiIsIm5iZiI6MTcyNjE2MzM3NS4yNDE5OTIsInN1YiI6IjY2ZGZkZmY4MDAwMDAwMDAwMDljZjM1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ywa-1LFm4JFnfykwyB-0WfUAoSaQ2aRI7YWmONKDPqA',
                'Content-Type': 'application/json',
              },
            }
          );
          // Extract the actual movie results
          setResult(response.data.results);
        } catch (error) {
          console.log('Error', error.message);
        } finally {
          setLoading(false);
        }
      };
  
      searchmovie();
    }
  }, [value]);
  // console.log(value);

  const handleSearch = (inputValue) => {
    setValue(inputValue);
  };





  const handleTextDebounce = useCallback(debounce(handleSearch, 600), [])

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">

        <TextInput
          onChangeText={handleTextDebounce}
          placeholder='Search Movies'
          placeholderTextColor={'lightgrey'}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        ></TextInput>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white"></XMarkIcon>
        </TouchableOpacity>

      </View>
      {
        loading ? (
          <Loading />
        ) :

          result && result.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              className="space-y-3"
            >
              <Text className="text-white font-semibold ml-1">Result {result.length}</Text>
              <View className="flex-row justify-between flex-wrap ">

                {result.map((item, index) => {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => navigation.push('Movie', item)}
                    >
                      <View className="space-y-2 mb-4">

                        {console.log(item.results)}

                        <Image className="rounded-3xl"
                          // source={require('../assets/images/poster_1.jpeg')}
                          
                          source={{ uri: image185(item.poster_path) }}
                          style={{ width: width * 0.44, height: height * 0.3 }}
                        ></Image>
                        <Text className="text-white ml-1">
                          {
                            item.title.length > 22 ?  item.title.substring(0, 22) + '...' :  item.title
                          }
                        </Text>
                      </View>


                    </TouchableWithoutFeedback>
                  )
                }
                )}
              </View>
            </ScrollView>
          ) : (
            <View className="flex-row justify-center">
              <Image source={require('../assets/images/movietime.jpg')}
                className="h-96 w-96"
              ></Image>
            </View>
          )


         
      }

    </SafeAreaView>

  )
}