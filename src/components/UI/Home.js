import React, { useState, useEffect } from "react";
import axios from "../API/axios";
function Home() {
  const USER_URL = "/user";
  const [data, setData] = useState({});
  let token = localStorage.getItem("token");
  if (token){
    useEffect(() => {
      const fetchData = async () => {
        try {
          token = token.replace(/"/g, '');
          const result = await axios(USER_URL,
            {headers: { Authorization: `Bearer ${token}` }});
          setData(result.data);
        } catch (err) {
          if (err.response) {
            return <div>
              {err.response.data.message}
            </div>
          }
        }
      };
      fetchData();
    }, []);
    return (
      <div>
        <h1>This is the home page</h1>
      </div>
    );
  } else return <div>
    You need to login
  </div>
  
}

export default Home;
