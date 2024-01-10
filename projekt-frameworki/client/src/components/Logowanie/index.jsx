import React, { useState } from "react";
import styles from "./styles.module.css";
import logo from "../../miniaturki/logo.png";
import tlo from "../../miniaturki/tlo.jpg";

function Logowanie() {
  const [login, setLogin] = useState("");
  const [haslo, setHaslo] = useState("");
  const [login1, setLogin1] = useState("");
  const [haslo1, setHaslo1] = useState("");
  const [infoNick, setInfoNick] = useState("");
  const [infoHaslo, setInfoHaslo] = useState("");
  const [infoLogowanie, setInfoLogowanie] = useState("");
  const [dane, setDane] = useState("");

  const handleLogLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handleLogHasloChange = (event) => {
    setHaslo(event.target.value);
  };

  const handleRegisterLoginChange = (event) => {
    setLogin1(event.target.value);
  };

  const handleRegisterHasloChange = (event) => {
    setHaslo1(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (login1 === "") {
      setInfoNick("Podaj login.");
      return;
    }
    setInfoNick("");

    if (haslo1 === "") {
      setInfoHaslo("Podaj hasło.");
      return;
    }
    setInfoHaslo("");

    // Assign the values from the input fields to the variables
    const registerData = {
      login: login1,
      haslo: haslo1,
    };

    // Wykonaj żądanie POST do serwera, aby zarejestrować użytkownika
    fetch("http://localhost:4000/api/zapisz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/main";
        } else {
          setDane("Wystąpił błąd podczas rejestracji.");
        }
      })
      .catch((error) => {
        console.error("Błąd rejestracji:", error);
        setDane("Wystąpił błąd podczas rejestracji.");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:4000/api/sprawdz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, haslo }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/main";
        } else {
          throw new Error("Błędne dane logowania.");
        }
      })
      .catch((error) => {
        console.error("Błąd logowania:", error);
        setInfoLogowanie("Błędne dane logowania.");
      });
  };

  return (
    <div className={styles.body} style={{ backgroundImage: `url(${tlo})` }}>
      <div className={styles.kontener}>
        <div className={styles.header}>
          <img src={logo} alt="logo" className={styles.logo} />
        </div>
        <nav>
          <ul className={styles.nav}>
            <li>
              <a href="/main">Strona główna</a>
            </li>
            <li>
              <a href="/formularz">Formularz zamówienia</a>
            </li>
            <li>
              <a href="/kontakt">Kontakt</a>
            </li>
          </ul>
        </nav>

        <section className={styles.podkontener}>
          <div className={styles.main}>
            <div className={styles.uzytkownik}>
              <h2>LOGOWANIE</h2>
              <form onSubmit={handleSubmit}>
                <p>
                  <input
                    type="text"
                    name="nick"
                    id="nick"
                    placeholder="Login"
                    required
                    value={login}
                    onChange={handleLogLoginChange}
                  />
                </p>
                <p id="info_nick2"></p>
                <p>
                  <input
                    type="password"
                    name="has"
                    id="has"
                    placeholder="Hasło"
                    required
                    value={haslo}
                    onChange={handleLogHasloChange}
                  />
                </p>
                <p className={styles.info_haslo2}></p>
                <p>
                  <input type="submit" value="Zaloguj się" />
                </p>
                <br />
              </form>
              <h2>REJESTRACJA</h2>
              <form onSubmit={handleRegister}>
                <p>
                  <input
                    type="text"
                    name="nick1"
                    id="nick1"
                    placeholder="Login"
                    required
                    value={login1}
                    onChange={handleRegisterLoginChange}
                  />
                </p>
                <p id="info_nick2">{infoNick}</p>
                <p>
                  <input
                    type="password"
                    name="has1"
                    id="has1"
                    placeholder="Hasło"
                    required
                    value={haslo1}
                    onChange={handleRegisterHasloChange}
                  />
                </p>
                <p className={styles.info_haslo2}>{infoHaslo}</p>
                <p>
                  <input type="submit" value="Zarejestruj się" />
                </p>
                <br />
              </form>
              <p className={styles.info_logowanie}>{infoLogowanie}</p>
              <h3 className={styles.dane}>{dane}</h3>
            </div>
          </div>
        </section>
        <div className={styles.footer}>
          <div className={styles.szczegoly}>
            <div className={styles.stopka}>
              <p>MENU</p>
              <a href="#">Menu z dostawą</a>
              <a href="#">Menu do stolika</a>
              <a href="#">Menu na wynos</a>
            </div>

            <div className={styles.stopka}>
              <p>PIZZA</p>
              <a href="#">Restauracje</a>
              <a href="#">Praca w Pizza</a>
              <a href="#">Kontakt</a>
            </div>
            <div className={styles.stopka}>
              <p>INFORMACJE</p>
              <a href="#">Alergeny i wartości odżywcze</a>
              <a href="#">Regulaminy</a>
              <a href="#">FAQ</a>
              <a href="#">Zarządzanie cookies</a>
            </div>
          </div>
          <div className={styles.lokalizacje}>
            <a href="#">Pizza Warszawa</a>
            <span>–</span>
            <a href="#">Pizza Łódź</a>
            <span>–</span>
            <a href="#">Pizza Kraków</a>
            <span>–</span>
            <a href="#">Pizza Wrocław</a>
            <span>–</span>
            <a href="#">Pizza Gdańsk</a>
            <span>–</span>
            <a href="#">Pizza Białystok</a>
            <span>–</span>
            <a href="#">Pizza Poznań</a>
            <span>–</span>
            <a href="#">Pizza Lublin</a>
            <span>–</span>
            <a href="#">Pizza Katowice</a>
          </div>
          <div className={styles.prawa}>
            <p>© 2023 Pizzeria Wszystkie prawa zastrzeżone.</p>
            <div className={styles.social}>
              <a href="#" className={styles.fb}></a>
              <a href="#" className={styles.ig}></a>
              <a href="#" className={styles.tw}></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logowanie;
