import { Button, Result } from "antd";
import { history } from "../..";
import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <Result
                status="warning"
                title="Opps Something went Wrong."
                extra={
                    <Button type="primary" key="console" onClick={() => history.push("/")}>
                        Back To Home
                    </Button>
                }
            />
        }

        return this.props.children;
    }
}