import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header
      className={clsx('hero', styles.heroBanner)}
      style={{ background: 'black', color: 'gold' }}
    >
      <div className="container">
        <Heading as="h1" className="hero__title" style={{ color: 'gold' }}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle" style={{ color: 'gold' }}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
            style={{ background: 'gold', color: 'black', borderColor: 'gold' }}>
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <div style={{ background: 'black', minHeight: '100vh', color: 'gold' }}>
        <HomepageHeader />
        <main style={{ background: 'black', color: 'gold' }}>
          <HomepageFeatures />
        </main>
      </div>
    </Layout>
  );
}
