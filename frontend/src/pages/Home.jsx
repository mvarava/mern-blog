import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { fetchAllComments } from '../redux/slices/comments';
import { Typography } from '@mui/material';

export const Home = () => {
  const dispatch = useDispatch();

  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const comments = useSelector((state) => state.comments);

  const [sortValue, setSortValue] = useState('createdAt');
  const [activeTab, setActiveTab] = useState(0);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchAllComments());
  }, []);

  useEffect(() => {
    dispatch(fetchPosts(sortValue));
  }, [sortValue]);

  const tabClickHandler = (value) => {
    setSortValue(value === 0 ? 'createdAt' : 'viewsCount');
    setActiveTab(value);
  };

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={activeTab} aria-label="basic tabs example">
        <Tab onClick={() => tabClickHandler(0)} label="New" />
        <Tab onClick={() => tabClickHandler(1)} label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {posts.items.length > 0 ? (
            (isPostsLoading ? [...Array(5)] : posts.items).map((post, index) =>
              isPostsLoading ? (
                <Post key={index} isLoading={true} />
              ) : (
                <Post
                  key={index}
                  id={post._id}
                  title={post.title}
                  imageUrl={post.imageUrl ? `http://localhost:5555${post.imageUrl}` : ''}
                  user={post.user}
                  createdAt={post.createdAt}
                  viewsCount={post.viewsCount}
                  commentsCount={
                    comments.items.filter((comment) => comment.post === post._id).length
                  }
                  tags={post.tags}
                  isEditable={userData?._id === post.user._id}
                />
              ),
            )
          ) : (
            <Typography variant="h5">No posts yet</Typography>
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments.items} isLoading={false} />
        </Grid>
      </Grid>
    </>
  );
};
