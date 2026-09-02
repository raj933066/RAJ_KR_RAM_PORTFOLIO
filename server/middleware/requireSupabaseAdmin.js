import supabase from '../lib/supabase.js';

const requireSupabaseAdmin = async (req, res, next) => {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';

  if (!token || !supabase) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { data: admin, error: adminError } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  if (adminError || !admin) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  req.user = userData.user;
  return next();
};

export default requireSupabaseAdmin;
