import { Button, Result, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import "./NotFound.css"


const { Text } = Typography;

const NotFound = () => {
    return (
        <div className="text">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">
                    <Link to="/">
                        <Text className='errorcode'>Home</Text>
                    </Link></Button>}
            />
        </div>
    )
}

export default NotFound
