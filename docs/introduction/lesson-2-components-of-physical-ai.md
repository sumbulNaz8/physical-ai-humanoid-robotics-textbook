
# Lesson 2: Components of Physical AI Systems

Physical AI systems are complex, interdisciplinary endeavors that integrate hardware, software, and advanced AI methodologies. Understanding each component and how they work together is crucial for designing and implementing effective humanoid robots.

## 1. Hardware Components

The physical body of the AI system, providing the means to perceive and interact with the world.

-   **Sensors:** Gather information from the environment.
    -   **Exteroceptors:** Sense the external environment.
        -   **Vision:** Cameras (monocular, stereo, depth), LiDAR (Light Detection and Ranging), Radar.
        -   **Audition:** Microphones for sound localization and speech recognition.
        -   **Touch/Force:** Tactile sensors (e.g., in fingertips), force/torque sensors (e.g., at joints, wrists, feet).
        -   **Range/Proximity:** Ultrasonic sensors, infrared sensors.
    -   **Proprioceptors:** Sense the robot's own body state.
        -   **Joint Encoders:** Measure joint angles and velocities.
        -   **IMUs (Inertial Measurement Units):** Accelerometers, gyroscopes, magnetometers for orientation, angular velocity, and linear acceleration.
        -   **Strain Gauges:** Measure deformation, often used in force sensors.
-   **Actuators:** Convert electrical energy into physical motion.
    -   **Motors:** DC motors, Servo motors, Stepper motors.
    -   **Transmissions:** Gearboxes, pulleys, harmonic drives to adjust speed and torque.
    -   **Hydraulics/Pneumatics:** Used in powerful robots (like some humanoids) for high force density.
-   **Processing Units:** The "brain" of the robot, performing computations.
    -   **Microcontrollers (MCUs):** For low-level, real-time control (e.g., motor drivers).
    -   **Single Board Computers (SBCs):** Like NVIDIA Jetson, Raspberry Pi for higher-level processing, networking, and some AI tasks.
    -   **GPUs (Graphics Processing Units):** Essential for AI workloads (deep learning, large-scale simulation) due to their parallel processing capabilities.
    -   **FPGAs (Field-Programmable Gate Arrays):** For custom hardware acceleration of specific algorithms.
-   **Power Systems:** Batteries, power distribution units, voltage regulators.
-   **Communication:** Wireless (Wi-Fi, Bluetooth, 5G), wired (Ethernet, CAN bus, USB) for internal and external communication.

## 2. Software Components

The intelligence and operational logic that runs on the hardware.

-   **Operating Systems:** Real-time operating systems (RTOS) for low-latency control, general-purpose OS (Linux, Windows) for higher-level applications.
-   **Robot Operating Systems (ROS/ROS 2):** Middleware that provides standard services (message passing, hardware abstraction, package management) to build distributed robot applications.
-   **Control Algorithms:**
    -   **Low-level:** PID control for joint position/velocity.
    -   **High-level:** Inverse kinematics/dynamics, whole-body control, impedance control.
-   **Perception Stacks:** Algorithms for processing sensor data:
    -   **Vision:** Object detection, tracking, segmentation, depth estimation.
    -   **Localization & Mapping (SLAM):** Building maps of the environment and estimating the robot's position within them.
-   **Planning Algorithms:**
    -   **Motion Planning:** Generating paths for the robot's body or end-effector.
    -   **Task Planning:** Decomposing complex tasks into simpler sub-tasks.
-   **AI Frameworks:** Libraries for implementing machine learning, deep learning, and reinforcement learning models (e.g., TensorFlow, PyTorch, NVIDIA Isaac SDK).

## 3. AI Methodologies

The core intelligence that enables adaptive and autonomous behavior.

-   **Machine Learning (ML):** General algorithms that learn from data.
    -   **Supervised Learning:** Classification, regression (e.g., object recognition).
    -   **Unsupervised Learning:** Clustering (e.g., anomaly detection).
-   **Deep Learning (DL):** A subset of ML using neural networks with many layers.
    -   **Convolutional Neural Networks (CNNs):** For image processing (e.g., identifying objects in camera feeds).
    -   **Recurrent Neural Networks (RNNs):** For sequential data (e.g., speech recognition).
-   **Reinforcement Learning (RL):** Learning through trial and error by maximizing a reward signal (e.g., learning to walk or manipulate objects).
-   **Imitation Learning (Learning from Demonstration - LfD):** Learning a task by observing human examples.

## Activity: Analyzing a Humanoid Robot's Architecture

Research Boston Dynamics' Atlas robot (or another humanoid robot of your choice). Identify:
-   What types of sensors does it use (vision, depth, IMU, force/torque)?
-   What kind of actuators (hydraulic, electric) are likely driving its powerful movements?
-   Where would you expect AI methodologies like reinforcement learning or deep learning to be applied in its control or perception stack?

This interdisciplinary approach is what makes Physical AI both challenging and incredibly rewarding.
