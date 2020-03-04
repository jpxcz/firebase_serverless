import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Container from '../../components/Container';
import Post from '../../components/Post'
import * as postsDuck from '../../ducks/Posts'

interface INewsFeedProps {
  fetchPosts: () => void,
  like: (a: string) => void,
  share: (a: string) => void,
  fetched: boolean,
  loading: boolean,
  data: postsDuck.IDataPosts,
}

class NewsFeed extends React.Component<INewsFeedProps> {
  constructor(props: INewsFeedProps) {
    super(props)
    const { fetchPosts, fetched } = props;
    if (fetched) {
      return;
    }
    fetchPosts();
  }

  public render() {
    const { data } = this.props;
    return (
      <Container>
        <div style={{ margin: '0 auto' }}>
          {Object.keys(data).map(p => {
            const post = data[p];
            return (
              <Post
                key={p}
                image={post.imageURL}
                like={this.handleLike(p)}
                share={this.handleShare(p)}
              />)
          })}
        </div>
      </Container>
    );
  }

  private handleLike = (id: string) => () => {
    const { like } = this.props;
    like(id);
  }

  private handleShare = (id: string) => () => {
    const { share } = this.props;
    share(id);
  }
};

const mapStateToProps = (state: any) => {
  const { Posts: { data, fetched, fetching } } = state;
  const loading = fetching || !fetched;
  return {
    loading,
    fetched,
    data,
  };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators(postsDuck, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);