import React, { useState, useEffect } from 'react';
import "./NewsComponents/News.css"

const NewsApp = () => {
  const API_KEY = "0ec423b07b4e48029695da7ad19c3b79";
  const url = "https://newsapi.org/v2/everything?q=";
  const [articles, setArticles] = useState([]);
  const [selectedNav, setSelectedNav] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNews("pakistan");
  }, []);

  const reload = () => {
    window.location.reload();
  };

  const fetchNews = async (query) => {
    try {
      const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
      const data = await res.json();
      setArticles(data.articles);
      console.log(articles)
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const bindData = () => {
    return articles.map((article, index) => {
   
      if (!article.urlToImage) return null;
      return (
        <div key={index} onClick={() => window.open(article.url, "_blank")}>
           
          <img   src={article.urlToImage} alt="News"/>
          <h3> {article.title}</h3>
          <h6 className="news-source">{`${article.source.name} ${new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })} `}</h6>
          <p className="news-desc">{article.description}</p>
        </div>
      );
    });
  };

  const onNavItemClick = (id) => {
    fetchNews(id);
    setSelectedNav(id);
    
  };
   

  const onSearchButtonClick = () => {
    if (!searchQuery) return;
    fetchNews(searchQuery);
    setSelectedNav(null);
  };

  return (
    <div className='BCN'>
      <div className="main-nav container flex">
        <a href="#" onClick={reload} className="company-logo">
          <img src="https://media.istockphoto.com/id/1387606902/vector/latest-news-label-with-megaphone-breaking-news-announce-loudspeaker-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=3u2wix939RRD52zitMt5WcWQJvL_HRyDrR4Pyryz0h4=" alt="Company Logo" />
        </a>
        <div className="nav-links">
          <ul className="flex">
            <li className={`hover-link nav-item ${selectedNav === 'ipl' ? 'active' : ''}`} onClick={() => onNavItemClick('ipl')}>
              Ipl
            </li>
            <li className={`hover-link nav-item ${selectedNav === 'finance' ? 'active' : ''}`} onClick={() => onNavItemClick('finance')}>
              Finance
            </li>
            <li className={`hover-link nav-item ${selectedNav === 'politics' ? 'active' : ''}`} onClick={() => onNavItemClick('politics')}>
              Politics
            </li>
          </ul>
          
        </div>
        <div className="search-bar">
          <input
            id="search-text"
            type="text"
            className="news-input"
            placeholder="e.g science"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={onSearchButtonClick}>
            Search
          </button>
        </div>
      </div>

      <main>
        <div className="cards-container container flex" id="cards-container">
          {bindData()}
        </div>
      </main>
    </div>
  );
};

export default NewsApp;
 