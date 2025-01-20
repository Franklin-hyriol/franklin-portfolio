import { Suspense } from "react";
import Avatar from "../Avatar/Avatar";
import "./Footer.scss";

type FooterProps = {
    setIsCanvasHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

function Footer({ setIsCanvasHovered }: FooterProps) {
    return (
        <footer className='footer-container'>
            <div className='footer-wrapper'>
                <div className='footer-inner'>
                    <div className="canvas-container">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Avatar setIsCanvasHovered={setIsCanvasHovered} />
                        </Suspense>

                        <div className="about">
                            <div className="about-content">

                                <div className="about-details">

                                    <picture className="about-picture">
                                        <img src="/images/avatar.png" alt="it's me franklin" />
                                    </picture>


                                    <div className="grid-wrapper">
                                        <div className="about-text">
                                            <h2 className="about-text-title">Bonjour 😊!</h2>
                                            <p className="about-text-p">
                                                Ce portfolio vous donne un aperçu de mes compétences. Inspiré de designs que j’admire, C'est vrai que j'ai un peu triché, mais ce n'est pas aussi facile que ça en a l'air. Si ce style vous plaît, imaginez ce que je pourrais créer pour vous. N’hésitez pas à me contacter, j’ai hâte d’échanger avec vous !
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <div className="button-cta download-button">
                                    <a className="button">
                                        <div className="icon">
                                            <span className="text-icon hide">Icon</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                        </div>
                                        <span className="title"> Telecharger mon CV </span>
                                        <div className="padding-left hide">
                                            <div className="padding-left-line">
                                                <span className="padding-left-text">padding-left</span>
                                            </div>
                                        </div>
                                        <div className="padding-right hide">
                                            <div className="padding-right-line">
                                                <span className="padding-right-text">padding-right</span>
                                            </div>
                                        </div>
                                        <div className="background hide">
                                            <span className="background-text">Background-color</span>
                                        </div>
                                        <div className="border hide">
                                            <span className="border-text">Border-radius</span>
                                        </div>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="education-skills-work">

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;