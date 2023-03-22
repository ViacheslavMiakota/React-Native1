import firebase from "../../firebase/config";

export const authSignUpUser =
  (email, password, nickname) =>
  async (dispatch, getState) => {
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error message", error.message);
    }
  };

const authSignInUser =
  () => async (dispatch, getState) => {};

const authSignOutUser =
  () => async (dispatch, getState) => {};
