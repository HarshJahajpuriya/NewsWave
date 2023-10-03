import NewsCard from './NewsCard'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container'
import BackDrop from './Backdrop';
import React from 'react';
import BottomNav from './BottomNavigation';
import API_KEY from '../utils/constants/API_KEY';


export default function NewsContainer({ countryCode, pageSize, category, query }) {

  const [loading, setLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState();
  const [articles, setArticles] = React.useState([]);

  const topHealinesURL = `https://newsapi.org/v2/top-headlines?country=${countryCode}&pageSize=${pageSize}&page=${pageNumber}&category=${category}&apiKey=${API_KEY}`
  const queryURL = `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=f68e36adc0d64d27940fe12df3c911de`

  React.useEffect(() => {
    if(query) updateNews(queryURL);
  }, [query])

  React.useEffect(() => {
    updateNews(topHealinesURL);
  }, [pageNumber])

  React.useEffect(() => {
    updateNews(topHealinesURL);
    setPageNumber(1)
  }, [category, countryCode])


  const updateNews = async (url) => {
    setLoading(true);
    await fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTotalPages(Math.ceil(data.totalResults/pageSize))
        setLoading(false);
        setArticles(data.articles);
        const element = document.getElementById('news');
        element.scrollIntoView({behavior: 'smooth'})
      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      })
  }

  const loadNextPage = () => {
    if(pageNumber+1 <= totalPages) {
      setPageNumber(pageNumber+1);
      updateNews(topHealinesURL);
    }
  }

  const loadPreviousPage = () => {
    if(pageNumber-1 > 0) {
      setPageNumber(pageNumber - 1);
      updateNews(topHealinesURL);
    }
  }

  return (
    <>
      <Container id='news' maxWidth="lg" sx={{ paddingTop: "84px", marginBottom: '64px'}}>
        {loading && <BackDrop />}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} >
            {
              articles.map((article) => {
                return (
                  <Grid key={article.url} xs={12} sm={6} lg={4} sx={{ textAlign: 'center' }}>
                    <NewsCard title={article.title} description={article.description} url={article.url} imageUrl={article.urlToImage} source={article.source.name} time={article.publishedAt} />
                  </Grid>
                )
              })
            }
          </Grid>
        </Box>
      </Container>
      <BottomNav loadNextPage={loadNextPage} loadPreviousPage={loadPreviousPage} pageNumber={pageNumber} totalPages={totalPages} /> 
    </>
  )

}