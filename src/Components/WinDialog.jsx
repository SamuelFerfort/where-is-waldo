import React from 'react';
import PropTypes from "prop-types";

export default function WinDialog({ dialogRef, handleWinSubmit, handleSkip }) {
  return (
    <dialog
      ref={dialogRef}
      className="p-8 rounded-lg bg-gradient-to-r from-purple-900 to-indigo-900 text-white neon-border"
      onClose={(e) => e.preventDefault()}
    >
      <form
        onSubmit={handleWinSubmit}
        method="dialog"
        className="flex flex-col gap-8"
      >
        <h2 className="text-4xl font-bold text-center neon-text animate-pulse">
          Congratulations, you won!
        </h2>

        <div className="space-y-4">
          <label htmlFor="name" className="block text-2xl neon-text-subtle">
            Enter your name:
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full p-3 rounded neon-border bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
        </div>

        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-full neon-border hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Submit Score
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="bg-gray-700 text-white px-6 py-3 rounded-full neon-border hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
          >
            Skip
          </button>
        </div>
      </form>
    </dialog>
  );
}

WinDialog.propTypes = {
  handleSkip: PropTypes.func.isRequired,
  handleWinSubmit: PropTypes.func.isRequired,
  dialogRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};