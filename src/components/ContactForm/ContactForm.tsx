import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import "./ContactForm.scss";
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';
import { useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

function ContactForm() {

    const contactSchema = z.object({
        name: z.string().min(2, { message: 'Champ obligatoire' }),
        email: z.string().email({ message: 'Entrer une adresse mail valide' }),
        message: z.string().min(2, { message: 'Champ obligatoire' })
    });

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    type ContactSchemaType = z.infer<typeof contactSchema>;


    const {
        register,
        handleSubmit,
        reset,
        trigger,
        setValue,
        formState: { errors },
    } = useForm<ContactSchemaType>({ resolver: zodResolver(contactSchema), defaultValues: formState });



    const submitData = async (data: ContactSchemaType) => {
        setIsLoading(true);

        emailjs.send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, data, {
            publicKey: import.meta.env.VITE_PUBLIC_KEY,
        })
            .then(
                () => {
                    setIsLoading(false);
                    reset();
                    setFormState({ name: "", email: "", message: "" });
                    toast.success('Message envoyé !');

                },
                (error) => {
                    setIsLoading(false);
                    toast.error("Une erreur est survenue");
                    console.log(error);
                },
            );
    };


    return (





        <section className="contact">

            <div className="container">
                <div className="contact_wrapper">


                    <h1 className="contact_title">Contact</h1>

                    <GoogleReCaptchaProvider
                        reCaptchaKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_PUBLIC_KEY} // Clé ReCAPTCHA
                        useRecaptchaNet={false} // Utiliser recaptcha.net au lieu de google.com
                        useEnterprise={false} // Pas la version entreprise
                        scriptProps={{
                            async: true, // Charger de manière asynchrone
                            defer: true, // Charger après l'analyse HTML
                            appendTo: 'head', // Ajouter dans <head>
                            nonce: undefined, // Pas de nonce
                        }}
                        container={{
                            parameters: {
                                badge: 'bottomright', // Position en bas à droite
                                theme: 'dark', // Thème sombre
                            }
                        }}
                    >


                        <form className={`contact_form${isLoading ? " loadingForm" : ""}`} onSubmit={handleSubmit(submitData)}>

                            <div className="form__group">
                                <input
                                    type="text" id="name"
                                    {...register("name")}
                                    className="form__field"
                                    placeholder="Votre Nom"
                                    onBlur={() => { trigger("name") }}
                                    value={formState.name}
                                    onChange={
                                        (e) => {
                                            setFormState({ ...formState, name: e.target.value });
                                            setValue('name', e.target.value);
                                        }
                                    }
                                />
                                <label htmlFor="name" className="form__label">Nom</label>
                                <small className="error-msg">{errors.name?.message ? errors.name?.message : " "}</small>
                            </div>

                            <div className="form__group">
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email")}
                                    className="form__field"
                                    placeholder="Votre Email"
                                    onBlur={() => { trigger("email") }}
                                    value={formState.email}
                                    onChange={
                                        (e) => {
                                            setFormState({ ...formState, email: e.target.value });
                                            setValue('email', e.target.value);
                                        }
                                    }
                                />
                                <small className="error-msg">{errors.email?.message ? errors.email?.message : " "}</small>
                                <label htmlFor="email" className="form__label">Email</label>
                            </div>

                            <div className="form__group">
                                <textarea
                                    id="message"
                                    {...register("message")}
                                    className="form__field"
                                    placeholder="Your Message"
                                    cols={30}
                                    rows={6}
                                    onBlur={() => { trigger("message") }}
                                    value={formState.message}
                                    onChange={
                                        (e) => {
                                            setFormState({ ...formState, message: e.target.value });
                                            setValue('message', e.target.value);
                                        }
                                    }
                                ></textarea>
                                <small className="error-msg">{errors.message?.message ? errors.message?.message : " "}</small>
                                <label htmlFor="message" className="form__label">Message</label>
                            </div>

                            <button type="submit" className="contact_button">
                                <span>Envoyer</span>
                            </button>
                        </form>


                    </GoogleReCaptchaProvider>

                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </section>
    )
}

export default ContactForm;