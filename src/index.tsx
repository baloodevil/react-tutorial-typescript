import * as React from "react";
import * as ReactDOM from "react-dom";

//import { Hello } from "./components/Hello";
import {CommentBox} from './components/CommentBox';

// ReactDOM.render(
//     <Hello compiler="TypeScript" framework="React" />,
//     document.getElementById("example")
// );



ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
);
