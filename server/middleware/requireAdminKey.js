const requireAdminKey = (req, res, next) => {
  const adminKey = process.env.ADMIN_API_KEY;
  const suppliedKey = req.get('x-admin-key');
  if (!adminKey || !suppliedKey || suppliedKey !== adminKey) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  return next();
};

export default requireAdminKey;
