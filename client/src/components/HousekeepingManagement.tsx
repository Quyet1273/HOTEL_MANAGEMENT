import { useState } from 'react';
import { CheckCircle, Clock, Bed } from 'lucide-react';
import { mockRooms } from './mockData';

export function HousekeepingManagement() {
  const [rooms, setRooms] = useState(mockRooms);

  const cleaningRooms = rooms.filter(r => r.status === 'cleaning');

  const handleMarkCleaned = (roomId: string) => {
    setRooms(rooms.map(r =>
      r.id === roomId
        ? { ...r, status: 'available' }
        : r
    ));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Danh Sách Phòng Chờ Dọn</h2>
          <p className="text-gray-600 mt-1">Cập nhật trạng thái phòng sau khi dọn dẹp</p>
        </div>
        <div className="px-5 py-2.5 bg-blue-100 text-blue-700 rounded-xl font-semibold">
          {cleaningRooms.length} phòng chờ dọn
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Chờ dọn</p>
              <p className="text-2xl font-bold text-gray-900">{cleaningRooms.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Đã dọn hôm nay</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <Bed className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng phòng</p>
              <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cleaning Rooms Table */}
      <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200/50 bg-linear-to-r from-gray-50 to-white">
          <h3 className="font-semibold text-gray-900">Phòng Chờ Dọn</h3>
        </div>

        {cleaningRooms.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                    Số phòng
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                    Loại phòng
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                    Tầng
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                    Thời gian check-out
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                    Ghi chú
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {cleaningRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <Bed className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">Phòng {room.number}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium capitalize">
                        {room.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      Tầng {room.floor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        12/12/2024 - 11:00
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Cần kiểm tra minibar
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleMarkCleaned(room.id)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-600/30 transition-all duration-200 font-medium text-sm"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Đã dọn xong
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-900 mb-1">Không có phòng chờ dọn</p>
            <p className="text-sm text-gray-500">Tất cả phòng đã được dọn dẹp</p>
          </div>
        )}
      </div>
    </div>
  );
}
