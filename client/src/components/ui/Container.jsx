const Container = ({ children, className = '' }) => (
  <div className={`w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
);

export default Container;
