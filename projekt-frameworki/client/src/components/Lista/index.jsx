import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../miniaturki/logo.png";
import tlo from "../../miniaturki/tlo.jpg";

function Lista() {
  const [zamowienia, setZamowienia] = useState([]);
  const navigate = useNavigate();
  const [pizze, setPizze] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/dane") // Wykonaj żądanie GET do serwera Express
      .then((response) => response.json())
      .then((data) => setPizze(data))
      .catch((error) => {
        console.error("Błąd podczas pobierania danych:", error);
      });
  }, []); // Pusta tablica dependencies, aby efekt wykonał się tylko raz

  useEffect(() => {
    fetch("http://localhost:4000/api/zamowienia")
      .then((response) => response.json())
      .then((data) => setZamowienia(data))
      .catch((error) => {
        console.error("Błąd podczas pobierania zamówień:", error);
      });
  }, []);

  useEffect(() => {
    const fetchPizzaNames = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/pizze");
        const data = await response.json();
        const pizzaNamesMap = {};

        for (const pizza of data) {
          pizzaNamesMap[pizza.id] = pizza.nazwa;
        }

        setZamowienia((zamowienia) =>
          zamowienia.map((zamowienie) => ({
            ...zamowienie,
            nazwa: pizzaNamesMap[zamowienie.pizza],
          }))
        );
      } catch (error) {
        console.error("Błąd podczas pobierania nazw pizz:", error);
      }
    };

    fetchPizzaNames();
  }, []);

  const filterByPizza = (pizzaId) => {
    return zamowienia.filter((zamowienie) => zamowienie.pizza === pizzaId);
  };

  const redirectToDetails = (id) => {
    navigate(`/szczegolyWiecej/${id}`);
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
            <li>
              <a href="/historia">Historia Zamówień</a>
            </li>
            <li>
              <a href="/lista">Lista</a>
            </li>
          </ul>
        </nav>

        <section className={styles.podkontener}>
          <div className={styles.main}>
            <h2>Lista z zamówieniami</h2>
            <div className={styles.zamowienia}>
              <ol>
                {pizze.map((pizza) => (
                  <li key={pizza.id}>
                    <p>
                      Pizza: <strong>{pizza.nazwa}</strong>
                    </p>
                    <ul>
                      {filterByPizza(pizza.id).map((zamowienie) => (
                        <li key={zamowienie.id}>
                          <a
                            href={`http://localhost:3000/szczegolyZamowien/${zamowienie.id}`}
                            target="_self"
                            rel="noopener noreferrer"
                            className={styles.linki}
                          >
                            Nazwa: {zamowienie.nazwa},
                            Ilość: {zamowienie.ilosc}, Sos: {zamowienie.sos},
                            Uwagi: {zamowienie.uwagi}, Imię: {zamowienie.imie},
                            Nazwisko: {zamowienie.nazwisko}, Adres:{" "}
                            {zamowienie.adres}, Telefon: {zamowienie.telefon},
                            Email: {zamowienie.email}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
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
          <div className={styles.reklama}>
            <p>© Pizza 2022</p>
            <div className={styles.spolecznosc}>
              <div className={styles.wersja}>
                Wersja: 0.0.1
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lista;
