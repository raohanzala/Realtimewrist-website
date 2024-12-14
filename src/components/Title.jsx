const Title = ({ text1, text2 }) => {
  return (
    <div className="mb-6">
      <p className="text-2xl  text-gray-800">
        {text1} <span className="font-semibold">{text2}</span>
      </p>
    </div>
  );
};

export default Title;
