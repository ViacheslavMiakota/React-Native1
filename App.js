import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/fone-book.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.form}>
          <View>
            <Text style={styles.inputText}>
              EMAIL ADRESS
            </Text>
            <TextInput
              style={styles.input}
              textAlign={"center"}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.inputText}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              textAlign={"center"}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTitle}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  form: {
    marginHorizontal: 40,
  },
  text: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    height: 40,
    borderRadius: 8,

    color: "#000",
  },
  inputText: {
    fontSize: 18,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "green",
    height: 40,
    marginTop: 35,
    borderRadius: 8,
    justifyContent: "center",
  },
  btnTitle: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});
