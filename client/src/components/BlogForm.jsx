
import { useState } from 'react';

const BlogForm = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required');
      return;
    }
    onSubmit({ title, content });
    setTitle('');
    setContent('');
    setError('');
  };

  return (
    <section className="blog-form-container">
      <h2 className="blog-form-heading">Create a New Post</h2>
      {error && <div className="blog-post-error" role="alert">{error}</div>}
      <div className="blog-form-fields">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="blog-form-input"
          disabled={loading}
          aria-label="Post Title"
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="blog-form-textarea"
          rows="5"
          disabled={loading}
          aria-label="Post Content"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="blog-form-button"
          disabled={loading}
          aria-label={loading ? 'Creating post' : 'Create Post'}
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </div>
    </section>
  );
};

export default BlogForm;
