import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import FieldList from '@site/src/components/FieldList/FieldList';
import {translate} from '@docusaurus/Translate';

import styles from './index.module.css';

const MathSVG = require('@site/static/img/undraw_mathematics.svg').default;

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <img alt="" width="530" height="530" decoding="async" data-nimg="1"
                     className="hero__blur-cyan" style={{color: "transparent"}}
                     src={require('@site/static/img/blur-cyan.png').default}/>
                <img alt="" width="530" height="530" decoding="async" data-nimg="1"
                     className="hero__blur-indigo" style={{color: "transparent"}}
                     src={require('@site/static/img/blur-cyan.png').default}/>
                <div className="hero__text-container">
                    <div className="hero__lead">Welcome to the</div>
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{translate({"message": "home.hero.tagline"})}</p>
                    <div className={"hero__button-container " + styles.buttons}>
                        <Link
                            className="hero__button button button--primary button--lg"
                            to="/docs/intro">
                            {translate({"message": "home.hero.button"})}
                        </Link>
                        <Link
                            className="hero__button button button--secondary button--lg"
                            to="https://github.com/Melvin-klein/mathdirectory"
                            target="_blank">
                            View on Github
                        </Link>
                    </div>
                </div>
                <div className="hero__math-svg">
                    <MathSVG width={530} height={530} />
                </div>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`▷ Welcome`}
            description="Math Directory try to describe the maximum of mathematical objects and their properties.">
            <HomepageHeader/>
            <main>
                <HomepageFeatures/>
                <div className="container">
                    <FieldList />
                </div>
            </main>
        </Layout>
    );
}
