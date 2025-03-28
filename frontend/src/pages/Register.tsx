// src/pages/Register.tsx
import React, { useState } from "react";
import { IonPage, IonContent, IonInput, IonButton, IonToast, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Register: React.FC = () => {
  const { register } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleRegister = async () => {
    try {
      await register(email, password);
      console.log("User registered successfully:", email);
      setShowToast(true);
      history.push("/home"); // Redirect after registration
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && <IonToast message={error} duration={2000} isOpen />}
        <IonInput placeholder="Email" type="email" onIonInput={(e) => setEmail(e.detail.value!)} />
        <IonInput placeholder="Password" type="password" onIonInput={(e) => setPassword(e.detail.value!)} />
        <IonButton expand="full" onClick={handleRegister}>Register</IonButton>
        <IonToast message="Registration successful!" duration={2000} isOpen={showToast} />
      </IonContent>
    </IonPage>
  );
};

export default Register;
