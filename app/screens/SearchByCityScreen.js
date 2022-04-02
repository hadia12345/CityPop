import { StyleSheet, Text, SafeAreaView, TextInput, View, Button} from 'react-native'
import React from 'react'
import dataGetter from '../utils/dataGetter'

export default function SearchByCityScreen( {navigation} ) {
    let searchQuery = "";
    const searchBtnhandler = () => {
        console.log("searching by city...")
        searchQuery = searchQuery.trim().toLowerCase()

        if(searchQuery.length == 0){
            console.log("The search value can not be empty!")
            return
        }

        // GET request using fetch
        const url = 'http://api.geonames.org/search?name_equals=' + searchQuery + '&type=json&username=weknowit'
        console.log(url)

        dataGetter.fetchCity(url).then(result => {
            console.log("Population: ", result)
            navigation.navigate("cityResultScreen", {cityName: searchQuery.toUpperCase(), cityPopulation: result})
        }).catch(()=>{
            console.log("No result")
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>SEARCH BY CITY</Text>

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
                    title="SEARCH BY CITY"
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