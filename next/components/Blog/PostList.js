import PropTypes from "prop-types";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { Header, Item, Label } from "semantic-ui-react";

//List => Panel => ItemView

export default function PostList(props) {
  return (
    <div>
      <Header as="h2" icon textAlign="center" style={{ marginBottom: "40px" }}>
        <Header.Content>
          All Posts{props.tagData && <span> In {props.tagData.name}</span>}
        </Header.Content>
      </Header>
      <Item.Group divided>
        {props.posts &&
          props.posts.map((item) => {
            let author = "Admin";
            if (item.author) {
              author = item.author.firstName + " " + item.author.lastName;
            }
            return (
              <Item key={item._id}>
                <Link href={`/blog/[slug]`} as={`/blog/${item.slug}`}>
                  <Item.Image src={item.image} />
                </Link>

                <Item.Content>
                  <Link href={`/blog/[slug]`} as={`/blog/${item.slug}`}>
                    <Item.Header as="a">{item.title}</Item.Header>
                  </Link>
                  <Item.Meta>
                    <span className="cinema">
                      {author} | <TimeAgo date={item.createdAt} />
                    </span>
                  </Item.Meta>
                  <Item.Description>{item.summary}</Item.Description>
                  <Item.Extra>
                    {item.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tags/[slug]`}
                        as={`/blog/tags/${tag}`}
                      >
                        <Label as="a">{tag}</Label>
                      </Link>
                    ))}
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
      </Item.Group>
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
  tagData: PropTypes.object,
};
