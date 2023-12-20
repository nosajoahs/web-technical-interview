import type { NextPage } from "next"
import Image from "next/image"
import ReviveSvg from "../../public/images/revive.svg";
import homesImg from "../../public/images/homes.png"
import {
  collection,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useState, useEffect } from 'react';
import { db } from "../firebase/firebaseConfig"
import toast, { Toaster } from 'react-hot-toast';
import { Icon } from 'semantic-ui-react'

const Home: NextPage = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [homes, setHomes] = useState<DocumentData[]>([]);

  useEffect(() => {
    setIsAuthenticated(!!(localStorage.getItem('user')));
    if (isAuthenticated) {
      toast.success("Logged In Successfully!")
      const qHomes = collection(db, 'homes');
      onSnapshot(qHomes, (querySnapshot) => {
        const homesData = [] as DocumentData[];
        querySnapshot.forEach(doc => {
          homesData.push(doc.data());
        })
        setHomes(homesData);
      })
    }
  }, [isAuthenticated]);

  return (
    <div>
      {isAuthenticated ?
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
          <Toaster />
          <div className="text-center">
            <Image
              src={ReviveSvg}
              alt="Revive Svg"
              height={180}
              width={180}
            />
          </div>
          <main className="md:mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {homes.map((home, id) => (
              <div key={id} className="p-6 border-2 border-gray-100 rounded overflow-hidden shadow-lg flex flex-col">
                <Image
                  src={homesImg}
                  alt="Home Img"
                  // style={{hover: "contain"}}
                />
                <h2 className="capitalize font-bold text-gray-800">{home.address}</h2>
                <div className="text-gray-600 flex pb-4">
                  <span>
                    &nbsp;&nbsp;&nbsp;{home.bedrooms}&nbsp;
                    <Icon circular name="bed" />
                  </span>
                  <span>
                    &nbsp;&nbsp;{home.bathrooms}&nbsp;
                    <Icon circular name="bath" />
                  </span>
                  <span>
                    {home.yearBuilt}&nbsp;
                    <Icon circular name="calendar alternate" />
                  </span>
                  <span>
                    {home.sqft.toLocaleString()} sqft &nbsp;
                    <Icon circular name="home" />
                  </span>
                </div>
                <span className="">
                  {`${home.city}, ${home.state} ${home.zipCode}`}
                </span>
              </div>
            ))}
          </main>
        </div> : <div>Please login to view this Page</div>}
    </div>
  )
}

export default Home
