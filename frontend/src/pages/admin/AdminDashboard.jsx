import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  BarChart2, FolderKanban, Hammer, Image as ImageIcon,
  MessageSquare, Briefcase, Plus, Trash2, CheckCircle2,
  AlertCircle, Edit, MapPin, User, Loader2, Eye, EyeOff
} from 'lucide-react';
import API from '../../utils/api';

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(true);

  // States for collections
  const [queries, setQueries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [careers, setCareers] = useState([]);

  // User Management States
  const [usersList, setUsersList] = useState([]);
  const [newUserReg, setNewUserReg] = useState({ username: '', email: '', phone: '', password: '', role: 'engineering' });
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Form states for creating new records
  const [newProject, setNewProject] = useState({
    title: '', description: '', category: 'Commercial', status: 'Ongoing',
    progress: 0, client: '', location: '', images: [], timeline: [],
    beforeImage: '', afterImage: ''
  });
  const [newService, setNewService] = useState({
    title: '', icon: 'Hammer', description: '', detailedDescription: '', image: ''
  });
  const [newGallery, setNewGallery] = useState({
    title: '', category: 'Residential', imageUrl: ''
  });

  // Timeline edit states
  const [newLog, setNewLog] = useState({ status: 'Live Update', description: '' });
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Redirect if not authorized
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/admin-login');
      } else if (!['admin', 'engineering', 'supervisor'].includes(user.role)) {
        navigate('/admin-login');
      }
    }
  }, [user, authLoading, navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const endpoints = [
        API.get('/queries'),
        API.get('/projects'),
        API.get('/services'),
        API.get('/gallery'),
        API.get('/careers')
      ];
      if (user && user.role === 'admin') {
        endpoints.push(API.get('/auth/users'));
      }

      const results = await Promise.all(endpoints);

      setQueries(results[0].data);
      setProjects(results[1].data);
      setServices(results[2].data);
      setGallery(results[3].data);
      setCareers(results[4].data);

      if (user && user.role === 'admin' && results[5]) {
        setUsersList(results[5].data);
      }
    } catch (err) {
      console.error('Failed to load dashboard payload details', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="animate-spin w-10 h-10 text-brand-blue mb-2" />
        <span className="font-bold text-xs uppercase tracking-wider">Syncing Admin Ledger...</span>
      </div>
    );
  }

  // --- QUERY CRUD ACTIONS ---
  const handleUpdateQueryStatus = async (id, status) => {
    try {
      const res = await API.put(`/queries/${id}`, { status });
      setQueries(queries.map(q => q._id === id ? res.data : q));
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDeleteQuery = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await API.delete(`/queries/${id}`);
      setQueries(queries.filter(q => q._id !== id));
    } catch (err) {
      alert('Error deleting query');
    }
  };

  // --- USER CRUD ACTIONS (ADMIN ONLY) ---
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/users', newUserReg);
      setUsersList([res.data.user, ...usersList]);
      setNewUserReg({ username: '', email: '', phone: '', password: '', role: 'engineering' });
      alert('User credentials generated successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating user');
    }
  };

  const handleToggleUserBlock = async (id) => {
    if (!window.confirm('Change block status for this user?')) return;
    try {
      const res = await API.put(`/auth/users/${id}/toggle-block`);
      setUsersList(usersList.map(u => u._id === id ? res.data.user : u));
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating user status');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Permanently delete this user account?')) return;
    try {
      await API.delete(`/auth/users/${id}`);
      setUsersList(usersList.filter(u => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting user');
    }
  };

  // --- SERVICE CRUD ACTIONS ---
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/services', newService);
      setServices([res.data, ...services]);
      setNewService({ title: '', icon: 'Hammer', description: '', detailedDescription: '', image: '' });
      alert('Service catalog updated!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating service');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service permanently?')) return;
    try {
      await API.delete(`/services/${id}`);
      setServices(services.filter(s => s._id !== id));
    } catch (err) {
      alert('Error deleting service');
    }
  };

  // --- GALLERY CRUD ACTIONS ---
  const handleAddGallery = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/gallery', newGallery);
      setGallery([res.data, ...gallery]);
      setNewGallery({ title: '', category: 'Residential', imageUrl: '' });
      alert('Photo added to gallery!');
    } catch (err) {
      alert('Error uploading to gallery');
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Remove this photo?')) return;
    try {
      await API.delete(`/gallery/${id}`);
      setGallery(gallery.filter(g => g._id !== id));
    } catch (err) {
      alert('Error deleting gallery item');
    }
  };

  // --- CAREER CRUD ACTIONS ---
  const handleDeleteCareer = async (id) => {
    if (!window.confirm('Remove this career application?')) return;
    try {
      await API.delete(`/careers/${id}`);
      setCareers(careers.filter(c => c._id !== id));
    } catch (err) {
      alert('Error deleting application record');
    }
  };

  // --- PROJECT CRUD ACTIONS ---
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const projectPayload = {
        ...newProject,
        timeline: [{ status: newProject.status, description: 'Project initiated.' }]
      };
      const res = await API.post('/projects', projectPayload);
      setProjects([res.data, ...projects]);
      setNewProject({
        title: '', description: '', category: 'Commercial', status: 'Ongoing',
        progress: 0, client: '', location: '', images: [], timeline: [],
        beforeImage: '', afterImage: ''
      });
      alert('Project added successfully!');
    } catch (err) {
      alert('Error adding project');
    }
  };

  const handleUpdateProjectProgress = async (project, progressPercent, statusVal) => {
    try {
      const res = await API.put(`/projects/${project._id}`, {
        progress: Number(progressPercent),
        status: statusVal
      });
      setProjects(projects.map(p => p._id === project._id ? res.data : p));
      alert('Progress metrics synchronized!');
    } catch (err) {
      alert('Error updating progress');
    }
  };

  const handleAddTimelineLog = async (e, projectId) => {
    e.preventDefault();
    const project = projects.find(p => p._id === projectId);
    if (!project) return;

    try {
      const updatedTimeline = [
        ...project.timeline,
        { ...newLog, date: new Date().toISOString() }
      ];
      const res = await API.put(`/projects/${projectId}`, {
        timeline: updatedTimeline,
        // Sync project status with last timeline status
        status: newLog.status
      });
      setProjects(projects.map(p => p._id === projectId ? res.data : p));
      setNewLog({ status: 'Live Update', description: '' });
      setEditingProjectId(null);
      alert('Timeline log recorded!');
    } catch (err) {
      alert('Error updating timeline logs');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project registry permanently?')) return;
    try {
      await API.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert('Error deleting project');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row transition font-sans text-white">
      
      {/* Sidebar Controls */}
      <aside className="w-full lg:w-64 bg-slate-900 text-slate-400 border-r border-slate-850 flex flex-col z-10 shadow-lg">
        <div className="p-6 border-b border-slate-800 text-center bg-slate-950/20">
          <span className="text-white font-extrabold tracking-tight uppercase text-sm font-sans block">
            Admin Console Control
          </span>
          <div className="flex flex-col items-center gap-1.5 mt-2">
            <p className="text-[10px] text-brand-orange font-extrabold tracking-widest uppercase flex items-center justify-center gap-1">
              Logged: {user?.username}
            </p>
            <span className="bg-slate-800 border border-slate-700 text-slate-300 px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest shadow-sm">
              Role: {user?.role === 'engineering' ? 'Engineer' : user?.role}
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 bg-slate-900">
          {(() => {
            const tabs = [
              { name: 'Overview', icon: <BarChart2 size={16} /> },
              { name: 'Queries', icon: <MessageSquare size={16} />, count: queries.filter(q => q.status === 'New').length },
              { name: 'Projects', icon: <FolderKanban size={16} /> },
              { name: 'Services', icon: <Hammer size={16} /> },
              { name: 'Gallery', icon: <ImageIcon size={16} /> },
              { name: 'Careers', icon: <Briefcase size={16} />, count: careers.length }
            ];
            if (user?.role === 'admin') {
              tabs.push({ name: 'Users', icon: <User size={16} /> });
            }
            return tabs.map((tab) => {
              const isTabActive = activeTab === tab.name;
              return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold transition-all duration-200 outline-none cursor-pointer ${
                  isTabActive
                    ? 'bg-slate-950 text-brand-orange border-l-4 border-brand-orange pl-3 shadow-md'
                    : 'text-slate-400 hover:bg-slate-850 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isTabActive ? 'text-brand-orange' : 'text-slate-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.name} Manager</span>
                </div>
                {tab.count > 0 && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-black transition-all ${
                    isTabActive ? 'bg-brand-orange text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          });
          })()}
        </nav>
      </aside>

      {/* Main Console Panels */}
      <main className="flex-grow p-6 lg:p-10 overflow-y-auto bg-slate-955 text-slate-100">
        <h2 className="text-2xl font-black text-slate-100 mb-6 uppercase tracking-tight">
          {activeTab} Management Panel
        </h2>

        {/* --- OVERVIEW TAB --- */}
        {activeTab === 'Overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Unread Queries', val: queries.filter(q => q.status === 'New').length, border: 'border-brand-orange' },
                { label: 'Total Projects', val: projects.length, border: 'border-brand-blue' },
                { label: 'Active Services', val: services.length, border: 'border-emerald-500' },
                { label: 'Job Applicants', val: careers.length, border: 'border-brand-yellow' },
              ].map((stat, i) => (
                <div key={i} className={`bg-slate-900 text-white p-6 rounded-2xl border-l-4 ${stat.border} shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-all duration-300`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {stat.label}
                  </span>
                  <span className="text-3xl font-black block mt-2 text-white">
                    {stat.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Summary Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Latest Queries */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl pointer-events-none" />
                <h4 className="font-bold text-sm text-slate-100 mb-4 tracking-wide border-b border-slate-800 pb-2">Latest Client Leads</h4>
                {queries.length === 0 ? (
                  <p className="text-xs text-slate-500">No leads recorded yet.</p>
                ) : (
                  <div className="space-y-3">
                    {queries.slice(0, 3).map((q) => (
                      <div key={q._id} className="flex justify-between items-start text-xs border-b border-slate-800/60 pb-3 last:border-b-0 last:pb-0">
                        <div>
                          <span className="font-bold text-slate-200 block">{q.name}</span>
                          <span className="text-slate-450 block">{q.email} | {q.phone}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.status === 'New' ? 'bg-orange-500/20 text-brand-orange' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {q.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ongoing Projects Tracker */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />
                <h4 className="font-bold text-sm text-slate-100 mb-4 tracking-wide border-b border-slate-800 pb-2">Active Projects Progress</h4>
                {projects.filter(p => p.status !== 'Completed').length === 0 ? (
                  <p className="text-xs text-slate-500">No active ongoing projects.</p>
                ) : (
                  <div className="space-y-4">
                    {projects.filter(p => p.status !== 'Completed').slice(0, 3).map((p) => (
                      <div key={p._id} className="space-y-1.5 text-xs">
                        <div className="flex justify-between font-bold">
                          <span className="text-slate-200">{p.title}</span>
                          <span className="text-brand-orange">{p.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-brand-orange to-amber-500" style={{ width: `${p.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* --- QUERIES MANAGEMENT --- */}
        {activeTab === 'Queries' && (
          <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                    <th className="p-4">Contact</th>
                    <th className="p-4">Service Type</th>
                    <th className="p-4">Message Details</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium">
                  {queries.map(q => (
                    <tr key={q._id} className="hover:bg-slate-850/30 transition">
                      <td className="p-4">
                        <span className="font-extrabold text-slate-200 block">{q.name}</span>
                        <span className="text-slate-450 block">{q.email}</span>
                        <span className="text-slate-450 block">{q.phone}</span>
                      </td>
                      <td className="p-4 text-slate-300 font-bold">{q.serviceType || 'General'}</td>
                      <td className="p-4 text-slate-450 max-w-xs break-words">{q.message}</td>
                      <td className="p-4">
                        <select
                          value={q.status}
                          onChange={(e) => handleUpdateQueryStatus(q._id, e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-850 bg-slate-950 text-slate-300 font-semibold focus:ring-1 focus:ring-brand-orange focus:outline-none [&>option]:bg-slate-900 [&>option]:text-white"
                        >
                          <option value="New">New</option>
                          <option value="Read">Read</option>
                          <option value="Replied">Replied</option>
                        </select>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteQuery(q._id)}
                          className="p-2 text-red-500 hover:bg-red-950/40 rounded-lg transition"
                          title="Delete Lead"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- PROJECTS MANAGEMENT --- */}
        {activeTab === 'Projects' && (
          <div className="space-y-8">
            
            {/* Create Project Form */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-full blur-xl pointer-events-none" />
              <h3 className="font-bold text-sm text-slate-100 mb-4 flex items-center gap-2">
                <Plus size={16} className="text-brand-orange" />
                Register New Project
              </h3>
              <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-400">
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Project Title</label>
                  <input
                    type="text" required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. Pandit Commercial Plaza"
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Client Name</label>
                  <input
                    type="text" required
                    value={newProject.client}
                    onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                    placeholder="e.g. Apex Hubs Ltd"
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Location Coordinates</label>
                  <input
                    type="text" required
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    placeholder="e.g. Thane West, MH"
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Project Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs [&>option]:bg-slate-900 [&>option]:text-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Renovation">Renovation</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs [&>option]:bg-slate-900 [&>option]:text-white"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Live">Live Progress</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">First Image (Click to Select)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setNewProject({ ...newProject, images: [reader.result] });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-slate-800 file:text-white hover:file:bg-slate-700 hover:file:text-brand-orange focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all duration-300 text-xs cursor-pointer"
                  />
                </div>
                {/* Before Site Image */}
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Before Site Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setNewProject({ ...newProject, beforeImage: reader.result });
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-slate-800 file:text-white hover:file:bg-slate-700 hover:file:text-brand-orange focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all duration-300 text-xs cursor-pointer"
                  />
                  {newProject.beforeImage && <img src={newProject.beforeImage} alt="Before preview" className="mt-1.5 h-16 w-full object-cover rounded-lg border border-slate-700" />}
                </div>
                {/* After Site Image */}
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">After Site Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setNewProject({ ...newProject, afterImage: reader.result });
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-slate-800 file:text-white hover:file:bg-slate-700 hover:file:text-brand-orange focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all duration-300 text-xs cursor-pointer"
                  />
                  {newProject.afterImage && <img src={newProject.afterImage} alt="After preview" className="mt-1.5 h-16 w-full object-cover rounded-lg border border-slate-700" />}
                </div>
                <div className="md:col-span-3 space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Brief Scope Description</label>
                  <textarea
                    required rows="2"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Specify total floors, structural tonnage, or road layout details..."
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs resize-none"
                  />
                </div>
                <div className="md:col-span-3 pt-2">
                  <button type="submit" className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs cursor-pointer">
                    Create Registry Record
                  </button>
                </div>
              </form>
            </div>

             {/* Project list table */}
             <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                      <th className="p-4">Project Title</th>
                      <th className="p-4">Details</th>
                      <th className="p-4">Status & Progress</th>
                      <th className="p-4">Timeline log</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-medium">
                    {projects.map(p => (
                      <tr key={p._id} className="hover:bg-slate-850/30 transition text-white">
                        <td className="p-4">
                          <span className="font-extrabold text-slate-200 block">{p.title}</span>
                          <span className="text-slate-400 block uppercase text-[9px] tracking-wider font-extrabold mt-0.5">{p.category}</span>
                        </td>
                        <td className="p-4 text-slate-400">
                          <div className="flex items-center gap-1"><MapPin size={12} /> {p.location}</div>
                          <div className="flex items-center gap-1 mt-1"><User size={12} /> {p.client}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <select
                              value={p.status}
                              onChange={(e) => handleUpdateProjectProgress(p, p.progress, e.target.value)}
                              className="px-2 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 font-semibold focus:ring-1 focus:ring-brand-orange focus:outline-none [&>option]:bg-slate-900 [&>option]:text-white"
                            >
                              <option value="Ongoing">Ongoing</option>
                              <option value="Completed">Completed</option>
                              <option value="Live">Live</option>
                            </select>

                            <input
                              type="number"
                              min="0" max="100"
                              value={p.progress}
                              onChange={(e) => handleUpdateProjectProgress(p, e.target.value, p.status)}
                              className="w-16 p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-100 text-center font-bold focus:ring-1 focus:ring-brand-orange focus:outline-none"
                            />
                            <span>%</span>
                          </div>
                        </td>
                        <td className="p-4 text-xs font-semibold">
                          <button
                            onClick={() => setEditingProjectId(editingProjectId === p._id ? null : p._id)}
                            className="text-brand-orange hover:text-orange-600 flex items-center gap-1 cursor-pointer transition"
                          >
                            <Edit size={14} /> Log Progress
                          </button>

                          {editingProjectId === p._id && (
                            <form onSubmit={(e) => handleAddTimelineLog(e, p._id)} className="mt-3 bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2.5 max-w-xs text-white shadow-lg">
                              <label className="block text-[10px] uppercase font-bold text-slate-400">Milestone Stage</label>
                              <select
                                value={newLog.status}
                                onChange={(e) => setNewLog({ ...newLog, status: e.target.value })}
                                className="w-full p-2 border border-slate-800 rounded bg-slate-950 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs [&>option]:bg-slate-900 [&>option]:text-white"
                              >
                                <option value="Excavation">Excavation</option>
                                <option value="Foundation">Foundation</option>
                                <option value="RCC Framed">RCC Framed</option>
                                <option value="Finishing">Finishing Work</option>
                                <option value="Live Update">Live Site Update</option>
                                <option value="Completed">Completed</option>
                              </select>
                              <label className="block text-[10px] uppercase font-bold text-slate-400 mt-1">Log Description</label>
                              <textarea
                                required rows="2"
                                value={newLog.description}
                                onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
                                placeholder="Describe current milestone completion details..."
                                className="w-full p-2 border border-slate-800 rounded bg-slate-950 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs resize-none placeholder-slate-500"
                              />
                              <button type="submit" className="bg-brand-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-[10px] font-bold shadow-md transition-all duration-200 cursor-pointer">
                                Record Update
                              </button>
                            </form>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteProject(p._id)}
                            className="p-2 text-red-500 hover:bg-red-950/40 rounded-lg transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* --- SERVICES MANAGEMENT --- */}
        {activeTab === 'Services' && (
          <div className="space-y-8">
            {/* Create Service */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-full blur-xl pointer-events-none" />
              <h3 className="font-bold text-sm text-slate-100 mb-4 flex items-center gap-2">
                <Plus size={16} className="text-brand-orange" />
                Add New Civil Service Card
              </h3>
              <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-400">
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Service Title</label>
                  <input
                    type="text" required
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    placeholder="e.g. Concrete Piling"
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Lucide Icon Name</label>
                  <input
                    type="text" required
                    value={newService.icon}
                    onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                    placeholder="e.g. Building2, Construction, HardHat"
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="block text-slate-400 font-semibold mb-1">Service Image (Click to Select)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setNewService({ ...newService, image: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-slate-800 file:text-white hover:file:bg-slate-700 hover:file:text-brand-orange focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all duration-300 text-xs cursor-pointer"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="block text-slate-400 font-semibold mb-1">Short Description (Card Grid)</label>
                  <textarea
                    required rows="2"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    placeholder="A brief 1-2 sentence preview..."
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs resize-none"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="block text-slate-400 font-semibold mb-1">Detailed Specifications (Scope Overlay Modal)</label>
                  <textarea
                    required rows="4"
                    value={newService.detailedDescription}
                    onChange={(e) => setNewService({ ...newService, detailedDescription: e.target.value })}
                    placeholder="Comprehensive materials, concrete grades, drafting standards specifications..."
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs cursor-pointer">
                    Create Service Category
                  </button>
                </div>
              </form>
            </div>

            {/* List Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map(s => (
                <div key={s._id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg text-white flex justify-between gap-4 group hover:bg-slate-850/50 transition-colors duration-300">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-200">{s.title}</span>
                      <span className="text-[10px] text-slate-400 font-bold border border-slate-800 bg-slate-950 px-1.5 py-0.5 rounded uppercase">Icon: {s.icon}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{s.description}</p>
                  </div>
                  <div className="shrink-0 self-start">
                    <button
                      onClick={() => handleDeleteService(s._id)}
                      className="p-2 text-red-500 hover:bg-red-950/40 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* --- GALLERY MANAGEMENT --- */}
        {activeTab === 'Gallery' && (
          <div className="space-y-8">
            {/* Add Gallery Photo */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-full blur-xl pointer-events-none" />
              <h3 className="font-bold text-sm text-slate-100 mb-4 flex items-center gap-2">
                <Plus size={16} className="text-brand-orange" />
                Upload Photo Metadata
              </h3>
              <form onSubmit={handleAddGallery} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-400">
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Photo Title</label>
                  <input
                    type="text" required
                    value={newGallery.title}
                    onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                    placeholder="e.g. Steel framing installation"
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Media Category</label>
                  <select
                    value={newGallery.category}
                    onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange focus:outline-none transition-all duration-300 text-xs [&>option]:bg-slate-900 [&>option]:text-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Industrial">Industrial</option>
                    <option value="RCC">RCC Concrete</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Blueprint">Architecture Blueprint</option>
                    <option value="Logo">Image Logo</option>
                    <option value="General">General Site</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Gallery Image (Click to Select)</label>
                  <input
                    type="file" required
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setNewGallery({ ...newGallery, imageUrl: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-slate-800 file:text-white hover:file:bg-slate-700 hover:file:text-brand-orange focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all duration-300 text-xs cursor-pointer"
                  />
                </div>
                <div className="md:col-span-3">
                  <button type="submit" className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs cursor-pointer">
                    Register Media
                  </button>
                </div>
              </form>
            </div>

            {/* List Gallery Items */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {gallery.map(g => (
                <div key={g._id} className="relative group overflow-hidden rounded-xl bg-slate-900 border border-slate-800 h-40">
                  <img src={g.imageUrl} alt={g.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                    <span className="text-[9px] uppercase tracking-wider bg-brand-orange text-white px-1.5 py-0.5 rounded self-start font-extrabold">{g.category}</span>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[10px] font-bold truncate pr-2">{g.title}</span>
                      <button
                        onClick={() => handleDeleteGallery(g._id)}
                        className="p-1.5 bg-red-600 hover:bg-red-700 rounded-md transition text-white shrink-0"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* --- CAREERS MANAGEMENT --- */}
        {activeTab === 'Careers' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                    <th className="p-4">Applicant Profile</th>
                    <th className="p-4">Target Position</th>
                    <th className="p-4">Resume / CV Link</th>
                    <th className="p-4">Message / Cover Note</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium text-white">
                  {careers.map(c => (
                    <tr key={c._id} className="hover:bg-slate-850/30 transition">
                      <td className="p-4">
                        <span className="font-extrabold text-slate-200 block">{c.name}</span>
                        <span className="text-slate-450 block">{c.email}</span>
                        <span className="text-slate-450 block">{c.phone}</span>
                      </td>
                      <td className="p-4 text-brand-orange font-bold uppercase tracking-wider text-[10px]">{c.position}</td>
                      <td className="p-4">
                        <a
                          href={c.resumeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-orange hover:underline font-extrabold flex items-center gap-1"
                        >
                          Open Resume (CV)
                        </a>
                      </td>
                      <td className="p-4 text-slate-400 max-w-xs break-words">{c.message || 'No cover note provided.'}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteCareer(c._id)}
                          className="p-2 text-red-500 hover:bg-red-950/40 rounded-lg transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- USERS MANAGEMENT (ADMIN ONLY) --- */}
        {activeTab === 'Users' && user?.role === 'admin' && (
          <div className="space-y-8">
            {/* Create User Form */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-full blur-xl pointer-events-none" />
              <h3 className="font-bold text-sm text-slate-100 mb-4 flex items-center gap-2">
                <User size={16} className="text-brand-orange" />
                Issue New Credentials
              </h3>
              <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-semibold text-slate-400">
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Username (Login ID)</label>
                  <input
                    type="text" required
                    value={newUserReg.username}
                    onChange={(e) => setNewUserReg({ ...newUserReg, username: e.target.value })}
                    placeholder="e.g. site_supervisor_1"
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all duration-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Email Address</label>
                  <input
                    type="email" required
                    value={newUserReg.email}
                    onChange={(e) => setNewUserReg({ ...newUserReg, email: e.target.value })}
                    placeholder="e.g. user@panditinfra.com"
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all duration-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Mobile Number</label>
                  <input
                    type="tel" required
                    value={newUserReg.phone}
                    onChange={(e) => setNewUserReg({ ...newUserReg, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all duration-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? "text" : "password"} required
                      value={newUserReg.password}
                      onChange={(e) => setNewUserReg({ ...newUserReg, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full p-2.5 pr-10 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all duration-300 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold mb-1">Access Role</label>
                  <select
                    value={newUserReg.role}
                    onChange={(e) => setNewUserReg({ ...newUserReg, role: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all duration-300 text-xs [&>option]:bg-slate-900 [&>option]:text-white"
                  >
                    <option value="engineering">Engineering</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button type="submit" className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs cursor-pointer">
                    Create User Access
                  </button>
                </div>
              </form>
            </div>

            {/* List Users */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                      <th className="p-4">Account ID</th>
                      <th className="p-4">Assigned Role</th>
                      <th className="p-4">Auth Status</th>
                      <th className="p-4 text-center">Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-medium">
                    {usersList.map(u => (
                      <tr key={u._id} className="hover:bg-slate-850/30 transition text-white">
                        <td className="p-4 font-extrabold text-slate-200">{u.username}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-extrabold ${
                            u.role === 'admin' ? 'bg-orange-500/20 text-brand-orange' :
                            u.role === 'engineering' ? 'bg-blue-500/20 text-brand-blue' :
                            'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            u.isBlocked ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {u.isBlocked ? 'Blocked' : 'Active'}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleToggleUserBlock(u._id)}
                              disabled={u._id === user._id}
                              className={`px-3 py-1.5 rounded-lg font-bold transition text-[10px] uppercase disabled:opacity-30 ${
                                u.isBlocked 
                                  ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' 
                                  : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                              }`}
                            >
                              {u.isBlocked ? 'Unblock' : 'Block'}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              disabled={u._id === user._id}
                              className="p-1.5 text-red-500 hover:bg-red-950/40 rounded-lg transition disabled:opacity-30"
                              title="Delete User"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
