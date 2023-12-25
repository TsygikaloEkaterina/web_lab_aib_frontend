import React, { useState, createContext, useContext } from 'react';

const TagContext = createContext();

const TagProvider = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <TagContext.Provider value={{ selectedTags, toggleTag }}>
      {children}
    </TagContext.Provider>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <div>{count}</div>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </div>
  );
};

const Post = ({ id, username, text, tags, likes, onLike, onDelete }) => {
  const { toggleTag, selectedTags } = useContext(TagContext);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(id, !isLiked);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{username}</h3>
      <p>{text}</p>
      <div>
        Tags:{' '}
        {tags.map((tag) => (
          <span
            key={tag}
            onClick={() => toggleTag(tag)}
            style={{ cursor: 'pointer', marginRight: '5px', fontWeight: selectedTags.includes(tag) ? 'bold' : 'normal' }}
          >
            {tag}
          </span>
        ))}
      </div>
      <button onClick={handleLike}>{isLiked ? 'Unlike' : 'Like'}</button>
      <span style={{ marginLeft: '5px' }}>{isLiked ? likes : likes} Likes</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

const TagList = ({ tags }) => {
  const { toggleTag, selectedTags } = useContext(TagContext);

  return (
    <div style={{ marginRight: '20px' }}>
      <h2>Тэги</h2>
      {tags.map((tag) => (
        <span
          key={tag}
          onClick={() => toggleTag(tag)}
          style={{ cursor: 'pointer', marginRight: '5px', fontWeight: selectedTags.includes(tag) ? 'bold' : 'normal' }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

const PostList = () => {
  const { selectedTags } = useContext(TagContext);

  const [posts, setPosts] = useState([
    { id: 1, username: 'User1', text: 'Post 1', tags: ['Tag1', 'Tag2'], likes: 0 },
    { id: 2, username: 'User2', text: 'Post 2', tags: ['Tag2', 'Tag3'], likes: 0 },
  ]);

  const [newPost, setNewPost] = useState({ username: '', text: '', tags: [], likes: 0 });

  const handleLike = (postId, isLiked) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + (isLiked ? 1 : -1) } : post
      )
    );
  };

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleAddPost = () => {
    const newPostWithId = {
      id: posts.length + 1,
      ...newPost,
    };

    setPosts((prevPosts) => [...prevPosts, newPostWithId]);
    setNewPost({ username: '', text: '', tags: [], likes: 0 });
  };

  const uniqueTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  const filteredPosts = selectedTags.length === 0
    ? posts
    : posts.filter((post) => post.tags.some((tag) => selectedTags.includes(tag)));

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '20px' }}>
        <Counter />
        <h2>Добавить пост</h2>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={newPost.username}
            onChange={(e) => setNewPost({ ...newPost, username: e.target.value })}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Post Text"
            value={newPost.text}
            onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Tags"
            value={newPost.tags.join(',')}
            onChange={(e) => setNewPost({ ...newPost, tags: e.target.value.split(',') })}
          />
        </div>
        <button onClick={handleAddPost}>Add Post</button>
      </div>
      <div>
        <TagList tags={uniqueTags} />
        <h2>Список постов</h2>
        {filteredPosts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.username}
            text={post.text}
            tags={post.tags}
            likes={post.likes}
            onLike={handleLike}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <TagProvider>
      <div>
        <PostList />
      </div>
    </TagProvider>
  );
};

export default App;