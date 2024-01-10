import React, { useState } from "react";
import styles from "./styles.module.css";
import logo from "../../miniaturki/logo.png";
import tlo from "../../miniaturki/tlo.jpg";

function Formularz() {
  const [formData, setFormData] = useState({
    pizza: "",
    ilosc: 0,
    dodatki: [],
    sos: "",
    imie: "",
    nazwisko: "",
    adres: "",
    telefon: "",
    email: "",
    uwagi: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        dodatki: [...prevData.dodatki, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        dodatki: prevData.dodatki.filter((dodatek) => dodatek !== value),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Wysłanie żądania do serwera z danymi formularza
    fetch("http://localhost:4000/api/zamowienie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Zamówienie zostało zapisane w bazie danych.");
          // Wyczyść formularz
          setFormData({
            pizza: "",
            ilosc: 0,
            dodatki: [],
            sos: "",
            imie: "",
            nazwisko: "",
            adres: "",
            telefon: "",
            email: "",
            uwagi: "",
          });
        } else {
          console.log("Wystąpił błąd podczas zapisywania zamówienia.");
        }
      })
      .catch((error) => {
        console.error("Wystąpił błąd podczas zapisywania zamówienia:", error);
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
                    onChange={handleInputChange}
                    name="pizza"
                    value={formData.pizza}
                  >
                    <option value="">Wybierz...</option>
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
                      id="ilosc"
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
                    id="sosselect"
                    name="sos"
                    value={formData.sos}
                    onChange={handleInputChange}
                  >
                    <option value="">Wybierz...</option>
                    <option value="Pomidorowy">Pomidorowy</option>
                    <option value="Czosnkowy">Czosnkowy</option>
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
                      id="imie"
                      name="imie"
                      pattern="^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{2,30}$"
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
                      id="nazwisko"
                      name="nazwisko"
                      pattern="^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{2,40}$"
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
                      id="adres"
                      name="adres"
                      required
                      value={formData.adres}
                      onChange={handleInputChange}
                    />
                    <br />
                  </label>
                  <label>
                    Adres email*:
                    <input
                      type="email"
                      id="email"
                      name="email"
                      pattern="[-\w.]+@([A-z0-9][-A-z-9]+\.)+[A-z]{2,4}"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <br />
                  </label>
                  <label>
                    Numer telefonu*:
                    <input
                      type="tel"
                      id="telefon"
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

              <input
                type="submit"
                value="Zapisz"
                className={styles.submit}
              />
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

export default Formularz;
