import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import { EngineerSyncItem } from '../types/database';

const OFFLINE_QUEUE_STORAGE_KEY = '@SUNPULSE_engineer_offline_queue';

export const syncService = {
  /**
   * Enqueue an item locally on the mobile device when working offline
   */
  async enqueueOfflineItem(item: {
    syncType: EngineerSyncItem['sync_type'];
    projectId?: string;
    payload: Record<string, unknown>;
  }): Promise<void> {
    const existingQueue = await this.getLocalQueue();
    const newItem: EngineerSyncItem = {
      id: `local-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      engineer_id: (await supabase.auth.getUser()).data.user?.id || 'offline-engineer',
      client_timestamp: new Date().toISOString(),
      sync_type: item.syncType,
      project_id: item.projectId || null,
      payload: item.payload,
      status: 'pending',
      synced_at: null,
    };

    const updatedQueue = [newItem, ...existingQueue];
    await AsyncStorage.setItem(OFFLINE_QUEUE_STORAGE_KEY, JSON.stringify(updatedQueue));
  },

  /**
   * Read locally queued pending uploads
   */
  async getLocalQueue(): Promise<EngineerSyncItem[]> {
    try {
      const data = await AsyncStorage.getItem(OFFLINE_QUEUE_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  /**
   * Process and synchronize local offline queue to Supabase database
   */
  async syncQueueToCloud(onProgress?: (progressPct: number) => void): Promise<{
    syncedCount: number;
    failedCount: number;
  }> {
    const queue = await this.getLocalQueue();
    if (queue.length === 0) return { syncedCount: 0, failedCount: 0 };

    let synced = 0;
    let failed = 0;
    const remainingQueue: EngineerSyncItem[] = [];

    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      try {
        const { error } = await supabase.from('engineer_sync_queue').insert({
          engineer_id: item.engineer_id,
          client_timestamp: item.client_timestamp,
          sync_type: item.sync_type,
          project_id: item.project_id,
          payload: item.payload,
          status: 'synced',
          synced_at: new Date().toISOString(),
        });

        if (error) throw error;
        synced++;
      } catch (err) {
        console.warn(`Failed to sync item ${item.id}:`, err);
        failed++;
        remainingQueue.push(item);
      }

      if (onProgress) {
        onProgress(Math.round(((i + 1) / queue.length) * 100));
      }
    }

    // Save remaining unsynced items back to local storage
    await AsyncStorage.setItem(OFFLINE_QUEUE_STORAGE_KEY, JSON.stringify(remainingQueue));
    return { syncedCount: synced, failedCount: failed };
  },

  /**
   * Clear local queue
   */
  async clearLocalQueue(): Promise<void> {
    await AsyncStorage.removeItem(OFFLINE_QUEUE_STORAGE_KEY);
  },
};
