/**
 * Sync Manager for NeuroThrive PWA
 * Handles offline queue and background sync with Salesforce
 *
 * @author Abby Luggery / Claude Code Assistant
 * @date 2025-11-14
 */

class SyncManager {
    constructor() {
        this.dbName = 'NeuroThriveSync';
        this.dbVersion = 1;
        this.db = null;
        this.syncInProgress = false;
        this.init();
    }

    /**
     * Initialize IndexedDB for offline queue
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create sync queue store
                if (!db.objectStoreNames.contains('syncQueue')) {
                    const syncStore = db.createObjectStore('syncQueue', {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    syncStore.createIndex('timestamp', 'timestamp', { unique: false });
                    syncStore.createIndex('synced', 'synced', { unique: false });
                    syncStore.createIndex('type', 'type', { unique: false });
                }

                // Create cached routines store
                if (!db.objectStoreNames.contains('cachedRoutines')) {
                    const cacheStore = db.createObjectStore('cachedRoutines', {
                        keyPath: 'routineDate'
                    });
                    cacheStore.createIndex('lastModified', 'lastModified', { unique: false });
                }
            };
        });
    }

    /**
     * Add item to sync queue
     */
    async queueSync(type, data) {
        const transaction = this.db.transaction(['syncQueue'], 'readwrite');
        const store = transaction.objectStore('syncQueue');

        const item = {
            type: type,  // 'upsertRoutine', 'getMoodEntries', etc.
            data: data,
            timestamp: Date.now(),
            synced: false,
            retryCount: 0
        };

        return new Promise((resolve, reject) => {
            const request = store.add(item);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get all pending sync items
     */
    async getPendingSync() {
        const transaction = this.db.transaction(['syncQueue'], 'readonly');
        const store = transaction.objectStore('syncQueue');
        const index = store.index('synced');

        return new Promise((resolve, reject) => {
            const request = index.getAll(false);  // Get all unsynced items
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Mark sync item as completed
     */
    async markSynced(id) {
        const transaction = this.db.transaction(['syncQueue'], 'readwrite');
        const store = transaction.objectStore('syncQueue');

        return new Promise((resolve, reject) => {
            const getRequest = store.get(id);
            getRequest.onsuccess = () => {
                const item = getRequest.result;
                if (item) {
                    item.synced = true;
                    item.syncedAt = Date.now();
                    const updateRequest = store.put(item);
                    updateRequest.onsuccess = () => resolve();
                    updateRequest.onerror = () => reject(updateRequest.error);
                } else {
                    resolve(); // Item doesn't exist, nothing to mark
                }
            };
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Delete synced items older than 7 days
     */
    async cleanupSyncQueue() {
        const transaction = this.db.transaction(['syncQueue'], 'readwrite');
        const store = transaction.objectStore('syncQueue');
        const index = store.index('synced');

        const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

        return new Promise((resolve, reject) => {
            const request = index.openCursor(IDBKeyRange.only(true));
            let deleted = 0;

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    const item = cursor.value;
                    if (item.syncedAt && item.syncedAt < sevenDaysAgo) {
                        cursor.delete();
                        deleted++;
                    }
                    cursor.continue();
                } else {
                    console.log(`Cleaned up ${deleted} old sync items`);
                    resolve(deleted);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Cache routine data locally
     */
    async cacheRoutine(routineData) {
        const transaction = this.db.transaction(['cachedRoutines'], 'readwrite');
        const store = transaction.objectStore('cachedRoutines');

        const cacheItem = {
            ...routineData,
            lastModified: Date.now(),
            cached: true
        };

        return new Promise((resolve, reject) => {
            const request = store.put(cacheItem);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get cached routine
     */
    async getCachedRoutine(date) {
        const transaction = this.db.transaction(['cachedRoutines'], 'readonly');
        const store = transaction.objectStore('cachedRoutines');

        return new Promise((resolve, reject) => {
            const request = store.get(date);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Save daily routine (with offline support)
     */
    async saveDailyRoutine(routineData) {
        // Add to sync queue
        await this.queueSync('upsertRoutine', routineData);

        // Cache locally for immediate display
        await this.cacheRoutine(routineData);

        // Try to sync immediately if online
        if (navigator.onLine && window.salesforceAPI && window.salesforceAPI.isAuthenticated()) {
            return await this.syncAll();
        } else {
            console.log('Offline - routine queued for sync');
            return {
                success: true,
                message: 'Saved locally - will sync when online',
                offline: true
            };
        }
    }

    /**
     * Load daily routine (with offline support)
     */
    async loadDailyRoutine(date) {
        // Try to fetch from Salesforce if online and authenticated
        if (navigator.onLine && window.salesforceAPI && window.salesforceAPI.isAuthenticated()) {
            try {
                const response = await window.salesforceAPI.getDailyRoutine(date);

                // Cache the fetched data
                if (response.success && response.data) {
                    await this.cacheRoutine(response.data);
                }

                return response;
            } catch (e) {
                console.error('Error fetching from Salesforce, falling back to cache:', e);
            }
        }

        // Fall back to cached data
        const cached = await this.getCachedRoutine(date);
        if (cached) {
            return {
                success: true,
                message: 'Loaded from local cache (offline)',
                data: cached,
                offline: true,
                cached: true
            };
        }

        // No cached data
        return {
            success: true,
            message: 'No data found (offline)',
            data: {
                routineDate: date,
                moodEntries: [],
                wins: []
            },
            offline: true
        };
    }

    /**
     * Sync all pending items
     */
    async syncAll() {
        if (this.syncInProgress) {
            console.log('Sync already in progress');
            return;
        }

        if (!navigator.onLine) {
            console.log('Offline - sync deferred');
            return;
        }

        if (!window.salesforceAPI || !window.salesforceAPI.isAuthenticated()) {
            console.log('Not authenticated - sync deferred');
            return;
        }

        this.syncInProgress = true;
        const pendingItems = await this.getPendingSync();
        console.log(`Syncing ${pendingItems.length} pending items...`);

        let synced = 0;
        let failed = 0;

        for (const item of pendingItems) {
            try {
                if (item.type === 'upsertRoutine') {
                    const response = await window.salesforceAPI.upsertDailyRoutine(item.data);

                    if (response.success) {
                        await this.markSynced(item.id);
                        synced++;

                        // Update cache with server response
                        if (response.data) {
                            await this.cacheRoutine(response.data);
                        }
                    } else {
                        console.error('Sync failed for item:', item.id, response);
                        failed++;
                    }
                }
            } catch (e) {
                console.error('Error syncing item:', item.id, e);
                failed++;

                // Increment retry count
                const transaction = this.db.transaction(['syncQueue'], 'readwrite');
                const store = transaction.objectStore('syncQueue');
                const getRequest = store.get(item.id);
                getRequest.onsuccess = () => {
                    const updatedItem = getRequest.result;
                    if (updatedItem) {
                        updatedItem.retryCount = (updatedItem.retryCount || 0) + 1;
                        updatedItem.lastError = e.message;
                        store.put(updatedItem);
                    }
                };
            }
        }

        this.syncInProgress = false;

        // Cleanup old items
        await this.cleanupSyncQueue();

        console.log(`Sync complete: ${synced} synced, ${failed} failed`);

        return {
            synced: synced,
            failed: failed,
            total: pendingItems.length
        };
    }

    /**
     * Get sync status
     */
    async getSyncStatus() {
        const pending = await this.getPendingSync();
        return {
            pendingCount: pending.length,
            pendingItems: pending,
            isOnline: navigator.onLine,
            isAuthenticated: window.salesforceAPI && window.salesforceAPI.isAuthenticated(),
            syncInProgress: this.syncInProgress
        };
    }

    /**
     * Register background sync (if supported)
     */
    async registerBackgroundSync() {
        if ('sync' in self.registration) {
            try {
                await self.registration.sync.register('sync-routines');
                console.log('Background sync registered');
            } catch (e) {
                console.error('Background sync registration failed:', e);
            }
        } else {
            console.log('Background sync not supported');
        }
    }
}

// Export singleton instance
const syncManager = new SyncManager();

// Listen for online event to trigger sync
window.addEventListener('online', async () => {
    console.log('Network connection restored - triggering sync');
    await syncManager.syncAll();
});

// Periodic sync every 5 minutes if online and authenticated
setInterval(async () => {
    if (navigator.onLine && window.salesforceAPI && window.salesforceAPI.isAuthenticated()) {
        await syncManager.syncAll();
    }
}, 5 * 60 * 1000);

// Make available globally
window.syncManager = syncManager;
