
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const refreshToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to refresh token');
      const { access_token } = await response.json();
      localStorage.setItem('access_token', access_token);
      return access_token;
    } catch (err) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsAuthenticated(false);
      setError('Session expired. Please log in again.');
      return null;
    }
  };

  const apiRequest = async (url, options) => {
    let response = await fetch(url, options);
    if (response.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        options.headers['Authorization'] = `Bearer ${newToken}`;
        response = await fetch(url, options);
      }
    }
    return response;
  };

  const fetchPosts = async (query = '') => {
    setLoading(true);
    try {
      const url = query ? `http://localhost:5000/api/search?q=${encodeURIComponent(query)}` : 'http://localhost:5000/api/posts';
      const response = await apiRequest(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch posts. Please try again.');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (post) => {
    setLoading(true);
    try {
      const response = await apiRequest('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error('Failed to create post');
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
      setError(null);
    } catch (error) {
      setError('Failed to create post. Please try again.');
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id, updatedPost) => {
    setLoading(true);
    try {
      const response = await apiRequest(`http://localhost:5000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(updatedPost),
      });
      if (!response.ok) throw new Error('Failed to update post');
      const updated = await response.json();
      setPosts(posts.map(post => (post.id === id ? updated : post)));
      setError(null);
    } catch (error) {
      setError('Failed to update post. Please try again.');
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    setLoading(true);
    try {
      const response = await apiRequest(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete post');
      setPosts(posts.filter(post => post.id !== id));
      setError(null);
    } catch (error) {
      setError('Failed to delete post. Please try again.');
      console.error('Error deleting post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiRequest('http://localhost:5000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setPosts([]);
    setError(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchPosts(query);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} onSearch={handleSearch} />
        <main className="container mx-auto p-6 max-w-4xl">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
              {error}
            </div>
          )}
          {loading && (
            <div className="text-center mb-6">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" aria-label="Loading"></div>
            </div>
          )}
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/" element={
              isAuthenticated ? (
                <>
                  <BlogForm onSubmit={createPost} loading={loading} />
                  <BlogList posts={posts} onUpdate={updatePost} onDelete={deletePost} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
