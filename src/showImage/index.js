import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const App = ({ route }) => (
    <View style={styles.container}>
        <Text>images</Text>     
        {route.params.map((el,index) => {          
            return (
                <Image
                    style={styles.image}
                    source={{
                        uri: route.params[index].uri,
                    }}
                />
            )
        })}
    </View>
);

export default App