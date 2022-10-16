import { Modal, Typography } from 'antd'
import React from 'react'
import CreateBlog from './CreateBlog';

const { Title } = Typography;


const EditBlogModal = ({ blog, visible, setVisible }) => {
    return (
        <Modal
            title={<Title level={4}>Are you sure you want to Edit blog {blog?.title}?</Title>}
            visible={visible}
            onCancel={() => setVisible(false)}
            footer={null}
            width={600}
        >
            <CreateBlog from="edit" blog={blog} />
        </Modal>
    )
}

export default EditBlogModal