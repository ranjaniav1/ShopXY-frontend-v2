const Heading = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-tprimary">
        {title}
      </h2>
      <p className="text-tsecondary mt-2 text-base max-w-xl mx-auto">
        {subtitle}

      </p>
    </div>
  );
};

export default Heading;
