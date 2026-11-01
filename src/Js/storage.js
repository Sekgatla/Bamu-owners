import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ==========================================
// SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL = 'https://zvousarubsyosygkperm.supabase.co';

const SUPABASE_KEY =
  'sb_publishable_95JNm4Kk1dlQnUR7N0D_9A_Wby2MlET';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ==========================================
// AUTHENTICATION
// ==========================================

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;

  return data.user;
}


export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    window.location.href = './admin-login.html';
    return null;
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, full_name, role')
    .eq('id', user.id)
    .single();

  if (error || !profile || profile.role !== 'admin') {
    await supabase.auth.signOut();

    window.location.href = './admin-login.html';
    return null;
  }

  return profile;
}


export async function adminLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;

  window.location.href = './admin-login.html';
}


// ==========================================
// CUSTOMERS
// ==========================================

export async function getCustomers() {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data || [];
}


export async function findCustomerById(id) {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}


export async function addCustomer(customer) {
  const { data, error } = await supabase
    .from('customers')
    .insert([customer])
    .select()
    .single();

  if (error) throw error;

  return data;
}


export async function updateCustomer(id, updates) {
  const { data, error } = await supabase
    .from('customers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
}


export async function deleteCustomer(id) {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);

  if (error) throw error;
}


// ==========================================
// VEHICLES
// ==========================================

export async function getVehicles() {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data || [];
}


export async function addVehicle(vehicle) {
  const { data, error } = await supabase
    .from('vehicles')
    .insert([vehicle])
    .select()
    .single();

  if (error) throw error;

  return data;
}


export async function updateVehicle(id, updates) {
  const { data, error } = await supabase
    .from('vehicles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
}


export async function deleteVehicle(id) {
  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', id);

  if (error) throw error;
}


// ==========================================
// TRACKERS
// ==========================================

export async function getTrackers() {
  const { data, error } = await supabase
    .from('trackers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data || [];
}


export async function getTrackerById(id) {
  const { data, error } = await supabase
    .from('trackers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}


export async function addTracker(tracker) {
  const { data, error } = await supabase
    .from('trackers')
    .insert([tracker])
    .select()
    .single();

  if (error) throw error;

  return data;
}


export async function updateTracker(id, updates) {
  const { data, error } = await supabase
    .from('trackers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
}


export async function deleteTracker(id) {
  const { error } = await supabase
    .from('trackers')
    .delete()
    .eq('id', id);

  if (error) throw error;
}


// ==========================================
// ALERTS
// ==========================================

export async function getAlerts() {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data || [];
}


export async function markAlertAsRead(id) {
  const { data, error } = await supabase
    .from('alerts')
    .update({ is_read: true })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
}


// ==========================================
// VEHICLE POSITIONS
// ==========================================

export async function getVehiclePositions(vehicleId = null) {
  let query = supabase
    .from('vehicle_positions')
    .select('*')
    .order('recorded_at', { ascending: false });

  if (vehicleId) {
    query = query.eq('vehicle_id', vehicleId);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data || [];
}


// ==========================================
// TRIP HISTORY
// ==========================================

export async function getTrips(vehicleId = null) {
  let query = supabase
    .from('trips')
    .select('*')
    .order('started_at', { ascending: false });

  if (vehicleId) {
    query = query.eq('vehicle_id', vehicleId);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data || [];
}


// ==========================================
// DASHBOARD STATISTICS
// ==========================================

export async function getDashboardStats() {
  const [
    customers,
    vehicles,
    trackers,
    alerts
  ] = await Promise.all([
    getCustomers(),
    getVehicles(),
    getTrackers(),
    getAlerts()
  ]);

  return {
    totalCustomers: customers.length,
    totalVehicles: vehicles.length,
    totalTrackers: trackers.length,
    activeTrackers: trackers.filter(
      tracker => tracker.status === 'active'
    ).length,
    unreadAlerts: alerts.filter(
      alert => !alert.is_read
    ).length,
    onlineVehicles: vehicles.filter(
      vehicle => vehicle.status === 'online'
    ).length,
    customers,
    vehicles,
    trackers,
    alerts
  };
}
