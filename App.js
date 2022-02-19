
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Picker from './src/imagePicker'
import ShowImage from './src/showImage'

function HomeScreen({ navigation }) {
  function goToImagePicker(imageUri) {
    navigation.navigate("Details", imageUri)
  }
  return <Picker goToImagePicker={goToImagePicker} />
}


function DetailsScreen({ route }) {
  return (
    <ShowImage route={route} />
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;