import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, supabaseConfigured } from '../lib/supabase';

const configs = {
  profiles: { label: 'Profile', fields: { name: 'Name', headline: 'Headline', bio: 'Bio', about: 'About / objective', profile_image_url: 'Profile image URL', resume_url: 'Resume URL', email: 'Email', phone: 'Phone', location: 'Location', github_url: 'GitHub URL', linkedin_url: 'LinkedIn URL', leetcode_url: 'LeetCode URL', twitter_url: 'Twitter URL', github_username: 'GitHub username' } },
  projects: { label: 'Projects', fields: { title: 'Title', description: 'Description', image_url: 'Image URL', github_url: 'GitHub URL', live_url: 'Live URL', technologies: 'Technologies (JSON array)', featured: 'Featured', display_order: 'Order' } },
  skills: { label: 'Skills', fields: { name: 'Name', category: 'Category', icon: 'Icon', proficiency: 'Proficiency', display_order: 'Order' } },
  education: { label: 'Education', fields: { institution: 'Institution', degree: 'Degree', field: 'Field', period: 'Period', description: 'Description', display_order: 'Order' } },
  experience: { label: 'Experience', fields: { company: 'Company', role: 'Role', location: 'Location', period: 'Period', description: 'Description', points: 'Points (JSON array)', technologies: 'Technologies (JSON array)', display_order: 'Order' } },
  courses: { label: 'Courses', fields: { name: 'Name', platform: 'Platform', description: 'Description', certificate_url: 'Certificate URL', completion_date: 'Completion date', display_order: 'Order' } },
  certifications: { label: 'Certifications', fields: { name: 'Name', issuer: 'Issuer', certificate_url: 'Certificate URL', issue_date: 'Issue date', expiry_date: 'Expiry date', display_order: 'Order' } },
  achievements: { label: 'Achievements', fields: { title: 'Title', description: 'Description', date: 'Date', link: 'Link', display_order: 'Order' } },
};

const blank = (fields) => Object.keys(fields).reduce((result, key) => ({ ...result, [key]: key.includes('array') ? '[]' : '' }), {});

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = async (event) => {
    event.preventDefault();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError(authError.message);
    else onLogin();
  };
  return <main className="min-h-screen flex items-center justify-center px-5"><form onSubmit={submit} className="glass p-8 rounded-2xl w-full max-w-md space-y-4"><h1 className="text-2xl font-semibold text-ink-100">Admin login</h1>{error && <p className="text-red-400 text-sm">{error}</p>}<input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-base-900 border border-base-600 rounded-xl px-4 py-3 text-ink-100" /><input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-base-900 border border-base-600 rounded-xl px-4 py-3 text-ink-100" /><button className="btn-gradient text-white font-semibold px-5 py-3 rounded-full w-full">Sign in</button></form></main>;
}

export function AdminLogin() {
  const navigate = useNavigate();
  return <Login onLogin={() => navigate('/admin', { replace: true })} />;
}

function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (error) alert(error.message);
    else setMessages(data || []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);
  const setRead = async (message) => {
    const { error } = await supabase.from('contact_messages').update({ is_read: !message.is_read }).eq('id', message.id);
    if (error) alert(error.message);
    else load();
  };
  const remove = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (error) alert(error.message);
    else load();
  };
  if (loading) return <p className="text-ink-400">Loading messages...</p>;
  return <div className="space-y-4"><div className="flex items-center justify-between"><h2 className="text-2xl font-semibold text-ink-100">Messages</h2><button onClick={load} className="text-brand-cyan">Refresh</button></div>{messages.length === 0 && <div className="glass rounded-xl p-6 text-ink-400">No contact messages yet.</div>}{messages.map((message) => <article key={message.id} className={`glass rounded-xl p-5 ${message.is_read ? '' : 'border-brand-purple/60'}`}><div className="flex flex-wrap justify-between gap-3"><div><h3 className="text-ink-100 font-semibold">{message.subject}</h3><p className="text-sm text-ink-400">{message.name} &middot; <a className="text-brand-cyan" href={`mailto:${message.email}`}>{message.email}</a></p></div><time className="text-xs text-ink-600">{new Date(message.created_at).toLocaleString()}</time></div><p className="text-ink-300 whitespace-pre-wrap mt-4">{message.message}</p><div className="flex gap-4 mt-4 text-sm"><button onClick={() => setRead(message)} className="text-brand-cyan">{message.is_read ? 'Mark unread' : 'Mark read'}</button><button onClick={() => remove(message.id)} className="text-red-400">Delete</button></div></article>)}</div>;
}

function Editor({ table, selected, onSaved, onCancel }) {
  const config = configs[table];
  const [form, setForm] = useState(selected || blank(config.fields));
  const [busy, setBusy] = useState(false);
  const upload = async (event, field) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const bucket = field === 'certificate_url' ? 'certificates' : field === 'image_url' ? 'project-images' : field === 'profile_image_url' ? 'profile-images' : 'resume';
    const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
    if (error) { alert(error.message); return; }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    setForm((current) => ({ ...current, [field]: data.publicUrl }));
  };
  const save = async (event) => {
    event.preventDefault();
    setBusy(true);
    const payload = { ...form };
    try {
      ['technologies', 'points'].forEach((key) => { if (typeof payload[key] === 'string') payload[key] = JSON.parse(payload[key] || '[]'); });
    } catch {
      alert('Technologies and points must be valid JSON arrays.');
      setBusy(false);
      return;
    }
    const result = selected ? await supabase.from(table).update(payload).eq('id', selected.id) : await supabase.from(table).insert(payload);
    setBusy(false);
    if (result.error) { alert(result.error.message); return; }
    onSaved();
  };
  return <form onSubmit={save} className="glass p-6 rounded-2xl space-y-4"><div className="flex justify-between"><h2 className="text-xl font-semibold text-ink-100">{selected ? 'Edit' : 'Add'} {config.label.slice(0, -1)}</h2><button type="button" onClick={onCancel} className="text-ink-400">Cancel</button></div>{Object.entries(config.fields).map(([key, label]) => <label key={key} className="block text-sm text-ink-400">{label}{key === 'description' ? <textarea rows={4} value={form[key] || ''} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-1 w-full bg-base-900 border border-base-600 rounded-xl px-3 py-2 text-ink-100" /> : <><input type={key === 'featured' ? 'checkbox' : key === 'proficiency' || key === 'display_order' ? 'number' : 'text'} checked={key === 'featured' ? Boolean(form[key]) : undefined} value={key === 'featured' ? undefined : form[key] || ''} onChange={(e) => setForm({ ...form, [key]: key === 'featured' ? e.target.checked : e.target.value })} className="mt-1 w-full bg-base-900 border border-base-600 rounded-xl px-3 py-2 text-ink-100" />{['image_url', 'certificate_url', 'profile_image_url', 'resume_url'].includes(key) && <input type="file" onChange={(e) => upload(e, key)} className="mt-2 text-xs" />}</>}</label>)}<button disabled={busy} className="btn-gradient text-white font-semibold px-5 py-3 rounded-full">{busy ? 'Saving...' : 'Save'}</button></form>;
}

function ContentManager({ table }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const load = useCallback(async () => { const query = supabase.from(table).select('*'); const { data, error } = table === 'profiles' ? await query.limit(1) : await query.order('display_order'); if (error) alert(error.message); else setItems(data || []); }, [table]);
  useEffect(() => { load(); }, [load]);
  const remove = async (id) => { if (!window.confirm('Delete this item?')) return; const { error } = await supabase.from(table).delete().eq('id', id); if (error) alert(error.message); else load(); };
  if (selected === 'new' || selected?.id) return <Editor table={table} selected={selected === 'new' ? null : selected} onCancel={() => setSelected(null)} onSaved={() => { setSelected(null); load(); }} />;
  return <div className="space-y-4"><div className="flex items-center justify-between"><h2 className="text-2xl font-semibold text-ink-100">{configs[table].label}</h2>{table !== 'profiles' && <button onClick={() => setSelected('new')} className="btn-gradient text-white px-4 py-2 rounded-full">+ Add</button>}</div>{items.map((item) => <div key={item.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4"><div><h3 className="text-ink-100 font-medium">{item.title || item.name || item.role}</h3><p className="text-sm text-ink-400">{item.description || item.category || item.institution || item.company || item.issuer}</p></div><div className="flex gap-2"><button onClick={() => setSelected(item)} className="text-brand-cyan">Edit</button>{table !== 'profiles' && <button onClick={() => remove(item.id)} className="text-red-400">Delete</button>}</div></div>)}</div>;
}

export default function Admin() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [table, setTable] = useState('projects');
  useEffect(() => {
    if (!supabaseConfigured) return;
    const applySession = async (nextSession) => {
      setSession(nextSession);
      if (!nextSession) {
        setIsAdmin(false);
        setAuthLoading(false);
        return;
      }
      const { data: admin, error } = await supabase.from('admin_users').select('user_id').eq('user_id', nextSession.user.id).maybeSingle();
      setIsAdmin(Boolean(admin) && !error);
      setAuthLoading(false);
    };
    supabase.auth.getSession().then(({ data }) => applySession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => applySession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);
  useEffect(() => { if (!authLoading && (!session || !isAdmin)) navigate('/admin/login', { replace: true }); }, [authLoading, session, isAdmin, navigate]);
  if (!supabaseConfigured) return <main className="min-h-screen flex items-center justify-center text-ink-400 px-6 text-center">Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before using the admin dashboard.</main>;
  if (authLoading || !session || !isAdmin) return <div className="min-h-screen" />;
  return <main className="min-h-screen pt-28 pb-16 px-5"><div className="max-w-6xl mx-auto grid lg:grid-cols-[220px_1fr] gap-8"><aside className="glass rounded-2xl p-4 h-fit space-y-1"><h1 className="font-semibold text-ink-100 px-3 py-2">Portfolio CMS</h1>{Object.entries(configs).map(([key, config]) => <button key={key} onClick={() => setTable(key)} className={`w-full text-left px-3 py-2 rounded-lg ${table === key ? 'bg-brand-purple/20 text-brand-cyan' : 'text-ink-400 hover:bg-base-700'}`}>{config.label}</button>)}<button onClick={() => setTable('messages')} className={`w-full text-left px-3 py-2 rounded-lg ${table === 'messages' ? 'bg-brand-purple/20 text-brand-cyan' : 'text-ink-400 hover:bg-base-700'}`}>Messages</button><button onClick={() => supabase.auth.signOut()} className="w-full text-left px-3 py-2 mt-3 text-red-400">Log out</button></aside>{table === 'messages' ? <MessagesManager /> : <ContentManager table={table} />}</div></main>;
}
