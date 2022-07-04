import React, {useState} from "react";
import CreateComment from "../elements/CreateComment";
import CommentElement from "../elements/CommentElement";

const CommentList = (props) => {
    const [CommentAdd,toggleCommentAdd] = useState(false);

    return (

        <section className="">

            <ul className="list-group list-group-flush" >

                {props.comments && props.comments.map((element, index) => {

                return (
                    <CommentElement 
                        key = {index}
                        comment={element}
                        task_id = {element.task_id}
                        toggleRefreshTasklist = {props.toggleRefreshTasklist}
                    />
                );
                })} 

                
                <CreateComment
                    toggleCommentAdd = {toggleCommentAdd} 
                    task_id = {props.task_id}
                />

            </ul>
        </section>

    )
}



export default CommentList;