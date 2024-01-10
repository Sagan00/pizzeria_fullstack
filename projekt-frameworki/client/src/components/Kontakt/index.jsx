import React from "react";
import styles from "./styles.module.css";
import logo from "../../miniaturki/logo.png";
import adresImg from "../../miniaturki/adres.png";
import emailImg from "../../miniaturki/email.png";
import kontaktImg from "../../miniaturki/kontakt.png";
import tlo from "../../miniaturki/tlo.jpg";

function Kontakt() {
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
            <h2>KONTAKT</h2>
            <div className={styles.contact}>
              <p>
                <img
                  src={adresImg} 
                  height="36"
                  width="46"
                  alt="Adres: "
                />
                ul. Dragonów 15, Lublin
              </p>
              <p>
                <img
                  src={emailImg} 
                  height="36"
                  width="46"
                  alt="Email: "
                />
                pizza@onet.pl
              </p>
              <p>
                <img
                  src={kontaktImg} 
                  height="36"
                  width="46"
                  alt="Telefony: "
                />
                81 550 44 01, 81 550 44 02
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.173643972099!2d22.50289981553026!3d51.23429683845573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47225833d3b18575%3A0x11dcfd25d9840ed!2sDragon%C3%B3w%2015%2C%2020-554%20Lublin!5e0!3m2!1spl!2spl!4v1655778011504!5m2!1spl!2spl"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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

export default Kontakt;
