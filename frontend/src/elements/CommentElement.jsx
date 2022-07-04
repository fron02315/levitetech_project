import React, { useState, Fragment } from "react";
import { Draggable } from 'react-beautiful-dnd';
import PriorityBadge from "./PriorityBadge";
import TagBadge from "./TagBadge";
import EditComment from "../elements/EditComment";
import axiosInstance from "../axiosApi";
import { 
    Comment,Tooltip,Avatar,Modal
} from 'antd';

import moment from 'moment'

const CommentElement = (props) =>{
    const [iseditComment, setIseditComment] = useState(false);
    const [isMouseHover, setIsMouseHover] = useState(false);

    const editComment = () => {
        setIseditComment(true);
    };

    const handleOk = () => {
        setIseditComment(false);
    };

    const handleCancel = () => {
        setIseditComment(false);
    };

    const onMouseHoverHandler = () =>{
        setIsMouseHover(!isMouseHover);
    }
    const deleteComment = () => {
        Modal.confirm({
            title: 'Are you sure delete this task?',
            icon: <span role="img" className="anticon "><i className="bi bi-exclamation-circle text-warning"></i></span>,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
        
            onOk() {
                const axios = axiosInstance.patch(`/comment/${props.comment.id}`, {
                    comment_status : false
                  });
                axios.then(res => {
                    props.toggleRefreshTasklist((prevState) => (!prevState));
                }).catch(({response}) => {
                });
            },
        
            onCancel() {
              //Do nothing :)
            },
        });
    }

    const onClickFlag = (event) => {
        try {
            event.preventDefault();
            const axios = axiosInstance.patch(`/task/${props.element.id}`, {
                flag: !props.element.flag
            });
            axios.then(res => {
                props.toggleRefreshTasklist((prevState) => (!prevState));
            }).catch(({response}) => {

            });
            
        } catch (error) {
            throw error;
        }
    }

    const actions = [
        <span key="comment-basic-reply-to" onClick={editComment}>Edit</span>,
        <Tooltip key="comment-basic-delete" title="Delete">
            <span onClick={deleteComment}><i className="bi bi-trash"></i></span>
        </Tooltip>
    ];

    return (
        <Fragment>
            
            <li key={"comment-"+props.comment.id}  className={"list-group-item "+props.comment.id}  >
            {iseditComment ? (
                
                <EditComment
                    toggleCommentAdd = {setIseditComment} 
                    toggleRefreshTasklist = {props.toggleRefreshTasklist}
                    task_id = {props.comment.task_id}
                    comment = {props.comment}
                />
            ):(
                <Fragment>
                
                    <Comment
                        actions={actions}
                        author={<a>Han Solo</a>}
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                        content={
                            props.comment.comment
                        }
                        datetime={
                            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().fromNow()}</span>
                            </Tooltip>
                        }
                    />
                </Fragment>

            )}
            </li>
            
      
        </Fragment>
    );
}

export default CommentElement;