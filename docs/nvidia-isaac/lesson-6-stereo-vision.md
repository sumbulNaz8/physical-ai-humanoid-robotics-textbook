
# Lesson 6: High-Performance Stereo Vision

Stereo vision is a fundamental technique in robotics for perceiving depth. By comparing the images from two cameras placed a known distance apart, we can calculate the distance to every point in the scene, creating a 3D point cloud. The `isaac_ros_stereo_image_proc` GEM provides a highly optimized, end-to-end pipeline for this task.

## The Stereo Vision Pipeline

The process involves several steps, each of which is computationally intensive:

1.  **Rectification:** The raw images from the two cameras are warped so that the rows of pixels align perfectly between the left and right images. This makes the next step much easier.
2.  **Disparity Calculation:** For each pixel in the left image, the algorithm searches for its corresponding pixel in the right image. The horizontal offset between these pixels is the **disparity**. Closer objects have a larger disparity. This is the most computationally expensive step.
3.  **Point Cloud Conversion:** The disparity for each pixel is converted into a real-world depth value (in meters). This depth, combined with the pixel's (x, y) coordinates, gives a 3D point. The collection of all these points is the point cloud.

The `isaac_ros_stereo_image_proc` package performs all of these steps on the GPU.

## Practical Activity: Generating a Point Cloud

Let's set up a stereo camera on our humanoid robot in Isaac Sim and use the Isaac ROS GEM to generate a point cloud.

### 1. Add a Stereo Camera in Isaac Sim

-   In your Isaac Sim Python script, add two cameras to your robot's head link.
-   Position them side-by-side like a pair of eyes. The distance between them is the **baseline**, which is crucial for accurate depth perception.
-   Ensure both cameras publish their images and camera info to ROS 2 topics (e.g., `/left/image_raw`, `/left/camera_info`, `/right/image_raw`, `/right/camera_info`).

### 2. Configure the Isaac ROS Launch File

The `isaac_ros_stereo_image_proc` package provides a launch file that starts the entire pipeline. You will need to create a new launch file in your own ROS 2 package that includes it and provides the correct topic names.

```python
from launch import LaunchDescription
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from ament_index_python.packages import get_package_share_directory
import os

def generate_launch_description():
    # Get the path to the Isaac ROS launch file
    isaac_ros_stereo_proc_dir = get_package_share_directory('isaac_ros_stereo_image_proc')
    isaac_ros_stereo_proc_launch = os.path.join(
        isaac_ros_stereo_proc_dir, 'launch', 'isaac_ros_stereo_image_proc.launch.py')

    return LaunchDescription([
        IncludeLaunchDescription(
            PythonLaunchDescriptionSource(isaac_ros_stereo_proc_launch),
            launch_arguments={
                'left_camera_namespace': '/left',
                'right_camera_namespace': '/right',
                'left_image_topic': 'image_raw',
                'right_image_topic': 'image_raw',
                'left_camera_info_topic': 'camera_info',
                'right_camera_info_topic': 'camera_info',
                'point_cloud_topic': '/points'
            }.items()
        )
    ])
```

### 3. Run and Visualize

1.  **Start Isaac Sim** with your robot and the stereo camera.
2.  **Run your new launch file.** This will start the Isaac ROS nodes.
    ```bash
    ros2 launch my_robot_pkg stereo_proc.launch.py
    ```
3.  **Start RViz2.**
4.  **Add a `PointCloud2` display** and set the topic to `/points`.

You should see a dense, 3D point cloud of the scene as viewed by your robot. Because the entire pipeline is running on the GPU, you will notice that this point cloud is generated with very high performance (likely >30Hz) and with very little CPU usage on your machine. This frees up the CPU for control and navigation tasks that can now use this rich 3D data.
