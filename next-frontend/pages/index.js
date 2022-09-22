// pages/index.js
import Axios from "axios";
import Link from "next/link";

const Index = (props) => {
  const posts = props.data;

  return (
    <div>
      <h1>Home</h1>
      <ol>
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={{
                pathname: "/[id]",
                query: { id: post.id },
              }}
            >
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Index;

export const getStaticProps = async () => {
  const res = await Axios.get("https://jsonplaceholder.typicode.com/posts");
  return {
    props: { data: res.data.slice(0, 10) },
  };
};
