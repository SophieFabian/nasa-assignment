import "../styles/globals.css";

import React, { useEffect, useState } from "react";

export default function Home() {
  const NASA_PHOTOS_API =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-11-1&api_key=DEMO_KEY&page=1";

  const [photos, setPhotos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const curiosityResponse = await fetch(NASA_PHOTOS_API);
      const curiosityImages = await curiosityResponse.json();
      console.log(
        "🚀 ~ file: index.jsx:16 ~ fetchData ~ curiosityImages:",
        curiosityImages
      );
      let error = null;
      let curiosityPhotos = null;
      if (curiosityImages.error) {
        error = curiosityImages.error.message;
      } else {
        curiosityPhotos = curiosityImages.map((photo) => {
          return {
            date: photo.date,
            id: photo.id,
            img_source: photo.img_src,
          };
        });
      }
      setError(error);
      setPhotos(photos);
    };
    fetchData();
  }, []);
  console.log("ERROR", error);
  return (
    <>
      <header></header>
      <main className="page">
        <div>
          <h1>About The Program</h1>
          <div className="main-content">
            <img
              className="rover-img"
              src="https://images-assets.nasa.gov/image/PIA15952/PIA15952~orig.jpg"
            />
            <div className="details">
              <p>
                Cupcake ipsum dolor sit amet bonbon sweet roll. Tootsie roll
                jelly chocolate cake powder lollipop chocolate shortbread.
                Cotton candy chupa chups sweet gummies caramels marzipan bonbon
                marshmallow. Tiramisu wafer cotton candy tart cookie halvah.
                Jelly cookie cake lollipop wafer bear claw cake toffee. Jelly
                beans chocolate dragée jelly-o gummies caramels apple pie muffin
                jelly-o. Sweet icing oat cake croissant chocolate bar sweet roll
                cake. Soufflé gummi bears gummies cake bear claw. Chocolate cake
                chocolate marzipan pastry danish. Candy muffin apple pie muffin
                dessert shortbread jelly-o.
                <br />
                Gummies bear claw marshmallow gummi bears brownie. Icing biscuit
                macaroon tootsie roll wafer candy soufflé sesame snaps cake.
                Toffee toffee apple pie gummies jelly beans dessert muffin.
                Danish carrot cake candy canes chocolate cake jelly-o toffee.
                Halvah bear claw marzipan biscuit icing donut muffin donut. Bear
                claw chocolate caramels tart gummi bears dessert carrot cake.
              </p>

              <a className="nav-button" href="/images">
                View Images By Date
              </a>
              <a className="nav-button" href="/weather">
                View Weather
              </a>
            </div>
          </div>
          <div>
            <h3>
              Curiosity rover images <span>from today</span>
            </h3>
            <div
              id="images"
              style={{
                display: "flex",
                height: 300,
                width: "90%",
                overflow: "scroll",
              }}
            >
              {!!error ? (
                <>{error}</>
              ) : (
                !!photos &&
                photos.map((photo) => {
                  return (
                    <img
                      src={photo.img_source}
                      id={photo.id}
                      date={photo.date}
                      key={photo.id}
                      style={{ marginRight: 24 }}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
