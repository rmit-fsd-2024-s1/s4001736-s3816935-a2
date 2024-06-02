import { useState, useEffect, useContext } from "react";
import { getUsers, blockUser, getReviews, deleteReview } from "../data/repository";
import MessageContext from "../contexts/MessageContext";

export default function Users() {
  const [users, setUsers] = useState(null);
  const [reviews, setReviews] = useState(null);
  const { message, setMessage } = useContext(MessageContext);

  // Load users.
  useEffect(() => {
    loadUsers();
  }, [reviews]);

  const loadUsers = async () => {
    const currentUsers = await getUsers();

    setUsers(currentUsers);
  };

  // Load reviews.
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const currentReviews = await getReviews();

    setReviews(currentReviews);
    console.log(reviews); 
  };

  const handleBlockUser = async (username) => {
    if(!window.confirm(`Are you sure you want to block/unblock user ${username} ?`))
      return;
    
    const isBlocked = await blockUser(username);

    if(isBlocked !== null) {
      // Here the users are refreshed.
      await loadUsers();

      setMessage(<>**** This user <strong>{username}</strong> has been blocked/unblocked by the admin! ***</>);
    }
  };

  const handleDeleteReview = async (id) => {
    if(!window.confirm(`Are you sure you want to delete/recover review ${id} ?`))
      return;
    
    const isDeleted = await deleteReview(id);

    if(isDeleted) {
      // Could remove the review that was deleted or refresh the reviews.
      // Here the reviews are refreshed.
      await loadReviews();

      setMessage(<>**** This review <strong>{id}</strong> has been deleted by the admin! ***</>);
    }
  };

  if(users === null)
    return null;

  return (
    <div>
      {message && <div className="alert alert-success" role="alert">{message}</div>}
      <h1 className="display-4">Users and Reviews</h1>     
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>Blocked</th>
              <th>Name</th>
              <th>Reviews</th>
              <th>Block/Unblock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.blocked.toString()}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td>
                {user.reviews.length > 0 &&
                  <ul className="pl-0">
                    {user.reviews.map(review => 
                      review.deleted === false ? (
                        <li key={review.review_id}>{review.text}
                          <button className="btn btn-danger" onClick={() => handleDeleteReview(review.review_id)}>Delete Review</button>
                        </li>
                      ) : (
                        <li key={review.review_id}>{review.text}
                          <button className="btn btn-danger" onClick={() => handleDeleteReview(review.review_id)}>Recover Review</button>
                        </li>
                      )
                    )}
                  </ul>
                  }
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleBlockUser(user.username)}>Block/Unblock User</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
