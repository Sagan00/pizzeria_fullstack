import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../miniaturki/logo.png";
import tlo from "../../miniaturki/tlo.jpg";

function SzczegolyZamowien() {
  const { id } = useParams();
  const [zamowienie, setZamowienie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/zamowienia1/${id}`)
      .then((response) => response.json())
      .then((data) => setZamowienie(data))
      .catch((error) => {
        console.error("Błąd podczas pobierania danych zamówienia:", error);
      });
  }, [id]);

  useEffect(() => {
    const fetchPizzaNames = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/pizze");
        const data = await response.json();
        const pizzaNamesMap = {};
        const pizzaIngredientsMap = {}; // Nowy obiekt mapujący składniki pizzy
        const pizzaPricesMap = {}; // Nowy obiekt mapujący składniki pizzy

        for (const pizza of data) {
          pizzaNamesMap[pizza.id] = pizza.nazwa;
          pizzaIngredientsMap[pizza.id] = pizza.skladniki; // Mapowanie składników pizzy
          pizzaPricesMap[pizza.id] = pizza.cena; // Mapowanie składników pizzy
        }

        setZamowienie((zamowienie) => ({
          ...zamowienie,
          nazwa: pizzaNamesMap[zamowienie.pizza],
          skladniki: pizzaIngredientsMap[zamowienie.pizza], // Przypisanie składników do zamówienia
          cena: pizzaPricesMap[zamowienie.pizza], // Przypisanie składników do zamówienia
        }));
      } catch (error) {
        console.error("Błąd podczas pobierania nazw pizz:", error);
      }
    };

    fetchPizzaNames();
  }, []);

  if (!zamowienie) {
    return <div>Loading...</div>;
  }

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
              <a href="/formularz">Formularz zamowienia</a>
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
            <h2>Szczegóły zamówienia</h2>
            <table className={styles.tabelka}>
              <thead>
                <tr>
                  <th>Pizza</th>
                  <th>Składniki</th>
                  <th>Cena/szt</th>
                  <th>Ilość</th>
                  <th>Sos</th>
                  <th>Uwagi</th>
                  <th>Imię</th>
                  <th>Nazwisko</th>
                  <th>Adres</th>
                  <th>Telefon</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{zamowienie.nazwa}</td>
                  <td>{zamowienie.skladniki}</td>
                  <td>{zamowienie.cena}</td>
                  <td>{zamowienie.ilosc}</td>
                  <td>{zamowienie.sos}</td>
                  <td>{zamowienie.uwagi}</td>
                  <td>{zamowienie.imie}</td>
                  <td>{zamowienie.nazwisko}</td>
                  <td>{zamowienie.adres}</td>
                  <td>{zamowienie.telefon}</td>
                  <td>{zamowienie.email}</td>
                </tr>
              </tbody>
            </table>
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

export default SzczegolyZamowien;
