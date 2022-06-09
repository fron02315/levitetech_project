import React, {useState, Fragment} from "react";
import axiosInstance from "../axiosApi";
import { 
    Comment,
    Avatar,
    Form,
    Input,
    Button
} from 'antd';




const CreateSubTask = (props) =>{
    
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = () => {
    
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
     
    }, 1000);
  };
  const Editor = () => (
    <Fragment>
      <Form.Item>
        <Input.TextArea rows={4} value={""} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </Fragment>
  );
    return (

        <Comment
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
                <Editor
                    
                />
            }
        />
    )

}

export default CreateSubTask;


