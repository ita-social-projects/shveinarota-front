import "./MasterClassSect.css"
import Link from "next/link";

const MasterClassSect = ({ masterClassData }) => {
  return (
    <section className="master-class">
      <h1 style={{ marginBottom: '20px', fontSize: '26px', textAlign: 'center' }}>
        {masterClassData.title}
      </h1>
      <h2>Лекала:</h2>
      <ul>
        {masterClassData.lekala.map((lekalo, index) =>
          <li key={index}>
            Розмір {index + 1} - <Link href={process.env.BACK_URL + lekalo} target="_blank">завантажити</Link>
          </li>
        )}
      </ul>
    </section>
  );
};

export default MasterClassSect;