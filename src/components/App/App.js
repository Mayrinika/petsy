import React from "react";
import styles from './styles.css';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import classNames from 'classnames/bind';
import Button from '@material-ui/core/Button';

import logo from '../../images/logo.png';
import huskyLogo from '../../images/husky.png';
import pets01 from '../../images/pets01.jpg';
import pets02 from '../../images/pets02.jpg';
import pets03 from '../../images/pets03.jpg';
import pets04 from '../../images/pets04.jpg';
import pets05 from '../../images/pets05.jpg';
import pets06 from '../../images/pets06.jpg';
import pets07 from '../../images/pets07.jpg';
import pets08 from '../../images/pets08.jpg';
import pets09 from '../../images/pets09.jpg';
import pets10 from '../../images/pets10.jpg';
import logoCheck from '../../images/logo-check.png';
import logoContract from '../../images/logo-contract.png';
import logoHealth from '../../images/logo-health.png';
import logoMeet from '../../images/logo-meet.png';
import logoSupport from '../../images/logo-support.png';

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <img src={logo} className={styles.logo} alt="logo"/>

                    <div className={styles.helpSection}>
                        <a href='#' className={styles.helpLink}>
                            <p>Частые вопросы</p>
                        </a>
                        <a href='#' className={styles.helpLink}>
                            <p>Наши услуги</p>
                        </a>
                    </div>

                    <div className={styles.enterSection}>
                        <a href='#' className={styles.enterLink}>
                            <p>Войти</p>
                        </a>
                        <a href='#' className={styles.enterLink}>
                            <p>Регистрация</p>
                        </a>
                    </div>
                </header>
                <main className={styles.mainPage}> {/*main->section*/}
                    <div className={styles.mainPageContent}>
                        <h1>Возьмем питомца в гости,
                            пока вы в отъезде! </h1>
                        <div className={styles.mainPageButtons}>
                            <PrimaryButton>Выбрать ситтера</PrimaryButton>
                            <SecondaryButton>Стать ситтером</SecondaryButton>
                        </div>
                    </div>
                </main>
                <section className={styles.portfolioSection}> {/* blog-home grid*/}
                    <a href='#' className={styles.blogItem}> {/* blog-item grid*/}
                        <div className={styles.portfolioItem} style={{'background-image': `url(${pets01})`}}>
                            <span className={styles.portfolioContent}>
                                <h4>Ждем в гости!</h4>
                                <p>Спасибо большое! Каждый день были фото и видео! Май не скучал, у него была хорошая компания! Были спокойны за...</p>
                            </span>
                        </div>
                    </a>
                    <a href='#' className={styles.blogItem}>
                        <div className={styles.portfolioItem} style={{'background-image': `url(${pets02})`}}>
                        <span className={styles.portfolioContent}>
                                <h4>Hello</h4>
                                <p>World...</p>
                            </span>
                        </div>
                    </a>
                    <a href='#' className={styles.blogItem}>
                        <div className={styles.portfolioItem} style={{'background-image': `url(${pets03})`}}>
                            <span className={styles.portfolioContent}>
                                <h4>Hello</h4>
                                <p>World...</p>
                            </span>
                        </div>
                    </a>
                    <a href='#' className={styles.blogItem}>
                        <div className={styles.portfolioItem} style={{'background-image': `url(${pets04})`}}>
                            <span className={styles.portfolioContent}>
                                <h4>Hello</h4>
                                <p>World...</p>
                            </span>
                        </div>
                    </a>
                    <a href='#' className={styles.blogItem}>
                        <div className={styles.portfolioItem} style={{'background-image': `url(${pets05})`}}>
                           <span className={styles.portfolioContent}>
                                <h4>Hello</h4>
                                <p>World...</p>
                            </span>
                        </div>
                    </a>
                    <div className={styles.portfolioLogo}>
                        <span> Hello</span>
                    </div>
                    <a href='#' className={styles.blogItem}>
                        <div className={styles.portfolioItem} style={{'background-image': `url(${pets06})`}}>
                            <span className={styles.portfolioContent}>
                                <h4>Hello</h4>
                                <p>World...</p>
                            </span>
                        </div>
                    </a>
                    <a href='#' className={styles.blogItem}>
                        <div className={styles.portfolioItem} style={{'background-image': `url(${pets07})`}}>
                            <span className={styles.portfolioContent}>
                                <h4>Hello</h4>
                                <p>World...</p>
                            </span>
                        </div>
                    </a>
                    <a href='#' className={styles.blogItem}>
                        <div className={styles.portfolioItem} style={{'background-image': `url(${pets08})`}}>
                           <span className={styles.portfolioContent}>
                                <h4>Hello</h4>
                                <p>World...</p>
                            </span>
                        </div>
                    </a>
                    <a href='#' className={styles.blogItem}>
                        <div className={styles.portfolioItem} style={{'background-image': `url(${pets09})`}}>
                            <span className={styles.portfolioContent}>
                                <h4>Hello</h4>
                                <p>World...</p>
                            </span>
                        </div>
                    </a>
                    <a href='#' className={styles.blogItem}>
                        <div className={styles.portfolioItem} style={{'background-image': `url(${pets10})`}}>
                            <span className={styles.portfolioContent}>
                                <h4>Hello</h4>
                                <p>World...</p>
                            </span>
                        </div>
                    </a>
                    <div className={styles.viewPortfolio}>
                        <PrimaryButton>Выбрать ситтера</PrimaryButton>
                    </div>
                </section>

                <section className={classNames(styles.landingSection, styles.simpleInstruction)}>
                    <div className={styles.container}>
                        <div className={styles.threePoints}>
                            <h2>С кем оставить питомца?</h2>
                            <p>Выберите ситтера неподалеку от вас</p>
                            <p>Забронируйте и заключите договор</p>
                            <p>Передайте питомца ситтеру</p>
                        </div>

                        <div className={styles.huskyLogo}>
                            <img src={huskyLogo} className={styles.huskyLogoImg} alt="huskyLogo"/>
                        </div>
                    </div>
                </section>

                <section className={styles.formSection}>
                    <div className={styles.container}></div>

                    <form>
                        <div><input type='text' name='name' placeholder='Ваше имя...' required/></div>
                        <div><input type='text' name='surName' placeholder='Ваша фамилия...' required/></div>
                        <div><input type='text' name='email' placeholder='Ваш E-mail...' required/></div>
                        <div>
                            <PrimaryButton>Регистрация</PrimaryButton>
                        </div>
                    </form>
                </section>

                <section className={classNames(styles.landingSection, styles.whyIsItSafe)}>

                    <h2>Почему это безопасно?</h2>

                    <div className={styles.pointsOfSafe}> {/*blog-home grid*/}

                        <div className={styles.pointOfSafeItem}> {/*blog-item*/}
                            <img src={logoCheck} className={styles.pointsOfSafeImg}
                                 alt="logoCheck"/> {/*blog-item-img*/}
                            <span className={styles.pointsOfSafeContent}> {/*blog-item-content*/}
                                <h4>Проверяем ситтеров</h4>
                                <p>Проверяем паспорт, соцсети и другие данные о ситтере в открытых источниках. Каждый догситтер проходит инструктаж и тестирование.</p>
                            </span>
                        </div>

                        <div className={styles.pointOfSafeItem}>
                            <img src={logoContract} className={styles.pointsOfSafeImg} alt="logoContract"/>
                            <span className={styles.pointsOfSafeContent}>
                                <h4>Заключается договор</h4>
                                <p>Проверяем паспорт, соцсети и другие данные о ситтере в открытых источниках. Каждый догситтер проходит инструктаж и тестирование.</p>
                            </span>
                        </div>

                        <div className={styles.pointOfSafeItem}>
                            <img src={logoMeet} className={styles.pointsOfSafeImg} alt="logoMeet"/>
                            <span className={styles.pointsOfSafeContent}>
                                <h4>Проверяем ситтеров</h4>
                                <p>Проверяем паспорт, соцсети и другие данные о ситтере в открытых источниках. Каждый догситтер проходит инструктаж и тестирование.</p>
                            </span>
                        </div>

                        <div className={styles.pointOfSafeItem}>
                            <img src={logoSupport} className={styles.pointsOfSafeImg} alt="logoSupport"/>
                            <span className={styles.pointsOfSafeContent}>
                                <h4>Проверяем ситтеров</h4>
                                <p>Проверяем паспорт, соцсети и другие данные о ситтере в открытых источниках. Каждый догситтер проходит инструктаж и тестирование.</p>
                            </span>
                        </div>

                        <div className={styles.pointOfSafeItem}>
                            <img src={logoHealth} className={styles.pointsOfSafeImg} alt="logoHealth"/>
                            <span className={styles.pointsOfSafeContent}>
                                <h4>Проверяем ситтеров</h4>
                                <p>Проверяем паспорт, соцсети и другие данные о ситтере в открытых источниках. Каждый догситтер проходит инструктаж и тестирование.</p>
                            </span>
                        </div>
                    </div>
                    <div className={styles.chooseSitter}>
                        <PrimaryButton>Выбрать ситтера</PrimaryButton>
                    </div>
                </section>
                <footer>
                    <div className={styles.container}>
                        <h4>Остались вопросы?</h4>
                        <p>Телефон <br/> vk <br/> Telegram</p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;