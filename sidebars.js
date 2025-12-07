/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '01 - Introduction to Physical AI',
      items: [
        'introduction/index',
        'introduction/lesson-1-what-is-physical-ai',
        'introduction/lesson-2-components-of-physical-ai',
        'introduction/lesson-3-applications-of-physical-ai',
        'introduction/lesson-3-historical-context',
        'introduction/lesson-4-intro-humanoid-robotics',
        'introduction/lesson-5-key-challenges',
        'introduction/lesson-6-ai-perception',
        'introduction/lesson-7-ai-control',
        'introduction/lesson-8-applications',
        'introduction/lesson-9-ethical-considerations'
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: '02 - ROS2 Fundamentals',
      items: [
        'ros2/index',
        'ros2/lesson-1-ros-graph',
        'ros2/lesson-2-environment-setup',
        'ros2/lesson-3-creating-nodes',
        'ros2/lesson-4-custom-interfaces',
        'ros2/lesson-5-debugging-tools',
        'ros2/lesson-6-launch-files',
        'ros2/lesson-7-urdf-modeling',
        'ros2/lesson-8-simulation-visualization',
        'ros2/lesson-9-tf2-transforms'
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: '03 - Simulation',
      items: [
        'simulation/index',
        'simulation/lesson-1-sdf-format',
        'simulation/lesson-2-building-worlds',
        'simulation/lesson-3-sensor-integration',
        'simulation/lesson-4-reading-sensor-data',
        'simulation/lesson-5-intro-to-unity',
        'simulation/lesson-6-ros-unity-bridge',
        'simulation/lesson-7-controlling-in-unity',
        'simulation/lesson-8-digital-twins'
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: '04 - NVIDIA Isaac',
      items: [
        'nvidia-isaac/index',
        'nvidia-isaac/lesson-1-isaac-ecosystem',
        'nvidia-isaac/lesson-2-environment-setup',
        'nvidia-isaac/lesson-3-python-scripting',
        'nvidia-isaac/lesson-4-importing-robots',
        'nvidia-isaac/lesson-5-isaac-ros-gems',
        'nvidia-isaac/lesson-6-stereo-vision',
        'nvidia-isaac/lesson-7-apriltags',
        'nvidia-isaac/lesson-8-isaac-orbit',
        'nvidia-isaac/lesson-9-custom-rl-env',
        'nvidia-isaac/lesson-10-training-policy',
        'nvidia-isaac/lesson-11-deploying-policy'
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: '05 - User Interfaces for Robotics',
      items: [
        'user-interfaces/index',
        'user-interfaces/lesson-1-intro-to-ui-frameworks',
        'user-interfaces/lesson-2-web-based-interfaces',
        'user-interfaces/lesson-3-data-visualization',
        'user-interfaces/lesson-4-mobile-interfaces',
        'user-interfaces/lesson-5-advanced-ui-concepts'
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: '06 - Advanced Robotics',
      items: [
        'advanced-robotics/index'
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: '07 - Projects',
      items: [
        'projects/index'
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'roadmap',
        'glossary',
        'references',
        'index-page',
        'credits'
      ],
      collapsed: true
    }
  ],
};

export default sidebars;