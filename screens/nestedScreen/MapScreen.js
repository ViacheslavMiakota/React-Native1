import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.location;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/gamerwall.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.006,
          }}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
              title: "travel photo",
            }}
          />
        </MapView>
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
});
export default MapScreen;
