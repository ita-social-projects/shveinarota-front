const VideoSect = ({ masterClassData }) => {
  const { lang } = useLang();

  function getEmbedUrl(url) {
    try {
      const parsedUrl = new URL(url);

      // Перевіряємо, чи це YouTube-відео
      if (parsedUrl.hostname.includes("youtube.com") || parsedUrl.hostname.includes("youtu.be")) {
        let videoId = "";

        if (parsedUrl.hostname.includes("youtu.be")) {
          // Для посилань youtu.be/VIDEO_ID
          videoId = parsedUrl.pathname.substring(1);
        } else {
          // Для посилань youtube.com/watch?v=VIDEO_ID
          videoId = parsedUrl.searchParams.get("v");
        }

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      return null;
    } catch (_) {
      return null;
    }
  }

  const embedUrl = getEmbedUrl(masterClassData.url);

  return (
    <section className="video">
      <div className="video__container">
        <h2>{lang === "ua" ? "Майстер-клас" : "Master class"}</h2>
        <div className="video__body">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="video__media">
            {embedUrl ? (
              <iframe
                frameBorder="0"
                src={embedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div>Не вдалося завантажити відео</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSect;
