import type { NextPage } from "next";
import Image from "next/image";
import ReviveSvg from "../../public/images/revive.svg";
import mainHome from "../../public/images/main-home.png";
import { useState } from 'react';
import addData from '../../scripts/seedFBData';
import bcrypt from "bcryptjs";
import Router from 'next/router';
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// will seed user and home collections based on data in the json if data does not exist 
// addData();

const Login: NextPage = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { id, value } } = event;
    const updateUser = { ...user, [id]: value }
    setUser(updateUser);
  }

  const onClick = async (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { email, password } = user;

    if (!email) return setErrMsg("Email cannot be empty");
    if (!password) return setErrMsg("Password cannot be empty");

    const userRef = collection(db, "users");
    const userDoc = await getDocs(query(userRef, where("email", "==", email)));
    if (userDoc.size) {
      const userData = userDoc.docs[0].data();
      const { password: hash } = userData;
      if (bcrypt.compareSync(password, hash)) {
        localStorage.setItem("user", JSON.stringify(userData))
        Router.push("/home");
      }
      return setErrMsg("Invalid Password");
    }
    return setErrMsg(`Could not find user with email: ${user.email}`);
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow flex justify-center flex-1">
        <div className="xl:w-1/3 lg:w-1/2 p-6 sm:p-12">
          <div className="max-w-xs lg:mx-12 sm:mx-8">
            <Image
              src={ReviveSvg}
              alt="Revive Svg"
            />
          </div>
          <div className="mt-6 flex flex-col items-center mx-auto max-w-xs">
            <div className="w-full flex-1 mt-6">
              <div className="my-6">
                <span className="text-xl">
                  Sign In
                </span>
              </div>
              <input
                className="w-full px-8 py-4 rounded-lg bg-gray-100 border text-sm"
                type="email"
                id="email"
                data-testid="email"
                onChange={onChange}
                value={user.email}
                placeholder="Enter email"
                required
              />
              <input
                className="w-full px-8 py-4 rounded-lg bg-gray-100 border text-sm mt-5"
                type="password"
                id="password"
                data-testid="password"
                onChange={onChange}
                value={user.password}
                placeholder="Enter password"
                required
              />
              <button
                className="mt-5 text-gray-200 font-semibold bg-defaultBtn w-full py-4 rounded-lg hover:bg-defaultBtnHover transition-all duration-300 ease-in-out flex items-center justify-center"
                data-testid="login"
                onClick={onClick}
              >
                <span>
                  Login
                </span>
              </button>
              {errMsg && (
                <>
                  <div className="mt-6" />
                  <p className="text-sm text-red-500 text-left">{errMsg}</p>
                </>
              )}
              <p className="mt-6 text-xs text-right">
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Forgot Password?
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center hidden lg:flex">
          <div className="xl:m-16 mr-5 mt-14">
            <Image
              src={mainHome}
              alt="Main Home"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
