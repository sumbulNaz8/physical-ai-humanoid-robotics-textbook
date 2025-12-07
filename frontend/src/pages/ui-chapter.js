import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './ui-chapter.module.css';

function UiChapterHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title" style={{ color: 'gold' }}>
          UI Chapter - Robotics Interfaces
        </Heading>
        <p className="hero__subtitle" style={{ color: 'gold' }}>Black Background with Golden Text Theme</p>
      </div>
    </header>
  );
}

export default function UiChapter() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`UI Chapter - ${siteConfig.title}`}
      description="User Interfaces for Robotics with Black Background and Golden Text Theme">
      <div style={{ background: 'black', minHeight: '100vh', color: 'gold' }}>
        <UiChapterHeader />
        <main className={styles.mainContent}>
          <section className={styles.featuresSection}>
            <div className="container">
              <div className="row">
                <div className="col col--4">
                  <div className={styles.featureCard}>
                    <h2 style={{ color: 'gold' }}>Web Interfaces</h2>
                    <p style={{ color: '#CCCCCC' }}>
                      Creating web-based UIs for robot monitoring and control with real-time data visualization.
                    </p>
                  </div>
                </div>
                <div className="col col--4">
                  <div className={styles.featureCard}>
                    <h2 style={{ color: 'gold' }}>Data Visualization</h2>
                    <p style={{ color: '#CCCCCC' }}>
                      Techniques for displaying robot sensor data, states, and performance metrics effectively.
                    </p>
                  </div>
                </div>
                <div className="col col--4">
                  <div className={styles.featureCard}>
                    <h2 style={{ color: 'gold' }}>Mobile UIs</h2>
                    <p style={{ color: '#CCCCCC' }}>
                      Developing mobile applications for portable robot control and monitoring.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.contentSection}>
            <div className="container padding-horiz--md">
              <div className="row">
                <div className="col col--8 col--offset-2">
                  <h2 style={{ color: 'gold', textAlign: 'center' }}>UI Design Principles for Robotics</h2>
                  <p style={{ color: '#CCCCCC', textAlign: 'center' }}>
                    Effective user interfaces for robotics applications must prioritize safety, 
                    clarity, and real-time feedback. The following principles guide the design of 
                    robotic UIs:
                  </p>
                  
                  <ul style={{ color: '#CCCCCC', paddingLeft: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'gold' }}>Safety-First Design:</strong> Critical controls should be clearly marked and require confirmation
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'gold' }}>Real-Time Feedback:</strong> Robot states and sensor data should be displayed with minimal latency
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'gold' }}>Intuitive Controls:</strong> UI elements should map logically to robot actions
                    </li>
                    <li>
                      <strong style={{ color: 'gold' }}>Error Handling:</strong> Clear messaging when operations fail or encounter unexpected conditions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="container" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/category/chapter-5-ui"
              style={{ background: 'gold', color: 'black', borderColor: 'gold', fontSize: '1.2rem' }}>
              View Chapter Content
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
}