const Tooltip = ({ position, content }) => {
  return (
    <div className={` tooltip  tooltip-${position} `}>
      <span className="tooltipText">{content}</span>
    </div>
  );
};

export default Tooltip;
