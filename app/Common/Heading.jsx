const Heading = ({ text, children }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 mb-4 bg-secondary rounded-lg shadow-sm border">
      <h2 className="text-xl font-bold">{text}</h2>
      {children}
    </div>
  );
};

export default Heading;
