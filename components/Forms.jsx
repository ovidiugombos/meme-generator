import React from "react";

export default function Forms() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    imageUrl: "https://i.imgflip.com/1g8my4.jpg",
  });

  const [allMeme, setAllMeme] = React.useState("");

  React.useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function handleMemeImage(event) {
    event.preventDefault();
    const random = Math.floor(Math.random() * 99);
    const url = allMeme[random].url;
    console.log(url);
    setMeme((prevMeme) => ({
      ...prevMeme,
      imageUrl: url,
    }));
  }

  return (
    <div className="forms">
      <form>
        <input
          type="text"
          placeholder="top text"
          onChange={handleChange}
          name="topText"
          value={meme.topText}
        />
        <input
          type="text"
          placeholder="bottom text"
          onChange={handleChange}
          name="bottomText"
          value={meme.bottomText}
        />
        <button onClick={handleMemeImage}>Get a new meme image</button>
      </form>
      <div className="meme">
        <img className="meme--image" src={meme.imageUrl} />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
}
