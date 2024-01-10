import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../miniaturki/logo.png";
import tlo from "../../miniaturki/tlo.jpg";

function Historia() {
  const [zamowienia, setZamowienia] = useState([]);
  const navigate = useNavigate();

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

  const handleEdytujClick = (id) => {
    // Logika obsługująca kliknięcie przycisku "Edytuj" dla danego zamówienia o podanym id
    navigate(`/formularz/${id}`);
  };

  const handleSzczegolyClick = (id) => {
    // Logika obsługująca kliknięcie przycisku "Szczegóły" dla danego zamówienia o podanym id
    navigate(`/szczegoly/${id}`);
  };

  const handleUsunClick = (id) => {
    fetch(`http://localhost:4000/api/zamowienie/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Record deleted successfully
          // You can update the state or perform any other necessary actions
          console.log(`Zamówienie o id ${id} zostało usunięte.`);
        } else {
          // Handle error if the record deletion fails
          console.error(`Błąd podczas usuwania zamówienia o id ${id}`);
        }
      })
      .catch((error) => {
        console.error("Wystąpił błąd podczas usuwania zamówienia:", error);
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
            <h2>Historia Zamówień</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Pizza</th>
                  <th>Ilość</th>
                  <th>Sos</th>
                  <th>Uwagi</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {zamowienia.map((zamowienie) => (
                  <tr className={styles.row} key={zamowienie.id}>
                    <td>{zamowienie.nazwa}</td>
                    <td>{zamowienie.ilosc}</td>
                    <td>{zamowienie.sos}</td>
                    <td>{zamowienie.uwagi}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          onClick={() => handleEdytujClick(zamowienie.id)}
                        >
                          Edytuj
                        </button>
                        <button
                          onClick={() => handleSzczegolyClick(zamowienie.id)}
                        >
                          Szczegóły
                        </button>
                        <button onClick={() => handleUsunClick(zamowienie.id)}>
                          Usuń
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
              <div className={styles.wersja}>Wersja: 0.0.1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Historia;
