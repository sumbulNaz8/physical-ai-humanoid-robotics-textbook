import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Comprehensive Curriculum',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Complete coverage of Physical AI and Humanoid Robotics from fundamentals to advanced topics.
      </>
    ),
  },
  {
    title: 'Hands-on Learning',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Practical exercises and projects that reinforce theoretical concepts.
      </>
    ),
  },
  {
    title: 'Modern Tools',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Learn with state-of-the-art tools like ROS2, NVIDIA Isaac, and modern simulation platforms.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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