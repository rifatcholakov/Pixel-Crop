import { Component, type ErrorInfo, type ReactNode } from "react";
import styles from "./ErrorBoundary.module.css";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    errorMsg: string;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        errorMsg: ""
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, errorMsg: error.message };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught rendering error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className={styles.container}>
                    <h2>Oops, something went horribly wrong! 💥</h2>
                    <pre className={styles.errorMessage}>{this.state.errorMsg}</pre>
                    <button
                        onClick={() => window.location.reload()}
                        className={styles.reloadButton}
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
