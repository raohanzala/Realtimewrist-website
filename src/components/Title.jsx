const Title = ({ text1, size = 'medium', text2, ...rest }) => {
  const variantStyles = {
    small: 'font-normal text-lg sm:text-xl',
    medium: 'font-semibold',
  };

  return (
    <h1 {...rest} className={`text-xl space-x-2 sm:text-2xl text-gray-800 uppercase ${variantStyles[size]} ${rest.className}`}>
      <span className="font-light">{text1}</span>
      <span className={`font-semibold ${variantStyles[size]}`}>{text2}</span>
    </h1>
  );
};

export default Title;
