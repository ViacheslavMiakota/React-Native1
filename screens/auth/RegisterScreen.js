import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
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
  nickName: "",
};
import { useDispatch } from "react-redux";

import { registerUser } from "../../redux/auth/authOperations";

const RegisterScreen = ({ navigation }) => {
  const [isShowKeyBoard, setIsShowKeyBoard] =
    useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
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
    dispatch(registerUser(state));
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
                top: 60,
                marginBottom: isShowKeyBoard ? 20 : 100,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>
                  Hello
                </Text>
              </View>
              <View>
                <View style={styles.boxImg}>
                  <Image
                    source={{ uri: "app_icon" }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                      backgroundColor: "#fff",
                    }}
                  />
                </View>
                <Text style={styles.headerTitle}>
                  Sing up in to get started
                </Text>
                <TextInput
                  placeholder={"NICK NAME"}
                  style={styles.input}
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                  }}
                  value={state.nickName}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      nickName: value,
                    }))
                  }
                />
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
                <Text style={styles.btnTitle}>
                  REGISTER
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 40,
                  alignSelf: "center",
                }}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={{ color: "#000" }}>
                  Registered{"   "}
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#ff4500",
                    }}
                  >
                    Sign in
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

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  form: {
    marginHorizontal: 36,
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
    borderRadius: 8,
    marginTop: 8,
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
    marginBottom: 10,
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
