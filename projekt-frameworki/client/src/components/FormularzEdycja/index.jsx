import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../miniaturki/logo.png";
import tlo from "../../miniaturki/tlo.jpg";

function FormularzEdycja() {
  const [formData, setFormData] = useState({
    pizza: "",
    ilosc: 0,
    sos: "",
    imie: "",
    nazwisko: "",
    adres: "",
    telefon: "",
    email: "",
    uwagi: "",
  });

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/api/zamowienia/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => {
        console.error("Błąd podczas pobierania danych zamówienia:", error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:4000/api/zamowionko/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Zamówienie zostało zaktualizowane");
        } else {
          console.error("Błąd podczas aktualizowania zamówienia");
        }
      })
      .catch((error) => {
        console.error("Błąd podczas komunikacji z serwerem:", error);
      });
  };

  useEffect(() => {
    const fetchPizzaNames = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/dane");
        const data = await response.json();
        const pizzaNamesMap = {};

        for (const pizza of data) {
          pizzaNamesMap[pizza.id] = pizza.nazwa;
        }

        setFormData((prevData) => ({
          ...prevData,
          pizza: pizzaNamesMap[prevData.pizza],
        }));
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania nazw pizz:", error);
      }
    };

    fetchPizzaNames();
  }, []);

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
            <form onSubmit={handleSubmit}>
              <fieldset>
                <legend>Pizza:</legend>
                <p>
                  Wybierz rodzaj pizzy:
                  <select
                    className={styles.pizzaselect}
                    name="pizza"
                    value={formData.pizza}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Wybierz --</option>
                    <option value="Margherita">Margherita</option>
                    <option value="Capriciosa">Capriciosa</option>
                    <option value="Napoletana">Napoletana</option>
                    <option value="Roma">Roma</option>
                    <option value="Semplicita">Semplicita</option>
                  </select>
                  <br />
                  <label>
                    Podaj ilość:{" "}
                    <input
                      type="number"
                      name="ilosc"
                      value={formData.ilosc}
                      onChange={handleInputChange}
                    />
                  </label>
                </p>
              </fieldset>
              <fieldset>
                <legend>Sosy:</legend>
                <p>
                  Wybierz sos:
                  <select
                    name="sos"
                    value={formData.sos}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Wybierz --</option>
                    <option value="pomidorowy">Pomidorowy</option>
                    <option value="czosnkowy">Czosnkowy</option>
                  </select>
                </p>
              </fieldset>
              <fieldset>
                <legend>Dane:</legend>
                <div id="danne">
                  <label>
                    Imie*:
                    <input
                      type="text"
                      name="imie"
                      pattern="[a-zA-Z\s]{2,30}"
                      required
                      value={formData.imie}
                      onChange={handleInputChange}
                    />
                    <br />
                  </label>
                  <label>
                    Nazwisko*:
                    <input
                      type="text"
                      name="nazwisko"
                      pattern="[a-zA-Z\-]{2,40}"
                      required
                      value={formData.nazwisko}
                      onChange={handleInputChange}
                    />
                    <br />
                  </label>
                  <label>
                    Adres*:
                    <input
                      type="text"
                      name="adres"
                      value={formData.adres}
                      onChange={handleInputChange}
                    />
                    <br />
                  </label>
                  <label>
                    Adres email*:
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <br />
                  </label>
                  <label>
                    Numer telefonu*:
                    <input
                      type="text"
                      name="telefon"
                      pattern="[0-9]{9}"
                      required
                      value={formData.telefon}
                      onChange={handleInputChange}
                    />
                    <br />
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend>Uwagi:</legend>
                <p>
                  <textarea
                    className={styles.uwagi}
                    name="uwagi"
                    rows="5"
                    cols="40"
                    value={formData.uwagi}
                    onChange={handleInputChange}
                  ></textarea>
                </p>
              </fieldset>
              <button type="submit" className={styles.submit}>
                Zapisz zmiany
              </button>
            </form>
          </div>
        </section>

        <div className={styles.footer}>
          <p>&copy; 2023 Pizza Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default FormularzEdycja;
