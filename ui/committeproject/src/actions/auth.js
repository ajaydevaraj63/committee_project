import axios from "axios";
import * as api from "../api";
import { AUTH, FORGOT, LOGOUT, RESET } from "../constants/actionTypes";
export const signOut = (navigate) => async (dispatch) => {
  try {
    await dispatch({ type: LOGOUT })
    await navigate("/")

  } catch (error) {

  }

}
export const signIn = (formData, navigate) => async (dispatch) => {
  try {


    console.log("111", formData);
    var data = { "Email": formData.Email }
    console.log("@@@@@", data)
    //log in action
    const UserData = await api.signin(data); //data containes token and result



    console.log(UserData)
    const LocalData = UserData.data.data;
    LocalData.Token = formData.Token;

    if (UserData.data.data.Type === 0) {
      dispatch({ type: AUTH, LocalData })

      console.log("localsss", LocalData)
      navigate("/dashboardInno/homeInno");
    }
    if (UserData.data.data.Type === 1) {
      dispatch({ type: AUTH, LocalData })
      navigate("/dashboard/app");
    }
    if (UserData.data.data.Type === 2) {
      dispatch({ type: AUTH, LocalData })
      navigate("/dashboard/app");
    }
    const Data = JSON.parse(localStorage.getItem("Profile")).Token
    console.log("1", Data)


  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    //signUp in action
    console.log(formData);
    const { data } = await api.signup(formData);
    console.log(data);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    /* console.log(error); */

  }
};

//forgot password action
export const forgotPassword = (email) => async (dispatch) => {
  try {
    await api.forgotpassword(email);
    dispatch({ type: FORGOT });
  } catch (error) {
    console.log(error);
  }
};

//password reset action
export const resetPassword = (formData, id, token) => async (dispatch) => {
  try {
    await api.resetpassword(formData, id, token);
    dispatch({ type: RESET });
  } catch (error) {
    console.log(error);
  }
};
