import { firestore, auth } from "@/hooks/firebase";
import { ShoppingItem } from "@/types";

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    await firestore().collection("users").doc(userCredential.user.uid).set({
      email: email,
      lists: [],
    });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const saveShoppingList = async (
  userId: string,
  items: ShoppingItem[]
) => {
  return firestore()
    .collection("users")
    .doc(userId)
    .collection("lists")
    .doc("shoppingList")
    .set({ items });
};

export const getShoppingList = async (userId: string) => {
  const snapshot = await firestore()
    .collection("users")
    .doc(userId)
    .collection("lists")
    .doc("shoppingList")
    .get();

  return snapshot.data()?.items || [];
};
