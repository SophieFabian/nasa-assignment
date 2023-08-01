import "../styles/globals.css";

import React, { useEffect, useState, useRef } from "react";
import { imgArray } from "../data/data.js";
import Pagination from "../src/components/Pagination";

export default function Home() {
  const NASA_PHOTOS_API =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
  const IMAGES_PER_PAGE = 10;
  const API_PAGE = 3;

  // const queryParams = `?earth_date=${
  //   new Date().toISOString().split("T")[0]
  // }&api_key=DEMO_KEY&page=${API_PAGE}`;

  const queryParams = `?earth_date=2020-04-17&api_key=DEMO_KEY&page=${API_PAGE}`;

  const [photos, setPhotos] = useState(null);
  const [photosOnPage, setPhotosOnPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const curiosityResponse = await fetch(`${NASA_PHOTOS_API}${queryParams}`);
      const curiosityImages = await curiosityResponse.json();
      let error = null;
      let curiosityPhotos = null;
      let currentPhotos = null;
      if (curiosityImages.error) {
        // error = curiosityImages.error.message;
        curiosityPhotos = imgArray.map((photo) => {
          return {
            date: photo.date,
            id: photo.id,
            img_source: photo.img_src,
          };
        });
      } else if (Array.isArray(curiosityImages.photos)) {
        curiosityPhotos = curiosityImages.photos.map((photo) => {
          return {
            date: photo.earth_date,
            id: photo.id,
            img_source: photo.img_src,
          };
        });
      }
      setError(error);
      // console.log(
      //   "🚀 API_PAGE",
      //   API_PAGE,
      //   "||| curiosityPhotos:||||",
      //   JSON.stringify(curiosityPhotos)
      // );

      const min = (currentPage - 1) * IMAGES_PER_PAGE;
      const max = currentPage * IMAGES_PER_PAGE;
      currentPhotos = curiosityPhotos.slice(min, max);
      setPhotosOnPage(currentPhotos);
      setPhotos(curiosityPhotos);
    };
    fetchData();
  }, [currentPage]);

  const filterPhotos = () => {
    const filteredPhotos = photos.filter((photo) => {
      return photo.date.split("-")[0] === date.split("-")[0];
    });

    setPhotosOnPage(filteredPhotos);
  };

  return (
    <>
      <header></header>
      <main className="page">
        <h1>Mars Images By Date</h1>
        {!!error ? (
          <>{error}</>
        ) : (
          <>
            <div className="search-container">
              <span>Earth date: </span>
              <input
                type="date"
                placeholder="please enter date"
                className="search-input"
                onChange={(e) => setDate(e.target.value)}
              />
              <button
                className="search-button"
                onClick={filterPhotos}
                disabled={!date}
              >
                Search
              </button>
            </div>
            <div
              id="images"
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {photosOnPage &&
                photosOnPage.map((photo) => {
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
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={photos?.length || 0}
              pageSize={8}
              onPageChange={(page) => setCurrentPage(page)}
            />
            <a className="nav-button" href="/">
              Home
            </a>
          </>
        )}
      </main>
    </>
  );
}
