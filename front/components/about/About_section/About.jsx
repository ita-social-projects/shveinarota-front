"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import "./About.css";

const AboutSection = () => {
  return (
    <div className="About-section">
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="About-box"
      >
        <div className="Left-side-About">
          {/* Верхний блок с заголовком и колонной */}
          <div className="side-top-About">
            <motion.h2
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="about-title"
            >
              Про нас
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="column_about"
            />
          </div>

          {/* Нижний блок с текстом */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="side-bot-About"
          >
            <p className="about-text">
              Ми - Марина Пальченко та Ксенія Самойлич, засновниці “Швейної роти”, яка пошила 100 000+ одиниць адаптивного одягу для поранених захисників у 90+ госпіталів України та об’єднала навколо себе 700+ волонтерів в усіх частинах світу.
              <br /><br />
              28-го лютого 2022 року принесли в звичайний офіс дніпровської ІТ-компанії власні швейні машинки і оверлоки та запустили <span className="highlight">“Швейну роту”</span>, аби робити балаклави та термобілизну, яку безкоштовно роздавали Захисникам. Рекорд - 498 балаклав за день!
              <br /><br />
              А у травні прийшов запит із госпіталю на <span className="highlight">“кіберодяг”</span> - це спеціальний адаптивний одяг на липучках/кнопках, який швидко одягається, не травмує і не вимагає піднімати руки/ноги пораненому воїнові.
              <br /><br />
              Так, з часом навколо “Швейної роти” зібралась крута команда дуже активних і талановитих майстринь і майстрів зі всієї України.
              <br /><br />
              Майстрині ініціативи знімають детальні покрокові відео майстер-класи з пошиття всіх виробів та оцифровані лекала, аби навіть новачки могли долучатись до ініціативи з будь-якого міста. Саме вони опубліковані в <Link className="about-link" style={{ color: "#4682B4"}} href={"/guides"}>“Навчальний центр”</Link>.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;
