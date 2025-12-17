import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PersonalizeButton from '../components/ContentPersonalizer/PersonalizeButton';
import { PersonalizationProvider } from '../components/ContentPersonalizer/PersonalizeButton';

import styles from './ui-chapter.module.css';

// Simple authentication utility functions
const AuthUtils = {
  isLoggedIn: () => {
    return localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
  },
};

function UiChapterHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)} style={{ background: 'var(--lux-soft-black)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <Heading as="h1" className="hero__title" style={{ color: 'var(--lux-gold)', fontSize: '2.5rem', marginBottom: '1rem' }}>
            UI Design for Robotics: Premium Interfaces
          </Heading>
          <p className="hero__subtitle" style={{ color: 'var(--lux-slate-light)', fontSize: '1.2rem' }}>
            Crafting sophisticated interfaces for advanced robotic systems
          </p>
        </div>
      </div>
    </header>
  );
}

export default function UiChapter() {
  const { siteConfig } = useDocusaurusContext();
  const [chapterContent, setChapterContent] = useState("");
  const isLoggedIn = AuthUtils.isLoggedIn();

  // Initialize with elegant chapter content
  useEffect(() => {
    const elegantContent = `# Premium User Interfaces for Robotics: Design and Implementation

## Executive Overview
Creating sophisticated user interfaces for robotic systems requires a deep understanding of human-robot interaction principles. This chapter explores the most advanced design patterns and implementation strategies for creating elegant, intuitive interfaces.

## Premium Web Interfaces
The most sophisticated web-based UIs for robot monitoring and control incorporate real-time data visualization with aesthetic excellence. These interfaces provide seamless remote access and control capabilities for advanced robotic systems.

### Distinguished Features of Premium Interfaces:
- Real-time data display with elegant visualization
- Remote control capabilities with intuitive gesture recognition
- Responsive design for various devices with consistent luxury experience
- Advanced security protocols and user authentication

## Artistic Data Visualization
Techniques for displaying robot sensor data, states, and performance metrics with visual excellence. Sophisticated visualization helps operators make informed decisions while maintaining aesthetic appeal.

### Refined Visualization Categories:
- Dynamic sensor readings (interactive charts, real-time graphs, thermal maps)
- Elegant robot status indicators with color-coded feedback
- Advanced path planning visualization with predictive modeling
- Performance metrics dashboard with trend analysis

## Mobile Excellence
Developing premium mobile applications for portable robot control and monitoring. Mobile interfaces offer unparalleled flexibility and portability for sophisticated robotic operations.

### Advantages of Premium Mobile UIs:
- Seamless portability and intuitive use
- Direct communication with robots using advanced protocols
- Sophisticated touch-based controls with haptic feedback
- Integration with premium mobile sensors (LiDAR, advanced cameras)

## Premium UI Design Principles for Robotics
The most effective user interfaces for robotics applications emphasize safety, clarity, and premium real-time feedback. The following principles guide the creation of elite robotic UIs:

### Safety-First Excellence
Critical controls are elegantly marked and require sophisticated confirmation to prevent accidental activation. This is essential in robotics where incorrect commands can cause damage or injury.

### Real-Time Feedback Mastery
Robot states and sensor data are displayed with minimal latency. Operators need current information to make safe decisions and understand robot behavior.

### Intuitive Control Design
UI elements map logically to robot actions. For example, a precision joystick control moves the robot in the direction indicated with smooth, responsive feedback.

### Error Handling Sophistication
Clear, elegant messaging when operations fail or encounter unexpected conditions. Users always understand the robot's state and any issues that may arise.`;

    setChapterContent(elegantContent);
  }, []);

  // Handle content changes from personalization
  const handleContentChange = (newContent) => {
    setChapterContent(newContent);
  };

  return (
    <Layout
      title={`Premium UI Chapter - ${siteConfig.title}`}
      description="Premium User Interfaces for Robotics with Elegant Design">
      <div style={{ background: 'var(--lux-black)', minHeight: '100vh', color: 'var(--lux-ivory)' }}>
        <UiChapterHeader />
        <main className={styles.mainContent}>
          {/* Personalization Section - Only visible to logged-in users */}
          {isLoggedIn && (
            <PersonalizationProvider>
              <div className="container" style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <PersonalizeButton
                  chapterContent={chapterContent}
                  onContentChange={handleContentChange}
                  chapterTitle="Premium UI Chapter - Robotics Interfaces"
                />
              </div>
            </PersonalizationProvider>
          )}

          {!isLoggedIn && (
            <div className="container" style={{
              textAlign: 'center',
              padding: '2rem',
              margin: '2rem',
              borderRadius: '12px'
            }}>
              <div className="lux-card" style={{ padding: '2rem' }}>
                <p style={{ color: 'var(--lux-ivory)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                  Please log in to personalize this chapter content to your preferences and interests.
                </p>
                <Link
                  className="lux-button"
                  to="/personalization-demo"
                  style={{ textDecoration: 'none' }}>
                  Experience Personalization Demo
                </Link>
              </div>
            </div>
          )}

          <section className={styles.featuresSection} style={{ padding: '3rem 0' }}>
            <div className="container">
              <div className="row" style={{ marginBottom: '3rem' }}>
                <div className="col col--4">
                  <div className={clsx(styles.featureCard, 'lux-card')} style={{ height: '100%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        margin: '0 auto 1rem', 
                        borderRadius: '50%', 
                        background: 'var(--lux-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '1.8rem', color: 'var(--lux-soft-black)' }}>W</span>
                      </div>
                      <h2 style={{ color: 'var(--lux-gold-solid)', marginBottom: '1rem' }}>Web Interfaces</h2>
                    </div>
                    <p style={{ color: 'var(--lux-ivory)' }}>
                      Creating sophisticated web-based UIs for robot monitoring and control with real-time data visualization.
                    </p>
                  </div>
                </div>
                <div className="col col--4">
                  <div className={clsx(styles.featureCard, 'lux-card')} style={{ height: '100%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        margin: '0 auto 1rem', 
                        borderRadius: '50%', 
                        background: 'var(--lux-emerald)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '1.8rem', color: 'var(--lux-soft-black)' }}>D</span>
                      </div>
                      <h2 style={{ color: 'var(--lux-gold-solid)', marginBottom: '1rem' }}>Data Visualization</h2>
                    </div>
                    <p style={{ color: 'var(--lux-ivory)' }}>
                      Techniques for displaying robot sensor data, states, and performance metrics with visual excellence.
                    </p>
                  </div>
                </div>
                <div className="col col--4">
                  <div className={clsx(styles.featureCard, 'lux-card')} style={{ height: '100%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        margin: '0 auto 1rem', 
                        borderRadius: '50%', 
                        background: 'var(--lux-burgundy)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '1.8rem', color: 'var(--lux-ivory)' }}>M</span>
                      </div>
                      <h2 style={{ color: 'var(--lux-gold-solid)', marginBottom: '1rem' }}>Mobile Excellence</h2>
                    </div>
                    <p style={{ color: 'var(--lux-ivory)' }}>
                      Developing premium mobile applications for portable robot control and monitoring.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.contentSection} style={{ padding: '2rem 0' }}>
            <div className="container padding-horiz--md">
              <div className="row">
                <div className="col col--8 col--offset-2">
                  <div className="lux-card" style={{ padding: '2rem' }}>
                    <h2 style={{ color: 'var(--lux-gold-solid)', textAlign: 'center', marginBottom: '1.5rem' }}>
                      Premium Design Principles for Robotics
                    </h2>
                    <p style={{ color: 'var(--lux-ivory)', textAlign: 'center', marginBottom: '2rem' }}>
                      The most effective user interfaces for robotics applications emphasize safety,
                      clarity, and premium real-time feedback. The following principles guide the creation of
                      elite robotic UIs:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <div className="lux-card" style={{ padding: '1.2rem', backgroundColor: 'rgba(30, 30, 30, 0.5)' }}>
                        <h3 style={{ color: 'var(--lux-gold-solid)', margin: '0 0 0.5rem 0' }}>Safety-First Excellence:</h3>
                        <p style={{ color: 'var(--lux-ivory)', margin: 0 }}>
                          Critical controls are elegantly marked and require sophisticated confirmation
                        </p>
                      </div>
                      
                      <div className="lux-card" style={{ padding: '1.2rem', backgroundColor: 'rgba(30, 30, 30, 0.5)' }}>
                        <h3 style={{ color: 'var(--lux-gold-solid)', margin: '0 0 0.5rem 0' }}>Real-Time Feedback Mastery:</h3>
                        <p style={{ color: 'var(--lux-ivory)', margin: 0 }}>
                          Robot states and sensor data are displayed with minimal latency
                        </p>
                      </div>
                      
                      <div className="lux-card" style={{ padding: '1.2rem', backgroundColor: 'rgba(30, 30, 30, 0.5)' }}>
                        <h3 style={{ color: 'var(--lux-gold-solid)', margin: '0 0 0.5rem 0' }}>Intuitive Control Design:</h3>
                        <p style={{ color: 'var(--lux-ivory)', margin: 0 }}>
                          UI elements map logically to robot actions with responsive feedback
                        </p>
                      </div>
                      
                      <div className="lux-card" style={{ padding: '1.2rem', backgroundColor: 'rgba(30, 30, 30, 0.5)' }}>
                        <h3 style={{ color: 'var(--lux-gold-solid)', margin: '0 0 0.5rem 0' }}>Error Handling Sophistication:</h3>
                        <p style={{ color: 'var(--lux-ivory)', margin: 0 }}>
                          Clear, elegant messaging when operations fail or encounter unexpected conditions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dynamic Chapter Content Section */}
          <section className={styles.contentSection} style={{ marginTop: '2rem', padding: '2rem 0' }}>
            <div className="container padding-horiz--md">
              <div className="row">
                <div className="col col--10 col--offset-1">
                  <div className="lux-card" style={{ padding: '2rem' }}>
                    <div
                      style={{
                        color: 'var(--lux-ivory)',
                        lineHeight: '1.8',
                      }}
                      dangerouslySetInnerHTML={{ __html: chapterContent.replace(/\n/g, '<br />') }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="container" style={{ textAlign: 'center', padding: '3rem 0 2rem' }}>
            <Link
              className="lux-button"
              to="/docs/category/chapter-5-ui"
              style={{ fontSize: '1.2rem', padding: '1rem 2.5rem', textDecoration: 'none' }}>
              Access Premium Content
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
}