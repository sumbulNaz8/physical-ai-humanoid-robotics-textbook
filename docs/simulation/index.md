
# Chapter 3: Robot Simulation with Gazebo & Unity

**Duration:** 2 Weeks (Weeks 6-7)

**Prerequisites:** Completion of Chapter 2: ROS 2 Fundamentals. Students should be proficient in creating ROS 2 nodes, topics, and launch files.

## Chapter Overview

This chapter transitions from software fundamentals to the core of Physical AI development: simulation. Students will learn to create, configure, and interact with realistic 3D robot simulations. The first week focuses on mastering Gazebo, the standard for physics-based simulation in the ROS ecosystem. Students will learn to build complex worlds and integrate a variety of sensors onto their humanoid robot model.

The second week introduces Unity as a high-fidelity simulation platform, prized for its photorealistic graphics and powerful development environment. Students will learn to bridge ROS 2 with Unity, enabling them to control a robot in a visually rich environment and laying the groundwork for creating "digital twins" for advanced AI training and testing.

## Learning Objectives

### Week 6: Advanced Simulation with Gazebo
- Convert a URDF model to the more powerful Simulation Description Format (SDF).
- Design and build custom simulation worlds in Gazebo, including environmental models and lighting.
- Integrate and configure advanced sensor plugins (IMU, 3D LiDAR, Depth Camera) onto a robot model.
- Develop ROS 2 nodes to subscribe to, process, and visualize data from simulated sensors.

### Week 7: High-Fidelity Simulation with Unity
- Understand the benefits of using a game engine like Unity for robotics simulation.
- Establish a robust, bidirectional communication bridge between ROS 2 and Unity.
- Import a robot model into Unity and control its joints using ROS 2 messages.
- Grasp the concept of a "digital twin" and its applications in training and testing Physical AI.

## Course Structure

### Week 6: Mastering Gazebo for Realistic Simulation
- **Lesson 1: Beyond URDF: The Simulation Description Format (SDF).**
  - **Topics:** Limitations of URDF for simulation. Introduction to SDF for describing both robots and worlds. Converting a URDF to SDF.
  - **Activity:** Convert the humanoid robot model from Chapter 2 into a self-contained SDF file.

- **Lesson 2: Building Simulation Worlds.**
  - **Topics:** Syntax of Gazebo `.world` files. Adding ground planes, simple shapes (walls, boxes), lighting, and physics properties.
  - **Activity:** Create a custom "robotics lab" world file with walls, obstacles, and specified lighting.

- **Lesson 3: Integrating Sensors.**
  - **Topics:** Introduction to Gazebo sensor plugins. Adding and configuring IMU, GPU-accelerated 3D LiDAR, and Depth Camera sensors to the robot's SDF model.
  - **Activity:** Add an IMU to the torso, a LiDAR to the head, and a depth camera to the chest of the humanoid robot model.

- **Lesson 4: Subscribing to Sensor Data.**
  - **Topics:** Identifying the ROS 2 topics published by Gazebo plugins. Processing `sensor_msgs/Imu`, `sensor_msgs/PointCloud2`, and `sensor_msgs/Image` messages. Visualizing sensor data in RViz2.
  - **Activity:** Write a Python node that subscribes to all three sensor topics and prints a summary of the data. Use RViz2 to visualize the LiDAR point cloud and the depth camera's image feed.

- **Assignment:** Create a simple "obstacle avoidance" alert system. In your custom world, place the robot in front of a wall. The robot's ROS 2 package should read data from the depth camera, calculate the minimum distance to an obstacle, and publish an alert string if it is too close.

### Week 7: Unity as a High-Fidelity Simulator
- **Lesson 5: Introduction to Unity for Robotics.**
  - **Topics:** Overview of the Unity Engine (GameObjects, Components, Scenes, Assets). Why use a game engine for robotics?
  - **Activity:** Install Unity Hub and the editor. Create a new 3D project and explore the interface.

- **Lesson 6: Bridging ROS 2 and Unity.**
  - **Topics:** The ROS-Unity communication architecture. Setting up the `ROS-TCP-Connector` package in Unity and the `ROS-TCP-Endpoint` on the ROS 2 side.
  - **Activity:** Establish a connection between a running ROS 2 instance and a Unity scene. Create a simple C# script in Unity that logs a "connection successful" message when it connects to ROS.

- **Lesson 7: Controlling Robots in Unity.**
  - **Topics:** Using the `URDF-Importer` package to import the humanoid model into Unity. Using the `Joint Articulation` components. Writing a C# subscriber to receive joint commands from ROS 2.
  - **Activity:** Import the humanoid URDF into Unity. Write a C# script that subscribes to a `/joint_commands` topic and applies the received angles to the robot's joints. Run a ROS 2 `joint_state_publisher` GUI to control the robot in Unity.

- **Lesson 8: The Concept of a Digital Twin.**
  - **Topics:** What is a digital twin? Applications in data generation, AI model training, and remote operation. Using Unity's High Definition Render Pipeline (HDRP) for photorealism.
  - **Activity:** Create a new Unity scene using HDRP. Add a few high-quality assets from the Unity Asset Store to approximate the Gazebo world from Week 6, creating a visually realistic twin.

- **Capstone Project:** Create a unified control system. The same Python ROS 2 node should be used to send joint commands that control the humanoid robot in *both* the Gazebo simulation and the Unity simulation simultaneously. Students will launch both simulators and the control node, demonstrating that the same "brain" can control the robot's body regardless of the simulation environment.

## Assessment

- **Weekly Assignment (40%):** The Gazebo obstacle-avoidance alert system.
- **Capstone Project (60%):** The unified Gazebo/Unity control system.
