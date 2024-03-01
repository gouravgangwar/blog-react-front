import React, { useEffect, useState } from "react";
import "./Seepost.css";
import base_url from "../services/api.service";
import { useParams } from "react-router-dom";
import moment from "moment";
function Seepost() {
  let { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    console.log(id);
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${base_url}blogbyid/${id}`);
      const data = await response.json();
      setData(data.data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setLoading(false);
    }
  };

  return (
    <>
      <div className="m-auto blog-post-content max-width-2 m-auto my-2">
        <h1 className="font1">{data.title}</h1>
        <div className="blogpost-meta">
          <div className="author-info">
            <div>
              <b>Author - {data.owner}</b>
            </div>
            <div>{moment(data.created_at).format("DD-MM-YYYY : HH:mm")}</div>
          </div>

        </div>
       <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
      </div>

      {/* <div className="max-width-1 m-auto">
        <hr />
      </div>
      <div className="home-articles max-width-1 m-auto font2">
        <h2>People who read this also read</h2>
        <div className="row">
          <div className="home-article more-post">
            <div className="home-article-img">
              <img src="img/11.svg" alt="article" />
            </div>
            <div className="home-article-content font1 center">
              <a href="/blogpost.html">
                <h3>
                  Learn more about Machine Learning techniques in India by
                  joining this channel
                </h3>
              </a>

              <div>Author Name</div>
              <span>07 January | 6 min read</span>
            </div>
          </div>
          <div className="home-article more-post">
            <div className="home-article-img">
              <img src="img/1.png" alt="article" />
            </div>
            <div className="home-article-content font1 center">
              <a href="/blogpost.html">
                <h3>
                  Learn more about Machine Learning techniques in India by
                  joining this channel
                </h3>
              </a>

              <div>Author Name</div>
              <span>07 January | 6 min read</span>
            </div>
          </div>
          <div className="home-article more-post">
            <div className="home-article-img">
              <img src="img/2.png" alt="article" />
            </div>
            <div className="home-article-content font1 center">
              <a href="/blogpost.html">
                <h3>
                  Learn more about Machine Learning techniques in India by
                  joining this channel
                </h3>
              </a>

              <div>Author Name</div>
              <span>07 January | 6 min read</span>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Seepost;
