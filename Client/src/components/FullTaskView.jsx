/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'


export const FullTaskView = ({Task, showFullView}) => {
  if (!Task || Task.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        <h2>No tasks available</h2>
        <p>Please add tasks to view them here.</p>
      </div>
    );
  }
    const task = Task[showFullView];
    console.log("task:", showFullView)
    if (!task) {
      return (
        <div className="p-4 text-center text-gray-600">
          <h2>Task not found</h2>
          <p>The selected task does not exist. Please choose a valid task.</p>
        </div>
      );
    }


  return (
    <div className="p-4 w-full relative">
  <div className="w-full flex flex-col gap-4 items-start">
    <div className="w-full flex gap-4">
      {/* Image Section */}
      <div className="min-w-[20%] max-w-[20%] h-40">
        <img
          src={task.taskImage}
          alt="no-image-was-found"
          onError={(e) => (e.target.src = "/assets/images/Frame14.jpg")}
          className="w-full h-full rounded-xl"
        />
      </div>

      {/* Title and Details */}
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-lg">{task.title}</p>
        <p className="text-sm">
          Priority:{" "}
          <span
            style={{
              color:
                task.priority === "Extreme"
                  ? "red"
                  : task.priority === "Moderate"
                  ? "blue"
                  : "green",
            }}
          >
            {task.priority}
          </span>
        </p>
        <p className="text-sm">
          Status:{" "}
          <span
            style={{
              color:
                task.status === "not Started"
                  ? "red"
                  : task.status === "in Progress"
                  ? "blue"
                  : "green",
            }}
          >
            {task.status}
          </span>
        </p>
        <p className="text-xs text-gray-400">
          Created on: <span>{task.createdOn}</span>
        </p>
      </div>
    </div>

    {/* Scrollable Description */}
    <div className="mt-4 overflow-y-auto max-h-[40vh] w-full no-scrollbar">
      <p className="text-lg text-gray-500">{task.taskDescription}</p>
    </div>
  </div>
</div>

  )
}
