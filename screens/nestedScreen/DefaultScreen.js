import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";

const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log("params", route.params);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 8,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{
                width: 350,
                height: 250,
                borderRadius: 10,
              }}
            />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.btnPress}
        onPress={() => navigation.navigate("Map")}
      >
        <Text style={{ color: `#fff` }}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnPress}
        onPress={() => navigation.navigate("Comment")}
      >
        <Text style={{ color: `#fff`, margin: 8 }}>
          Comments
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  btnPress: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: `#8a2be2`,
    minWidth: 80,
    height: 40,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default DefaultScreen;
