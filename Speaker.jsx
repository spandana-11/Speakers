import React, { useEffect, useRef, useState } from "react";
import "./Speaker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faMinus,
  faPlus,
  faPowerOff,
  faDiagramNext,
  faArrowRightArrowLeft,
  faLessThan,
  faGreaterThan,
} from "@fortawesome/free-solid-svg-icons";
const Speaker = () => {
  const dashboard = {
    width: "300px",
    height: "300px",
    background: "lightblue",
    borderRadius: "50%",
  };
  const buttons = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    // boxShadow: "2px 2px 4px grey",
  };
  const songs = [
    {
      title: "[iSongs.info] 01 - Ticket Eh Konakunda (1)",
      url: "audio_1.mp3",
    },
    {
      title: "Dill Anna",
      url: "audio_2.mp3",
    },
    {
      title: "Radhika",
      url: "audio_3.mp3",
    },
  ];
  const audioRef = useRef();
  const [offBtn, setoffBtn] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  // creating on and off
  const handleoff = () => {
    setoffBtn(!offBtn);
  };
  // play button function
  const playfun = () => {
    setisPlaying(!isPlaying);
  };
  useEffect(() => {
    if (offBtn) {
      if (isPlaying) {
        audioRef.current.play();
        document.getElementById('anim').style.display="block"
      } else {
        audioRef.current.pause();

      }
    } else {
      audioRef.current.pause();
      setisPlaying(false);
      document.getElementById('anim').style.display="none"

    }
  }, [isPlaying, offBtn]);

  const handleNext = () => {
    if (offBtn) {
      setCurrentSong((prevIndex) => (prevIndex + 1) % songs.length);
      setisPlaying(false);
      setTimeout(() => {
        setisPlaying(true);
      }, 1000);
    }
  };
  const handlePrevious = () => {
    if (offBtn) {
      setCurrentSong(
        (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
      );
      setisPlaying(false);
      setTimeout(() => {
        setisPlaying(true);
      }, 1000);
    }
  };

  // const handlePrevious = () => {
  //   setCurrentSong((prevIndex) =>
  //     (prevIndex - 1 + songs.length) % songs.length
  //   );
  // };
  const currSong = songs[currentSong];
  console.log(currSong);
  return (
    <div>
     
      <div className="speaker" style={dashboard}>
        
        <div className="actions_div">
        <div className="anim  "  id="anim">
      <p className="text-center">{currSong.title}</p>

      </div>
          <div className="top_btn">
            <button style={buttons}>
              <FontAwesomeIcon icon={faMinus} />
              {/* <i class="fa-minus"></i> */}
            </button>
            <button style={buttons}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="mid_btn">
            <audio src={currSong.url} ref={audioRef}></audio>
            <button style={buttons} onClick={handleoff} title="OFF/ON">
              {offBtn ? (
                <FontAwesomeIcon
                  icon={faPowerOff}
                  style={{ color: "green", fontSize: "20px" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPowerOff}
                  style={{ color: "red", fontSize: "20px" }}
                />
              )}
            </button>
            {/* <button style={buttons} onClick={handleoff}>{offBtn?"ON":"OFF"}</button> */}
          </div>
          <div className="btm_btn">
            <button style={buttons} onClick={playfun} title="Play/Pause">
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button style={buttons}>M</button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button className="next" onClick={handleNext} title="Next">
          <FontAwesomeIcon icon={faLessThan} />
        </button>

        <button className="previous" onClick={handlePrevious} title="Previous">
          <FontAwesomeIcon icon={faGreaterThan} />
        </button>
      </div>
    </div>
  );
};

export default Speaker;
