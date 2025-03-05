import React, { useState } from 'react';
import { User } from '../types';
import { Shield, UserPlus, Users, Trash2, Mail } from 'lucide-react';

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@company.com',
    role: 'admin',
    name: 'Admin User',
    created_at: '2024-03-01',
  },
  {
    id: '2',
    email: 'member@company.com',
    role: 'member',
    name: 'Team Member',
    created_at: '2024-03-15',
  },
];

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', role: 'member' as const, name: '' });

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase auth invitation
    const user: User = {
      id: `user${users.length + 1}`,
      ...newUser,
      created_at: new Date().toISOString(),
    };
    setUsers([...users, user]);
    setNewUser({ email: '', role: 'member', name: '' });
    setShowInviteModal(false);
  };

  const handleRemoveUser = (userId: string) => {
    // TODO: Implement user removal with Supabase
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleResendInvite = (email: string) => {
    // TODO: Implement resend invitation with Supabase
    console.log('Resending invite to:', email);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
            <Shield className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-500">Manage users and permissions</p>
          </div>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <UserPlus className="h-4 w-4" />
          Invite User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">System Users</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="relative group bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:border-indigo-200 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                        user.role === 'admin' 
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <button
                      onClick={() => handleResendInvite(user.email)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      Resend Invite
                    </button>
                    <button
                      onClick={() => handleRemoveUser(user.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 rounded-xl" />
            
            <div className="relative">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Invite New User</h3>
              
              <form onSubmit={handleInviteUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'member' })}
                    className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}