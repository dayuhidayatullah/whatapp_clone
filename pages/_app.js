import { useEffect } from "react";
import "@/styles/globals.css";
import Login from "@/pages/login";
import Loading from "@/components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, collection, db, getDocs } from "@/firebaseConfig";
import { serverTimestamp, doc, setDoc } from "@firebase/firestore";
export default function App({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      // collection()
      const userRef = doc(db, "users", user.uid);
      setDoc(
        userRef,
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoUrl: user.photoURL,
        },
        { merge: true }
      ).catch(alert);
      // getDocs(userRef)
      //   .then((user) => {
      //     return setDoc(user(db, "users", user?.email), {
      //       email: user.email,
      //       lastSeen: serverTimestamp(),
      //       photoUrl: user.photoUrl,
      //     });
      //   })
      //   .then((el) => {
      //     console.info(el, ">><<< el");
      //   })
      //   .catch((err) => {
      //     console.info(err, "<<<< error");
      //   });
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;
  return <Component {...pageProps} />;
}
