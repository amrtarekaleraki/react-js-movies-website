import { Container } from "react-bootstrap";
import NavBar from "./Components/NavBar";
import MoviesList from "./Components/MoviesList";
import axios from "axios";
import { React , useEffect , useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieDetails from "./Components/MovieDetails";
import { useSelector, useDispatch} from "react-redux";




function App() {

  const [movies, setMovies] = useState([])
  const [pageCount, setpageCount] = useState(0)

  const dispatch = useDispatch()

 //get all movies by axios 
  const getAllMovies = async () => {
    const res = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=5f4bb465c14b4dde1835199b6883b547&language=ar")
    setMovies(res.data.results)
    setpageCount(res.data.total_pages)
  }

   //get current page
   const getPage = async (page) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5f4bb465c14b4dde1835199b6883b547&language=ar&page=${page}`)
    setMovies(res.data.results)
    setpageCount(res.data.total_pages)
  }

  useEffect(() => {
    getAllMovies()
  }, [])


    //to search in api
    const search = async (word) => {
      if (word === "") {
        getAllMovies();
      } else {
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5f4bb465c14b4dde1835199b6883b547&query=${word}&language=ar`)
        setMovies(res.data.results)
        setpageCount(res.data.total_pages)
      }
    }


  return (
    <div className="font color-body">
        <NavBar search={search}/>
        <Container>
          <BrowserRouter>
            <Routes>
               <Route path="/" element={<MoviesList movies={movies} getPage={getPage} pageCount={pageCount} />} />
               <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </BrowserRouter>
        </Container>
    </div>
  );
}

export default App;


