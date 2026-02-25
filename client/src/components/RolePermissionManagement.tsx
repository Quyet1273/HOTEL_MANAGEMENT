import { useState } from 'react';
import { Shield, Users, Eye, Edit, Trash2, Plus, X, Check } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

export function RolePermissionManagement() {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Mock permissions data
  const allPermissions: Permission[] = [
    // Dashboard
    { id: 'dashboard.view', name: 'Xem Dashboard', description: 'Xem tổng quan và báo cáo', module: 'Dashboard' },
    { id: 'dashboard.export', name: 'Xuất Báo Cáo', description: 'Xuất dữ liệu và báo cáo', module: 'Dashboard' },
    
    // Rooms
    { id: 'rooms.view', name: 'Xem Phòng', description: 'Xem danh sách phòng', module: 'Quản Lý Phòng' },
    { id: 'rooms.create', name: 'Tạo Phòng', description: 'Thêm phòng mới', module: 'Quản Lý Phòng' },
    { id: 'rooms.edit', name: 'Sửa Phòng', description: 'Chỉnh sửa thông tin phòng', module: 'Quản Lý Phòng' },
    { id: 'rooms.delete', name: 'Xóa Phòng', description: 'Xóa phòng khỏi hệ thống', module: 'Quản Lý Phòng' },
    
    // Bookings
    { id: 'bookings.view', name: 'Xem Đặt Phòng', description: 'Xem danh sách đặt phòng', module: 'Đặt Phòng' },
    { id: 'bookings.create', name: 'Tạo Đặt Phòng', description: 'Tạo đặt phòng mới', module: 'Đặt Phòng' },
    { id: 'bookings.edit', name: 'Sửa Đặt Phòng', description: 'Chỉnh sửa đặt phòng', module: 'Đặt Phòng' },
    { id: 'bookings.cancel', name: 'Hủy Đặt Phòng', description: 'Hủy đặt phòng', module: 'Đặt Phòng' },
    
    // Guests
    { id: 'guests.view', name: 'Xem Khách Hàng', description: 'Xem thông tin khách hàng', module: 'Khách Hàng' },
    { id: 'guests.create', name: 'Tạo Khách Hàng', description: 'Thêm khách hàng mới', module: 'Khách Hàng' },
    { id: 'guests.edit', name: 'Sửa Khách Hàng', description: 'Chỉnh sửa thông tin khách hàng', module: 'Khách Hàng' },
    { id: 'guests.delete', name: 'Xóa Khách Hàng', description: 'Xóa khách hàng', module: 'Khách Hàng' },
    
    // Check-in/out
    { id: 'checkin.perform', name: 'Thực Hiện Check-in', description: 'Check-in khách', module: 'Nhận/Trả Phòng' },
    { id: 'checkout.perform', name: 'Thực Hiện Check-out', description: 'Check-out khách', module: 'Nhận/Trả Phòng' },
    
    // Services
    { id: 'services.view', name: 'Xem Dịch Vụ', description: 'Xem danh sách dịch vụ', module: 'Dịch Vụ' },
    { id: 'services.create', name: 'Tạo Dịch Vụ', description: 'Thêm dịch vụ mới', module: 'Dịch Vụ' },
    { id: 'services.edit', name: 'Sửa Dịch Vụ', description: 'Chỉnh sửa dịch vụ', module: 'Dịch Vụ' },
    { id: 'services.delete', name: 'Xóa Dịch Vụ', description: 'Xóa dịch vụ', module: 'Dịch Vụ' },
    
    // Employees
    { id: 'employees.view', name: 'Xem Nhân Viên', description: 'Xem danh sách nhân viên', module: 'Nhân Viên' },
    { id: 'employees.create', name: 'Tạo Nhân Viên', description: 'Thêm nhân viên mới', module: 'Nhân Viên' },
    { id: 'employees.edit', name: 'Sửa Nhân Viên', description: 'Chỉnh sửa thông tin nhân viên', module: 'Nhân Viên' },
    { id: 'employees.delete', name: 'Xóa Nhân Viên', description: 'Xóa nhân viên', module: 'Nhân Viên' },
    
    // Housekeeping
    { id: 'housekeeping.view', name: 'Xem Buồng Phòng', description: 'Xem danh sách công việc', module: 'Buồng Phòng' },
    { id: 'housekeeping.assign', name: 'Phân Công', description: 'Phân công công việc', module: 'Buồng Phòng' },
    { id: 'housekeeping.complete', name: 'Hoàn Thành', description: 'Đánh dấu hoàn thành', module: 'Buồng Phòng' },
    
    // Settings & Roles
    { id: 'settings.view', name: 'Xem Cài Đặt', description: 'Xem cài đặt hệ thống', module: 'Hệ Thống' },
    { id: 'settings.edit', name: 'Sửa Cài Đặt', description: 'Thay đổi cài đặt', module: 'Hệ Thống' },
    { id: 'roles.manage', name: 'Quản Lý Phân Quyền', description: 'Quản lý vai trò và quyền', module: 'Hệ Thống' },
  ];

  // Mock roles data
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Quản Trị Viên',
      description: 'Toàn quyền truy cập hệ thống',
      permissions: allPermissions.map(p => p.id),
      userCount: 2,
    },
    {
      id: 'manager',
      name: 'Quản Lý',
      description: 'Quản lý vận hành khách sạn',
      permissions: [
        'dashboard.view', 'dashboard.export',
        'rooms.view', 'rooms.edit',
        'bookings.view', 'bookings.create', 'bookings.edit', 'bookings.cancel',
        'guests.view', 'guests.create', 'guests.edit',
        'checkin.perform', 'checkout.perform',
        'services.view', 'services.create', 'services.edit',
        'employees.view',
        'housekeeping.view', 'housekeeping.assign',
      ],
      userCount: 5,
    },
    {
      id: 'receptionist',
      name: 'Lễ Tân',
      description: 'Xử lý đặt phòng và check-in/out',
      permissions: [
        'rooms.view',
        'bookings.view', 'bookings.create', 'bookings.edit',
        'guests.view', 'guests.create', 'guests.edit',
        'checkin.perform', 'checkout.perform',
        'services.view',
      ],
      userCount: 12,
    },
    {
      id: 'housekeeping',
      name: 'Buồng Phòng',
      description: 'Quản lý vệ sinh phòng',
      permissions: [
        'housekeeping.view', 'housekeeping.complete',
      ],
      userCount: 20,
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const handleCreateRole = () => {
    setEditingRole(null);
    setFormData({ name: '', description: '', permissions: [] });
    setShowRoleModal(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions],
    });
    setShowRoleModal(true);
  };

  const handleSaveRole = () => {
    if (editingRole) {
      // Update existing role
      setRoles(roles.map(r => r.id === editingRole.id 
        ? { ...r, name: formData.name, description: formData.description, permissions: formData.permissions }
        : r
      ));
    } else {
      // Create new role
      const newRole: Role = {
        id: `role_${Date.now()}`,
        name: formData.name,
        description: formData.description,
        permissions: formData.permissions,
        userCount: 0,
      };
      setRoles([...roles, newRole]);
    }
    setShowRoleModal(false);
  };

  const handleDeleteRole = (roleId: string) => {
    if (confirm('Bạn có chắc muốn xóa vai trò này?')) {
      setRoles(roles.filter(r => r.id !== roleId));
    }
  };

  const togglePermission = (permissionId: string) => {
    if (formData.permissions.includes(permissionId)) {
      setFormData({ ...formData, permissions: formData.permissions.filter(p => p !== permissionId) });
    } else {
      setFormData({ ...formData, permissions: [...formData.permissions, permissionId] });
    }
  };

  const toggleAllPermissionsInModule = (module: string) => {
    const modulePermissions = allPermissions.filter(p => p.module === module).map(p => p.id);
    const allSelected = modulePermissions.every(p => formData.permissions.includes(p));
    
    if (allSelected) {
      setFormData({ ...formData, permissions: formData.permissions.filter(p => !modulePermissions.includes(p)) });
    } else {
      const newPermissions = [...new Set([...formData.permissions, ...modulePermissions])];
      setFormData({ ...formData, permissions: newPermissions });
    }
  };

  const modules = [...new Set(allPermissions.map(p => p.module))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản Lý Phân Quyền</h2>
          <p className="text-gray-600 mt-1">Quản lý vai trò và quyền truy cập hệ thống</p>
        </div>
        <button
          onClick={handleCreateRole}
          className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/30"
        >
          <Plus className="w-5 h-5" />
          Tạo Vai Trò Mới
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all cursor-pointer ${
              selectedRole === role.id 
                ? 'border-blue-500 shadow-blue-200' 
                : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
            }`}
            onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              {role.id !== 'admin' && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditRole(role);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRole(role.id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            <h3 className="font-bold text-gray-900 mb-2">{role.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{role.description}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{role.userCount} người dùng</span>
              </div>
              <div className="text-sm font-medium text-blue-600">
                {role.permissions.length} quyền
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Role Permissions */}
      {selectedRole && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Chi Tiết Quyền - {roles.find(r => r.id === selectedRole)?.name}
          </h3>
          
          <div className="space-y-6">
            {modules.map((module) => {
              const modulePermissions = allPermissions.filter(p => p.module === module);
              const selectedPermissions = roles.find(r => r.id === selectedRole)?.permissions || [];
              const hasPermissions = modulePermissions.some(p => selectedPermissions.includes(p.id));
              
              if (!hasPermissions) return null;
              
              return (
                <div key={module} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">{module}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {modulePermissions.map((permission) => {
                      const hasPermission = selectedPermissions.includes(permission.id);
                      if (!hasPermission) return null;
                      
                      return (
                        <div key={permission.id} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                          <Check className="w-4 h-4 text-green-600 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900">{permission.name}</p>
                            <p className="text-xs text-gray-600 truncate">{permission.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {editingRole ? 'Chỉnh Sửa Vai Trò' : 'Tạo Vai Trò Mới'}
              </h3>
              <button
                onClick={() => setShowRoleModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên Vai Trò *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="VD: Nhân viên kế toán"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô Tả
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Mô tả ngắn về vai trò"
                    />
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Phân Quyền ({formData.permissions.length} quyền được ch���n)
                  </label>
                  
                  <div className="space-y-4">
                    {modules.map((module) => {
                      const modulePermissions = allPermissions.filter(p => p.module === module);
                      const allSelected = modulePermissions.every(p => formData.permissions.includes(p.id));
                      const someSelected = modulePermissions.some(p => formData.permissions.includes(p.id));
                      
                      return (
                        <div key={module} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-gray-900">{module}</h4>
                            <button
                              onClick={() => toggleAllPermissionsInModule(module)}
                              className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                                allSelected
                                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {allSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {modulePermissions.map((permission) => {
                              const isSelected = formData.permissions.includes(permission.id);
                              
                              return (
                                <label
                                  key={permission.id}
                                  className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                    isSelected
                                      ? 'border-blue-500 bg-blue-50'
                                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => togglePermission(permission.id)}
                                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900">{permission.name}</p>
                                    <p className="text-sm text-gray-600">{permission.description}</p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveRole}
                disabled={!formData.name}
                className="px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingRole ? 'Cập Nhật' : 'Tạo Vai Trò'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
