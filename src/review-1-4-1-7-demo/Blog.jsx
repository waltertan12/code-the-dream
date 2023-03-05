import { useState } from "react";

const Blog = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz",
      website: "hildegard.org",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "Shanna@melissa.tv",
      website: "anastasia.net",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      email: "Nathan@yesenia.net",
      website: "ramiro.info",
    },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);

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
        <div className="users-list">
          {users.map((user) => (
            <div key={user.id}>
              <strong>{user.name}</strong>
              <p>Email: {user.email}</p>
              <p>Website: {user.website}</p>
              <button onClick={() => handleUserClick(user)}>View Posts</button>
            </div>
          ))}
        </div>
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
