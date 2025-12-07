
# Chapter 3: Detailed Implementation Task List

This document provides a granular, actionable checklist for creating all materials for Chapter 3: Robot Simulation.

---

### **1. Content Creation: Gazebo Module (Week 6)**

-   [ ] **Lesson 1: From URDF to SDF**
    -   [ ] Write markdown content explaining the limitations of URDF and the benefits of SDF.
    -   [ ] Create a `simple_arm.urdf` file to use as the "before" example.
    -   [ ] Generate the `simple_arm.sdf` file using the `gz sdf` command to serve as the "after" example.
    -   [ ] Add annotations to both files to highlight key differences.

-   [ ] **Lesson 2: Building Simulation Worlds**
    -   [ ] Write markdown content explaining the structure of a `.world` file.
    -   [ ] Create the `robotics_lab.world` file, including ground plane, sun, and two static wall models.
    -   [ ] Write a Python launch file, `view_lab.launch.py`, to start Gazebo with the custom world.

-   [ ] **Lesson 3: Integrating Sensors**
    -   [ ] Write markdown content explaining Gazebo plugins.
    -   [ ] Develop and test the SDF snippet for the IMU sensor plugin.
    -   [ ] Develop and test the SDF snippet for the GPU-accelerated LiDAR (`gpu_ray`) plugin.
    -   [ ] Develop and test the SDF snippet for the Depth Camera plugin.
    -   [ ] Create a final, complete robot SDF file (`humanoid_with_sensors.sdf`) that includes all three sensors attached to appropriate links.

-   [ ] **Lesson 4: Subscribing to Sensor Data**
    -   [ ] Write markdown content explaining the common sensor message types.
    -   [ ] Create a `sensor_subscriber.py` node that subscribes to the IMU, LiDAR, and Depth Camera topics.
    -   [ ] Ensure the node logs receipt of data from each sensor.
    -   [ ] Create an RViz2 configuration file (`sensor_view.rviz`) pre-configured to display the LiDAR `PointCloud2` and Depth Camera `Image` topics.
    -   [ ] Write a launch file, `test_sensors.launch.py`, that starts the Gazebo simulation and the `sensor_subscriber.py` node.

---

### **2. Content Creation: Unity Module (Week 7)**

-   [ ] **Lesson 5: Introduction to Unity for Robotics**
    -   [ ] Write markdown content covering core Unity concepts (Scene, GameObject, Component).
    -   [ ] Create a series of screenshots illustrating the Unity Hub installation process and the Unity Editor interface (Hierarchy, Inspector, Project windows).

-   [ ] **Lesson 6: Bridging ROS 2 and Unity**
    -   [ ] Write markdown content explaining the TCP bridge architecture.
    -   [ ] Document the step-by-step process for installing `ROS-TCP-Connector` in Unity.
    -   [ ] Document the process for cloning and building the `ros_tcp_endpoint` package in a ROS 2 workspace.
    -   [ ] Provide the complete C# script `RosConnectionTest.cs` for verifying the connection.

-   [ ] **Lesson 7: Controlling Robots in Unity**
    -   [ ] Write markdown content explaining the `URDF-Importer` and `ArticulationBody` components.
    -   [ ] Provide the complete C# script `JointController.cs` for subscribing to `/joint_states`.
    -   [ ] Create a short GIF or video showing the `joint_state_publisher_gui` controlling the robot in Unity.

-   [ ] **Lesson 8: The Concept of a Digital Twin**
    -   [ ] Write markdown content defining a digital twin and its importance for Physical AI.
    -   [ ] Provide instructions for creating a new Unity project with the High Definition Render Pipeline (HDRP).
    -   [ ] Link to 2-3 recommended free, high-quality environment packs on the Unity Asset Store.
    -   [ ] Create a final screenshot comparing the robot in the basic 3D environment vs. the HDRP environment.

---

### **3. Assignment & Project Development**

-   [ ] **Week 6 Assignment: Gazebo Obstacle Alert**
    -   [ ] Write a detailed PDF specification for the assignment.
    -   [ ] Develop the solution: a ROS 2 node that reads the depth camera topic, calculates the minimum distance, and publishes a `std_msgs/String` alert.
    -   [ ] Create a grading rubric with points for code correctness, functionality, and clarity.

-   [ ] **Week 7 Capstone: Unified Control System**
    -   [ ] Write a detailed PDF specification for the capstone project.
    -   [ ] Create a starter package containing:
        -   The final robot SDF for Gazebo.
        -   The final Unity project with the robot prefab and connection scripts pre-configured.
        -   The ROS 2 launch files for both simulations.
    -   [ ] Develop the solution: a single Python node that publishes `JointState` messages to control both simulations.
    -   [ ] Record a video demonstrating the final working project.
    -   [ ] Create a comprehensive grading rubric.

---

### **4. Review and Deployment**

-   [ ] **Technical Review**
    -   [ ] Have a colleague follow all installation and setup instructions from scratch on a clean machine.
    -   [ ] Have a colleague review all code for bugs and style.
-   [ ] **Pedagogical Review**
    -   [ ] Have a colleague read through all lesson materials for clarity and flow.
-   [ ] **Final Polish**
    -   [ ] Incorporate all feedback from reviews.
    -   [ ] Check all links and commands.
    -   [ ] Merge to main and deploy the website.
    -   [ ] Package and release all student-facing materials.
