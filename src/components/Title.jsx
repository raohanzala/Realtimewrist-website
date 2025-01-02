const Title = ({ text1, text2 }) => {
  return (
      <h1 className="text-xl sm:text-2xl text-gray-800">
        {text1} <span className="font-semibold">{text2}</span>
      </h1>
  );
};

export default Title;
