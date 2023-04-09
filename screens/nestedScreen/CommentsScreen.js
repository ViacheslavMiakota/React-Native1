import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/config";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import { collection, setDoc, doc, onSnapshot } from "firebase/firestore";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [loading, setLoading] = useState(true);

  const { nickName } = useSelector((state) => state.auth);

  const createPost = async () => {
    try {
      const postRef = doc(collection(firestore, "comments", postId, "posts"), postId);
      await setDoc(postRef, {
        comment,
        nickName,
      });
      setComment("");
      console.log("Post created successfuly", comment);
    } catch (error) {
      console.log("error creating post:", error);
    }
  };
  const getAllPosts = async () => {
    onSnapshot(collection(firestore, "comments", postId, "posts"), (data) => {
      const allPosts = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllComment((prev) => [...prev, ...allPosts]);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/gamerwall.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <SafeAreaView style={styles.container}>
          <FlatList
            data={allComment}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.commentContainer}>
                <Text>{item.nickName}</Text>
                <Text>{item.comment}</Text>
              </View>
            )}
            keyExtractor={(item, index) => item.id + index}
          />
        </SafeAreaView>
        <View style={styles.inputContainer}>
          <TextInput
            type={"input"}
            placeholder={"Comments"}
            style={styles.input}
            onChangeText={setComment}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
          <Text style={styles.sendTitle}>Add post</Text>
        </TouchableOpacity>
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
  commentContainer: {
    borderWidth: 1,
    borderColor: "a9a9a9",
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  sendBtn: {
    marginHorizontal: 80,
    height: 40,
    borderWidth: 2,
    borderColor: "#000080",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `#87ceeb`,
  },
  sendTitle: {
    color: "#000080",
    fontSize: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#a9a9a9",
    height: 50,
    color: "#000",
    marginHorizontal: 36,
  },
});
export default CommentsScreen;
