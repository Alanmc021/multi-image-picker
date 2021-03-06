import React, { useMemo, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Alert, Image } from 'react-native';
import { AssetsSelector } from 'expo-images-picker';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
//import StatusBarPlaceHolder from './components/StatusBarPlaceholder';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//import CustomNavigator from './components/CustomNavigator';
import { MediaType } from 'expo-media-library';

const ForceInset = {
    top: 'never',
    bottom: 'never',
};

// IOS users , make sure u can use the images uri to upload , if your getting invalid file path or u cant work with asset-library:// 
// Use = > getImageMetaData: true which will be little slower but give u also the absolute path of the Asset. just console loge the result to see the localUri

// See => https://docs.expo.dev/versions/latest/sdk/media-library/#assetinfo

export default function App({ navigation, goToImagePicker }) {

    const [imageUri, setImageUri] = useState([])

    const onSuccess = (data) => {
        //Alert.alert('Done', data.length + 'Images selected')
        //console.log(data);
        //setImageUri(data)
        goToImagePicker(data)
    };

    const widgetErrors = useMemo(
        () => ({
            errorTextColor: 'black',
            errorMessages: {
                hasErrorWithPermissions: 'Please Allow media gallery permissions.',
                hasErrorWithLoading: 'There was an error while loading images.',
                hasErrorWithResizing: 'There was an error while loading images.',
                hasNoAssets: 'No images found.',
            },
        }),
        []
    );

    const widgetSettings = useMemo(
        () => ({
            getImageMetaData: false, // true might perform slower results but gives meta data and absolute path for ios users
            initialLoad: 100,
            assetsType: [MediaType.photo, MediaType.video],
            minSelection: 1,
            maxSelection: 3,
            portraitCols: 4,
            landscapeCols: 4,
        }),
        []
    );

    const widgetResize = useMemo(
        () => ({
            width: 50,
            compress: 0.7,
            base64: false,
            saveTo: 'jpeg',
        }),
        []
    );

    const _textStyle = {
        color: 'white',
    };

    const _buttonStyle = {
        backgroundColor: 'orange',
        borderRadius: 5,
    };

    const widgetNavigator = useMemo(
        () => ({
            Texts: {
                finish: 'finish',
                back: 'back',
                selected: 'selected',
            },
            midTextColor: 'black',
            minSelection: 1,
            buttonTextStyle: _textStyle,
            buttonStyle: _buttonStyle,
            onBack: () => { goToImagePicker(imageUri) },
            onSuccess: (e) => onSuccess(e),
        }),
        []
    );

    const widgetStyles = useMemo(
        () => ({
            margin: 2,
            bgColor: 'white',
            spinnerColor: 'blue',
            widgetWidth: 99,
            videoIcon: {
                Component: Ionicons,
                iconName: 'ios-videocam',
                color: 'tomato',
                size: 20,
            },
            selectedIcon: {
                Component: Ionicons,
                iconName: 'ios-checkmark-circle-outline',
                color: 'white',
                bg: '#0eb14970',
                size: 26,
            },
        }),
        []
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView forceInset={ForceInset} style={styles.container}>
                {/* <StatusBarPlaceHolder /> */}
                <View style={styles.container}>
                    <AssetsSelector
                        Settings={widgetSettings}
                        Errors={widgetErrors}
                        Styles={widgetStyles}
                        Navigator={widgetNavigator}
                        Resize={widgetResize}  
                    />
                </View>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
