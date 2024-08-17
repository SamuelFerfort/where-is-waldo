export default function WinDialog({ dialogRef, handleWinSubmit, handleSkip }) {
  return (
    <dialog
      ref={dialogRef}
      className="p-4 rounded-lg shadow-xl "
      onClose={(e) => e.preventDefault()}
    >
      <h2 className="text-2xl font-bold mb-4">Congratulations, you won!</h2>
      <form onSubmit={handleWinSubmit} method="dialog">
        <label htmlFor="name" className="block mb-2">
          Enter your name:
        </label>
        <input
          type="text"
          id="name"
          required
          className="w-full p-2 border rounded mb-4"
        />
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
      </form>
    </dialog>
  );
}
