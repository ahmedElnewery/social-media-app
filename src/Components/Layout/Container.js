const Container = (props) => {
  let containerClassName = " py-md-5 container ";
  props.wide === true ? (containerClassName += "") : (containerClassName += " container--narrow ");
  return <div className={containerClassName}>{props.children}</div>;
};

export default Container;
