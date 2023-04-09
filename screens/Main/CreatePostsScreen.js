import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";

import { db, storage, firestore } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const { userId, nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  // const [permission, requestPermission] =
  //   Camera.useCameraPermissions();
  // if (!permission) {
  //   // Camera permissions are still loading
  //   return <View />;
  // }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet
  //   return (
  //     <View style={styles.container}>
  //       <Text style={{ textAlign: "center" }}>
  //         We need your permission to show the camera
  //       </Text>
  //       <Button
  //         onPress={requestPermission}
  //         title="grant permission"
  //       />
  //     </View>
  //   );
  // }

  // function toggleCameraType() {
  //   setType((current) =>
  //     current === CameraType.back
  //       ? CameraType.front
  //       : CameraType.back
  //   );
  // }
  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("Default");
  };

  const uploadPostToServer = async () => {
    const uploadPhoto = await uploadPhotoToServer();
    const uploadObj = {
      photo: uploadPhoto,
      comment,
      location: location.coords,
      userId,
      nickName,
    };
    const dbRef = collection(firestore, "posts");
    const dbPost = await addDoc(dbRef, uploadObj);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniqePostId = Date.now().toString();
    const data = ref(storage, `postImage/${uniqePostId}`);
    await uploadBytes(data, file);

    const processPhoto = await getDownloadURL(data);
    return processPhoto;
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/gamerwall.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ marginHorizontal: 20 }}>
          <Camera style={styles.camera} ref={setCamera} type={type}>
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image
                  source={{ uri: photo }}
                  style={{
                    width: 180,
                    height: 200,
                    borderRadius: 8,
                  }}
                />
              </View>
            )}
            <TouchableOpacity onPress={takePhoto} style={styles.btnContainer}>
              <Text style={styles.snapTitle}>SNAP</Text>
            </TouchableOpacity>
          </Camera>
          <Text>Take photo</Text>
        </View>

        <TextInput
          type={"input"}
          placeholder={"Comment"}
          style={styles.input}
          onChangeText={setComment}
        ></TextInput>
        <View>
          <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
            <Text style={styles.sendTitle}>SEND</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  camera: {
    height: 480,
    marginTop: 40,
    borderRadius: 8,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  snapTitle: {
    color: "#8a2be2",
  },
  btnContainer: {
    borderWidth: 2,
    borderColor: "#8a2be2",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    bottom: 24,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    color: "#fff",
    borderRadius: 8,
  },
  sendBtn: {
    marginHorizontal: 80,
    height: 40,
    borderWidth: 2,
    borderColor: "#000080",
    borderRadius: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `#87ceeb`,
  },
  sendTitle: {
    color: "#000080",
    fontSize: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: "#a9a9a9",
    height: 40,
    marginTop: 16,
    color: "#000",
    marginHorizontal: 36,
  },
});

export default CreatePostsScreen;
