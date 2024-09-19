import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Bars3BottomLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import TreandingMovies from '../components/treandingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';


const ios = Platform.OS == 'ios';

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(()=>{
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
   


  },[])

  const getTrendingMovies = async () => {

    const data= await fetchTrendingMovies();
   
    // console.log('got trending movies',data);
    if(data && data.results){
      setTrending(data.results);
    }
    setLoading(false);

  }

  const getUpcomingMovies = async () => {

    const data= await fetchUpcomingMovies()
    // console.log('got upcomming movies',data);
   
    if(data && data.results){
      setUpcoming(data.results);
    }
    setLoading(false);

  }

  const getTopRatedMovies = async () => {

    const data= await fetchTopRatedMovies();
   
    // console.log('got toprated movies',data);
    if(data && data.results){
      setTopRated(data.results);
    }
    setLoading(false);

  }

  


  return (
    <View className="flex-1 bg-neutral-800">

      <SafeAreaView className={ios ? "-mb-2" : 'mb-3'}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">

          <Bars3BottomLeftIcon size="30" strokeWidth={2} color="white" />

          <Text className="text-white text-3xl font-bold">
            <Text style={{ color: 'yellow' }}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
            <MagnifyingGlassIcon size='30' strokeWidth={2} color={"white"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading?(
          <Loading/>
        
        ):(
          <ScrollView showVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
  
  
         {trending.length>0 && <TreandingMovies data={trending} />}
  
          <MovieList title="Upcoming" data={upcoming} />
  
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>

        )
      }
    

    </View>
  );
}