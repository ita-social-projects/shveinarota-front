import { useLang } from "$component/Context/LangContext";
import { useState } from "react";
import "./VideoSect.css"

const VideoSect = ({ masterClassData }) => {
  const { lang } = useLang();
  const videos = lang == "ua" ? masterClassData.url : masterClassData.url_en


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
        <h2><span>{lang == "ua" ? "Майстер-клас" : "Master class"}</span>{videos != null && videos?.length > 1 && <span>(1-{videos.length})</span>}</h2>
        {videos != null && Array.isArray(videos)
          ? <> {videos.map((el, i) =>
            <div key={i} className="video__body">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="video__media">
                {isValidUrl(el)
                  ? <iframe
                    frameBorder="0"
                    src={el}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                  : <div>Не вдалося завнтажити відео</div>
                }
              </div>
            </div>
          )}</>
          : <div>Не вдалося завнтажити відео</div>
        }

      </div>
    </section>
  );
};

export default VideoSect;
