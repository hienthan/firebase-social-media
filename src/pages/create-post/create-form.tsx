import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  // Get authenticated user:
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Validation by yup
  const schema = yup.object().shape({
    title: yup.string().required("Title cannot be null"),
    description: yup.string().required("Description cannot be null"),
  });

  // What is this?
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  // The postRef use on addDoc
  const postsRef = collection(db, "posts");

  // Add doc with reference and data
  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      title: data.title,
      description: data.description,
      // 2 above lines can be changed to "...data"
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate("/");
  };

  // Currently cannot change the db due to permission -> change Rule config

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title..." {...register("title")} />
      <p style={{ color: "red" }}>{errors.title?.message}</p>
      <textarea placeholder="Description..." {...register("description")} />
      <p style={{ color: "red" }}>{errors.description?.message}</p>
      <input type="submit" className="submit-form" />
    </form>
  );
};
