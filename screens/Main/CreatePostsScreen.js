import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";

import * as Location from "expo-location";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    const location =
      await Location.getCurrentPositionAsync();
    console.log("latitude=>", location.coords.latitude);
    console.log("longitude=>", location.coords.longitude);
  };

  const sendPhoto = async () => {
    navigation.navigate("Default", { photo });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 8,
              }}
            />
          </View>
        )}
        <TouchableOpacity
          onPress={takePhoto}
          style={styles.btnContainer}
        >
          <Text style={styles.snapTitle}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
      {/* <input type={"input"} placeholder={"Name"}></input> */}
      <View>
        <TouchableOpacity
          onPress={sendPhoto}
          style={styles.sendBtn}
        >
          <Text style={styles.sendTitle}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: "80%",
    marginHorizontal: 10,
    marginTop: 40,
    borderRadius: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  snapTitle: {
    color: "#8a2be2",
  },
  btnContainer: {
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#8a2be2",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    color: "#fff",
    borderRadius: 8,
  },
  sendBtn: {
    marginHorizontal: 120,
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
});

export default CreatePostsScreen;
