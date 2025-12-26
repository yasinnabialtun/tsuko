import { Mail, Shield, MoreHorizontal } from 'lucide-react';

export default function AdminUsersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Kullanıcılar</h2>
                <p className="text-gray-500">Kayıtlı kullanıcıları ve aboneleri yönetin.</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Kullanıcı</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Rol</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Son Giriş</th>
                            <th className="text-right p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {[
                            { name: "Admin User", email: "admin@tsuko.com", role: "Yönetici", status: "Aktif", lastLogin: "Şimdi" },
                            { name: "Ahmet Yılmaz", email: "ahmet@gmail.com", role: "Müşteri", status: "Aktif", lastLogin: "2 saat önce" },
                            { name: "Ayşe Demir", email: "ayse@hotmail.com", role: "Müşteri", status: "Pasif", lastLogin: "5 gün önce" },
                        ].map((user, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{user.name}</h4>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Mail size={12} /> {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    {user.role === 'Yönetici' ? (
                                        <span className="flex items-center gap-1 text-purple-600 font-bold text-xs bg-purple-50 px-2 py-1 rounded-lg w-fit">
                                            <Shield size={12} /> {user.role}
                                        </span>
                                    ) : (
                                        <span className="text-gray-600 font-medium text-sm">{user.role}</span>
                                    )}
                                </td>
                                <td className="p-6">
                                    <span className={`w-2 h-2 rounded-full inline-block mr-2 ${user.status === 'Aktif' ? 'bg-green-500' : 'bg-gray-300'}`} />
                                    <span className="text-gray-600 text-sm">{user.status}</span>
                                </td>
                                <td className="p-6 text-gray-500 text-sm">{user.lastLogin}</td>
                                <td className="p-6 text-right">
                                    <button className="text-gray-400 hover:text-charcoal p-2">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
