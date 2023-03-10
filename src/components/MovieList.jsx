import GetPosterImage from "../utils/js/GetPosterImage"
import $ from 'jquery'
import { useEffect } from "react"
import { Link } from "react-router-dom"

function MovieList(props) {

	useEffect(() => {
		const handleOnMouseMove = e => {
			let { currentTarget: target } = e;
			let constraint = window.innerWidth / 2;
			let box = target.getBoundingClientRect();
			let calcX = -(e.clientY - box.y - (box.height / 2)) / constraint;
			let calcY = (e.clientX - box.x - (box.width / 2)) / constraint;
			let calcShine = 77 + ((calcY) + (calcX)) * 4;
			$(':root').css('--mouse-x', `${calcX}deg`);
			$(':root').css('--mouse-y', `${calcY}deg`);
			$(':root').css('--shine-strength', `${calcShine}%`);
		}

		for (const card of document.querySelectorAll(".movie-bounding-box")) {
			card.onmousemove = e => handleOnMouseMove(e);
		}
	})

	let returnHTML = []
	for (let i = 0; i < (props.amount > props.movieArray.length ? props.movieArray.length : props.amount); i++) {

		const currentMovie = props.movieArray[i]
		const movieData = currentMovie ? currentMovie : {}
		const { original_title, release_date } = movieData
		const releaseYear = release_date?.substring(0, 4)
		const posterSrc = GetPosterImage(movieData.poster_path, props.tall)

		returnHTML.push(
			<article key={i}  className="movie-bounding-box">
					<Link to={`/movie?id=${currentMovie?.id}`} state={{movie: currentMovie}}>
						<div className="movie">
							<img className={!movieData.poster_path ? 'missing-image' : ''} src={posterSrc} alt={original_title} />
							<div>
								<p className="movie-title">{original_title}</p>
								<p className="release-year">{releaseYear}</p>
							</div>
						</div>
					</Link>
				</article>
		)
	}
	return (
		<div className={props.tall ? 'tall' : 'wide'}>
			<section className="movie-list">
				{returnHTML}
			</section>
		</div>
	)
}

export default MovieList