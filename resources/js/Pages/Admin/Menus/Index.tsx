import { Head, useForm, router, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function MenusIndex({ menus }: any) {
    const [selectedMenu, setSelectedMenu] = useState<any>(menus[0] || null);

    const menuForm = useForm({
        name: '',
        handle: '',
        location: 'header',
        is_active: true,
    });

    const itemForm = useForm({
        parent_id: '',
        label: '',
        url: '',
        icon: '',
        order: 0,
        new_tab: false,
    });

    const handleCreateMenu = (e: React.FormEvent) => {
        e.preventDefault();
        menuForm.post('/admin/menus', {
            onSuccess: () => {
                toast.success('Menu created successfully');
                menuForm.reset();
            },
            onError: () => toast.error('Failed to create menu'),
        });
    };

    const handleCreateItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMenu) return;
        itemForm.post(`/admin/menus/${selectedMenu.id}/items`, {
            onSuccess: () => {
                toast.success('Menu item added');
                itemForm.reset();
                router.reload({ only: ['menus'] });
            },
            onError: () => toast.error('Failed to add item'),
        });
    };

    const deleteMenu = (id: number) => {
        if (confirm('Delete this menu completely?')) {
            router.delete(`/admin/menus/${id}`, {
                onSuccess: () => {
                    toast.success('Menu deleted');
                    if (selectedMenu?.id === id) setSelectedMenu(null);
                },
                onError: () => toast.error('Failed to delete menu'),
            });
        }
    };

    const deleteItem = (menuId: number, itemId: number) => {
        if (confirm('Delete this menu item?')) {
            router.delete(`/admin/menus/${menuId}/items/${itemId}`, {
                onSuccess: () => {
                    toast.success('Item deleted');
                    router.reload({ only: ['menus'] });
                },
                onError: () => toast.error('Failed to delete item'),
            });
        }
    };

    // Update selectedMenu when menus prop changes (after adding an item)
    if (selectedMenu) {
        const updated = menus.find((m: any) => m.id === selectedMenu.id);
        if (updated && JSON.stringify(updated) !== JSON.stringify(selectedMenu)) {
            setSelectedMenu(updated);
        }
    }

    return (
        <AdminLayout title="Menus">
            <Head title="Menus — Rafel CMS" />

            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Menu Manager</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Control the navigation menus across your storefront.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Left Column - Menu Selection & Creation */}
                <div className="w-full md:w-1/3 space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Select Menu</h3>
                        <div className="space-y-2">
                            {menus.map((menu: any) => (
                                <button
                                    key={menu.id}
                                    onClick={() => setSelectedMenu(menu)}
                                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors flex justify-between items-center ${
                                        selectedMenu?.id === menu.id 
                                        ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 font-medium' 
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent text-gray-600 dark:text-gray-400'
                                    }`}
                                >
                                    <span>{menu.name}</span>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-700">{menu.location}</span>
                                </button>
                            ))}
                            {menus.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400 italic">No menus exist yet.</p>}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Create New Menu</h3>
                        <form onSubmit={handleCreateMenu} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                <input type="text" value={menuForm.data.name} onChange={e => menuForm.setData('name', e.target.value)}
                                    className="w-full text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Main Navigation" required />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Handle</label>
                                <input type="text" value={menuForm.data.handle} onChange={e => menuForm.setData('handle', e.target.value)}
                                    className="w-full text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="main_nav" required />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                                <select value={menuForm.data.location} onChange={e => menuForm.setData('location', e.target.value)}
                                    className="w-full text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="header">Header</option>
                                    <option value="footer_1">Footer Column 1</option>
                                    <option value="footer_2">Footer Column 2</option>
                                    <option value="footer_3">Footer Column 3</option>
                                </select>
                            </div>
                            <button type="submit" disabled={menuForm.processing} className="w-full py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors disabled:opacity-50">
                                Create Menu
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column - Menu Items */}
                <div className="w-full md:w-2/3">
                    {selectedMenu ? (
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                                <div>
                                    <h2 className="font-bold text-gray-800 dark:text-white text-lg">{selectedMenu.name}</h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Handle: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded text-gray-800 dark:text-gray-300">{selectedMenu.handle}</code></p>
                                </div>
                                <button onClick={() => deleteMenu(selectedMenu.id)} className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium">Delete Menu</button>
                            </div>

                            <div className="p-6">
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Menu Items</h3>
                                
                                {selectedMenu.items?.length > 0 ? (
                                    <div className="space-y-2 mb-8">
                                        {selectedMenu.items.map((item: any) => (
                                            <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                                <div className="bg-white dark:bg-gray-800 px-4 py-3 flex justify-between items-center group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <div>
                                                        <span className="font-medium text-gray-800 dark:text-gray-200">{item.label}</span>
                                                        <span className="text-gray-400 dark:text-gray-500 text-sm ml-2">{item.url}</span>
                                                    </div>
                                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => deleteItem(selectedMenu.id, item.id)} className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-8">No items in this menu yet.</p>
                                )}

                                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Add Item</h4>
                                    <form onSubmit={handleCreateItem} className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Label</label>
                                            <input type="text" value={itemForm.data.label} onChange={e => itemForm.setData('label', e.target.value)}
                                                className="w-full text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Shop All" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">URL / Path</label>
                                            <input type="text" value={itemForm.data.url} onChange={e => itemForm.setData('url', e.target.value)}
                                                className="w-full text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="/shop" required />
                                        </div>
                                        <div className="col-span-2 flex justify-end">
                                            <button type="submit" disabled={itemForm.processing} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50">
                                                Add Item
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 border-dashed p-12 text-center h-full flex flex-col items-center justify-center">
                            <p className="text-gray-500 dark:text-gray-400">Select a menu from the left or create a new one.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
