import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

import { authSignInUser } from "../../redux/auth/authOperations";

import { useDispatch } from "react-redux";

const LoginScreen = ({ navigation }) => {
  const [isShowKeyBoard, setIsShowKeyBoard] =
    useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setDimensions(width);
    };
    const dimensionsHandler = Dimensions.addEventListener(
      "change",
      onChange
    );
    return () => dimensionsHandler.remove();
  }, []);

  const handleSubmit = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/damion-club-p.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={
              Platform.OS === "ios" ? "padding" : "height"
            }
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyBoard ? 20 : 100,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>
                  Hello again
                </Text>
                <Text style={styles.headerTitle}>
                  Welcome back
                </Text>
              </View>
              <View>
                <TextInput
                  placeholder={"EMAIL ADRESS"}
                  style={styles.input}
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                  }}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                />
              </View>
              <View>
                <TextInput
                  placeholder={"PASSWORD"}
                  style={styles.input}
                  secureTextEntry={true}
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                  }}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.btn}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTitle}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                }}
                onPress={() =>
                  navigation.navigate("Register")
                }
              >
                <Text style={{ color: "#fff" }}>
                  New to aplication{"  "}
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#ff4500",
                    }}
                  >
                    Sign up
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    height: 40,
    marginTop: 8,
    borderRadius: 8,
    color: "#000",
    textAlign: "center",
  },
  inputText: {
    fontSize: 12,
    marginBottom: 8,
    fontFamily: "NotoSerif",
  },
  btn: {
    height: 40,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    marginHorizontal: 40,
    ...Platform.select({
      ios: {
        backgroundColor: "blue",
        borderColor: "transparent",
      },
      android: {
        backgroundColor: "#d2b48c",
        borderColor: "#frfefe",
      },
    }),
  },
  btnTitle: {
    color: "#f0ffff",
    fontSize: 18,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: "#000",
    fontFamily: "NotoSerif",
    textAlign: "center",
  },
  inputImg: {
    width: 250,
    height: 250,
  },
  boxImg: {
    marginHorizontal: 120,
    width: 120,
    height: 120,
    marginBottom: 10,
  },
});
