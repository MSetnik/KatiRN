import { firestore } from "./firebase-init"
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

// Fetching store data
export const getStoreData = async () => {
    const storeCol = collection(firestore, 'store');
    const citySnapshot = await getDocs(storeCol);
    const lStores = citySnapshot.docs.map(doc => doc.data());
    return lStores
}