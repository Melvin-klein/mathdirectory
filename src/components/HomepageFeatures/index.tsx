import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { translate } from '@docusaurus/Translate';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({ message: 'home.items.first.title' }),
    Svg: require('@site/static/img/undraw_with_love.svg').default,
    description: (
      <>
        {translate({ message: "home.items.first.content" })}
      </>
    ),
  },
  {
    title: translate({ message: 'home.items.second.title' }),
    Svg: require('@site/static/img/undraw_open_source.svg').default,
    description: (
      <>
        {translate({ message: "home.items.second.content" })}
      </>
    ),
  },
  {
    title: translate({ message: 'home.items.third.title' }),
    Svg: require('@site/static/img/undraw_coffee_with_friends.svg').default,
    description: (
      <>
        {translate({ message: "home.items.third.content" })}
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
