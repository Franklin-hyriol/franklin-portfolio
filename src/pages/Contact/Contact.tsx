import { lazy, useEffect, useState } from "react";
import "./Contact.scss";
import Loader from "../../components/Loader/Loader";
const ContactForm = lazy(() => import("../../components/ContactForm/ContactForm"));
const Headers = lazy(() => import("../../components/Headers/Headers"));

function Contact() {
    const [preloader, setPreloader] = useState(true);
    const [componentsReady, setComponentsReady] = useState(false);

    useEffect(() => {

        const loadComponents = async () => {
            await Promise.all([
                import("../../components/Headers/Headers"),
                import("../../components/ContactForm/ContactForm"),
            ]);

            setComponentsReady(true);

            setTimeout(() => {
                setPreloader(false);
            }, 1500);

        };

        loadComponents();

    }, []);

    if (!componentsReady) {
        return <Loader />;
    }

    return (
        <>
            {preloader && <Loader fade={true} />}
            <div className="fadeOnLoad">
                <Headers />
                <ContactForm />
            </div>

        </>
    );
}

export default Contact;