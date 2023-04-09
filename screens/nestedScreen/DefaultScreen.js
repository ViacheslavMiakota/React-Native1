import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/config";
import { collection, doc, onSnapshot } from "firebase/firestore";
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";

const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    await onSnapshot(collection(firestore, "posts"), (data) =>
      setPosts(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    );
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/gamerwall.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
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
              <View>
                <Text>{item.comment}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={styles.btnPress}
                  onPress={() =>
                    navigation.navigate("Map", {
                      location: item.location,
                    })
                  }
                >
                  <Text style={{ color: `#fff`, margin: 8 }}>Map</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnPress}
                  onPress={() =>
                    navigation.navigate("Comment", {
                      postId: item.id,
                    })
                  }
                >
                  <Text style={{ color: `#fff`, margin: 8 }}>Comments</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  btnPress: {
    marginHorizontal: 80,
    marginTop: 20,
    // alignSelf: "center",
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
