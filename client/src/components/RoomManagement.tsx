import { useState } from 'react';
import { Bed, Filter, Plus, Edit, Trash2, Users as UsersIcon, LayoutGrid, List } from 'lucide-react';
import { mockRooms, Room } from './mockData';

export function RoomManagement() {
  const [rooms] = useState<Room[]>(mockRooms);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredRooms = rooms.filter(room => {
    const statusMatch = filterStatus === 'all' || room.status === filterStatus;
    const typeMatch = filterType === 'all' || room.type === filterType;
    return statusMatch && typeMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'occupied':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'reserved':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Trống';
      case 'occupied':
        return 'Đã thuê';
      case 'reserved':
        return 'Đã đặt';
      case 'maintenance':
        return 'Bảo trì';
      default:
        return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'single':
        return 'Đơn';
      case 'double':
        return 'Đôi';
      case 'suite':
        return 'Suite';
      case 'deluxe':
        return 'Deluxe';
      default:
        return type;
    }
  };

  // const getTypeGradient = (type: string) => {
  //   switch (type) {
  //     case 'single':
  //       return 'from-blue-500 to-blue-600';
  //     case 'double':
  //       return 'from-purple-500 to-purple-600';
  //     case 'suite':
  //       return 'from-amber-500 to-orange-600';
  //     case 'deluxe':
  //       return 'from-rose-500 to-pink-600';
  //     default:
  //       return 'from-gray-500 to-gray-600';
  //   }
  // };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Quản Lý Phòng</h2>
          <p className="text-gray-600 mt-1">Quản lý tất cả các phòng và trạng thái</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/30 transition-all duration-200 hover:shadow-xl hover:scale-105">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Thêm Phòng</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-gray-400">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-600">Lọc:</span>
          </div>
          <div className="flex gap-4 flex-1 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 font-medium">Trạng thái:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="available">Trống</option>
                <option value="occupied">Đã thuê</option>
                <option value="reserved">Đã đặt</option>
                <option value="maintenance">Bảo trì</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 font-medium">Loại phòng:</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="single">Đơn</option>
                <option value="double">Đôi</option>
                <option value="suite">Suite</option>
                <option value="deluxe">Deluxe</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="font-medium">Grid</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl ${viewMode === 'list' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setViewMode('list')}
          >
            <List className="w-5 h-5" />
            <span className="font-medium">List</span>
          </button>
        </div>
      </div>

      {/* Room Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <div key={room.id} className="group bg-white rounded-2xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Room Image */}
              {room.image && (
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={room.image} 
                    alt={`Phòng ${room.number}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-white">
                    <div>
                      <p className="text-2xl font-bold drop-shadow-lg">Phòng {room.number}</p>
                      <p className="text-sm opacity-90 mt-1">Tầng {room.floor}</p>
                    </div>
                    <Bed className="w-8 h-8 opacity-80 drop-shadow-lg" />
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${getStatusColor(room.status)}`}>
                      {getStatusText(room.status)}
                    </span>
                  </div>
                </div>
              )}

              {/* Room Details */}
              <div className="p-5">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Loại phòng</span>
                    <span className="text-sm font-medium text-gray-900">{getTypeText(room.type)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <UsersIcon className="w-4 h-4" />
                      Sức chứa
                    </span>
                    <span className="text-sm font-medium text-gray-900">{room.maxOccupancy} khách</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-linear-to-r from-blue-50 to-blue-100/50 rounded-lg">
                    <span className="text-sm text-blue-700 font-medium">Giá phòng</span>
                    <span className="text-blue-900 font-semibold">{room.price.toLocaleString('vi-VN')}đ<span className="text-sm text-blue-600">/đêm</span></span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <Edit className="w-4 h-4" />
                    Sửa
                  </button>
                  <button className="px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRooms.map((room) => (
            <div key={room.id} className="group bg-white rounded-2xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col md:flex-row">
                {/* Room Image */}
                {room.image && (
                  <div className="md:w-64 h-48 md:h-auto overflow-hidden relative shrink-0">
                    <img 
                      src={room.image} 
                      alt={`Phòng ${room.number}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <p className="text-2xl font-bold text-white drop-shadow-lg">Phòng {room.number}</p>
                      <p className="text-sm text-white/90 mt-1">Tầng {room.floor}</p>
                    </div>
                  </div>
                )}

                {/* Room Info */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(room.status)}`}>
                          {getStatusText(room.status)}
                        </span>
                        <span className="text-sm text-gray-600">
                          <span className="font-medium text-gray-900">{getTypeText(room.type)}</span> • <UsersIcon className="w-4 h-4 inline" /> {room.maxOccupancy} khách
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{room.price.toLocaleString('vi-VN')}đ</p>
                      <p className="text-sm text-gray-500">/đêm</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="py-2 px-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-0.5">Số phòng</p>
                      <p className="text-sm font-medium text-gray-900">{room.number}</p>
                    </div>
                    <div className="py-2 px-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-0.5">Tầng</p>
                      <p className="text-sm font-medium text-gray-900">Tầng {room.floor}</p>
                    </div>
                    <div className="py-2 px-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-0.5">Loại</p>
                      <p className="text-sm font-medium text-gray-900">{getTypeText(room.type)}</p>
                    </div>
                    <div className="py-2 px-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-0.5">Sức chứa</p>
                      <p className="text-sm font-medium text-gray-900">{room.maxOccupancy} khách</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <Edit className="w-4 h-4" />
                      Chỉnh sửa
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredRooms.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200/50 p-16 text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bed className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-900 mb-1">Không tìm thấy phòng</p>
          <p className="text-sm text-gray-500">Không có phòng nào phù hợp với bộ lọc đã chọn</p>
        </div>
      )}
    </div>
  );
}