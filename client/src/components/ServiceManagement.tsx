import { useState } from 'react';
import { Plus, Edit, Trash2, Coffee, Shirt, Sparkles, MoreHorizontal, LayoutGrid, List } from 'lucide-react';
import { mockServices, Service } from './mockData';

export function ServiceManagement() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    unit: '',
    category: 'food' as Service['category'],
  });

  const categories = [
    { value: 'food', label: 'Ăn uống', icon: Coffee, color: 'blue' },
    { value: 'laundry', label: 'Giặt ủi', icon: Shirt, color: 'purple' },
    { value: 'spa', label: 'Spa & Massage', icon: Sparkles, color: 'pink' },
    { value: 'other', label: 'Khác', icon: MoreHorizontal, color: 'gray' },
  ];

  const getCategoryInfo = (category: string) => {
    return categories.find(c => c.value === category) || categories[3];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      // Update existing service
      setServices(services.map(s => 
        s.id === editingService.id 
          ? { ...s, ...formData }
          : s
      ));
    } else {
      // Add new service
      const newService: Service = {
        id: `SV${Date.now()}`,
        ...formData,
        status: 'active',
      };
      setServices([...services, newService]);
    }

    // Reset form
    setShowForm(false);
    setEditingService(null);
    setFormData({ name: '', price: 0, unit: '', category: 'food' });
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      price: service.price,
      unit: service.unit,
      category: service.category,
    });
    setShowForm(true);
  };

  const handleToggleStatus = (serviceId: string) => {
    setServices(services.map(s =>
      s.id === serviceId
        ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
        : s
    ));
  };

  const handleDelete = (serviceId: string) => {
    if (confirm('Bạn có chắc muốn xóa dịch vụ này?')) {
      setServices(services.filter(s => s.id !== serviceId));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Quản Lý Dịch Vụ</h2>
          <p className="text-gray-600 mt-1">Quản lý các dịch vụ phát sinh cho khách</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingService(null);
            setFormData({ name: '', price: 0, unit: '', category: 'food' });
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/30 transition-all duration-200 hover:shadow-xl hover:scale-105 font-medium"
        >
          <Plus className="w-5 h-5" />
          Thêm Dịch Vụ
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
              <h3 className="text-lg font-bold">
                {editingService ? 'Chỉnh Sửa Dịch Vụ' : 'Thêm Dịch Vụ Mới'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên dịch vụ
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đơn vị
                  </label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại dịch vụ
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Service['category'] })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
                >
                  {editingService ? 'Cập nhật' : 'Thêm mới'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingService(null);
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

      {/* View Mode Toggle */}
      <div className="flex items-center justify-end">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-gray-100'} rounded-lg transition-colors`}
        >
          <LayoutGrid className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-gray-100'} rounded-lg transition-colors`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>

      {/* Services Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => {
            const categoryInfo = getCategoryInfo(service.category);
            const Icon = categoryInfo.icon;

            return (
              <div
                key={service.id}
                className={`group bg-white rounded-2xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  service.status === 'inactive' ? 'opacity-60' : ''
                }`}
              >
                {/* Service Image */}
                {service.image ? (
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30">
                        {categoryInfo.label}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-bold text-white text-xl drop-shadow-lg">{service.name}</h3>
                    </div>
                  </div>
                ) : (
                  <div className={`h-24 bg-linear-to-br from-${categoryInfo.color}-500 to-${categoryInfo.color}-600 p-5 relative`}>
                    <Icon className="w-10 h-10 text-white opacity-90" />
                    <span className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {categoryInfo.label}
                    </span>
                  </div>
                )}

                <div className="p-5">
                  {!service.image && <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {service.price.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="text-sm text-gray-500">/{service.unit}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={service.status === 'active'}
                        onChange={() => handleToggleStatus(service.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Kích hoạt</span>
                    </label>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => {
            const categoryInfo = getCategoryInfo(service.category);
            const Icon = categoryInfo.icon;

            return (
              <div
                key={service.id}
                className={`group bg-white rounded-2xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  service.status === 'inactive' ? 'opacity-60' : ''
                }`}
              >
                {/* Service Image */}
                {service.image ? (
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30">
                        {categoryInfo.label}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-bold text-white text-xl drop-shadow-lg">{service.name}</h3>
                    </div>
                  </div>
                ) : (
                  <div className={`h-24 bg-linear-to-br from-${categoryInfo.color}-500 to-${categoryInfo.color}-600 p-5 relative`}>
                    <Icon className="w-10 h-10 text-white opacity-90" />
                    <span className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {categoryInfo.label}
                    </span>
                  </div>
                )}

                <div className="p-5">
                  {!service.image && <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {service.price.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="text-sm text-gray-500">/{service.unit}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={service.status === 'active'}
                        onChange={() => handleToggleStatus(service.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Kích hoạt</span>
                    </label>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}