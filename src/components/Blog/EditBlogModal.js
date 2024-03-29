import { Modal, Typography } from 'antd'
import React from 'react'
import CreateBlog from './CreateBlog';

const { Title } = Typography;


const EditBlogModal = ({ blog, visible, setVisible }) => {
    return (
        <Modal
            title={<Title level={4}>Are you sure you want to Edit blog {blog?.title}?</Title>}
            open={visible}
            onCancel={() => setVisible(false)}
            footer={null}
            width={600}
        >
            <CreateBlog from="edit" blog={blog} setVisible={setVisible} />
        </Modal>
    )
}

export default EditBlogModal