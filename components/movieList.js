import React, { } from "react";
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image185 } from './../api/moviedb';
var { width, height } = Dimensions.get('window');

export default function MovieList({ title, data,hideSeeAll }) {

    let movieName = 'Avengers Age of Ultron';
    const navigation = useNavigation();

    return (
        <View style={{ marginBottom: 8, marginTop: 8, marginLeft: 16 }}>
            <View style={{ marginBottom: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 20 }}>{title}</Text>
            {
                !hideSeeAll && (
                    <TouchableOpacity>
                        <Text style={{ color: 'yellow', marginRight: 16, fontSize: 20 }}>See All</Text>
                    </TouchableOpacity>
                )

            }
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>

                {data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() =>
                                navigation.navigate('Movie', item)}
                        >
                            <View style={{ marginRight: 4 }}>
                                <Image
                                    source={{ uri: image185(item.poster_path) }}
                                    style={{
                                        width: width * 0.30, height: height * 0.22,
                                        borderRadius: 20, // Add border radius
                                        borderWidth: 2, // Add border width
                                        borderColor: "#a8b85a", // Add border color 
                                    }}
                                />

                                <Text style={{ color: '#ccc', marginLeft: 1 }}>
                                    {
                                        item.title.length > 10 ? item.title.substring(0, 10) + '...' : item.title
                                    }
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </ScrollView>
        </View>
    );
}