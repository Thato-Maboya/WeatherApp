//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Loading from './loading';
import { Ionicons, Feather, } from '@expo/vector-icons';

// create a component
const Weather = () => {
    const [loading, setLoading] = useState(true);
    const [currentWeather, setCurrentWeather] = useState();
    const [weatherGroup, setWeatherGroup] = useState();
    const api_key = '24f5bd578e231733bf88bcfaefa2816e'
    const [city_name = 'cape town', setCity_name] = useState();

    const fetchData = () => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&appid=' + api_key)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCurrentWeather(data)
                setNumber1(data.main.temp)
                setUnixTime(data.dt)
                console.log(data.weather[0].main)
                setWeatherGroup(data.weather[0].main)
                const group = data.weather[0].main
                if(group == "Clouds") {
                    setWheatherIcon('cloud')
                } else if(group == "Sunny") {
                    setWheatherIcon('md-partly-sunny-sharp')
                } else {
                    setWheatherIcon('rainy')
                }
                console.log(group)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false))
    }

    const handlePress = () => {
        if (!city_name) {
           alert('Please enter your city name.');
        }
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&appid=' + api_key)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCurrentWeather(data)
                setNumber1(data.main.temp)
                setUnixTime(data.dt)
                console.log(data.weather[0].main)
                setWeatherGroup(data.weather[0].main)
                const group = data.weather[0].main
                if(group == "Clouds") {
                    setWheatherIcon('cloud')
                } else if(group == "Sunny") {
                    setWheatherIcon('md-partly-sunny-sharp')
                } else {
                    setWheatherIcon('rainy')
                }
                console.log(group)
                setCity_name('')
            })
            .catch((error) => {
                console.log(error);
            })

            
    }

    useEffect(() => {
        setLoading(true)
        fetchData()
    }, [])
    const [number1, setNumber1] = useState();
    const number2 = 273.15
    const total = number1 - number2
    let roundedtotal = total.toFixed(2); 
    let roundedDegreeCelcius = Number(roundedtotal);

    const [unixTime, setUnixTime] = useState();
    const date = new Date(unixTime*1000);
    const today = date.toLocaleDateString("en-US");
  
    const [wheatherIcon, setWheatherIcon] = useState();

    

    // Function to add numbers and update total in state
    function calculateTotal() {
        setTotal(number1 - number2);
    }
   

    //const DegreeCelcius = {currentWeather.main.temp} − 273.15;

    return (
        
        <View style={styles.container}>
            {
                loading ? <Loading></Loading> :
                    <div>
                        <View style={styles.InlineWeather}>
                            <TextInput
                                style={styles.SearchInput}
                                placeholder= 'Search your city name'
                                autoCapitalize="none"
                                onChangeText={(city_name) => setCity_name(city_name)}
                            />
                            <Ionicons style={styles.SearchIcon} name="search-sharp" size={24} color="white" onPress={handlePress} />
                        </View>
                        <View style={{ alignItems: 'center', alignContent: 'center' }}>
                            <Text>Today's Weather</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Ionicons name="location" size={32} color="white" />
                                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{currentWeather.name}, {currentWeather.sys.country}</Text>
                            </View>
                            <Text style={{ color: 'white'}}>{today}</Text>
                        </View>
                        <View style={styles.Weather}>
                            <Ionicons name={wheatherIcon} size={80} color="#FCFAA1" />
                            <Text>{roundedDegreeCelcius}°C</Text>
                            <Text>Weather condition - {currentWeather.weather[0].description}</Text>
                            <Text>Weather Group - {currentWeather.weather[0].main}</Text>
                        </View>
                       
                        <View style={styles.InlineWeather}>
                            <View style={{padding: 15, alignContent: 'center',alignItems: 'center'}}>
                                <Feather name="droplet" size={30} color="white" />
                                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Humidity</Text>
                                <Text style={{color: 'white'}}>{currentWeather.main.humidity}%</Text>
                            </View>
                            <View style={{padding: 15, alignContent: 'center',alignItems: 'center'}}>
                                <Feather name="wind" size={30} color="white" />
                                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Wind</Text>
                                <Text style={{color: 'white'}}>{currentWeather.wind.speed}m/s</Text>
                            </View>
                            <View style={{padding: 15, alignContent: 'center',alignItems: 'center',}}>
                                <Feather name="cloud-rain" size={30} color="white" />
                                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Chances of rain</Text>
                                <Text style={{color: 'white'}}>{currentWeather.clouds.all}%</Text>
                            </View>
                        </View>
                    </div>
            }

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        width: '100%',
        height: '100%'
    },
    InlineWeather: {
        flexDirection: 'row',
        justifyContent: 'space-between',
     },
     Weather: {
        height: '80%',
        width: '100%',
        backgroundColor: '#0C74FC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
     },
     InlineWeatherDetails: {
        flexDirection: 'column',
        justifyContent: 'space-between',
     },
     SearchInput: {
         backgroundColor: 'white',
         borderRadius: 2,
         width: '90%',
     },
     SearchIcon: {
         marginLeft: 0
     }
});

//make this component available to the app
export default Weather;
