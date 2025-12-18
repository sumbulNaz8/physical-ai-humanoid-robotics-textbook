import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { useUser } from '../contexts/UserContext';
import { Navigate } from '@docusaurus/router';

import styles from './index.module.css';

function ChapterCard({ title, lessons, outcomes, chapterNumber, onClick }) {
  const chapterColors = {
    1: { 
      color: '#fde047', 
      gradient: 'linear-gradient(135deg, #fde047 0%, #fbbf24 100%)',
      boxShadow: '0 0 15px rgba(253, 224, 71, 0.3)'
    },
    2: { 
      color: '#fbbf24', 
      gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      boxShadow: '0 0 15px rgba(251, 191, 36, 0.3)'
    },
    3: { 
      color: '#f59e0b', 
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)'
    },
    4: { 
      color: '#d97706', 
      gradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
      boxShadow: '0 0 15px rgba(217, 119, 6, 0.3)'
    }
  };

  const colorConfig = chapterColors[chapterNumber] || chapterColors[1];

  const cardStyle = {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    color: '#d1d5db',
    transition: 'all 0.3s ease',
    cursor: 'default' /* Changed from pointer to default since we have a specific button now */
  };

  const titleStyle = {
    color: colorConfig.color,
    background: colorConfig.gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '700',
    fontSize: '1.5rem'
  };

  const lessonsStyle = {
    color: '#fbbf24',
    background: 'rgba(251, 191, 36, 0.1)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontWeight: '500'
  };

  // Determine the URL based on chapter number
  let chapterUrl = '';
  switch(chapterNumber) {
    case 1:
      chapterUrl = '/introduction/';
      break;
    case 2:
      chapterUrl = '/ros2/';
      break;
    case 3:
      chapterUrl = '/simulation/';
      break;
    case 4:
      chapterUrl = '/nvidia-isaac/';
      break;
    default:
      chapterUrl = '/';
  }

  const linkStyle = {
    display: 'inline-block',
    marginTop: '1.5rem',
    padding: '0.5rem 1.5rem',
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    color: '#000000',
    textDecoration: 'none',
    fontWeight: '600',
    borderRadius: '6px',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    border: 'none'
  };

  return (
    <div
      className="chapter-card"
      style={cardStyle}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = colorConfig.boxShadow;
        e.target.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      <div className="chapter-card__header">
        <h3 className="chapter-card__title" style={titleStyle}>{title}</h3>
        <span className="chapter-card__lessons" style={lessonsStyle}>{lessons}</span>
      </div>
      <div className="chapter-card__outcomes">
        <h4 style={{ color: '#f59e0b', fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Learning Outcomes:</h4>
        <ul>
          {outcomes.map((outcome, index) => (
            <li key={index} style={{ fontSize: '0.95rem', marginBottom: '0.5rem', lineHeight: '1.6', display: 'flex', alignItems: 'flex-start', color: '#d1d5db' }}>
              <span style={{ color: '#fbbf24', marginRight: '0.75rem', fontWeight: '600', flexShrink: 0 }}>✓</span>
              {outcome}
            </li>
          ))}
        </ul>
      </div>
      <Link
        to={chapterUrl}
        style={linkStyle}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 10px rgba(251, 191, 36, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        Explore Chapter
      </Link>
    </div>
  );
}

function Modal({ chapter, onClose }) {
  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)'
  };

  const contentStyle = {
    background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    borderRadius: '0.75rem',
    padding: '2rem',
    width: '90%',
    maxWidth: '600px',
    color: '#d1d5db',
    position: 'relative',
    boxShadow: '0 25px 50px -12px rgba(251, 191, 36, 0.25)'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '700',
    fontSize: '1.5rem',
    marginBottom: '1rem'
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#fbbf24',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
        <h2 style={headerStyle}>{chapter.title}</h2>
        <p style={{ marginBottom: '1.5rem' }}>{chapter.description}</p>
        <h3 style={{ color: '#fde047', fontWeight: '600', marginBottom: '0.5rem' }}>Lessons:</h3>
        <ul style={{ marginBottom: '1.5rem' }}>
          {chapter.lessonsList.map((lesson, index) => (
            <li key={index} style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>• {lesson}</li>
          ))}
        </ul>
        <h3 style={{ color: '#fde047', fontWeight: '600', marginBottom: '0.5rem' }}>Learning Outcomes:</h3>
        <ul>
          {chapter.outcomes.map((outcome, index) => (
            <li key={index} style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>• {outcome}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  
  const heroStyle = {
    background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
    color: '#fbbf24',
    padding: '6rem 0',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '1rem'
  };

  const mainTitleStyle = {
    background: 'linear-gradient(to right, #fde047, #fbbf24, #f59e0b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '2.5rem',
    fontWeight: '800',
    display: 'block',
    whiteSpace: 'nowrap'
  };

  const taglineStyle = {
    color: '#9ca3af',
    fontSize: '1.2rem',
    marginBottom: '2rem',
    maxWidth: '600px',
    margin: '0 auto 2rem'
  };

  return (
    <header className={clsx('hero', styles.heroBanner)} style={heroStyle}>
      <div className="container">
        <h1 className="hero__title" style={mainTitleStyle}>
          Physical AI & Humanoid Robotics
        </h1>
        <p className="hero__subtitle" style={taglineStyle}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#000000',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 10px 20px rgba(251, 191, 36, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
            to="/introduction/">
            Start Learning - 15min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

// Chapter Cards Section
function ChapterCards() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const chapters = [
    {
      id: 1,
      title: "💻 Introduction to Physical AI",
      lessons: "9 lessons",
      chapterNumber: 1,
      outcomes: [
        "Define Physical AI and distinguish from traditional AI",
        "Identify core components of Physical AI systems",
        "Understand challenges in embodied intelligence",
        "Explore applications of humanoid robotics"
      ],
      description: "Foundational concepts of Physical AI with a focus on embodied intelligence.",
      lessonsList: [
        "What is Physical AI?",
        "Components of Physical AI Systems",
        "Applications and Historical Context",
        "Introduction to Humanoid Robotics",
        "Key Challenges in Physical AI",
        "AI-Powered Perception",
        "AI-Powered Control",
        "Applications of Physical AI",
        "Ethical Considerations"
      ]
    },
    {
      id: 2,
      title: "🔗 ROS2 Fundamentals",
      lessons: "9 lessons",
      chapterNumber: 2,
      outcomes: [
        "Learn ROS2 graph architecture",
        "Create nodes, topics, and services",
        "Build custom interfaces and messages",
        "Debug and troubleshoot ROS2 systems"
      ],
      description: "Essential ROS2 concepts for robotics development.",
      lessonsList: [
        "Introduction to the ROS 2 Graph",
        "Environment Setup",
        "Creating Nodes",
        "Custom Interfaces",
        "Debugging Tools",
        "Launch Files",
        "URDF Modeling",
        "Simulation Visualization",
        "TF2 Transforms"
      ]
    },
    {
      id: 3,
      title: "📦 Simulation",
      lessons: "8 lessons",
      chapterNumber: 3,
      outcomes: [
        "Create SDF and URDF robot models",
        "Build simulation environments",
        "Integrate sensors in simulation",
        "Develop digital twin applications"
      ],
      description: "Simulation techniques and tools for robotics development.",
      lessonsList: [
        "SDF Format",
        "Building Worlds",
        "Sensor Integration",
        "Reading Sensor Data",
        "Intro to Unity",
        "ROS-Unity Bridge",
        "Controlling in Unity",
        "Digital Twins"
      ]
    },
    {
      id: 4,
      title: "🧠 NVIDIA Isaac",
      lessons: "11 lessons",
      chapterNumber: 4,
      outcomes: [
        "Set up Isaac ecosystem",
        "Implement perception systems",
        "Train reinforcement learning policies",
        "Deploy on real robots"
      ],
      description: "Advanced robotics platform with perception and control.",
      lessonsList: [
        "Isaac Ecosystem",
        "Environment Setup",
        "Python Scripting",
        "Importing Robots",
        "Isaac ROS Gems",
        "Stereo Vision",
        "Apriltags",
        "Isaac Orbit",
        "Custom RL Environment",
        "Training Policy",
        "Deploying Policy"
      ]
    }
  ];

  const chapterCardSectionStyle = {
    padding: '4rem 1rem',
    background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)'
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const sectionTitleStyle = {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#fbbf24',
    background: 'linear-gradient(to right, #fde047, #fbbf24)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const sectionDescriptionStyle = {
    fontSize: '1.2rem',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 3rem',
    color: '#9ca3af'
  };

  const openModal = (chapter) => {
    setSelectedChapter(chapter);
    setModalOpen(true);
  };

  return (
    <section className="chapter-card-section" style={chapterCardSectionStyle}>
      <div className="container">
        <h2 style={sectionTitleStyle}>Course Chapters</h2>
        <p style={sectionDescriptionStyle}>Explore comprehensive modules covering all aspects of Physical AI and Humanoid Robotics</p>
        <div style={containerStyle}>
          {chapters.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              title={chapter.title}
              lessons={chapter.lessons}
              outcomes={chapter.outcomes}
              chapterNumber={chapter.chapterNumber}
            />
          ))}
        </div>
      </div>
      {modalOpen && selectedChapter && (
        <Modal 
          chapter={selectedChapter} 
          onClose={() => setModalOpen(false)} 
        />
      )}
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  const pageStyle = {
    background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
    color: '#d1d5db',
    minHeight: '100vh'
  };

  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="A comprehensive textbook on Physical AI and Humanoid Robotics">
      <div style={pageStyle}>
        <HomepageHeader />
        <main>
          <ChapterCards />
        </main>
      </div>
    </Layout>
  );
}