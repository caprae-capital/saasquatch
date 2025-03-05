import React, { useState } from 'react';
import { FolderPlus, Pencil, Trash2, AlertTriangle, Users, Clock, Table, RefreshCw, Link, CheckCircle2, XCircle, X } from 'lucide-react';
import type { Project } from '../types';

interface TeamMembersProps {
  initialProjects: Project[];
}

export function TeamMembers({ initialProjects }: TeamMembersProps) {
  const [showAddProject, setShowAddProject] = useState(false);
  const [showEditProject, setShowEditProject] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [projects, setProjects] = useState(initialProjects);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [sheetsConfig, setSheetsConfig] = useState<Record<string, { url: string, status: 'connected' | 'disconnected' | 'testing' }>>({});
  const [showSheetsConfig, setShowSheetsConfig] = useState<string | null>(null);

  // Mock data for project metrics
  const getProjectMetrics = (projectId: string) => ({
    totalLeads: 150,
    lastSync: '2024-03-20 15:30',
    syncActive: true
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: `project${projects.length + 1}`,
      ...newProject,
      created_at: new Date().toISOString(),
      gradingCriteria: {
        green: '',
        yellow: '',
        red: '',
      },
    };
    setProjects([...projects, project]);
    setNewProject({ name: '', description: '' });
    setShowAddProject(false);
  };

  const handleEditProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
      setShowEditProject(null);
      setEditingProject(null);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
    setShowDeleteConfirm(null);
  };

  const handleTestConnection = async (projectId: string) => {
    setSheetsConfig(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], status: 'testing' }
    }));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSheetsConfig(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], status: 'connected' }
    }));
  };

  const handleSync = async (projectId: string) => {
    // Simulate sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Sync completed successfully!');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your projects and their grading criteria</p>
        </div>
        <button
          onClick={() => setShowAddProject(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
        >
          <FolderPlus className="h-4 w-4" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {projects.map(project => {
          const metrics = getProjectMetrics(project.id);
          const sheetConfig = sheetsConfig[project.id] || { url: '', status: 'disconnected' };
          
          return (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
            >
              <div className="p-6 bg-gradient-to-r from-emerald-500/5 to-teal-500/5">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingProject(project);
                        setShowEditProject(project.id);
                      }}
                      className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(project.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Leads</p>
                        <p className="text-2xl font-bold text-gray-900">{metrics.totalLeads}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 rounded-lg">
                        <Clock className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Synced</p>
                        <p className="text-lg font-semibold text-gray-900">{metrics.lastSync}</p>
                        <span className={`text-sm ${metrics.syncActive ? 'text-emerald-600' : 'text-gray-500'}`}>
                          {metrics.syncActive ? 'Sync active' : 'Sync inactive'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`bg-white rounded-lg p-4 border ${
                      sheetConfig.status === 'connected' 
                        ? 'border-emerald-200 bg-emerald-50/50' 
                        : 'border-gray-200'
                    } shadow-sm cursor-pointer hover:border-purple-200 hover:shadow-md transition-all duration-200`}
                    onClick={() => setShowSheetsConfig(project.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        sheetConfig.status === 'connected' 
                          ? 'bg-emerald-100' 
                          : 'bg-purple-50'
                      }`}>
                        <Table className={`h-5 w-5 ${
                          sheetConfig.status === 'connected' 
                            ? 'text-emerald-600' 
                            : 'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Google Sheets</p>
                        <p className="text-sm font-medium text-gray-900">
                          {sheetConfig.status === 'connected' ? 'Connected' : 'Not Connected'}
                        </p>
                        <span className={`text-sm ${
                          sheetConfig.status === 'connected' 
                            ? 'text-emerald-600' 
                            : 'text-purple-600'
                        }`}>
                          {sheetConfig.status === 'connected' ? 'Click to manage' : 'Click to connect'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Google Sheets Configuration Modal */}
      {showSheetsConfig && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Table className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Google Sheets Connection</h3>
                </div>
                <button
                  onClick={() => setShowSheetsConfig(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Sheets URL
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={sheetsConfig[showSheetsConfig]?.url || ''}
                        onChange={(e) => setSheetsConfig(prev => ({
                          ...prev,
                          [showSheetsConfig]: { ...prev[showSheetsConfig], url: e.target.value }
                        }))}
                        placeholder="https://docs.google.com/spreadsheets/d/..."
                        className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <button
                      onClick={() => handleTestConnection(showSheetsConfig)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                        sheetsConfig[showSheetsConfig]?.status === 'testing'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : sheetsConfig[showSheetsConfig]?.status === 'connected'
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                      disabled={sheetsConfig[showSheetsConfig]?.status === 'testing'}
                    >
                      {sheetsConfig[showSheetsConfig]?.status === 'testing' ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Testing...
                        </span>
                      ) : sheetsConfig[showSheetsConfig]?.status === 'connected' ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Connected
                        </span>
                      ) : (
                        'Test Connection'
                      )}
                    </button>
                  </div>
                </div>

                {sheetsConfig[showSheetsConfig]?.status === 'connected' && (
                  <div className="space-y-4">
                    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                      <div className="flex items-center gap-2 text-emerald-700">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="text-sm font-medium">Successfully connected to Google Sheets</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSync(showSheetsConfig)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Sync Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditProject && editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Project</h3>
            <form onSubmit={handleEditProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  type="text"
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditProject(null);
                    setEditingProject(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Project</h3>
            </div>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProject(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Project
              </button>
             </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">New Project</h3>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}