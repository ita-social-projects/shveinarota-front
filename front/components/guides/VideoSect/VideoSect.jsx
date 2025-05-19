import { useLang } from "$component/Context/LangContext";
import { useState } from "react";
import "./VideoSect.css"

const VideoSect = ({ masterClassData }) => {
  const { lang } = useLang();
  const videos = lang == "ua" ? masterClassData.url : masterClassData.url_en
  const [currentVideo, setCurrentVideo] = useState(videos != null && videos?.length > 0 ? videos[0] : "");
  const [currBtn, setCurrBtn] = useState(0);


  function isValidUrl(string) {
    console.log(string);
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  function handleCurrentButton(e) {
    document.querySelector(".current-video")?.classList.remove("current-video");
    e.target.classList.add("current-video");
  }

  return (
    <section className="video">
      <div className="video__container">
        <h2>{lang == "ua" ? "Майстер-клас" : "Master class"}</h2>
        <div className="video__body">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="video__media">
            {isValidUrl(currentVideo)
              ? <iframe
                frameBorder="0"
                src={currentVideo}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              : <div>Не вдалося завнтажити відео</div>
            }
          </div>
        </div>
        <div className="video__nav">
          <span>{lang == "ua" ? "Відеокурси:" : "Video courses:"}</span>
          <div className="video__buttons">
            {videos != null && videos.map((el, i) =>
              <button key={i} value={i} className={i === 0 ? "video__button current-video" : "video__button"} onClick={(e) => {setCurrentVideo(videos[e.target.value]); handleCurrentButton(e)}}>{i + 1}</button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default VideoSect;
