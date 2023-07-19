import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/slice";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

  {
    /*
      Email Regex
      ^ - Start of the string.
      [^\s@]+ - Match one or more characters that are not whitespace or '@'.
      @ - Match the '@' symbol.
      [^\s@]+ - Match one or more characters that are not whitespace or '@'.
      \. - Match the '.' symbol.
      [^\s@]+ - Match one or more characters that are not whitespace or '@'.
      $ - End of the string.

      passwordRegex
      ^ - Start of the string.
      (?=.*[a-z]) - Positive lookahead to ensure there is at least one lowercase letter.
      (?=.*[A-Z]) - Positive lookahead to ensure there is at least one uppercase letter.
      (?=.*\d) - Positive lookahead to ensure there is at least one digit.
      (?=.*[@$!%*?&]) - Positive lookahead to ensure there is at least one special symbol. Feel free to modify this character class with your desired set of special symbols.
      [A-Za-z\d@$!%*?&]{8,} - Match a combination of uppercase letters, lowercase letters, digits, and special symbols of at least length 8.
      $ - End of the string.
      */
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const isFormValid =
    isValidEmail &&
    isValidPassword &&
    ((isLogin && !isUser) ||
      (!isLogin &&
        formData.firstName.split(" ").join("").length > 0 &&
        formData.lastName.split(" ").join("").length > 0 &&
        formData.phoneNumber.split(" ").join("").length === 10));

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    });
    setIsValidEmail(false)
    setIsValidPassword(false)
    setIsPasswordFocused(false)
  };

  const handleChange = (e) => {
    if (isUser) setIsUser(false);
    if (message) setMessage("");

    let value = e.target.value;

    if (e.target.name === "firstName" || e.target.name === "lastName") {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    if (e.target.name === "email") {
      const isValid = emailRegex.test(e.target.value);
      setIsValidEmail(isValid);
    }
    if (e.target.name === "password") {
      const isValid = passwordRegex.test(e.target.value);
      setIsValidPassword(isValid);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? `${import.meta.env.VITE_BASE_URL}/auth/login`
      : `${import.meta.env.VITE_BASE_URL}/auth/register`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isLogin
            ? { email: formData.email, password: formData.password }
            : formData
        ),
      });

      const loggedIn = await response.json();
      console.log(loggedIn);
      if (isLogin) {
        if (loggedIn.msg) {
          setMessage(loggedIn.msg);
        } else if (response.ok) {
          dispatch(
            setLogin({
              user: loggedIn.newUser,
              token: loggedIn.token,
            })
          );
          navigate(-1);
        }
      } else {
        if (loggedIn?.isUser) {
          setIsUser(true);
        } else {
          toggleForm();
          navigate("/user");
        }
      }
    } catch (error) {
      console.log("Error ", error);
    }
  };

  return (
    <div className="flex w-full min-h-screen justify-center items-center bg-[#563E72] ">
      <div className="min-h-fit min-w-[23rem] mx-2">
        <form
          action="post"
          onSubmit={handleOnSubmit}
          className="bg-white p-6 rounded-sm shadow-md "
        >
          <h1 className="text-center text-[2.5rem] font-lobster pb-5">
            {isLogin ? "Login" : "Register"}
          </h1>
          {!isLogin && isUser && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-[0.7rem] ">
              <span className="block sm:inline">
                User already exists. Please choose a different email.
              </span>
            </div>
          )}
          {isLogin && message && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-[0.7rem]">
              <span className="block sm:inline">{message}</span>
            </div>
          )}

          {isLogin ? (
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-base text-gray-600">
                  Email:
                </label>
                <div className={`flex items-center border rounded-md focus-within:ring-2 ${isValidEmail ? ' ring-green-500' : 'ring-red-500'}`}>
                  <img src="/mail.png" alt="mail" className="h-6 px-3" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email "
                    className="w-full p-2 outline-none text-base border-l rounded-r-md"
                  />
                </div>
              </div>

              <div className="flex flex-col relative">
                <label htmlFor="password" className="text-base text-gray-600">
                  Password:
                </label>
                <div className={`flex items-center border rounded-md focus-within:ring-2 ${isValidPassword ? ' ring-green-500' : 'ring-red-500'}`}>
                  <img src="/padlock.png" alt="mail" className="h-6 px-3 " />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)} 
                    placeholder="Password"
                    required
                    className="w-full p-2 outline-none border-l  rounded-r-md"
                  /> 
                </div>

                {!isValidPassword && isPasswordFocused && <div className="absolute bg-white border rounded-md ring-1 ring-yellow-300 bottom-[2.8rem] right-0 pl-4 pr-2">
                  <ul
                    className="text-xs text-gray-500 list-disc overflow "
                    style={{ overflowWrap: "break-word" }}
                  >
                    
                    <li>At least 1 Uppercase Character</li>
                    <li>At least 1 Lowercase Character</li>
                    <li>At least 1 Special Character</li>
                    <li>Must be 8 Characters long</li>
                  </ul>
                </div>}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flexwrap">
                <div className="flex flex-col">
                  <label
                    htmlFor="firstName"
                    className="text-base text-gray-600"
                  >
                    Name:
                  </label>
                  <div className="flex items-center border rounded-md">
                    <img src="/user.png" alt="user" className="h-6 px-3" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="First Name"
                      className="w-full p-2 outline-none border-l  rounded-r-md"
                    />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Last Name"
                      className="w-full p-2  outline-none border-l  rounded-r-md"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-base text-gray-600">
                  Email:
                </label>
                <div className={`flex items-center border rounded-md focus-within:ring-2 ${isValidEmail ? ' ring-green-500' : 'ring-red-500'}`}>
                  <img src="/mail.png" alt="mail" className="h-6 px-3" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    className="w-full p-2 outline-none border-l rounded-r-md"
                  />
                </div>
              </div>

              <div className="flex flex-col relative">
                <label htmlFor="password" className="text-base text-gray-600">
                  Password:
                </label>
                <div className={`flex items-center border rounded-md focus-within:ring-2 ${isValidPassword ? ' ring-green-500' : 'ring-red-500'}`}>
                  <img src="/padlock.png" alt="mail" className="h-6 px-3 " />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)} 
                    placeholder="Password"
                    required
                    className="w-full p-2 outline-none border-l rounded-r-md"
                  />
                </div>

                {!isValidPassword && isPasswordFocused && <div className="absolute bg-white border rounded-md ring-1 ring-yellow-300 bottom-[2.8rem] right-0 pl-4 pr-2">
                  <ul
                    className="text-xs text-gray-500 list-disc overflow "
                    style={{ overflowWrap: "break-word" }}
                  >
                    
                    <li>At least 1 Uppercase Character</li>
                    <li>At least 1 Lowercase Character</li>
                    <li>At least 1 Special Character</li>
                    <li>Must be 8 Characters long</li>
                  </ul>
                </div>}
            </div>
              <div className="flex flex-col">
                <label
                  htmlFor="phoneNumber"
                  className={`text-base text-gray-600 `}
                >
                  Phone Number:
                </label>
                <div className={`flex items-center border rounded-md focus-within:ring-2 ${formData.phoneNumber.split(" ").join("").length===10?'ring-green-500':'ring-red-500 '}`}>
                  <img
                    src="/Navbar/phone.png"
                    alt="phone"
                    className="h-6 px-3"
                  />
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="Phone Number"
                    className="w-full p-2 outline-none border-l rounded-r-md"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`bg-black text-white py-2 w-full mt-8 ${
              !isFormValid ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={!isFormValid}
          >
            {isLogin ? "Login" : "Register"}
          </button>

          <h1
            onClick={toggleForm}
            className="text-gray-600 cursor-pointer mt-2 text-[0.7rem] text-center"
          >
            {isLogin
              ? "Don't have an account? Sign Up!"
              : "Already have an account? Login!"}
          </h1>
        </form>
      </div>
    </div>
  );
};
