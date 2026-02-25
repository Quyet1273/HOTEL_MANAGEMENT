import { useState } from 'react';
import { Plus, Edit, Trash2, Key, Shield, User } from 'lucide-react';
import { mockEmployees, Employee } from './mockData';

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    role: 'receptionist' as Employee['role'],
    email: '',
    phone: '',
  });

  const roles = [
    { value: 'admin', label: 'Admin', color: 'red', icon: Shield },
    { value: 'manager', label: 'Quản lý', color: 'purple', icon: User },
    { value: 'receptionist', label: 'Lễ tân', color: 'blue', icon: User },
    { value: 'housekeeping', label: 'Buồng phòng', color: 'green', icon: User },
  ];

  const getRoleInfo = (role: string) => {
    return roles.find(r => r.value === role) || roles[2];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEmployee) {
      setEmployees(employees.map(emp =>
        emp.id === editingEmployee.id
          ? { ...emp, ...formData }
          : emp
      ));
    } else {
      const newEmployee: Employee = {
        id: `E${Date.now()}`,
        ...formData,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setEmployees([...employees, newEmployee]);
    }

    setShowForm(false);
    setEditingEmployee(null);
    setFormData({ username: '', name: '', role: 'receptionist', email: '', phone: '' });
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      username: employee.username,
      name: employee.name,
      role: employee.role,
      email: employee.email,
      phone: employee.phone,
    });
    setShowForm(true);
  };

  const handleToggleStatus = (employeeId: string) => {
    setEmployees(employees.map(emp =>
      emp.id === employeeId
        ? { ...emp, status: emp.status === 'active' ? 'inactive' : 'active' }
        : emp
    ));
  };

  const handleDelete = (employeeId: string) => {
    if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
      setEmployees(employees.filter(emp => emp.id !== employeeId));
    }
  };

  const handleResetPassword = (employeeId: string) => {
    alert(`Đã gửi link đặt lại mật khẩu cho nhân viên ${employeeId}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Quản Lý Nhân Viên</h2>
          <p className="text-gray-600 mt-1">Tạo và phân quyền tài khoản nhân viên</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingEmployee(null);
            setFormData({ username: '', name: '', role: 'receptionist', email: '', phone: '' });
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/30 transition-all duration-200 hover:shadow-xl hover:scale-105 font-medium"
        >
          <Plus className="w-5 h-5" />
          Thêm Nhân Viên
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
              <h3 className="text-lg font-bold">
                {editingEmployee ? 'Chỉnh Sửa Nhân Viên' : 'Thêm Nhân Viên Mới'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vai trò
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as Employee['role'] })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
                >
                  {editingEmployee ? 'Cập nhật' : 'Thêm mới'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEmployee(null);
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Table */}
      <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-linear-to-r from-gray-50 to-gray-100/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Nhân viên
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Vai trò
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Liên hệ
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Ngày tạo
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {employees.map((employee) => {
                const roleInfo = getRoleInfo(employee.role);
                return (
                  <tr key={employee.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-500">@{employee.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 bg-${roleInfo.color}-100 text-${roleInfo.color}-700 rounded-full text-xs font-medium`}>
                        {roleInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{employee.email}</p>
                      <p className="text-sm text-gray-500">{employee.phone}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {employee.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={employee.status === 'active'}
                          onChange={() => handleToggleStatus(employee.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleResetPassword(employee.id)}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Đặt lại mật khẩu"
                        >
                          <Key className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(employee.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
