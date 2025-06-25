
import { useState } from 'react';
import CommentSection from './CommentSection';

const BlogPost = ({ post, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [error, setError] = useState('');

  const handleUpdate = () => {
    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required');
      return;
    }
    onUpdate(post.id, { title, content });
    setIsEditing(false);
    setError('');
  };

  return (
    <article className="blog-post">
      {isEditing ? (
        <div className="blog-post-edit">
          {error && (
            <div className="blog-post-error" role="alert">
              {error}
            </div>
          )}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="blog-post-input"
            aria-label="Edit Post Title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="blog-post-textarea"
            rows="5"
            aria-label="Edit Post Content"
          ></textarea>
          <div className="blog-post-buttons">
            <button
              onClick={handleUpdate}
              className="blog-post-save"
              aria-label="Save Changes"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setTitle(post.title);
                setContent(post.content);
                setError('');
              }}
              className="blog-post-cancel"
              aria-label="Cancel Editing"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="blog-post-title">{post.title}</h3>
          <p className="blog-post-content">{post.content}</p>
          <div className="blog-post-buttons">
            <button
              onClick={() => setIsEditing(true)}
              className="blog-post-edit-btn"
              aria-label={`Edit post ${post.title}`}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="blog-post-delete"
              aria-label={`Delete post ${post.title}`}
            >
              Delete
            </button>
          </div>
          <CommentSection postId={post.id} />
        </div>
      )}
    </article>
  );
};

export default BlogPost;
