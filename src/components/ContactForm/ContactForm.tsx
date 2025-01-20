import "./ContactForm.scss";

function ContactForm() {
    return (
        <section className="contact">

            <div className="container">
                <div className="contact_wrapper">


                    <h1 className="contact_title">Contact</h1>

                    <form className="contact_form">

                        <div className="form__group">
                            <input type="text" id="name" className="form__field" placeholder="Votre Nom" />
                            <label htmlFor="name" className="form__label">Nom</label>
                        </div>

                        <div className="form__group">
                            <input type="email" id="email" className="form__field" placeholder="Votre Email" />
                            <label htmlFor="email" className="form__label">Email</label>
                        </div>

                        <div className="form__group">
                            <textarea id="message" className="form__field" placeholder="Your Message" rows={6}></textarea>
                            <label htmlFor="message" className="form__label">Message</label>
                        </div>

                        <button type="submit" className="contact_button">
                            <span>Envoyer</span>
                        </button>
                    </form>


                </div>
            </div>


        </section>
    )
}

export default ContactForm;