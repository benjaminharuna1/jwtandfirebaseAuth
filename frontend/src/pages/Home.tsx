// src/pages/Home.tsx
import React from "react";
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonText, IonButton } from "@ionic/react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText>
          <h3>Welcome, {user?.email}!</h3>
          <h2>An Essay on API Best Security Practices</h2>
          <p>
            API security is essential for protecting data and ensuring secure communication
            between systems. A well-secured API helps prevent unauthorized access, data leaks, and
            cyber threats.
          </p>
          
          <p>
            One of the key security measures is <b>authentication and authorization</b>. Using
            standards like <b>JWT or OAuth 2.0</b> ensures that only authorized users can access
            resources. Additionally, encrypting data with <b>SSL/TLS</b> prevents attackers from
            intercepting sensitive information.
          </p>

          <p>
            APIs should also implement <b>rate limiting</b> to prevent abuse and <b>input validation</b>
            to block SQL injection and cross-site scripting (XSS) attacks. Logging and monitoring
            API requests help detect suspicious activity early, improving security response.
          </p>

          <p>
            By following these best practices, APIs can remain secure, reliable, and efficient,
            protecting both users and organizations from potential threats.
          </p>
        </IonText>

        <IonButton expand="full" color="danger" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
