import * as React from "react";
import * as Comment from './Comment';

export interface CommentListProps { data: any }
export interface CommentListState { author?: string; text?: string; }

export class CommentList extends React.Component<CommentListProps, CommentListState> {
    render() {
        var commentNodes = this.props.data.map((comment:any) => {
            return (
                <Comment author={comment.author} key={comment.id} >
                    {comment.text}
                </Comment>
            )
        })
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}
