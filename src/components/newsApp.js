import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./App.css"

const CATEGORY = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];
const NewsApp = () => {
  const [articles, setarticle] = useState([]);
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  const loadnews = () => {
    setLoading(true);
    axios({
      method: "get",
      url: "https://newsapi.org/v2/top-headlines?country=in&apiKey=71aac45f79174d3a8576d9a682479cfe",
      params: {
        country: "in",
        apiKey: "71aac45f79174d3a8576d9a682479cfe",
        category: category,
        page: pageNum,
      },
    })
      .then((responce) => {
        console.log("response", responce);
        setarticle(responce.data.articles);
        setTotalRecords(responce.data.totalResults);
        setLoading(true);
      })
      .catch((err) => {
        console.log("error");
        setLoading([]);
      })
      .finally(() => {
        console.log("finally called");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadnews();
  }, []);

  useEffect(() => {
    loadnews();
  }, [category, pageNum]);

  const handleChange = (cat) => {
    setCategory(cat);
  };

  return (
    <>
      <div style={{ backgroundColor: "black" }}>
        {CATEGORY.map((cat, catindex) => {
          return (
            <>
              <button
                type="button"
                className={
                  category === cat ? "black button-17" : "white button-17"
                }
                onClick={() => {
                  handleChange(cat);
                }}
                style={{ margin: "20px" }}
              >
                {cat}
              </button>
            </>
          );
        })}
      </div>
      {loading ? (
        <>
          <div className="text-center">
            <div className="spinner-border" role="status"></div>
          </div>
        </>
      ) : null}
      <div style={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>
        {articles.map((article, index) => {
          return (
            <>
              <div className="card" style={{ width: "30%", margin: "10px" }}>
                <img
                  src={article.urlToImage}
                  class="card-img-top"
                  alt="..."
                  style={{ width: "100%", height: "50%" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {(article.title || "").substring(0, 50)}
                  </h5>
                  <p>{(article.content || "").substring(0, 100)}</p>
                  <p className="card-text">
                    {(article.description || "").substring(0, 200)}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          pageCount={Math.ceil(totalRecords / 20)}
          onPageChange={(res) => {
            setPageNum(res.selected + 1);
          }}
        />
      </div>
    </>
  );
};
export default NewsApp;
