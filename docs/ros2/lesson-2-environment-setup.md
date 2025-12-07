
# Lesson 2: Setting Up Your Development Environment

## Installation

The first step is to install ROS 2. The official ROS 2 documentation provides detailed, up-to-date installation instructions for various platforms. As of this writing, **ROS 2 Humble Hawksbill** is the recommended Long-Term Support (LTS) release.

- **Action:** Follow the official guide to [Install ROS 2 Humble](https://docs.ros.org/en/humble/Installation.html).

## Creating a ROS 2 Workspace

A workspace is a directory where you manage your ROS 2 projects. It's a good practice to have a dedicated workspace for each larger project.

1.  **Create a workspace directory:**
    ```bash
    mkdir -p ~/ros2_ws/src
    cd ~/ros2_ws
    ```
    The `src` directory is where you will place your ROS 2 packages.

2.  **Build the workspace:**
    ROS 2 uses `colcon` as its build tool.
    ```bash
    colcon build
    ```
    This command builds all the packages in the `src` directory. After building, you will see `build`, `install`, and `log` directories.

3.  **Source the workspace:**
    Before you can use the packages in your workspace, you need to add the `install` directory to your shell's path.
    ```bash
    source install/setup.bash
    ```
    It's recommended to add this command to your `~/.bashrc` file to automatically source your workspace in new terminals.

## Creating a ROS 2 Package

Now, let's create a package for our chapter assignments within the workspace.

1.  **Navigate to the `src` directory:**
    ```bash
    cd src
    ```

2.  **Create a new package:**
    We will use the `ros2 pkg create` command. Let's create a Python-based package.
    ```bash
    ros2 pkg create --build-type ament_python --node-name my_first_node my_robot_pkg
    ```
    - `--build-type ament_python`: Specifies that we are creating a Python package.
    - `--node-name my_first_node`: Creates a simple "hello world" style executable node.
    - `my_robot_pkg`: The name of our package.

3.  **Build the new package:**
    Go back to the root of your workspace and build again.
    ```bash
    cd ~/ros2_ws
    colcon build
    ```

4.  **Run your new node:**
    First, source the workspace again to make the new package available.
    ```bash
    source install/setup.bash
    ```
    Now you can run the node:
    ```bash
    ros2 run my_robot_pkg my_first_node
    ```
    You should see output from the node you just created.

You now have a fully functional ROS 2 workspace and your first package.
