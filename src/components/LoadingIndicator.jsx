import Loader from "./Loader";

export default function LoadingIndicator({ show, text }) {
    if (!show) return null;

    return (
        <div className="flex items-center justify-center">
            <Loader />
            <span className="ml-2">{text}</span>
        </div>
    );
}
