import { useState } from "react";
import MovieItem from "./MovieItem";
import styles from "./MovieList.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const MovieList = ({ movies = [] }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className={styles.container}>
      <h1>🎥 Movie Library</h1>

      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieItem
            key={movie._id}
            movie={movie}
            onSelect={setSelectedMovie}
          />
        ))
      ) : (
        <p>No movies found.</p>
      )}

      <AnimatePresence>
        {selectedMovie && (
          <div
            className={styles.modalOverlay}
            onClick={() => setSelectedMovie(null)}
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              <div className={styles.block}>
                <h1>{selectedMovie.title}</h1>
                <div>
                  <div className={styles.table}>
                    <h3>
                      Director: <a href="">{selectedMovie.director}</a>
                    </h3>
                    <h3>Genre: {selectedMovie.genre}</h3>
                  </div>
                </div>
                <div className={styles.desc}>
                  <h3>
                    <b>Description:</b>
                  </h3>
                  <p className={styles.DescRiption}>
                    <br />
                    {selectedMovie.description || "No description available."}
                  </p>
                </div>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setSelectedMovie(null)}
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieList;
