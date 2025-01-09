import "./Loader.scss";

type LoaderProps = {
    fade?: boolean;
}

function Loader({ fade }: LoaderProps) {
    return (
        <div className={`loader-container ${fade ? "fade" : ""}`}>
            <div className="loader"></div>
        </div>
    )
}

export default Loader;