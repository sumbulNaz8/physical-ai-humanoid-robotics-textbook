import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    if (username === 'admin' && password === '12345') {
      onLogin(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={clsx('hero', styles.loginHero)}>
      <div className="container">
        <div className={clsx('row', styles.loginRow)}>
          <div className="col col--6 col--offset-3">
            <div className={clsx(styles.loginContainer, 'lux-glass')}>
              <div className={clsx(styles.loginForm)}>
                <Heading as="h1" className={clsx(styles.loginTitle, 'hero__title', 'lux-text-gold')}>
                  <span className="lux-text-gold">Robotics Dashboard</span> <br /> <span style={{ fontSize: '0.8em', display: 'block', marginTop: '10px' }}>Premium Access</span>
                </Heading>

                {error && (
                  <div className={clsx(styles.errorMessage, 'lux-card')} style={{ background: 'rgba(220, 53, 69, 0.2)', border: '1px solid #dc3545' }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className={clsx(styles.inputGroup)}>
                    <label htmlFor="username" className={clsx(styles.label, 'lux-text-gold')}>Username</label>
                    <input
                      id="username"
                      type="text"
                      className={clsx(styles.input, 'lux-input')}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                    />
                  </div>

                  <div className={clsx(styles.inputGroup)}>
                    <label htmlFor="password" className={clsx(styles.label, 'lux-text-gold')}>Password</label>
                    <input
                      id="password"
                      type="password"
                      className={clsx(styles.input, 'lux-input')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                    />
                  </div>

                  <button type="submit" className={clsx(styles.loginButton, 'lux-button')}>
                    Access Dashboard
                  </button>
                </form>
                
                <div style={{ marginTop: '20px', textAlign: 'center', color: 'var(--lux-slate-light)', fontSize: '0.9rem' }}>
                  <p>Enterprise-grade security • Encrypted transmission</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Dashboard - ${siteConfig.title}`}
      description="Robotics Dashboard for Monitoring and Control">
      <div style={{ background: 'black', minHeight: '100vh', color: 'gold' }}>
        {/* Replicating the UI chapter header */}
        <header className={clsx('hero', styles.heroBanner)}>
          <div className="container">
            <Heading as="h1" className="hero__title" style={{ color: 'gold' }}>
              <span className="lux-text-gold">Robotics</span> <span className="lux-text-emerald">Dashboard</span>
            </Heading>
            <p className="hero__subtitle" style={{ color: 'var(--lux-slate-light)' }}>Premium Humanoid Robotics Interface</p>
          </div>
        </header>

        <main className={styles.mainContent}>
          <section className={styles.featuresSection}>
            <div className="container">
              <div className="row">
                <div className="col col--4">
                  <div className={clsx(styles.featureCard, 'lux-card')}>
                    <h2 style={{ color: 'var(--lux-gold-solid)' }}>Robot Status</h2>
                    <p style={{ color: 'var(--lux-ivory)' }}>
                      Monitor real-time robot status, battery levels, and system health with premium visualization.
                    </p>
                  </div>
                </div>
                <div className="col col--4">
                  <div className={clsx(styles.featureCard, 'lux-card')}>
                    <h2 style={{ color: 'var(--lux-gold-solid)' }}>Controls</h2>
                    <p style={{ color: 'var(--lux-ivory)' }}>
                      Safely control robot movements and operations with our intuitive luxury interface.
                    </p>
                  </div>
                </div>
                <div className="col col--4">
                  <div className={clsx(styles.featureCard, 'lux-card')}>
                    <h2 style={{ color: 'var(--lux-gold-solid)' }}>Data Visualization</h2>
                    <p style={{ color: 'var(--lux-ivory)' }}>
                      Visualize sensor data, trajectories, and performance metrics with premium analytics.
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
                  <h2 style={{ color: 'var(--lux-gold-solid)', textAlign: 'center' }}>Robot Control Interface</h2>
                  <p style={{ color: 'var(--lux-slate-light)', textAlign: 'center' }}>
                    This dashboard provides comprehensive control and monitoring capabilities for humanoid robots.
                    The interface prioritizes safety, clarity, and real-time feedback.
                  </p>

                  <ul style={{ color: 'var(--lux-ivory)', paddingLeft: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--lux-gold-solid)' }}>Safety-First Design:</strong> Critical controls are clearly marked and require confirmation
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--lux-gold-solid)' }}>Real-Time Feedback:</strong> Robot states and sensor data are displayed with minimal latency
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--lux-gold-solid)' }}>Intuitive Controls:</strong> UI elements map logically to robot actions
                    </li>
                    <li>
                      <strong style={{ color: 'var(--lux-gold-solid)' }}>Error Handling:</strong> Clear messaging when operations fail or encounter unexpected conditions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="container" style={{ textAlign: 'center', padding: '2rem 0' }}>
            <Link
              className="button button--secondary button--lg lux-button"
              to="/docs/intro"
              style={{ background: 'transparent', color: 'var(--lux-gold-solid)', borderColor: 'var(--lux-gold-solid)', fontSize: '1.2rem' }}>
              Access Documentation
            </Link>
          </div>

          <div className="container" style={{ textAlign: 'center', padding: '1rem 0' }}>
            <button
              className={clsx(styles.logoutButton, 'lux-button')}
              onClick={() => window.location.reload()}
              style={{ background: 'transparent', color: 'var(--lux-gold-solid)', borderColor: 'var(--lux-gold-solid)' }}>
              Secure Logout
            </button>
          </div>
        </main>
      </div>
    </Layout>
  );
}

// Main component with authentication flow
export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {!isAuthenticated ? (
        <LoginPage onLogin={setIsAuthenticated} />
      ) : (
        <DashboardPage setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
}