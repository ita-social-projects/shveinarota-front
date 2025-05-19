"use client";

import "./About_text.css";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutTextSection = () => {
  return (
    <div className="About_text_box">
    <motion.div
      className="About_text_left"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Історія роти
      </motion.h1>
      <div className="About_Left_column"></div>
      <motion.p
        className="about-text"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Ми - Марина Пальченко та Ксенія Самойлич, засновниці “Швейної роти”, яка пошила 100 000+ одиниць адаптивного
        одягу для поранених захисників у 90+ госпіталів України та об’єднала навколо себе 700+ волонтерів в усіх
        частинах світу.
        <br />
        <br />
        28-го лютого 2022 року принесли в звичайний офіс дніпровської ІТ-компанії власні швейні машинки і оверлоки та
        запустили <span className="highlight">“Швейну роту”</span>, аби робити балаклави та термобілизну, яку
        безкоштовно роздавали Захисникам. Рекорд - 498 балаклав за день!
        <br />
        <br />
        А у травні прийшов запит із госпіталю на <span className="highlight">“кіберодяг”</span> - це спеціальний
        адаптивний одяг на липучках/кнопках, який швидко одягається, не травмує і не вимагає піднімати руки/ноги
        пораненому воїнові.
        <br />
        <br />
        Так, з часом навколо “Швейної роти” зібралась крута команда дуже активних і талановитих майстринь і майстрів
        зі всієї України.
        <br />
        <br />
        Майстрині ініціативи знімають детальні покрокові відео майстер-класи з пошиття всіх виробів та оцифровані
        лекала, аби навіть новачки могли долучатись до ініціативи з будь-якого міста. Саме вони опубліковані в{" "}
        <Link className="about-link" style={{ color: "#4682B4" }} href={"/guides"}>
          “Навчальний центр”
        </Link>
        .
      </motion.p>
    </motion.div>

    <motion.div
      className="About_text_right"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="About_text_right_top">
        <Link href="/guides" className="shveya_about-button">
          <Image
            src="/images/about/icons/shveya.png"
            width={85}
            height={85}
            alt="Home"
            className="shveya_button_about"
          />
          <span className="shveya_button_about_text">Навчання</span>
        </Link>

        <Link href="/questions" className="hospital_about-button">
          <Image
            src="/images/about/icons/light-bulb.png"
            width={75}
            height={75}
            alt="Guides"
            className="hospital_button_about"
          />
          <span className="shveya_button_about_text">Часті питання</span>
        </Link>
      </div>

      <motion.div
        className="About_text_right_bot"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="About_right_column"></div>
        <h1>Цікаве</h1>
      </motion.div>
    </motion.div>
  </div>

  );
};

export default AboutTextSection;
