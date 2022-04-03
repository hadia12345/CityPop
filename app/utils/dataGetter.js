const dataGetter = {
    fetchMostPopulatedCities: (countryName) => {
        const url = 'http://api.geonames.org/search?q=' + countryName + '&cities=cities15000&orderby=population&type=json&username=weknowit'
        return new Promise((resolve, reject) => {
            fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => {
                if(response.ok){
                    console.log("It was OK!")
                    return response.json()
                }
            }) 
            .then(data => {
                if(data.totalResultsCount !== 0 ){
                    let mostPopulatedCities = []
                    let counter = 0
                    let index = 0
                    /*
                        Trying to find three most populated cities in this country. We validate 
                        cities by looking at their county name and comparing that with provided 
                        country name
                    */
                    while( counter < 3 ){
                        if(!data.geonames[index]){
                            break
                        }
                        else if(data.geonames[index].countryName.toLowerCase() === countryName){
                            mostPopulatedCities.push({"cityName": data.geonames[index].toponymName, "cityPopulation": data.geonames[index].population})
                            counter++
                        }
                        index++
                    }

                    if(mostPopulatedCities.length > 0){
                        resolve(mostPopulatedCities)
                    }
                    reject();
                }
                reject();
            })
        })

    },
    fetchCityPopulation: (cityName) => {
        const url = 'http://api.geonames.org/search?q=' + cityName + '&type=json&username=weknowit'

        return new Promise((resolve, reject) => {
            fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => {
                    if(response.ok){
                        console.log("It was OK!")
                        return response.json()
                    }
                }) 
                .then(data => {

                    /* 
                        Most relevant place seems to be the first element (place) in the list  
                        therefore we will validate the first element (place). If it is not valid
                        we inform user that no place is found by rejecting this promise
                    */
                   console.log(data.geonames[0].name.toLowerCase())
                   console.log(cityName)
                   try{
                        if(data.totalResultsCount !== 0 && data.geonames[0].fclName.includes("city") 
                        && data.geonames[0].population > 0 && data.geonames[0].name.toLowerCase() === cityName){
                            resolve(data.geonames[0].population)
                        }
                        reject();
                   }
                   catch(error){
                        reject();
                   }
                    
                });            
        });

        
    }
}

export default dataGetter