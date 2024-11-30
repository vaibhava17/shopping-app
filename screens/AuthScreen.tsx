import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "@/services/firebase";
import { setUser, setError, setLoading } from "@/store/authSlice";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      dispatch(setLoading(true));
      const userCredential = await signIn(email, password);
      dispatch(
        setUser({
          id: userCredential.user.uid,
          email: userCredential.user.email!,
        })
      );
      dispatch(setLoading(false));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("An unexpected error occurred"));
      }
      dispatch(setLoading(false));
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={() => handleSignIn()} />
      <Button title="Sign Up" onPress={() => signUp(email, password)} />
    </View>
  );
};

export default Auth;
