
import { useState, useEffect } from 'react';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${postId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
      setError('');
    } catch (err) {
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!content.trim()) {
      setError('Comment content is required');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) throw new Error('Failed to add comment');
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setContent('');
      setError('');
    } catch (err) {
      setError('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${postId}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete comment');
      setComments(comments.filter(comment => comment.id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="comment-container" aria-label="Comments">
      <h4 className="comment-heading">Comments</h4>
      {error && <div className="blog-post-error" role="alert">{error}</div>}
      {loading && <div className="text-center">Loading...</div>}
      <div className="flex flex-col gap-2">
        <textarea
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="comment-input"
          rows="3"
          disabled={loading}
          aria-label="Comment Content"
        ></textarea>
        <button
          onClick={handleAddComment}
          className="comment-button"
          disabled={loading}
          aria-label="Add Comment"
        >
          {loading ? 'Adding...' : 'Add Comment'}
        </button>
      </div>
      <div className="comment-list">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <p className="comment-content">{comment.content}</p>
              <p className="comment-meta">By {comment.username} on {new Date(comment.created_at).toLocaleDateString()}</p>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="comment-delete"
                aria-label={`Delete comment by ${comment.username}`}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;

