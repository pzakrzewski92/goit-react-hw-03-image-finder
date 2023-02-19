import { MagnifyingGlass } from "react-loader-spinner";
import css from "./Loader.module.css";
const Loader = () => {
    return (
        <div className={css.overlay}>
            <MagnifyingGlass
                className={css.loader}
                visible={true}
                height="120"
                width="120"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />
        </div>
    );
};

export default Loader;