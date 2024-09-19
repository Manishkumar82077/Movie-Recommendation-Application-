import { View,Text,StyleSheet, TouchableWithoutFeedback,Image,Dimensions} from 'react-native';
import React,{} from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from './../api/moviedb';

var {width, height} = Dimensions.get('window');

export default function TreandingMovies({data}) {

     const navigation=useNavigation();

     const handleClick = (item) => {

      navigation.navigate('Movie',item);

     }

    return (
      <View style={styles.container}>
        <Text style={[styles.text, { fontWeight: 'bold', fontSize: 24 }]}>
          <Text style={{ color: 'green' }}>T</Text>rending
        </Text>

        <Carousel
          data={data}
          renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
          firstItem={1}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.62}
          slideStyle={{ display: 'flex', alignItems: 'center' }}
        >
        </Carousel>
      </View>
    );
}

const MovieCard = ({item, handleClick}) => {
  // console.log('itemposterpath',item.poster_path)
  return (
    <TouchableWithoutFeedback  onPress={()=> handleClick(item)}>
       
      <Image 
      // source={require('../assets/images/poster_1.jpeg')}
      source={{uri: image500(item.poster_path)}}
        
        style={{ 
          width: width*0.6,
          height: height*0.44,
          borderRadius: 20, // Add border radius
          borderWidth: 2, // Add border width
          borderColor: "#a8b85a", // Add border color
        }} 
        
      
      ></Image>
      
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
    container: {
      marginBottom: 32,  // Equivalent to "mb-8" in Tailwind CSS
    },
    text: {
      color: 'white',
      fontSize: 20,      // Equivalent to "text-xl"
      marginHorizontal: 16,  // Equivalent to "mx-4"
      marginBottom: 20,      // Equivalent to "mb-5"
    },
});
