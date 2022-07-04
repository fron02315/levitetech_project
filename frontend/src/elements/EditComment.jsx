import React, {useState, Fragment} from "react";
import axiosInstance from "../axiosApi";
import { 
    Comment,
    Avatar,
    Form,
    Input,
    Button
} from 'antd';


const Editor = ({value,onChange,submitting,handleSubmit}) => (
  <Form 
    initialValues={{
      ["comment"]: value
    }}
  >
    <Form.Item name="comment">
      <Input.TextArea rows={4} value={value} onChange={onChange} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
        Save
      </Button>{' '}
      <Button onClick={handleSubmit} type="warning">
        Cancel
      </Button>
    </Form.Item>
  </Form>
);

const EditComment = (props) =>{
  const [submitting, setSubmitting] = useState(false);
  const [comment, setComment] = useState(props.comment.comment);

  const handleSubmit = () => {
    setSubmitting(true);
    const axios = axiosInstance.patch(`/comment/${props.comment.id}`, {
      comment : comment
    });
    axios.then(res => {
        setSubmitting(false);
        props.toggleCommentAdd(false);
        props.toggleRefreshTasklist((prevState) => (!prevState));
    }).catch(({response}) => {
      setSubmitting(false);
    });
  };

  const onChange = (e) => {
    console.log(e.target.value);
    setComment(e.target.value);
  }
    return (

        <Comment
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
                <Editor
                  value={comment}
                  onChange={onChange}
                  submitting={submitting}
                  handleSubmit = {handleSubmit}
                  toggleCommentAdd = {props.toggleCommentAdd}
                />
            }
        />
    )

}

export default EditComment;


