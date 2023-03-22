import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnPress}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: `#fff` }}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
export default ProfileScreen;
