import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        {/* <div>
          <img
            className={styles.logo}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58cCGmmFdKjaaU_otro1uki2TonktrPrTYg&s"
            alt="caju"
          />
        </div> */}
        <div className={styles.contact}>
          <p>Contacto: contacto@mediapp.com</p>
          <div className={styles["social-icons"]}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
            />

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
            />
          </div>
        </div>
        <div className={styles.creator}>
          <Link
            to={"https://api.whatsapp.com/send?phone=543513769092"}
            target="_blank"
          >
            <p>MeddiApp</p>
          </Link>
          <p>v 1.0.0</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
