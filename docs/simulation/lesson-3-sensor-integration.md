
# Lesson 3: Integrating Sensors in Gazebo

Gazebo's real power comes from its ability to simulate a wide variety of sensors. This is achieved through **plugins**, which are shared libraries that can be attached to a model to add new functionalities.

## How Plugins Work

A plugin is specified within the SDF file of your robot model. You attach it to a link and provide it with configuration parameters. When Gazebo loads the model, it loads the plugin, which then typically advertises sensor data on a ROS 2 topic.

We will focus on three key sensors for humanoid robotics:
1.  **IMU (Inertial Measurement Unit):** Measures orientation, angular velocity, and linear acceleration. Crucial for balance.
2.  **3D LiDAR (GPU Accelerated):** Measures distances in all directions, creating a "point cloud" of the environment. Used for navigation and obstacle avoidance.
3.  **Depth Camera:** A camera that provides distance information for each pixel. Essential for perception and manipulation.

## Adding a Sensor to SDF

Here is an example of how to add an IMU sensor to a link named `torso_link` in your robot's `.sdf` file.

```xml
<link name='torso_link'>
  <!-- ... inertial, collision, visual ... -->
  <sensor name='imu_sensor' type='imu'>
    <always_on>true</always_on>
    <update_rate>100</update_rate>
    <visualize>true</visualize>
    <plugin name='imu_plugin' filename='libgazebo_ros_imu_sensor.so'>
      <ros>
        <namespace>/demo</namespace>
        <remapping>~/out:=imu</remapping>
      </ros>
      <initial_orientation_as_reference>false</initial_orientation_as_reference>
    </plugin>
  </sensor>
</link>
```

### Key Plugin Tags:
- **`<sensor>`:** Defines the sensor. `name` is a unique identifier, and `type` specifies the kind of sensor (e.g., `imu`, `gpu_ray` for LiDAR, `depth` for a camera).
- **`<update_rate>`:** How often the sensor publishes data (in Hz).
- **`<plugin>`:** Loads the shared library. `filename` points to the specific plugin.
  - `libgazebo_ros_imu_sensor.so`: The IMU plugin.
  - `libgazebo_ros_gpu_laser.so`: The GPU-accelerated LiDAR plugin.
  - `libgazebo_ros_depth_camera.so`: The depth camera plugin.
- **`<ros>`:** ROS-specific parameters.
  - **`<namespace>`:** A namespace for the topics.
  - **`<remapping>`:** Remaps the default topic name. Here, `~/out` is remapped to `imu`, so the final topic will be `/demo/imu`.

## Practical Activity

**Enhance your humanoid robot by adding sensors:**

1.  **Open your robot's SDF file** (`simple_arm.sdf` or your humanoid model).
2.  **Add an IMU Sensor:** Attach an IMU sensor to the main torso link, similar to the example above.
3.  **Add a LiDAR Sensor:** Attach a `gpu_ray` sensor to the head link. You will need to configure its properties, such as the number of scan lines and range.

    ```xml
    <sensor type="gpu_ray" name="laser_sensor">
      <!-- ... configuration for scans, range, etc. ... -->
      <plugin name="gpu_laser" filename="libgazebo_ros_gpu_laser.so">
        <ros>
          <remapping>~/out:=points</remapping>
        </ros>
      </plugin>
    </sensor>
    ```

4.  **Add a Depth Camera:** Attach a `depth` sensor to the chest or head.

    ```xml
    <sensor type="depth" name="depth_camera">
      <!-- ... configuration for image size, clipping, etc. ... -->
      <plugin name="depth_camera_controller" filename="libgazebo_ros_depth_camera.so">
        <ros>
          <remapping>~/image_raw:=depth/image_raw</remapping>
          <remapping>~/camera_info:=depth/camera_info</remapping>
          <remapping>~/points:=depth/points</remapping>
        </ros>
      </plugin>
    </sensor>
    ```

After adding these plugins, when you launch your robot in Gazebo, it will automatically start publishing data on the ROS 2 topics you specified.
