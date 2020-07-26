import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"; //hook
import UserContext from "components/Context/UserContext";
import { Header, Loader } from "semantic-ui-react";
import PostInput from "components/Post/PostInput";
import { getPost } from "lib/posts";
import { getDraft } from "../../lib/posts";

export default function Write() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const { accessToken } = useContext(UserContext);

  const fetchData = async () => {
    if (!id) return false;
    if (id === "new") {
      setData({
        title: "Add New Post",
        data: {},
      });
      return true;
    }
    setIsError(false);
    setIsLoading(true);
    try {
      let data = {};
      //check if draft exist, if so, restore it
      const draftResult = await getDraft(accessToken, id);
      if (draftResult && draftResult.data.total > 0) {
        data = draftResult.data.data[0];
      } else {
        const result = await getPost(accessToken, id);
        // console.log("RESUTL", result);
        data = result.data;
      }

      setData({
        title: "Edit Post",
        data,
      });
    } catch (err) {
      setIsError(true);
    }
    setIsLoading(false);
    return true;
  };

  useEffect(() => {
    fetchData();
  }, [id, accessToken]);

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <Loader inline>Loading...</Loader>
      ) : (
        <>
          <Header
            as="h2"
            icon
            textAlign="center"
            style={{ marginBottom: "40px" }}
          >
            <Header.Content>{data.title}</Header.Content>
          </Header>
          <PostInput accessToken={accessToken} data={data.data} />
        </>
      )}
    </div>
  );
}
