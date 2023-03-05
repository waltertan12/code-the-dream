import { useEffect, useReducer, useState } from "react";

const getUsers = () => {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      // throw Error("oh no");
      return users;
    });
};
const initialUsersState = { error: null, users: [], isLoading: false };
const usersReducer = (state, action) => {
  switch (action.type) {
    case "USERS_FETCH_INITIATED":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "USERS_FETCH_SUCCEEDED":
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case "USERS_FETCH_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw Error(`Action type "${action.type}" not recognized`);
  }
};

const Blog = () => {
  const [usersState, usersDispatch] = useReducer(
    usersReducer,
    initialUsersState
  );
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    usersDispatch({ type: "USERS_FETCH_INITIATED" });
    setTimeout(() => {
      getUsers()
        .then((users) => {
          usersDispatch({
            type: "USERS_FETCH_SUCCEEDED",
            payload: users,
          });
        })
        .catch((error) => {
          usersDispatch({
            type: "USERS_FETCH_FAILED",
            payload: error,
          });
        });
    }, 1000);
  }, []);

  // TODO: load posts from users
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setPosts([
      {
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit... quo eos earum",
      },
      {
        id: 2,
        title: "qui est esse",
        body: "est rerum tempore vitaesequ... harum accusamus",
      },
      {
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        body: "et iusto sed quo i... qui",
      },
    ]);
  };

  if (!selectedUser) {
    return (
      <div>
        <h1>Users</h1>
        {usersState.error !== null ? <>Oh no, something went wrong 😭</> : null}
        {usersState.isLoading ? (
          <>Loading... 🚧</>
        ) : (
          <div className="users-list">
            {usersState.users.map((user) => (
              <div key={user.id}>
                <strong>{user.name}</strong>
                <p>Email: {user.email}</p>
                <p>Website: {user.website}</p>
                <button onClick={() => handleUserClick(user)}>
                  View Posts
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>{selectedUser.name}'s Posts</h2>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setSelectedUser(null)}>Back</button>
    </div>
  );
};

export default Blog;
