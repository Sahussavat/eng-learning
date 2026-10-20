import { Spinner } from "react-bootstrap";
import loadingPageCss from "./loadingComponent.module.css";

export function LoadingComponent() {
    return (
        <Spinner className={loadingPageCss.loading_spinner} animation="border" variant="light" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}