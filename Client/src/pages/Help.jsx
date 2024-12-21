
import React from 'react';

const Help = () => {
  return (
    <div className="tablet:pl-[25vw] pt-32 py-8 h-screen bg-gray-100 px-8 w-[100%]">
      <h1 className="text-3xl font-bold text-customColor mb-4">Help Page</h1>
      <p className="text-lg mb-4">
        Welcome to the help page. Here you can find answers to frequently asked questions and get support for any issues you may encounter.
      </p>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-customColor ">Frequently Asked Questions</h2>
        <ul className="list-disc list-inside">
          <li className="mb-2">
            <strong>How do I create a new task?</strong>
            <p>To create a new task, click on the "Add Task" button and fill in the task details.</p>
          </li>
          <li className="mb-2">
            <strong>How do I edit a task?</strong>
            <p>To edit a task, click on the task you want to edit and update the task details.</p>
          </li>
          <li className="mb-2">
            <strong>How do I delete a task?</strong>
            <p>To delete a task, click on the delete icon next to the task you want to remove.</p>
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2 text-customColor ">Contact Support</h2>
        <p className="text-lg">
          If you need further assistance, please contact our support team at <a href="mailto:support@example.com" className="text-blue-500">support@example.com</a>.
        </p>
      </section>
    </div>
  );
};

export default Help;