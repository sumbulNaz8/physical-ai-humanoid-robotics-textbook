
# Lesson 11: Deploying the Trained Policy

After the training process is complete and you've saved a model **checkpoint**, the final step is to load that policy and run it in "inference" mode. This means the policy is no longer learning; it's simply executing the strategy it has learned.

## The `play.py` Script

Isaac Orbit provides a universal script, `play.py`, for this purpose. It is configured similarly to the training script but has a few key differences:
-   It loads a pre-trained model checkpoint.
-   It typically runs with only one environment (`--num_envs 1`) so you can clearly observe the agent's behavior.
-   The agent's actions are purely deterministic (or have very little exploratory noise).

You launch it from the command line:
```bash
python -m orbit.examples.rsl_rl.play --task MyHumanoidReach --checkpoint /path/to/your/checkpoint.pt
```
-   `--task MyHumanoidReach`: Specifies the environment to load.
-   `--checkpoint`: This is the crucial argument. You provide the path to the `.pt` (PyTorch) file that was saved at the end of the training process. This file contains the learned weights of your policy's neural network.

## Observing Emergent Behavior

When you run the `play.py` script, you will see your robot execute the learned skill. For the "reach" task, the robot's arm should move smoothly and directly towards the target.

This is often the most rewarding part of the process. The behavior you see was not explicitly programmed. You didn't write code that said, "move joint 1 by X degrees, then joint 2 by Y degrees." You simply defined a goal (the reward function), and the AI discovered the complex sequence of muscle (actuator) commands needed to achieve it. This is called **emergent behavior**.

## Capstone Project: AI-Powered Balancing

Now, we will apply this entire workflow to one of the classic and most challenging problems in humanoid robotics: **dynamic balancing**.

### 1. Define the Environment (`HumanoidBalanceEnv`)

-   **Scene:** The humanoid robot standing on a flat plane.
-   **Observations (State):**
    -   All joint positions and velocities.
    -   The robot's orientation and angular velocity (from an IMU sensor).
    -   The 3D position of the robot's root (base link).
-   **Actions:** Target positions for all joints in the legs and torso.
-   **Reward Function:**
    -   **Positive Reward:** A constant, small reward for every timestep the robot is upright. The longer it balances, the more reward it accumulates.
    -   **Negative Reward (Penalty):** A large penalty if the robot falls. A "fall" can be defined as the torso's height dropping below a certain threshold or its orientation tilting too far.
    -   **Optional Penalties:** Small penalties for excessive joint torque or velocity to encourage smooth, efficient movements.

### 2. Train the Policy

-   Use the `train.py` script with your `HumanoidBalanceEnv`.
-   This task is much harder than reaching and will require more training time and potentially more parallel environments.
-   Monitor the reward in TensorBoard. You will likely see it stay low for a while and then suddenly jump up as the agent discovers a balancing strategy.

### 3. Deploy and Test

-   Use the `play.py` script to load your best-trained balancing policy.
-   In the simulation, you can now test your AI controller.
-   **Apply external forces:** Use the physics tools in Isaac Sim to "push" the robot.
-   Observe how the policy adjusts the robot's joints (ankles, hips, etc.) to recover its balance. The emergent behavior should resemble how a human reflexively shifts their weight to stay upright.

By completing this capstone, you have successfully leveraged a state-of-the-art AI platform to solve a non-trivial humanoid robotics problem, moving from simulation setup and perception to training and deploying an intelligent, learned control policy.
