import PropTypes from "prop-types";

export default function Error({ error }) {
  return (
    <main className="flex justify-center pt-56">
      <p className="text-3xl text-red-400">Error: {error.message}</p>
    </main>
  );
}

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};