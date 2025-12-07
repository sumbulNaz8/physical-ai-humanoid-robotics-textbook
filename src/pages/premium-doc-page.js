import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ChevronRight, ChevronLeft, BookOpen, List, Target } from 'lucide-react';
import ProgressBar from '../components/ProgressBar'; // We will create this component next
import '../css/premium-doc-page.css'; // We will create this stylesheet next

// Mock data that would typically come from Docusaurus props or a side-loaded file
const docData = {
  title: 'Chapter 2: ROS 2 Fundamentals',
  progress: 3, // Current lesson index
  lessons: [
    { title: 'ROS 2 Graph and Concepts', path: '#' },
    { title: 'Environment Setup and Workspace', path: '#' },
    { title: 'Creating ROS 2 Nodes', path: '#' },
    { title: 'Custom Interfaces', path: '#' },
    { title: 'Debugging Tools (RQt, Rviz)', path: '#' },
    { title: 'Launch Files for Complex Systems', path: '#' },
    { title: 'URDF Modeling for Robot Description', path: '#' },
    { title: 'Simulation and Visualization with Gazebo', path: '#' },
    { title: 'TF2 Transforms for Coordinate Systems', path: '#' },
  ],
  learningOutcomes: [
    "Master ROS 2 concepts like nodes, topics, services, and actions.",
    "Model a robot using URDF and launch complex systems.",
    "Utilize TF2 for coordinate transformations in a robotic system.",
  ],
};

const PremiumDocPage = () => {
  return (
    <Layout>
      <div className="premium-doc-layout">
        {/* Top Progress Bar */}
        <div className="progress-bar-container">
          <ProgressBar
            isPlanning={false}
            hasFinalAnswer={false}
            progress={{
              currentStep: docData.progress,
              totalSteps: docData.lessons.length,
              plan: {
                task: "Completing Chapter",
                steps: docData.lessons.map(l => ({ title: l.title, details: '' }))
              }
            }}
          />
        </div>

        <div className="doc-content-container">
          {/* Sidebar Navigation */}
          <aside className="doc-sidebar">
            <nav>
              <div className="sidebar-header">
                <BookOpen size={20} />
                <h3 className="sidebar-title">Course Chapters</h3>
              </div>
              <ul className="sidebar-chapter-list">
                {/* Mock chapter data */}
                <li><Link to="#">1. Introduction to Physical AI</Link></li>
                <li className="active"><Link to="#">2. ROS 2 Fundamentals</Link></li>
                <li><Link to="#">3. Simulation Environments</Link></li>
                <li><Link to="#">4. NVIDIA Isaac & RL</Link></li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="doc-main-content">
            <header className="doc-header">
              <h1 className="doc-title">{docData.title}</h1>
            </header>

            <div className="doc-body">
              <div className="lesson-list-container">
                <div className="lesson-list-header">
                  <List size={20} />
                  <h2 className="lesson-list-title">Lessons in this Chapter</h2>
                </div>
                <ul className="lesson-list">
                  {docData.lessons.map((lesson, index) => (
                    <li key={index} className={index === docData.progress ? 'active' : ''}>
                      <Link to={lesson.path}>{index + 1}. {lesson.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="outcomes-container">
                <div className="outcomes-header">
                  <Target size={20} />
                  <h2 className="outcomes-title">Learning Outcomes</h2>
                </div>
                <ul className="outcomes-list">
                  {docData.learningOutcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
              </div>

              <article className="prose-container">
                <h2>Lesson {docData.progress + 1}: {docData.lessons[docData.progress].title}</h2>
                <p>
                  This is where the content of your lesson would go. You can fetch this content from your Markdown files or define it here.
                </p>
                <p>
                  The layout is designed to be clean and readable, with a focus on the learning experience. The sidebar provides easy navigation between chapters, and the lesson list shows your progress through the current chapter.
                </p>
              </article>
            </div>
          </main>

          {/* Navigation Arrows */}
          <div className="doc-nav-arrows">
            <Link to="#" className="nav-arrow prev">
              <ChevronLeft size={24} />
              <span>Previous</span>
            </Link>
            <Link to="#" className="nav-arrow next">
              <span>Next</span>
              <ChevronRight size={24} />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PremiumDocPage;