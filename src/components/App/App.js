import React from "react";
import styles from './styles.css';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
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

class App extends React.Component {
    //const classes = materialStyles();
    render() {
        return (
            <div>
                <header>
                    <img src={logo} className={styles.logo} alt="logo"/>
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
                <section className={styles.portfolioSection}>
                    <div className={styles.portfolioItem} style={{'background-image': `url(${pets01})`}}>
                        <span>Hello world</span>
                    </div>
                    <div className={styles.portfolioItem} style={{'background-image': `url(${pets02})`}}>
                        <span>Hello world</span>
                    </div>
                    <div className={styles.portfolioItem} style={{'background-image': `url(${pets03})`}}>
                        <span>Hello world</span>
                    </div>
                    <div className={styles.portfolioItem} style={{'background-image': `url(${pets04})`}}>
                        <span>Hello world</span>
                    </div>
                    <div className={styles.portfolioItem} style={{'background-image': `url(${pets05})`}}>
                        <span>Hello world</span>
                    </div>
                    <div className={styles.portfolioLogo}>
                        <span>Hello world</span>
                    </div>
                    <div className={styles.portfolioItem} style={{'background-image': `url(${pets06})`}}>
                        <span>Hello world</span>
                    </div>
                    <div className={styles.portfolioItem} style={{'background-image': `url(${pets07})`}}>
                        <span>Hello world</span>
                    </div>
                    <div className={styles.portfolioItem} style={{'background-image': `url(${pets08})`}}>
                        <span>Hello world</span>
                    </div>
                    <div className={styles.portfolioItem} style={{'background-image': `url(${pets09})`}}>
                        <span>Hello world</span>
                    </div>
                    <div className={styles.portfolioItem} style={{'background-image': `url(${pets10})`}}>
                        <span>Hello world</span>
                    </div>
                    <div className={styles.viewPortfolio}>
                        <PrimaryButton>Выбрать ситтера</PrimaryButton>
                    </div>
                </section>

                <section className={styles.landingSection}>
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
                <footer>Телефон</footer>
            </div>

        );
    }
}

export default App;