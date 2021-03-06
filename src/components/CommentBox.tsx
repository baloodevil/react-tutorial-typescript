import * as React from "react";
import * as $ from "jquery";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

export interface CommentBoxProps { url: string; pollInterval: number; }
export interface CommentBoxState { data: Object };

export class CommentBox extends React.Component<CommentBoxProps, CommentBoxState> {
  constructor() {
    super();

    this.state = { data: [] };
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data: any) {
        this.setState({ data: data })
      }.bind(this),
      error: function (xhr: any, status: any, err: any) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }

  handleCommentSubmit(comment: any) {
    var comments = this.state.data;
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({ data: newComments });
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function (data: any) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr: any, status: any, err: any) {
        this.setState({ data: comments });
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

}