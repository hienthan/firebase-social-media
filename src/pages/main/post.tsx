import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Post as IPost } from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: IPost;
}

// Get the Like userId to support like/dislike, add the id for support delete Like
interface Like {
  userId: string;
  id: string;
}

const Post = (props: Props) => {
  const [user] = useAuthState(auth);
  const { post } = props;

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, id: doc.id }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      // Set the like right after click on UI
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, id: newDoc.id }]
            : [{ userId: user.uid, id: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLike = async () => {
    try {
      // Get the specific Like to delete
      const getLikeQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const getLikes = await getDocs(getLikeQuery);
      const likeId = getLikes.docs[0].id;
      const deletedLike = doc(db, "likes", likeId);

      await deleteDoc(deletedLike);
      if (user) {
        // Need to add the id to Like to support this
        setLikes((prev) => prev && prev.filter((like) => like.id !== likeId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <h1>{post.description}</h1>
      </div>
      <div className="footer">
        <h1>@{post.username}</h1>
        <button onClick={hasUserLiked ? deleteLike : addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p>Likes: {likes?.length}</p>}
      </div>
    </div>
  );
};

export default Post;
