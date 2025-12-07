<!-- 
# 3-Week Humanoid Robotics Teaching Roadmap

## Course Philosophy

This roadmap outlines an intensive, 3-week module designed for a Physical AI course with a focus on practical, implementation-driven learning for humanoid robotics. The curriculum is structured to rapidly move students from foundational concepts to hands-on control of a simulated humanoid robot using ROS 2, culminating in a capstone project that integrates locomotion, balance, and perception.

---

## Week 1: Foundations of Humanoid Robotics & Simulation

**Goal:** Students will model a simple humanoid robot from scratch, spawn it in a physics-based simulator, and understand the foundational software architecture (ROS 2) used to control it.

| Day | Topic | Learning Objectives | Practical Implementation |
| :-- | :--- | :--- | :--- |
| 1 | **Introduction to Humanoid Systems** | - Define the key challenges of humanoid robotics (bipedal locomotion, dynamic stability, manipulation).<br>- Differentiate humanoid systems from other robotic platforms.<br>- Introduce the course's capstone project. | - Analyze videos of modern humanoid robots (e.g., Boston Dynamics' Atlas, Agility Robotics' Digit).<br>- Deconstruct their movements into core components (walking, balancing, interacting). |
| 2 | **The ROS 2 Ecosystem** | - Understand the ROS 2 computational graph (Nodes, Topics, Services, Actions).<br>- Set up a complete ROS 2 development environment. | - **Lab:** Install ROS 2. Create a workspace and a package. Implement a simple "hello world" publisher/subscriber to verify the setup. |
| 3 | **Robot Modeling with URDF** | - Learn the Unified Robot Description Format (URDF) syntax.<br>- Define `links` (kinematic chains) and `joints` (articulation). | - **Lab:** Write a URDF file for a simple bipedal robot, defining the torso, hips, and leg links connected by revolute joints. |
| 4 | **Simulation & Visualization** | - Understand the roles of Gazebo (physics simulation) and RViz2 (visualization).<br>- Learn to launch and configure a simulation environment. | - **Lab:** Create a ROS 2 launch file to spawn the URDF model into a Gazebo world. Use the `joint_state_publisher` GUI to articulate the robot's joints and view the model in both Gazebo and RViz2. |
| 5 | **Coordinate Frames with TF2** | - Grasp the importance of coordinate transformations in robotics.<br>- Use TF2 to broadcast and listen to transforms. | - **Lab:** Use `robot_state_publisher` to automatically broadcast the robot's link transforms. Write a simple Python node that uses a `TransformListener` to print the position of the robot's "foot" relative to its "torso". |

**End-of-Week Milestone:** Students have a simulated humanoid robot that can be posed and visualized, and they are comfortable with the basic ROS 2 toolchain.

---

## Week 2: Bipedal Locomotion & Joint Control

**Goal:** Students will implement a basic walking gait for their simulated humanoid, moving from high-level motion concepts to low-level joint control.

| Day | Topic | Learning Objectives | Practical Implementation |
| :-- | :--- | :--- | :--- |
| 1 | **Principles of Bipedal Locomotion** | - Define Center of Mass (CoM), Center of Pressure (CoP), and the Support Polygon.<br>- Differentiate between static and dynamic walking gaits. | - Conceptual exercise: Sketch the trajectory of a humanoid's CoM during a walking cycle. |
| 2 | **Gait Generation** | - Explore simple algorithms for generating periodic motion.<br>- Understand how to model a walking gait as a set of oscillating joint angles. | - **Lab:** Write a Python script (outside of ROS) that generates and plots sine-wave based trajectories for the hip and knee joints to create a stepping motion. |
| 3 | **Implementing a Gait Controller** | - Develop a ROS 2 node that generates and publishes joint commands.<br>- Send `JointState` messages to control the robot's legs in the simulation. | - **Lab:** Create a "gait controller" node that implements the sine-wave logic from the previous day. The node should publish joint commands that make the robot perform a "walking in place" motion in Gazebo. |
| 4 | **Introduction to PID Control** | - Understand the theory behind Proportional-Integral-Derivative (PID) control.<br>- See how PID controllers are used to achieve accurate and stable joint positioning. | - Interactive simulation exercise using a simple 1-DOF joint to tune P, I, and D gains and observe the system's response (overshoot, settling time, steady-state error). |
| 5 | **Refining the Gait** | - Discuss the limitations of open-loop gait control.<br>- Brainstorm how feedback (e.g., from an IMU or joint encoders) could improve stability. | - **Lab:** Experiment with the gait controller's parameters (frequency, amplitude) to achieve a more stable motion. If time permits, add a simple proportional controller to adjust leg height based on a target. |

**End-of-Week Milestone:** Students have a ROS 2 package that enables their simulated humanoid to perform a continuous walking motion.

---

## Week 3: Perception, Balance, and Integration

**Goal:** Students will integrate sensors into their robot to create a feedback loop for balance and implement a simple perception-driven task, culminating in the capstone project.

| Day | Topic | Learning Objectives | Practical Implementation |
| :-- | :--- | :--- | :--- |
| 1 | **Humanoid Sensing** | - Get an overview of key humanoid sensors: Inertial Measurement Units (IMUs), Force/Torque sensors, and Cameras.<br>- Learn how to add sensor plugins to a URDF for simulation in Gazebo. | - **Lab:** Add a simulated IMU sensor to the robot's torso link in the URDF file. |
| 2 | **Using an IMU for Balance** | - Understand the data provided by an IMU (orientation, angular velocity, linear acceleration).<br>- Subscribe to IMU data in a ROS 2 node. | - **Lab:** Create a "balance controller" node that subscribes to the `/imu` topic from Gazebo. The node should log the robot's pitch and roll orientation as it stands. |
| 3 | **Implementing a Balance Controller** | - Design a simple feedback controller for stability.<br>- Use IMU pitch/roll data to make corrective adjustments to the ankle/hip joints. | - **Lab:** Implement a "balancing" behavior. If the IMU reports a forward pitch, apply a small torque/position change to the ankle joints to push the robot back. Test by applying external forces to the robot in Gazebo. |
| 4 | **Vision with OpenCV** | - Add a simulated camera to the robot's head.<br>- Use `cv_bridge` to convert ROS `Image` messages to OpenCV format.<br>- Perform basic color detection (thresholding). | - **Lab:** Create a "vision" node that subscribes to the camera topic, finds the centroid of a colored object in the camera's view, and prints its pixel coordinates. |
| 5 | **Capstone Project: Walk Towards a Target** | - Integrate all previous components: locomotion, balancing, and perception.<br>- Develop a state machine to manage behavior (e.g., "searching," "walking," "stopped"). | - **Final Project:** Place a colored block in the Gazebo world. The robot must: <br>1. Use its camera to locate the block. <br>2. Turn to face the block. <br>3. Use the balance-augmented gait controller to walk towards it. <br>4. Stop when it is close to the block. |

**End-of-Module Outcome:** Students have successfully designed, built, and tested a complete software stack for a simulated humanoid robot that accomplishes a perception-driven locomotion task. -->
# 3-Week Humanoid Robotics Teaching Roadmap

## Course Philosophy

This roadmap outlines an intensive, 3-week module designed for a Physical AI course with a focus on practical, implementation-driven learning for humanoid robotics. The curriculum is structured to rapidly move students from foundational concepts to hands-on control of a simulated humanoid robot using ROS 2, culminating in a capstone project that integrates locomotion, balance, and perception.

---

## Week 1: Foundations of Humanoid Robotics & Simulation

**Goal:** Students will model a simple humanoid robot from scratch, spawn it in a physics-based simulator, and understand the foundational software architecture (ROS 2) used to control it.

| Day | Topic | Learning Objectives | Practical Implementation |
| :-- | :--- | :--- | :--- |
| 1 | **Introduction to Humanoid Systems** | - Define the key challenges of humanoid robotics (bipedal locomotion, dynamic stability, manipulation).<br />- Differentiate humanoid systems from other robotic platforms.<br />- Introduce the course's capstone project. | - Analyze videos of modern humanoid robots (e.g., Boston Dynamics' Atlas, Agility Robotics' Digit).<br />- Deconstruct their movements into core components (walking, balancing, interacting). |
| 2 | **The ROS 2 Ecosystem** | - Understand the ROS 2 computational graph (Nodes, Topics, Services, Actions).<br />- Set up a complete ROS 2 development environment. | - **Lab:** Install ROS 2. Create a workspace and a package. Implement a simple "hello world" publisher/subscriber to verify the setup. |
| 3 | **Robot Modeling with URDF** | - Learn the Unified Robot Description Format (URDF) syntax.<br />- Define `links` (kinematic chains) and `joints` (articulation). | - **Lab:** Write a URDF file for a simple bipedal robot, defining the torso, hips, and leg links connected by revolute joints. |
| 4 | **Simulation & Visualization** | - Understand the roles of Gazebo (physics simulation) and RViz2 (visualization).<br />- Learn to launch and configure a simulation environment. | - **Lab:** Create a ROS 2 launch file to spawn the URDF model into a Gazebo world. Use the `joint_state_publisher` GUI to articulate the robot's joints and view the model in both Gazebo and RViz2. |
| 5 | **Coordinate Frames with TF2** | - Grasp the importance of coordinate transformations in robotics.<br />- Use TF2 to broadcast and listen to transforms. | - **Lab:** Use `robot_state_publisher` to automatically broadcast the robot's link transforms. Write a simple Python node that uses a `TransformListener` to print the position of the robot's "foot" relative to its "torso". |

**End-of-Week Milestone:** Students have a simulated humanoid robot that can be posed and visualized, and they are comfortable with the basic ROS 2 toolchain.

---

## Week 2: Bipedal Locomotion & Joint Control

**Goal:** Students will implement a basic walking gait for their simulated humanoid, moving from high-level motion concepts to low-level joint control.

| Day | Topic | Learning Objectives | Practical Implementation |
| :-- | :--- | :--- | :--- |
| 1 | **Principles of Bipedal Locomotion** | - Define Center of Mass (CoM), Center of Pressure (CoP), and the Support Polygon.<br />- Differentiate between static and dynamic walking gaits. | - Conceptual exercise: Sketch the trajectory of a humanoid's CoM during a walking cycle. |
| 2 | **Gait Generation** | - Explore simple algorithms for generating periodic motion.<br />- Understand how to model a walking gait as a set of oscillating joint angles. | - **Lab:** Write a Python script (outside of ROS) that generates and plots sine-wave based trajectories for the hip and knee joints to create a stepping motion. |
| 3 | **Implementing a Gait Controller** | - Develop a ROS 2 node that generates and publishes joint commands.<br />- Send `JointState` messages to control the robot's legs in the simulation. | - **Lab:** Create a "gait controller" node that implements the sine-wave logic from the previous day. The node should publish joint commands that make the robot perform a "walking in place" motion in Gazebo. |
| 4 | **Introduction to PID Control** | - Understand the theory behind Proportional-Integral-Derivative (PID) control.<br />- See how PID controllers are used to achieve accurate and stable joint positioning. | - Interactive simulation exercise using a simple 1-DOF joint to tune P, I, and D gains and observe the system's response (overshoot, settling time, steady-state error). |
| 5 | **Refining the Gait** | - Discuss the limitations of open-loop gait control.<br />- Brainstorm how feedback (e.g., from an IMU or joint encoders) could improve stability. | - **Lab:** Experiment with the gait controller's parameters (frequency, amplitude) to achieve a more stable motion. If time permits, add a simple proportional controller to adjust leg height based on a target. |

**End-of-Week Milestone:** Students have a ROS 2 package that enables their simulated humanoid to perform a continuous walking motion.

---

## Week 3: Perception, Balance, and Integration

**Goal:** Students will integrate sensors into their robot to create a feedback loop for balance and implement a simple perception-driven task, culminating in the capstone project.

| Day | Topic | Learning Objectives | Practical Implementation |
| :-- | :--- | :--- | :--- |
| 1 | **Humanoid Sensing** | - Get an overview of key humanoid sensors: Inertial Measurement Units (IMUs), Force/Torque sensors, and Cameras.<br />- Learn how to add sensor plugins to a URDF for simulation in Gazebo. | - **Lab:** Add a simulated IMU sensor to the robot's torso link in the URDF file. |
| 2 | **Using an IMU for Balance** | - Understand the data provided by an IMU (orientation, angular velocity, linear acceleration).<br />- Subscribe to IMU data in a ROS 2 node. | - **Lab:** Create a "balance controller" node that subscribes to the `/imu` topic from Gazebo. The node should log the robot's pitch and roll orientation as it stands. |
| 3 | **Implementing a Balance Controller** | - Design a simple feedback controller for stability.<br />- Use IMU pitch/roll data to make corrective adjustments to the ankle/hip joints. | - **Lab:** Implement a "balancing" behavior. If the IMU reports a forward pitch, apply a small torque/position change to the ankle joints to push the robot back. Test by applying external forces to the robot in Gazebo. |
| 4 | **Vision with OpenCV** | - Add a simulated camera to the robot's head.<br />- Use `cv_bridge` to convert ROS `Image` messages to OpenCV format.<br />- Perform basic color detection (thresholding). | - **Lab:** Create a "vision" node that subscribes to the camera topic, finds the centroid of a colored object in the camera's view, and prints its pixel coordinates. |
| 5 | **Capstone Project: Walk Towards a Target** | - Integrate all previous components: locomotion, balancing, and perception.<br />- Develop a state machine to manage behavior (e.g., "searching," "walking," "stopped"). | - **Final Project:** Place a colored block in the Gazebo world. The robot must: <br />1. Use its camera to locate the block. <br />2. Turn to face the block. <br />3. Use the balance-augmented gait controller to walk towards it. <br />4. Stop when it is close to the block. |

**End-of-Module Outcome:** Students have successfully designed, built, and tested a complete software stack for a simulated humanoid robot that accomplishes a perception-driven locomotion task.
