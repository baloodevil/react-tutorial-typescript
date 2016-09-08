import * as React from "react";

export interface CommentFormProps { onCommentSubmit: any }
export interface CommentFormState { author?: string; text?: string; }

export class CommentForm extends React.Component<CommentFormProps, CommentFormState> {
    constructor() {
        super();
        this.state = { author: '', text: '' };
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Name" value={this.state.author} onChange={this.handleAuthorChange}></input>
                <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange}></input>
                <input type="submit" value="Post Comment"></input>
            </form>
        );
    }

    handleAuthorChange(e: any) {
        this.setState({ author: e.target.value });
    }

    handleTextChange(e: any) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e: any) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!author || !text) {
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ author: '', text: '' });
    }

}
