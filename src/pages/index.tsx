import type { NextPage } from "next"
import Image from "next/image"
import ReviveSvg from "../../public/images/revive.svg";
import mainHome from "../../public/images/main-home.png";

const Login: NextPage = () => {
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
          <div className="mt-12 flex flex-col items-center mx-auto max-w-xs">
            <div className="w-full flex-1 mt-8">
              <div className="my-8">
                <span className="text-gray-600 text-xl">
                  Sign In
                </span>
              </div>
              <input
                className="w-full px-8 py-4 rounded-lg bg-gray-100 border text-sm"
                type="email"
                id="email"
                placeholder="Enter email"
                required
              />
              <input
                className="w-full px-8 py-4 rounded-lg bg-gray-100 border text-sm mt-5"
                type="password"
                id="password"
                placeholder="Enter password"
                required
                minLength={5}
              />
              <button
                className="mt-5 font-semibold text-indigo-100 bg-revive w-full py-4 rounded-lg hover:bg-gray-400 transition-all duration-300 ease-in-out flex items-center justify-center">
                <span>
                  Login
                </span>
              </button>
              <p className="mt-6 text-xs text-gray-600 text-right">
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
