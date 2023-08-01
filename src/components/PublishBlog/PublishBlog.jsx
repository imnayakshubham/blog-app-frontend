import React, { useEffect, useMemo, useState } from 'react'
import { Button, Form, Input, Select, Upload, notification } from 'antd';
import "./PublishBlog.css"
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { createReactEditorJS } from 'react-editor-js'

import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import ImageTool from '@editorjs/image';
import axios from 'axios';
import { addBlogRequest, updateBlogRequest } from '../../store/actions/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { history } from "../../index"

const EditorJs = createReactEditorJS()



export const EDITOR_JS_TOOLS = {
    // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
    // paragraph: Paragraph,
    embed: Embed,
    table: Table,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    raw: Raw,
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
}



const { TextArea } = Input;
const { Option } = Select;


const uploadImage = async (image) => {
    const imageFile = image
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "blog-app");
    data.append("cloud_name", "nayak-shubham");
    const imageData = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data)
    if (imageData.status === 200) {
        return {
            file: {
                url: imageData.data.secure_url
            },
            success: 1
        }
    } else {
        return notification.error({
            message: "Error Uploading Image"
        })
    }
}

const PublishBlog = () => {
    const { state: blog } = useLocation()
    const [blogForm] = useForm()
    const dispatch = useDispatch()

    const [showSubtitle, setShowSubtitle] = useState(false)
    const [toggleSwitch, setToggleSwitch] = useState(true)
    const [imageUploadStatus, setImageUploadSuccess] = useState("Initial")

    const { categoryList } = useSelector(state => state.blogCategories);
    const userInfo = useSelector((state) => state.login.loginResponse)

    const editorCore = React.useRef(null)

    const handleInitialize = React.useCallback((instance) => {
        editorCore.current = instance
    }, [])

    useEffect(() => {
        if (blog) {
            blogForm.setFieldsValue({ ...blog })
            if (blog.sub_title) {
                setShowSubtitle(true)
            }
        } else {
            history.push("/publish")
        }

    }, [blog, blogForm])

    const disableUpdated = useMemo(() => {
        if (userInfo?.id === blog?.posted_by?._id && toggleSwitch) {
            return false
        } else {
            return true
        }
    }, [blog?.posted_by?._id, userInfo?.id, toggleSwitch])

    const props = useMemo(() => ({
        name: 'file',
        multiple: false,
        showUploadList: false,
        customRequest: async ({ file }) => {
            setImageUploadSuccess("Loading")
            const response = await uploadImage(file)
            const formValue = blogForm.getFieldsValue()
            formValue["cover_image"] = response?.file?.url ?? null
            blogForm.setFieldsValue({ ...formValue })
            setImageUploadSuccess("Success")
        },
    }), [blogForm])

    const handleSubmit = async (values) => {
        const savedData = await editorCore.current.save();
        const formValue = blogForm.getFieldsValue()
        if (!formValue.title) {
            return notification.error({
                message: "Please Input Title"
            })
        } else if (!savedData?.blocks.length) {
            return notification.error({
                message: "Please Input Content"
            })
        }
        const data = { ...formValue }
        data["content"] = savedData.blocks
        if (blog?._id) {
            dispatch(updateBlogRequest({ ...blog, ...data }))
        } else {
            dispatch(addBlogRequest(data))
        }
    }

    const handleSubtitle = () => {
        if (showSubtitle) {
            setShowSubtitle(false)
            blogForm.setFieldValue("sub_title", undefined)
        }
    }

    return (
        <div className='publish__blog__container'>
            <Form disabled={disableUpdated} form={blogForm} onFinish={handleSubmit} initialValues={{ category: categoryList.categories[1].key }} style={{ height: "100%" }}>
                <div className='publish__blog__container__action'>
                    <Form.Item name={"category"} style={{ width: "15rem" }}>
                        <Select
                            showSearch
                            placeholder="Search Category"
                            showArrow={!disableUpdated}
                            bordered={!disableUpdated}
                        >
                            {categoryList.categories.filter((cat) => cat.key !== "all").map((category, index) => (
                                <Option value={category.key || ""} key={category.key}>
                                    {category.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item >
                        {!disableUpdated &&
                            <Button type='primary' htmlType='submit'>{blog?._id ? "Update" : "Publish"} </Button>
                        }
                    </Form.Item>
                </div>
                <div className='publish__blog__editor__action'>
                    {!blogForm.getFieldValue("cover_image") &&
                        <Form.Item name={"cover_image"}>
                            <Upload {...props}>
                                <Button loading={imageUploadStatus === "Loading"} icon={<UploadOutlined />}>Add Cover Image</Button>
                            </Upload>
                        </Form.Item>
                    }
                    {!showSubtitle &&
                        <Button
                            onClick={() => {
                                setShowSubtitle(true)
                            }}>Add Subtitle</Button>
                    }
                    {
                        userInfo?.id === blog?.posted_by?._id &&
                        // <Switch unCheckedChildren="View Preview" checkedChildren="Edit Blog" defaultChecked disabled={false} value={toggleSwitch} onChange={(value) => setToggleSwitch(value)} />
                        <Button disabled={false} onClick={() => setToggleSwitch((prev) => !prev)}>{toggleSwitch ? "View Preview" : "Edit Blog"}</Button>
                    }
                </div>
                {
                    !!blogForm.getFieldValue("cover_image")?.length &&
                    <div className='cover_image_preview__container'>
                        <img className='cover__image__preview' src={blogForm.getFieldValue("cover_image")} alt={"Imagetag"} width="600" height="400" />
                    </div>
                }
                <div className='publish__blog__editor'>
                    <div className='publish__blog__editor__title__container'>
                        <Form.Item name={"title"}>
                            <TextArea
                                className='publish__blog__editor__textarea'
                                placeholder='Blog Title'
                                maxLength={150}
                            />
                        </Form.Item>
                    </div>
                    {
                        showSubtitle &&
                        <div className='publish__blog__editor__subtitle__container'>
                            <Form.Item name={"sub_title"} style={{ width: "100%" }}>
                                <TextArea
                                    className='publish__blog__editor__textarea subtitle'
                                    placeholder='Blog Sub Title'
                                    maxLength={150}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="ghost" onClick={() => handleSubtitle()} icon={<CloseOutlined />}></Button>
                            </Form.Item>
                        </div>
                    }
                </div>
            </Form >

            <EditorJs
                holder={`editor`}
                readOnly={disableUpdated}
                placeholder={'Let`s write an awesome Blog!'}
                onInitialize={handleInitialize}
                onReady={() => {
                    if (blog) {
                        const res = editorCore.current
                        res._editorJS.render({ blocks: blog.content })
                    }
                }}
                autofocus={true}
                tools={{
                    ...EDITOR_JS_TOOLS,
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                async uploadByFile(file) {
                                    const response = await uploadImage(file)
                                    return response
                                },
                                // async uploadByUrl(url) {
                                //     const response = await axios.post(
                                //         `http://localhost:4001/api/uploadImage/createByUrl`,
                                //         {
                                //             url,
                                //         }
                                //     );

                                //     if (response.data.success === 1) {
                                //         return response.data;
                                //     }
                                // },
                            },
                            inlineToolbar: true,
                        },
                    }
                }}
            >
            </EditorJs>
        </div >
    )
}


export default PublishBlog