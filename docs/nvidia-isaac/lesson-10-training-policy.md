
# Lesson 10: Training a Control Policy

Once you have defined your custom RL environment, the next step is to **train a policy**. This is the process where the AI agent explores the environment over millions of trials to learn a strategy (a policy) that maximizes its cumulative reward.

Isaac Orbit integrates with high-performance RL libraries to manage this process. We will focus on the default, `rsl_rl`, which implements an algorithm called **Proximal Policy Optimization (PPO)**.

## Proximal Policy Optimization (PPO)

PPO is a state-of-the-art reinforcement learning algorithm that is particularly well-suited for robotics. It is known for its stability, reliability, and sample efficiency.

At a high level, PPO works by:
1.  Collecting a batch of experience by running the current policy in the environment.
2.  Using this data to calculate an "advantage" for each action taken (was this action better or worse than average?).
3.  Updating the policy's neural network to make "good" actions more likely and "bad" actions less likely.
4.  Crucially, it "clips" the update to ensure the new policy doesn't stray too far from the old one in a single step. This clipping is what gives PPO its signature stability.

## The Training Script

Isaac Orbit provides a universal training script, `train.py`, that you configure to work with your custom environment.

You launch it from the command line like this:
```bash
python -m orbit.examples.rsl_rl.train --task MyHumanoidReach --num_envs 2048
```
-   `--task MyHumanoidReach`: This tells the script which environment to load. It corresponds to the name you registered for your environment.
-   `--num_envs 2048`: This is the key to high-performance RL. Isaac Orbit will instantiate 2048 copies of your environment and run them all in parallel on the GPU. This allows the agent to gather a massive amount of experience very quickly.

## Monitoring Training with TensorBoard

As the training runs, the script will save logs to a directory. You can visualize these logs in real-time using **TensorBoard**.

1.  **Launch TensorBoard:**
    ```bash
    tensorboard --logdir logs/rsl_rl/
    ```
2.  **Open your web browser** to the provided URL (usually `localhost:6006`).

In TensorBoard, you will see several important graphs:
-   **`rewards/mean`:** This is the most important graph. It shows the average reward the agent is getting over time. As the agent learns, this graph should go up.
-   **`losses/policy_loss`:** This shows the loss for the policy network. It should generally trend downwards.
-   **`learning_rate`:** Shows how the learning rate changes over the course of training.

The training process can take anywhere from a few minutes to several hours, depending on the complexity of the task. For a "reach" task, you should see the reward curve start to increase significantly within 10-20 minutes.

## Practical Activity

1.  **Ensure your custom environment** from the previous lesson is correctly configured.
2.  **Launch the training script**, pointing it to your custom environment task. Use a large number of parallel environments (`--num_envs 1024` or more).
3.  **Launch TensorBoard** and monitor the `rewards/mean` graph.
4.  **Observe the behavior** in the Isaac Sim window. You will see thousands of humanoids all learning simultaneously. Initially, their movements will be random. As training progresses and the reward increases, you will see them start to purposefully move their arms towards the target.

This process is the heart of modern AI-driven robotics. By watching the reward curve rise and the behavior emerge in simulation, you are witnessing the birth of an intelligent control policy.
