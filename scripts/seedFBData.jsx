
import homes from "../data/homes.json";
import users from "../data/users.json";
import bcrypt from "bcryptjs";
import { 
    collection,
    addDoc,
    query,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../src/firebase/firebaseConfig"

export default async function addData() {
    // add data from the json files into firebase if collections are empty
    const qUsers = query(collection(db, 'users'));
    onSnapshot(qUsers, (querySnapshot) => {
        if (!querySnapshot.empty) {
            return;
        }
        users.map(async user => {
            const password = await bcrypt.hash(user.password, 5)
            const hashedUser = { ...user, password };
            await addDoc(collection(db, 'users'), hashedUser);
        }) 
    })

    const qHomes = query(collection(db, 'homes'));
    onSnapshot(qHomes, (querySnapshot) => {
        if (!querySnapshot.empty) {
            return;
        }
        homes.map(async home => {
            await addDoc(collection(db, 'homes'), home);
        }) 
    })
}
