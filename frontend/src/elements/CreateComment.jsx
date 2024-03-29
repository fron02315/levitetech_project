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
  <Form>
    <Form.Item name="comment">
      <Input.TextArea rows={4} value={value} onChange={onChange} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </Form>
);

const CreateComment = (props) =>{
    
  const [submitting, setSubmitting] = useState(false);
  const [comment, setComment] = useState("");
  const handleSubmit = () => {
    setSubmitting(true);
    const axios = axiosInstance.post(`/comment/`, {
      task_id: props.task_id,
      comment : comment,
      created_by: localStorage.getItem("userid")
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
                />
            }
        />
    )

}

export default CreateComment;


