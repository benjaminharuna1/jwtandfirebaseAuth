// src/pages/Login.tsx
import React, { useState } from "react";
import { IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel, IonAlert } from "@ionic/react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useAuth();
  const history = useHistory();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = async () => {
    try {
      await login(email, password);
      console.log("User logged in:", email);
      history.push("/home"); // Redirect to home page after login
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Login</h2>
        
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
        </IonItem>

        <IonButton expand="full" onClick={handleLogin}>
          Login
        </IonButton>

        <IonButton expand="full" fill="clear" routerLink="/register">
          Don't have an account? Register
        </IonButton>

        {error && <IonAlert isOpen={true} message={error} buttons={["OK"]} onDidDismiss={() => setError(null)} />}
      </IonContent>
    </IonPage>
  );
};

export default Login;
