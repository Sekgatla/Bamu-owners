// =============================================
// BAMU OWNERS — STORAGE MODULE
// Full CRUD operations for all entities
// =============================================

export function generateId(prefix = 'id') {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
}

// ---- CUSTOMERS ----
export function getCustomers() {
  try { return JSON.parse(localStorage.getItem('bamu_customers') || '[]'); }
  catch { return []; }
}

export function findCustomerById(id) {
  return getCustomers().find(c => c.id === id) || null;
}

export function findCustomerByEmail(email) {
  return getCustomers().find(c => c.email.toLowerCase() === email.toLowerCase()) || null;
}

export function addCustomer(data) {
  const customers = getCustomers();
  const newCustomer = { id: generateId('c'), createdAt: new Date().toISOString(), ...data };
  customers.push(newCustomer);
  localStorage.setItem('bamu_customers', JSON.stringify(customers));
  return newCustomer;
}

export function updateCustomer(id, data) {
  const customers = getCustomers();
  const idx = customers.findIndex(c => c.id === id);
  if (idx !== -1) {
    customers[idx] = { ...customers[idx], ...data };
    localStorage.setItem('bamu_customers', JSON.stringify(customers));
    return customers[idx];
  }
  return null;
}

export function deleteCustomer(id) {
  const customers = getCustomers().filter(c => c.id !== id);
  localStorage.setItem('bamu_customers', JSON.stringify(customers));
}

// ---- VEHICLES ----
export function getVehicles() {
  try { return JSON.parse(localStorage.getItem('bamu_vehicles') || '[]'); }
  catch { return []; }
}

export function getVehicleById(id) {
  return getVehicles().find(v => v.id === id) || null;
}

export function addVehicle(data) {
  const vehicles = getVehicles();
  const newVehicle = {
    id: generateId('v'),
    lat: -26.2041,
    lng: 28.0473,
    speed: 0,
    battery: 100,
    status: 'offline',
    lastSeen: null,
    odometer: 0,
    ...data
  };
  vehicles.push(newVehicle);
  localStorage.setItem('bamu_vehicles', JSON.stringify(vehicles));
  return newVehicle;
}

export function updateVehicle(id, data) {
  const vehicles = getVehicles();
  const idx = vehicles.findIndex(v => v.id === id);
  if (idx !== -1) {
    vehicles[idx] = { ...vehicles[idx], ...data };
    localStorage.setItem('bamu_vehicles', JSON.stringify(vehicles));
    return vehicles[idx];
  }
  return null;
}

export function deleteVehicle(id) {
  const vehicles = getVehicles().filter(v => v.id !== id);
  localStorage.setItem('bamu_vehicles', JSON.stringify(vehicles));
}

// ---- TRACKERS ----
export function getTrackers() {
  try { return JSON.parse(localStorage.getItem('bamu_trackers') || '[]'); }
  catch { return []; }
}

export function getTrackerById(id) {
  return getTrackers().find(t => t.id === id) || null;
}

export function addTracker(data) {
  const trackers = getTrackers();
  const newTracker = {
    id: generateId('t'),
    brand: 'Vo',
    vehicleId: null,
    status: 'unassigned',
    battery: 100,
    lastPing: null,
    ...data
  };
  trackers.push(newTracker);
  localStorage.setItem('bamu_trackers', JSON.stringify(trackers));
  return newTracker;
}

export function updateTracker(id, data) {
  const trackers = getTrackers();
  const idx = trackers.findIndex(t => t.id === id);
  if (idx !== -1) {
    trackers[idx] = { ...trackers[idx], ...data };
    localStorage.setItem('bamu_trackers', JSON.stringify(trackers));
    return trackers[idx];
  }
  return null;
}

export function deleteTracker(id) {
  const trackers = getTrackers().filter(t => t.id !== id);
  localStorage.setItem('bamu_trackers', JSON.stringify(trackers));
}

// ---- ALERTS ----
export function getAlerts() {
  try { return JSON.parse(localStorage.getItem('bamu_alerts') || '[]'); }
  catch { return []; }
}

export function addAlert(data) {
  const alerts = getAlerts();
  const newAlert = {
    id: generateId('a'),
    timestamp: new Date().toISOString(),
    read: false,
    ...data
  };
  alerts.push(newAlert);
  localStorage.setItem('bamu_alerts', JSON.stringify(alerts));
  return newAlert;
}

export function markAlertRead(alertId) {
  const alerts = getAlerts();
  const idx = alerts.findIndex(a => a.id === alertId);
  if (idx !== -1) {
    alerts[idx].read = true;
    localStorage.setItem('bamu_alerts', JSON.stringify(alerts));
  }
}

export function markAllAlertsRead() {
  const alerts = getAlerts().map(a => ({ ...a, read: true }));
  localStorage.setItem('bamu_alerts', JSON.stringify(alerts));
}

export function deleteAlert(alertId) {
  const alerts = getAlerts().filter(a => a.id !== alertId);
  localStorage.setItem('bamu_alerts', JSON.stringify(alerts));
}

// ---- TRIPS ----
export function getTrips() {
  try { return JSON.parse(localStorage.getItem('bamu_trips') || '[]'); }
  catch { return []; }
}

export function getTripsByVehicle(vehicleId) {
  return getTrips().filter(t => t.vehicleId === vehicleId);
}

export function addTrip(data) {
  const trips = getTrips();
  const newTrip = { id: generateId('tr'), ...data };
  trips.push(newTrip);
  localStorage.setItem('bamu_trips', JSON.stringify(trips));
  return newTrip;
}

// ---- SESSION ----
export function getSession() {
  try { return JSON.parse(localStorage.getItem('bamu_session') || 'null'); }
  catch { return null; }
}

// =============================================
// SEED DATA — initialise if not present
// =============================================
(function seedData() {
  if (localStorage.getItem('bamu_customers')) return; // already seeded

  const now = new Date();
  const iso = (d) => d.toISOString();
  const ago = (mins) => new Date(now.getTime() - mins * 60 * 1000).toISOString();

  const customers = [
    { id: 'c1', name: 'Thabo Nkosi', email: 'thabo@bamu.co.za', password: 'pass1234', phone: '+27 71 234 5678', vehicleId: 'v1', createdAt: '2025-01-15T08:00:00Z' },
    { id: 'c2', name: 'Lerato Dlamini', email: 'lerato@bamu.co.za', password: 'pass1234', phone: '+27 82 345 6789', vehicleId: 'v2', createdAt: '2025-02-10T09:00:00Z' },
  ];

  const vehicles = [
    { id: 'v1', customerId: 'c1', make: 'Toyota', model: 'Fortuner', year: 2022, plate: 'GP 123-456', color: 'Pearl White', trackerId: 't1', lat: -25.9344, lng: 28.0147, speed: 0, battery: 87, status: 'parked', lastSeen: iso(now), odometer: 45280 },
    { id: 'v2', customerId: 'c2', make: 'Ford', model: 'Ranger', year: 2021, plate: 'JHB 789-012', color: 'Silver', trackerId: 't2', lat: -26.1053, lng: 28.1053, speed: 72, battery: 64, status: 'moving', lastSeen: iso(now), odometer: 62150 },
    { id: 'v3', customerId: null, make: 'VW', model: 'Polo', year: 2023, plate: 'NW 456-789', color: 'Blue', trackerId: null, lat: -25.7463, lng: 28.1883, speed: 0, battery: 0, status: 'offline', lastSeen: null, odometer: 12000 },
  ];

  const trackers = [
    { id: 't1', serialNumber: 'VO-2024-A001', brand: 'Vo', imei: '356938035643801', simNumber: '+27 71 900 0001', powerSource: 'hardwired', battery: null, vehicleId: 'v1', status: 'online', installDate: '2024-02-10', lastPing: iso(now) },
    { id: 't2', serialNumber: 'VO-2024-A002', brand: 'Vo', imei: '356938035643802', simNumber: '+27 71 900 0002', powerSource: 'hardwired', battery: null, vehicleId: 'v2', status: 'online', installDate: '2024-03-15', lastPing: iso(now) },
    { id: 't3', serialNumber: 'VO-2024-A003', brand: 'Vo', imei: '356938035643803', simNumber: '+27 71 900 0003', powerSource: 'battery',   battery: 78,   vehicleId: null, status: 'unassigned', installDate: null, lastPing: null },
    { id: 't4', serialNumber: 'VO-2024-A004', brand: 'Vo', imei: '356938035643804', simNumber: '+27 71 900 0004', powerSource: 'obd',       battery: null, vehicleId: null, status: 'unassigned', installDate: null, lastPing: null },
  ];

  const alerts = [
    { id: 'a1', vehicleId: 'v1', customerId: 'c1', type: 'hijack-zone', message: 'Vehicle entered high-risk hijacking zone near Diepsloot', lat: -25.9344, lng: 28.0147, timestamp: ago(30), read: false },
    { id: 'a2', vehicleId: 'v2', customerId: 'c2', type: 'speeding', message: 'Speed alert: 72km/h in 60km/h zone', lat: -26.1053, lng: 28.1053, timestamp: ago(90), read: false },
    { id: 'a3', vehicleId: 'v2', customerId: 'c2', type: 'stolen-zone', message: 'Vehicle entered stolen vehicle recovery zone — East Rand', lat: -26.2305, lng: 28.2205, timestamp: ago(1440), read: true },
  ];

  const trips = [
    { id: 'tr1', vehicleId: 'v1', customerId: 'c1', startTime: ago(1440), endTime: ago(1320), startLat: -25.7463, startLng: 28.1883, endLat: -25.9344, endLng: 28.0147, distance: 34.2, maxSpeed: 120, avgSpeed: 78 },
    { id: 'tr2', vehicleId: 'v1', customerId: 'c1', startTime: ago(2880), endTime: ago(2736), startLat: -25.9344, startLng: 28.0147, endLat: -26.2041, endLng: 28.0473, distance: 28.7, maxSpeed: 110, avgSpeed: 65 },
    { id: 'tr3', vehicleId: 'v2', customerId: 'c2', startTime: ago(1440), endTime: ago(1380), startLat: -26.1053, startLng: 28.1053, endLat: -26.2672, endLng: 27.8584, distance: 47.5, maxSpeed: 130, avgSpeed: 85 },
  ];

  localStorage.setItem('bamu_customers', JSON.stringify(customers));
  localStorage.setItem('bamu_vehicles', JSON.stringify(vehicles));
  localStorage.setItem('bamu_trackers', JSON.stringify(trackers));
  localStorage.setItem('bamu_alerts', JSON.stringify(alerts));
  localStorage.setItem('bamu_trips', JSON.stringify(trips));
})();
