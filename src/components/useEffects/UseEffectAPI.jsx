import React, { useEffect, useState } from 'react';
import './UseEffectAPI.css'; // Import the CSS file

const UseEffectAPI = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch("https://api.github.com/users/");
    const data = await response.json();

    // Fetch additional user details
    const detailedUsers = await Promise.all(
      data.map(async (user) => {
        const userDetailsResponse = await fetch(user.url);
        return await userDetailsResponse.json();
      })
    );

    setUsers(detailedUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="main-container">
      <h1>List of GitHub Users</h1>
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          {users.map((user) => (
            <div className='col-10 col-md-4 mt-5 user-card' key={user.id}>
              <div className='card'>
                <div className='card-body d-flex align-items-center'>
                  <img src={user.avatar_url} alt={user.login} className='avatar rounded' />
                  <div className="ml-3 w-100">
                    <h4 className="mb-0 mt-0 text-left">{user.login}</h4>
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer" className='text-left profile-link'>
                      {user.html_url}
                    </a>
                    <div className='stats mt-2 d-flex justify-content-around rounded'>
                      <div className='d-flex flex-column'>
                        <span className="articles">Public Repos</span>
                        <span className="number">{user.public_repos}</span>
                      </div>
                      <div className='d-flex flex-column'>
                        <span className="followers">Followers</span>
                        <span className="number">{user.followers}</span>
                      </div>
                      <div className='d-flex flex-column'>
                        <span className="following">Following</span>
                        <span className="number">{user.following}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseEffectAPI;
