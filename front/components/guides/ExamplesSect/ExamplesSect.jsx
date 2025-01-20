import "./ExamplesSect.css"
import Image from "next/image";

const ExamplesSect = ({ masterClassData }) => {
  return (
    <section className="examples">
      <h2>Приклади готового одягу:</h2>
      <div className="gallery">
        {masterClassData.example.map((exampl, index) =>
          <Image
            key={index}
            src={process.env.BACK_URL + exampl}
            alt="приклад"
            width={356}
            height={61}
            priority
          />
        )}
      </div>
    </section>
  );
};

export default ExamplesSect;