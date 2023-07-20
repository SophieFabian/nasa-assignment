import "../styles/globals.css";

import React, { useEffect, useState } from "react";
import { imgArray } from "../data/data.js";

export default function Home() {
  const NASA_PHOTOS_API =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-11-1&api_key=DEMO_KEY&page=1";

  const [photos, setPhotos] = useState(null);
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const curiosityResponse = await fetch(NASA_PHOTOS_API);
      const curiosityImages = await curiosityResponse.json();
      let error = null;
      let curiosityPhotos = null;
      if (curiosityImages.error) {
        console.log("imgArray", imgArray);
        // error = curiosityImages.error.message;
        curiosityPhotos = [
          ...imgArray,
          ...imgArray,
          ...imgArray,
          ...imgArray,
          ...imgArray,
          ...imgArray,
        ].map((photo) => {
          return {
            date: photo.date,
            id: photo.id,
            img_source: photo.img_src,
          };
        });
      } else if (Array.isArray(curiosityImages)) {
        curiosityPhotos = curiosityImages.map((photo) => {
          return {
            date: photo.date,
            id: photo.id,
            img_source: photo.img_src,
          };
        });
      }
      setError(error);
      setPhotos(curiosityPhotos);
    };
    fetchData();
  }, [page]);

  useEffect(() => {}, [page]);

  return (
    <>
      <header></header>
      <main className="page">
        <h1>Mars Images By Date</h1>
        {!!error ? (
          <>{error}</>
        ) : (
          <>
            <div
              id="images"
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {photos &&
                photos.map((photo) => {
                  return (
                    <img
                      src={photo.img_source}
                      id={photo.id}
                      date={photo.date}
                      key={photo.id}
                      style={{
                        marginRight: 24,
                        marginBottom: 24,
                        maxWidth: 250,
                      }}
                    />
                  );
                })}
            </div>
          </>
        )}
      </main>
    </>
  );
}
