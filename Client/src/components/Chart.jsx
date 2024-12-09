// eslint-disable-next-line no-unused-vars
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAuthContext } from "../context/UseAuth";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = () => {
  const { userData } = useAuthContext();

  // Ensure userData is available and belongs to a single user
  if (!userData || !userData.categories) {
 
    return <p>No data available</p>;
  }

  // Initialize counts for each status group
  const taskStatusCounts = {
    "not Started": 0,
    "In Progress": 0,
    "Finished": 0,
    "Failed": 0,
  };

  let totalTasks = 0;

  // Count tasks by status for the authenticated user
  Object.values(userData.categories).forEach((category) => {
    if (Array.isArray(category.tasks)) {
      category.tasks.forEach((task) => {
        const status = task.status || "Unknown"; // Default to "Unknown" if status is missing
        if (taskStatusCounts[status] !== undefined) {
          taskStatusCounts[status]++;
          totalTasks++;
        }
      });
    }
  });

  // Calculate percentage for each status
  const percentageByStatus = {};
  Object.keys(taskStatusCounts).forEach((status) => {
    percentageByStatus[status] =
      totalTasks > 0 ? (taskStatusCounts[status] / totalTasks) * 100 : 0;
  });

  // Create chart data for each status
  const chartData = Object.keys(taskStatusCounts).map((status) => ({
    labels: [status, "Other"],
    datasets: [
      {
        data: [percentageByStatus[status], 100 - percentageByStatus[status]],
        backgroundColor: [
          status === "not Started"
            ? "rgba(255, 99, 132, 0.6)"
            : status === "In Progress"
            ? "rgba(54, 162, 235, 0.6)"
            : status === "Finished"
            ? "rgba(75, 192, 192, 0.6)"
            : "rgba(255, 159, 64, 0.6)", // Failed color
          "rgba(211, 211, 211, 0.6)", // Gray for "Other"
        ],
        borderColor: ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.5)"],
        borderWidth: 1,
      },
    ],
  }));

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };


  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {Object.keys(taskStatusCounts).map((status, index) => (
        <div key={status} className="md:w-24 w-24">
          <h3 className="text-center font-bold mb-2">{status}</h3>
          <Doughnut data={chartData[index]} options={options} />
          <p className="text-center mt-2">
            {percentageByStatus[status].toFixed(1)}%
          </p>
        </div>
      ))}
    </div>
  );
};

export default TaskChart;
