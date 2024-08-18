import PropTypes from "prop-types";

export default function WinDialog({ dialogRef, handleWinSubmit, handleSkip }) {
  return (
    <dialog
      ref={dialogRef}
      className="p-6 rounded-lg bg-gradient-to-r from-purple-900 shadow-2xl to-indigo-900 text-white"
      onClose={(e) => e.preventDefault()}
    >
      <form
        onSubmit={handleWinSubmit}
        method="dialog"
        className="flex flex-col gap-10"
      >
        <h2 className="text-4xl neon-text ">Congratulations, you won!</h2>

        <div>
          <label htmlFor="name" className="block mb-2 text-xl">
            Enter your name:
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full p-2 neon-border rounded mb-4 neon-text bg-gray-700 "
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Score
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Skip
          </button>
        </div>
      </form>
    </dialog>
  );
}

WinDialog.propTypes = {
  handleSkip: PropTypes.func,
  handleWinSubmit: PropTypes.func,
  dialogRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};
