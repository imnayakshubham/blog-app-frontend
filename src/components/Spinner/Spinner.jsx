import { List, Skeleton } from 'antd'
import React from 'react'

export const Spinner = () => {
    const spinnerArr = new Array(6).fill(0)
    return (
        spinnerArr.map((res, index) => (
            <Skeleton loading={true} active avatar key={index} style={{ margin: "2rem 0px" }}>
                <List.Item.Meta
                    title={null}
                    description={null}
                />
            </Skeleton>
        ))
    )
}
