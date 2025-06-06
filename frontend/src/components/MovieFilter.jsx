import styles from "./MovieFilter.module.scss";

const MovieFilter = ({ genre, setGenre, sort, setSort }) => {
  return (
    <div className={styles.filterContainer}>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>
        <option value="Drama">Drama</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Historical">Historical</option>
        <option value="Horror">Horror</option>
        <option value="Musical">Musical</option>
        <option value="Mystery">Mystery</option>
        <option value="Romance">Romance</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Thriller">Thriller</option>
        <option value="Western">Western</option>
        <option value="Animation">Animation</option>
        <option value="Family">Family</option>
        <option value="Biography">Biography</option>
        <option value="War">War</option>
        <option value="Sport">Sport</option>
        <option value="Superhero">Superhero</option>
        <option value="Documentary">Documentary</option>
        <option value="Anime">Anime</option>
        <option value="Mecha">Mecha</option>
        <option value="Romantic Sci-Fi">Romantic Sci-Fi</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort By</option>
        <option value="rating">Highest Rating</option>
        <option value="year">Newest</option>
      </select>
    </div>
  );
};

export default MovieFilter;
