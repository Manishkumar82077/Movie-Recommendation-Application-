import { View, Text, ScrollView, TouchableOpacity,Image } from 'react-native'
import React, {useState } from 'react'
import { image185 } from '../api/moviedb';


export default function Cast({ navigation,cast}) {
    let personName='keanu Reevs';
    let characterName='John wick';
    const [imageError, setImageError] = useState(false);
    return (
        <View style={{ marginTop: 6 }}>
            <Text style={{ color: 'white', fontSize: 18, marginLeft: 4, marginBottom: 5 }}>TopCast</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}

            >
                {cast && cast.map((person, index) => {

                    return (
                        <TouchableOpacity 
                            key={index}
                            style={{ marginRight: 10, alignItems: 'center' }}
                            onPress={() => navigation.navigate('Person', { person })}
                        > 
                          
                        <Image
                            // source={require('../assets/images/poster_1.jpeg')}

                            // source={{ uri: image185(person.profile_path) }}
                            source={
                              imageError
                                ? require('../assets/images/poster_1.jpeg') // Path to your local dummy image
                                : { uri: image185(person.profile_path) } // Remote API image
                            }
                            onError={() => setImageError(true)} // Fallback if image fails to load
                          

                            style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: 'white' }}
                        />
                            <Text style={{ color: 'white', marginTop: 5, fontSize: 15 }}>
                                {person?.character.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character}
                            </Text>
                            <Text style={{ color: '#8B9474', marginTop: 5, fontSize: 15 }}>
                                {person?.original_name.length > 10 ? person?.original_name.slice(0, 10) + '...' : person?.original_name}
                            </Text>
                        </TouchableOpacity>
                    );
                })

                }


            </ScrollView>
        </View>
    )
}