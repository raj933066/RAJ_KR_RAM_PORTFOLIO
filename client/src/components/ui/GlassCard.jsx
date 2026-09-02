const GlassCard = ({ children, className = '', hover = true, as: Tag = 'div', ...rest }) => (
  <Tag
    className={`glass rounded-xl ${
      hover ? 'transition-colors duration-200 hover:border-brand-purple/60' : ''
    } ${className}`}
    {...rest}
  >
    {children}
  </Tag>
);

export default GlassCard;
