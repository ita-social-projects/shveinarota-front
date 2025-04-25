import Link from "next/link";
import "./About.css";

const AboutSectionEn = () => {
  return (
    <div className="About-section">
      <div className="About-box">
        <div className="Left-side-About">
          {/* Верхний блок с заголовком и колонной */}
          <div className="side-top-About">
            <h2 className="about-title">About us</h2>
            <div className="column_about"></div>
          </div>

          {/* Нижний блок с текстом */}
          <div className="side-bot-About">
            <p className="about-text">
              We are Maryna Palchenko and Kseniia Samoilych, co-founders of "Shveina Rota" — a volunteer sewing initiative that has produced over 100,000 pieces of adaptive clothing for wounded defenders across 90+ hospitals in Ukraine, uniting more than 700 volunteers from all over the world.
              <br /><br />
              On February 28, 2022, we brought our own sewing machines and overlockers into a regular office of a Dnipro-based IT company and launched <span className="highlight">“Shveina Rota”</span> to make balaclavas and thermal underwear, which we distributed to defenders free of charge. Our record — 498 balaclavas in one day!
              <br /><br />
              In May, we received a request from a hospital for <span className="highlight">“cyber clothing”</span> — special adaptive wear with Velcro or snap fasteners that can be put on quickly, without causing pain or requiring a wounded soldier to lift their arms or legs.
              <br /><br />
              Over time, an amazing team of highly skilled and passionate craftswomen and tailors from across Ukraine gathered around "Shveina Rota."
              <br /><br />
              Our volunteers created detailed step-by-step video master classes on sewing all products and digitized patterns so that even beginners can join the initiative from any city. These resources are published in our <Link className="about-link" style={{ color: "#4682B4" }} href={"/guides"}>“Training Center”</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSectionEn;
