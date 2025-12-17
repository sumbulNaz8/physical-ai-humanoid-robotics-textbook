import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function PremiumDashboard() {
  const { siteConfig } = useDocusaurusContext();
  const [robotStatus, setRobotStatus] = useState({
    battery: 87,
    temperature: 35.2,
    connection: 'online',
    tasksCompleted: 24,
    active: true
  });

  const [selectedView, setSelectedView] = useState('overview');

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRobotStatus(prev => ({
        ...prev,
        battery: Math.max(20, Math.min(100, prev.battery + (Math.random() * 4 - 2))),
        temperature: 32 + (Math.random() * 6)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderOverview = () => (
    <div className="row">
      <div className="col col--8 col--offset-2">
        <div className={clsx('lux-card', styles.featureCard)} style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--lux-gold-solid)', textAlign: 'center', marginBottom: '1.5rem' }}>Premium Control Center</h2>
          <div className="row">
            <div className="col col--6">
              <div className="lux-card" style={{ padding: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--lux-gold-solid)' }}>
                  {robotStatus.battery}%
                </div>
                <div style={{ color: 'var(--lux-slate-light)' }}>Battery Level</div>
                <div style={{ height: '8px', background: 'var(--lux-card-bg)', borderRadius: '4px', marginTop: '10px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${robotStatus.battery}%`, 
                      background: robotStatus.battery > 60 ? 'var(--lux-emerald)' : robotStatus.battery > 30 ? '#FFA500' : '#DC3545',
                      transition: 'width 0.5s ease'
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="col col--6">
              <div className="lux-card" style={{ padding: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--lux-gold-solid)' }}>
                  {robotStatus.temperature}°C
                </div>
                <div style={{ color: 'var(--lux-slate-light)' }}>System Temperature</div>
                <div style={{ height: '8px', background: 'var(--lux-card-bg)', borderRadius: '4px', marginTop: '10px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${Math.min(100, robotStatus.temperature * 2.5)}%`, 
                      background: robotStatus.temperature < 40 ? 'var(--lux-emerald)' : robotStatus.temperature < 50 ? '#FFA500' : '#DC3545',
                      transition: 'width 0.5s ease'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row" style={{ marginTop: '1.5rem' }}>
            <div className="col col--6">
              <div className="lux-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--lux-emerald)' }}>
                  {robotStatus.connection.toUpperCase()}
                </div>
                <div style={{ color: 'var(--lux-slate-light)' }}>Connection Status</div>
              </div>
            </div>
            <div className="col col--6">
              <div className="lux-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--lux-gold-solid)' }}>
                  {robotStatus.tasksCompleted}
                </div>
                <div style={{ color: 'var(--lux-slate-light)' }}>Tasks Completed</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={clsx('lux-card', styles.featureCard)}>
          <h2 style={{ color: 'var(--lux-gold-solid)', marginBottom: '1.5rem', textAlign: 'center' }}>System Health</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {['Motors', 'Sensors', 'AI Processor', 'Power System'].map((system, index) => (
              <div key={index} className="lux-card" style={{ padding: '1rem', width: '22%', textAlign: 'center', marginBottom: '1rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--lux-emerald)' }}>OK</div>
                <div style={{ color: 'var(--lux-slate-light)', fontSize: '0.9rem' }}>{system}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderControls = () => (
    <div className="row">
      <div className="col col--8 col--offset-2">
        <div className={clsx('lux-card', styles.featureCard)}>
          <h2 style={{ color: 'var(--lux-gold-solid)', marginBottom: '1.5rem', textAlign: 'center' }}>Precision Controls</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {['Movement', 'Manipulation', 'Navigation', 'Interaction'].map((control, index) => (
              <button 
                key={index} 
                className="lux-button" 
                style={{ minWidth: '120px', padding: '1rem', marginBottom: '1rem' }}
              >
                {control}
              </button>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <div className="lux-card" style={{ padding: '1.5rem', display: 'inline-block' }}>
              <div style={{ fontSize: '1.2rem', color: 'var(--lux-slate-light)', marginBottom: '0.5rem' }}>Joystick Control</div>
              <div style={{ width: '200px', height: '200px', background: 'var(--lux-card-bg)', border: '1px solid var(--lux-border)', borderRadius: '10px', margin: '0 auto', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', background: 'var(--lux-gold-solid)', borderRadius: '50%', cursor: 'move' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderData = () => (
    <div className="row">
      <div className="col col--8 col--offset-2">
        <div className={clsx('lux-card', styles.featureCard)}>
          <h2 style={{ color: 'var(--lux-gold-solid)', marginBottom: '1.5rem', textAlign: 'center' }}>Data Visualization</h2>
          <div className="lux-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ height: '200px', background: 'var(--lux-card-bg)', border: '1px solid var(--lux-border)', borderRadius: '8px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '10px' }}>
              {[65, 88, 45, 92, 70, 60, 78, 85, 90, 72].map((value, index) => (
                <div 
                  key={index} 
                  style={{ 
                    width: '20px', 
                    height: `${value}%`, 
                    background: 'var(--lux-gold)', 
                    borderRadius: '4px 4px 0 0',
                    position: 'relative'
                  }}
                >
                  <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', color: 'var(--lux-slate-light)' }}>
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--lux-slate-light)' }}>Sensor Readings Over Time</div>
          </div>
          
          <div className="row">
            <div className="col col--6">
              <div className="lux-card" style={{ padding: '1rem' }}>
                <h3 style={{ color: 'var(--lux-gold-solid)', textAlign: 'center', marginBottom: '1rem' }}>Motor Performance</h3>
                <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid var(--lux-card-bg)', borderTop: '8px solid var(--lux-gold-solid)', transform: 'rotate(45deg)' }}></div>
                </div>
              </div>
            </div>
            <div className="col col--6">
              <div className="lux-card" style={{ padding: '1rem' }}>
                <h3 style={{ color: 'var(--lux-gold-solid)', textAlign: 'center', marginBottom: '1rem' }}>Battery Usage</h3>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '80%', height: '120px', border: '2px solid var(--lux-gold-solid)', borderRadius: '8px', padding: '10px', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', height: `${robotStatus.battery}%`, background: 'var(--lux-gold)', borderRadius: '4px' }}></div>
                  </div>
                  <div style={{ marginTop: '10px', color: 'var(--lux-slate-light)' }}>{robotStatus.battery}% remaining</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout
      title={`Premium Dashboard - ${siteConfig.title}`}
      description="Premium Robotics Dashboard for Monitoring and Control">
      <div style={{ background: 'var(--lux-black)', minHeight: '100vh', color: 'var(--lux-ivory)' }}>
        {/* Header */}
        <header className={clsx('hero', styles.heroBanner)} style={{ background: 'var(--lux-soft-black)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <Heading as="h1" className="hero__title" style={{ color: 'var(--lux-gold-solid)', margin: 0 }}>
                  Premium Robotics Dashboard
                </Heading>
                <p className="hero__subtitle" style={{ color: 'var(--lux-slate-light)', margin: '0.5rem 0 0' }}>
                  Advanced Humanoid Control Interface
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--lux-card-bg)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--lux-emerald)' }}></div>
                  <span style={{ color: 'var(--lux-ivory)', fontSize: '0.9rem' }}>System Online</span>
                </div>
                <button className="lux-button" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                  Emergency Stop
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <div className="container" style={{ padding: '1rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              { id: 'overview', label: 'System Overview' },
              { id: 'controls', label: 'Precision Controls' },
              { id: 'data', label: 'Data Visualization' }
            ].map((view) => (
              <button
                key={view.id}
                className="lux-button"
                style={{
                  background: selectedView === view.id ? 'var(--lux-gold)' : 'transparent',
                  color: selectedView === view.id ? 'var(--lux-soft-black)' : 'var(--lux-gold-solid)',
                  padding: '0.7rem 1.5rem'
                }}
                onClick={() => setSelectedView(view.id)}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        <main className={styles.mainContent} style={{ padding: '2rem 0' }}>
          {selectedView === 'overview' && renderOverview()}
          {selectedView === 'controls' && renderControls()}
          {selectedView === 'data' && renderData()}
        </main>

        <div className="container" style={{ textAlign: 'center', padding: '2rem 0' }}>
          <Link
            className="lux-button"
            to="/docs/intro"
            style={{ padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none' }}>
            Access Full Documentation
          </Link>
        </div>

        <div className="container" style={{ textAlign: 'center', padding: '1rem 0 2rem' }}>
          <button
            className="lux-button"
            onClick={() => window.location.reload()}
            style={{ padding: '0.8rem 1.5rem' }}>
            Secure Logout
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default function Home() {
  return <PremiumDashboard />;
}