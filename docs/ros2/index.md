
# Chapter 2: ROS 2 Fundamentals

**Duration:** 3 Weeks (Weeks 3-5)

**Prerequisites:** Completion of Chapter 1: Introduction to Physical AI. Basic proficiency in Python and/or C++.

## Chapter Overview

This chapter provides a comprehensive, hands-on introduction to the Robot Operating System 2 (ROS 2), the foundational software framework for modern robotics development. Students will move from theoretical concepts to practical implementation, focusing on the skills necessary to build, debug, and manage complex robotics applications, with a special emphasis on humanoid robotics.

By the end of this chapter, students will be able to design and implement a multi-node ROS 2 application, control a simulated robotic arm, and understand the core principles of robotic software architecture.

## Learning Objectives

### Week 3: Core ROS 2 Concepts
- Understand the fundamental ROS 2 computational graph (Nodes, Topics, Services, Actions, Parameters).
- Set up and manage a ROS 2 development workspace and packages.
- Implement basic communication between nodes using publishers and subscribers.

### Week 4: ROS 2 Tools & Data Structures
- Define and use custom ROS 2 interfaces (messages, services, actions).
- Utilize essential command-line tools (`ros2`, `rqt`) for introspection and debugging.
- Write and manage complex multi-node systems using ROS 2 launch files.

### Week 5: Simulation and Application
- Understand the role of URDF in defining robot models.
- Use Gazebo for physics-based simulation and RViz2 for 3D visualization.
- Implement coordinate frame transformations using the TF2 library.
- Integrate all concepts in a capstone project to control a simulated robot.

## Course Structure

The chapter is divided into three weekly modules, each containing theoretical lessons and a practical assignment.

### Week 3: Getting Started with ROS 2
- **Lesson 1: Introduction to the ROS 2 Graph.**
  - **Topics:** Nodes, Topics (Publish/Subscribe), Services (Request/Response), Actions (Long-running goals), Parameters.
  - **Activity:** Diagramming a simple robotics application (e.g., a mobile robot with a sensor) using ROS 2 concepts.

- **Lesson 2: Setting Up Your Development Environment.**
  - **Topics:** Installing ROS 2, creating a workspace (`colcon`), creating a ROS 2 package.
  - **Activity:** Students will set up their machines and create a new package for the chapter's assignments.

- **Lesson 3: Creating Your First ROS 2 Nodes.**
  - **Topics:** Writing a simple publisher and subscriber node in Python.
  - **Activity:** Implement a "chatter" system where one node publishes a string message and another subscribes to it, printing the output.

- **Assignment 1:** Build a simple two-node system where a "sensor" node publishes a random number and a "monitor" node subscribes to the data, printing an alert if the number exceeds a certain threshold.

### Week 4: Building Robust ROS 2 Systems
- **Lesson 4: Defining Custom Interfaces.**
  - **Topics:** Creating custom `.msg`, `.srv`, and `.action` files.
  - **Activity:** Define a custom message `SensorData.msg` containing a timestamp and a floating-point value.

- **Lesson 5: Introspection and Debugging.**
  - **Topics:** Using `ros2 topic`, `ros2 node`, `ros2 service` commands. Introduction to RQT tools (`rqt_graph`, `rqt_plot`).
  - **Activity:** Use RQT to visualize the node graph from Assignment 1 and plot the published data.

- **Lesson 6: Managing Complex Applications with Launch Files.**
  - **Topics:** Writing a basic launch file in Python to start multiple nodes and configure parameters.
  - **Activity:** Create a launch file that starts both nodes from Assignment 1 simultaneously.

- **Assignment 2:** Extend Assignment 1 by using the custom `SensorData` message. Create a service that allows another node to reset the sensor's reading. Manage the entire system with a single launch file.

### Week 5: Simulating a Humanoid Robot
- **Lesson 7: Modeling Your Robot with URDF.**
  - **Topics:** Introduction to the Unified Robot Description Format (URDF). Defining links, joints, and visual meshes.
  - **Activity:** Create a simple URDF for a two-link robotic arm.

- **Lesson 8: Simulation and Visualization.**
  - **Topics:** Spawning a URDF model in Gazebo. Publishing joint states using the `joint_state_publisher` node. Visualizing the model in RViz2.
  - **Activity:** View the two-link arm model in Gazebo and RViz2.

- **Lesson 9: Coordinate Transformations with TF2.**
  - **Topics:** Understanding why TF2 is crucial in robotics. Broadcasting and listening to transformations.
  - **Activity:** Use TF2 to track the position of the end-effector of the robotic arm relative to its base.

- **Capstone Project:** Combine all learned concepts to build a complete system. Students will:
  1. Finalize the URDF for a simple 3-DOF robotic arm.
  2. Create a control node that publishes joint commands to the arm.
  3. Use Gazebo to simulate the arm's movement in response to the commands.
  4. Use RViz2 to visualize the robot's state and the TF2 frames.
  5. **Goal:** Write a simple program that makes the robot's end-effector touch a series of predefined points in space.

## Assessment

- **Weekly Assignments (60%):** Two assignments to reinforce concepts from Weeks 3 and 4.
- **Capstone Project (40%):** A final project in Week 5 to demonstrate mastery of all concepts covered in the chapter.

This structured, project-based approach ensures that students not only learn the theory behind ROS 2 but also gain the practical, implementation-focused skills needed for real-world humanoid robotics applications.
