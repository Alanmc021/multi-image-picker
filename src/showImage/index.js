import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import firebase from "../../firebase"
//import RNFetchBlob from 'react-native-fetch-blob';
import * as ImagePicker from 'expo-image-picker';

const App = ({ route }) => {
    const [uri, setUri] = useState([])

    // const uploadImage = async (uri) => {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //     var ref = firebase.storage().ref().child("imagesValidationID/")
    //     //getUriInFirebase(imageName)
    //     return ref.put(blob);
    // }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        //console.log(result);

        if (!result.cancelled) {
            uploadBlobVideo(result.uri);
        }
    };

    function uploadBlobVideo(file) {
        const key = Math.random().toString()
        const ref = firebase.storage().ref().child(`activityVideos/professorId/${key}`);
        fetch(file)
            .then((res) => {
                return res.blob()
            })
            .then((res) => {
                ref.put(res);
            })
            .then((res) => {
                getUriInFirebase(`activityVideos/professorId/${key}`)
            })
            .catch((erro) => {
                console.log(erro);
            })
    }


    function uploadBlob(file) {
        const key = Math.random().toString()
        const ref = firebase.storage().ref().child(`activityImagens/professorId/${key}`);
        fetch(file)
            .then((res) => {
                return res.blob()
            })
            .then((res) => {
                ref.put(res);
            })
            .then((res) => {
                getUriInFirebase(`activityImagens/professorId/${key}`)
            })
            .catch((erro) => {
                console.log(erro);
            })
    }

    function getUriInFirebase(imageName) {
        setTimeout(() => {
            var ref = firebase.storage().ref().child(imageName)
            ref.getDownloadURL()
                .then((url) => {
                    console.log(JSON.stringify(url));
                })
                .catch((error) => {
                    alert('Erro de conexao!! Enviar imagem novamente' + error)
                })
        }, 500);
    }

    return (
        <View style={styles.container}>
            <Text>images</Text>
            {route.params.map((el, index) => {
                uploadBlob(route.params[index].uri)
                return (
                    <View key={index} >
                        <Image
                            key={index}
                            style={styles.image}
                            source={{
                                uri: route.params[index].uri,
                            }}
                        />
                        {/* <TouchableOpacity key={index + "a"} onPress={() => { uploadBlob(route.params[index].uri) }}>
                            <Text style={{ fontSize: 16 }}>Enviar imagem</Text>
                        </TouchableOpacity> */}
                    </View>
                )
            })}
            <Text>Exibir imagens do banco</Text>
            <TouchableOpacity onPress={() => { pickImage() }}>
                <Text style={{ fontSize: 16 }}>Enviar Video</Text>
            </TouchableOpacity>
        </View>
    )
}

export default App