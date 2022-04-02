import { StyleSheet, Text, SafeAreaView, TextInput, View, Button} from 'react-native'
import React from 'react'
import dataGetter from '../utils/dataGetter'

export default function SearchByCountryScreen( {navigation} ) {
    searchQuery = ""
    const searchBtnhandler = async () => {

        searchQuery = searchQuery.trim().toLowerCase()

        if(searchQuery.length == 0){
            console.log("The search value can not be empty!")
            return
        }
        
        dataGetter.fetchMostPopulatedCities(searchQuery).then(mostPopulatedCities => {
            for(let i = 0; i < mostPopulatedCities.length; i++){
                navigation.navigate("countryResultScreen", {countryName: searchQuery.toUpperCase(), mostPopulatedCities})
            }
        }).catch(()=>{
            console.log("No result")
        })
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>SEARCH BY COUNTRY</Text>

            <TextInput
                style={styles.input}
                onChangeText={newText => {
                    console.log("Value is changing...")
                    searchQuery = newText;
                }}
            />

            <View style={styles.buttonContainer}>
                    <Button
                    onPress={searchBtnhandler}
                    title="SEARCH BY COUNTRY"
                    color="#6119e6"/>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    header: {
        marginBottom: 100,
        fontSize: 30,
        fontWeight: 'bold'
      },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
})