const VISITORS_KEY = 'visitors';

export interface VisitorData {
  id: string;
  ip: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timestamp: number;
  isBlocked: boolean;
  operatingSystem?: string;
  browser?: string;
  browserVersion?: string; // New field for browser version
  device?: string;
  deviceType?: string; // New field for more specific device type
  model?: string; // New field for device model
}

export interface LocationData {
  ip: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
}

export async function getVisitorLocation(): Promise<LocationData> {
  // This would typically call a real IP geolocation API
  // For demo purposes, we'll generate random data
  const cities = [
    { city: "New York", country: "United States", lat: 40.7128, lng: -74.0060 },
    { city: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278 },
    { city: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
    { city: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
    { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
    { city: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729 }
  ];
  
  // Random IP generation for demo
  const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  
  // Pick a random city
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  
  // Add some randomness to coordinates for variety
  const latitude = randomCity.lat + (Math.random() * 2 - 1);
  const longitude = randomCity.lng + (Math.random() * 2 - 1);

  return {
    ip,
    city: randomCity.city,
    country: randomCity.country,
    latitude,
    longitude
  };
}

export function saveVisitor(visitorData: VisitorData): void {
  // Get existing visitors
  const visitors = getVisitorsList();
  
  // Add new visitor
  visitors.push(visitorData);
  
  // Save to local storage
  localStorage.setItem(VISITORS_KEY, JSON.stringify(visitors));
}

export function getVisitorsList(): VisitorData[] {
  const storedVisitors = localStorage.getItem(VISITORS_KEY);
  return storedVisitors ? JSON.parse(storedVisitors) : [];
}

export function blockVisitor(visitorId: string): void {
  const visitors = getVisitorsList();
  const updatedVisitors = visitors.map(visitor =>
    visitor.id === visitorId ? { ...visitor, isBlocked: true } : visitor
  );
  localStorage.setItem(VISITORS_KEY, JSON.stringify(updatedVisitors));
}

export function unblockVisitor(visitorId: string): void {
  const visitors = getVisitorsList();
  const updatedVisitors = visitors.map(visitor =>
    visitor.id === visitorId ? { ...visitor, isBlocked: false } : visitor
  );
  localStorage.setItem(VISITORS_KEY, JSON.stringify(updatedVisitors));
}
