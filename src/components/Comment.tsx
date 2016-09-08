import * as React from "react";
import * as Remarkable from "remarkable";

export interface CommentProps { author?: string; text?: string; }

export class Comment extends React.Component<CommentProps, {}> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author} IS MY AUTHOR
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup() }></span>
                ARE MY CHILDREN
            </div>
        )
    }


    rawMarkup() {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }


}
