// KisanProcure Central Reactive Store & LocalStorage Persistence
// Enhanced with Dynamic Geolocation Engine, Real-time Distance & Multi-Farmer Tracking

const STORAGE_KEY = 'kisanprocure_state_v2';
const USER_KEY = 'kp-user-v2';
const LANG_KEY = 'kp-lang-v2';

// --- Geodetic & Distance Utility Functions ---
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) return 5.0;
  const R = 6371; // Earth's radius in km
  const dLat = (Number(lat2) - Number(lat1)) * Math.PI / 180;
  const dLon = (Number(lon2) - Number(lon1)) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(Number(lat1) * Math.PI / 180) * Math.cos(Number(lat2) * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

function calculateETA(distanceKm) {
  // Average tractor/tempo speed in rural & semi-urban roads ~26 km/h + 5 min checkpost buffer
  const timeHours = (Number(distanceKm) || 1) / 26;
  const minutes = Math.round(timeHours * 60) + 5;
  return Math.max(5, minutes);
}

// Global Presets for major agricultural regions
const LOCATION_PRESETS = [
  { name: 'Indore Mandi Region', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577 },
  { name: 'Dewas APMC Belt', state: 'Madhya Pradesh', lat: 22.9676, lng: 76.0534 },
  { name: 'Ujjain Krishi Zone', state: 'Madhya Pradesh', lat: 23.1765, lng: 75.7885 },
  { name: 'Bhopal State Mandi', state: 'Madhya Pradesh', lat: 23.2599, lng: 77.4126 },
  { name: 'Nashik Onion & Grain Hub', state: 'Maharashtra', lat: 19.9975, lng: 73.7898 },
  { name: 'Karnal Grain Market', state: 'Haryana', lat: 29.6857, lng: 76.9905 },
  { name: 'Ludhiana Central APMC', state: 'Punjab', lat: 30.9010, lng: 75.8573 },
  { name: 'Jaipur Krishi Upaj Mandi', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  { name: 'Guntur Mirchi & Cotton Yard', state: 'Andhra Pradesh', lat: 16.3067, lng: 80.4365 },
  { name: 'Varanasi Kisan Mandi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739 },
  { name: 'Bengaluru APMC Yard (Yeshwanthpur)', state: 'Karnataka', lat: 13.0280, lng: 77.5409 }
];

function generateNearbyCenters(userLat, userLng, locationName = 'Indore, Madhya Pradesh') {
  const shortCity = locationName.split(',')[0].trim();
  
  const centerTemplates = [
    {
      id: 'center-1',
      name: `${shortCity} Primary Procurement Center`,
      code: `${shortCity.slice(0, 3).toUpperCase()}-PR-01`,
      locationSuffix: 'Bypass Highway Link',
      dLat: 0.028,
      dLng: 0.034,
      queue: 3,
      waitMinutes: 15,
      availableSlots: 8,
      crowd: 'LOW',
      counters: 3,
      phone: '+91 7272 254100',
      manager: 'Arjun Rao (Center Head)',
      operatingHours: '08:00 AM – 06:00 PM',
      facilities: ['Electronic 60T Weighbridge', 'Grain Moisture Lab', 'Direct DBT Counter', 'Covered Storage Yard']
    },
    {
      id: 'center-2',
      name: `${shortCity} Mandi Hub & Silo Complex`,
      code: `${shortCity.slice(0, 3).toUpperCase()}-MH-04`,
      locationSuffix: 'Agro Industrial Corridor',
      dLat: 0.065,
      dLng: -0.038,
      queue: 28,
      waitMinutes: 55,
      availableSlots: 3,
      crowd: 'HIGH',
      counters: 4,
      phone: '+91 731 289422',
      manager: 'Vikram Solanki',
      operatingHours: '07:30 AM – 07:00 PM',
      facilities: ['Dual Automated Scales', 'Govt Grading Lab', 'Farmer Rest Shed', 'Subsidized Canteen']
    },
    {
      id: 'center-3',
      name: `${shortCity} Krishi Bhavan & Warehouse`,
      code: `${shortCity.slice(0, 3).toUpperCase()}-KB-02`,
      locationSuffix: 'Central Warehouse Ring',
      dLat: -0.078,
      dLng: 0.056,
      queue: 14,
      waitMinutes: 35,
      availableSlots: 6,
      crowd: 'MEDIUM',
      counters: 3,
      phone: '+91 734 251108',
      manager: 'Sunil Joshi',
      operatingHours: '08:00 AM – 05:30 PM',
      facilities: ['Rapid Sampling Counter', 'State Warehouse Direct Link', 'MSP Grievance Cell']
    },
    {
      id: 'center-4',
      name: `${shortCity} Sub-Yard & PACS Kendra`,
      code: `${shortCity.slice(0, 3).toUpperCase()}-SY-09`,
      locationSuffix: 'Rural Cooperative Link',
      dLat: -0.052,
      dLng: -0.074,
      queue: 5,
      waitMinutes: 20,
      availableSlots: 7,
      crowd: 'LOW',
      counters: 2,
      phone: '+91 732 233019',
      manager: 'Rajendra Verma',
      operatingHours: '08:30 AM – 05:00 PM',
      facilities: ['Digital Platform Scale', 'FAQ Moisture Meter', 'Instant Settlement Voucher Desk']
    }
  ];

  return centerTemplates.map(t => {
    const cLat = Number((userLat + t.dLat).toFixed(4));
    const cLng = Number((userLng + t.dLng).toFixed(4));
    const dist = calculateDistance(userLat, userLng, cLat, cLng);
    const eta = calculateETA(dist);
    return {
      id: t.id,
      name: t.name,
      code: t.code,
      location: `${shortCity} ${t.locationSuffix}`,
      coordinates: { lat: cLat, lng: cLng },
      distance: dist,
      etaMinutes: eta,
      queue: t.queue,
      waitMinutes: t.waitMinutes,
      availableSlots: t.availableSlots,
      crowd: t.crowd,
      counters: t.counters,
      phone: t.phone,
      manager: t.manager,
      operatingHours: t.operatingHours,
      facilities: t.facilities
    };
  }).sort((a, b) => a.distance - b.distance);
}

function generateNearbyFarmers(userLat, userLng, centers) {
  const c1 = centers[0] || { id: 'center-1', name: 'Primary Procurement Center', coordinates: { lat: userLat + 0.028, lng: userLng + 0.034 } };
  const c2 = centers[1] || c1;

  const f1Coords = { lat: Number((userLat + 0.016).toFixed(4)), lng: Number((userLng + 0.019).toFixed(4)) };
  const f2Coords = { lat: Number((userLat + 0.042).toFixed(4)), lng: Number((userLng - 0.015).toFixed(4)) };
  const f3Coords = { lat: Number((userLat + 0.025).toFixed(4)), lng: Number((userLng + 0.031).toFixed(4)) };
  const f4Coords = { lat: Number((userLat + 0.052).toFixed(4)), lng: Number((userLng - 0.031).toFixed(4)) };
  const f5Coords = { lat: Number((userLat - 0.038).toFixed(4)), lng: Number((userLng + 0.022).toFixed(4)) };

  return [
    {
      id: 'f-1',
      name: 'Rameshwar Singh',
      farmerId: 'KSP-F-1102',
      village: 'Gram Panchayat East',
      crop: 'Soybean',
      quantity: 18,
      token: 'K-048',
      centerId: c1.id,
      centerName: c1.name,
      coordinates: f1Coords,
      status: 'IN_QUEUE',
      queuePosition: 2,
      distanceToCenter: calculateDistance(f1Coords.lat, f1Coords.lng, c1.coordinates.lat, c1.coordinates.lng),
      etaMinutes: calculateETA(calculateDistance(f1Coords.lat, f1Coords.lng, c1.coordinates.lat, c1.coordinates.lng)),
      updatedAt: '2 mins ago'
    },
    {
      id: 'f-2',
      name: 'Dinesh Gurjar',
      farmerId: 'KSP-F-3341',
      village: 'Kisan Vihar Sector 2',
      crop: 'Mustard',
      quantity: 12,
      token: 'K-049',
      centerId: c1.id,
      centerName: c1.name,
      coordinates: f2Coords,
      status: 'EN_ROUTE',
      queuePosition: 3,
      distanceToCenter: calculateDistance(f2Coords.lat, f2Coords.lng, c1.coordinates.lat, c1.coordinates.lng),
      etaMinutes: calculateETA(calculateDistance(f2Coords.lat, f2Coords.lng, c1.coordinates.lat, c1.coordinates.lng)),
      updatedAt: '5 mins ago'
    },
    {
      id: 'f-3',
      name: 'Kailash Meena',
      farmerId: 'KSP-F-0914',
      village: 'Krishi Nagar Block A',
      crop: 'Wheat',
      quantity: 32,
      token: 'K-044',
      centerId: c1.id,
      centerName: c1.name,
      coordinates: f3Coords,
      status: 'PAYMENT_COMPLETED',
      queuePosition: 0,
      distanceToCenter: calculateDistance(f3Coords.lat, f3Coords.lng, c1.coordinates.lat, c1.coordinates.lng),
      etaMinutes: 0,
      updatedAt: 'Just now'
    },
    {
      id: 'f-4',
      name: 'Sunita Bai Dhakad',
      farmerId: 'KSP-F-4120',
      village: 'Samiti Tehsil North',
      crop: 'Wheat',
      quantity: 22,
      token: 'K-052',
      centerId: c2.id,
      centerName: c2.name,
      coordinates: f4Coords,
      status: 'IN_INSPECTION',
      queuePosition: 1,
      distanceToCenter: calculateDistance(f4Coords.lat, f4Coords.lng, c2.coordinates.lat, c2.coordinates.lng),
      etaMinutes: 8,
      updatedAt: '4 mins ago'
    },
    {
      id: 'f-5',
      name: 'Bhagwan Patel',
      farmerId: 'KSP-F-1875',
      village: 'Ghatia Kalan Gram',
      crop: 'Gram (Chana)',
      quantity: 15,
      token: 'K-055',
      centerId: c2.id,
      centerName: c2.name,
      coordinates: f5Coords,
      status: 'EN_ROUTE',
      queuePosition: 4,
      distanceToCenter: calculateDistance(f5Coords.lat, f5Coords.lng, c2.coordinates.lat, c2.coordinates.lng),
      etaMinutes: calculateETA(calculateDistance(f5Coords.lat, f5Coords.lng, c2.coordinates.lat, c2.coordinates.lng)),
      updatedAt: '7 mins ago'
    }
  ];
}

// Global Master Data for MSP & Crop Markets
const CROP_MASTER_DATA = {
  'Wheat': {
    name: 'Wheat',
    msp: 2275,
    basePrice: 2275,
    typicalPriceRange: [2275, 2520],
    variety: 'HD 2967 (Sharbati)',
    season: 'Rabi',
    unit: 'quintal',
    icon: '🌾'
  },
  'Soybean': {
    name: 'Soybean',
    msp: 4892,
    basePrice: 4892,
    typicalPriceRange: [4750, 5200],
    variety: 'JS 95-60 (Yellow)',
    season: 'Kharif',
    unit: 'quintal',
    icon: '🌱'
  },
  'Mustard': {
    name: 'Mustard',
    msp: 5650,
    basePrice: 5650,
    typicalPriceRange: [5500, 6100],
    variety: 'Pusa Bold (Black)',
    season: 'Rabi',
    unit: 'quintal',
    icon: '🌼'
  },
  'Gram (Chana)': {
    name: 'Gram (Chana)',
    msp: 5440,
    basePrice: 5440,
    typicalPriceRange: [5300, 5850],
    variety: 'Desi Chana (JG 11)',
    season: 'Rabi',
    unit: 'quintal',
    icon: '🫘'
  },
  'Paddy': {
    name: 'Paddy',
    msp: 2320,
    basePrice: 2320,
    typicalPriceRange: [2280, 2600],
    variety: 'Basmati / Common Grade A',
    season: 'Kharif',
    unit: 'quintal',
    icon: '🌾'
  },
  'Cotton': {
    name: 'Cotton',
    msp: 7121,
    basePrice: 7121,
    typicalPriceRange: [7000, 7850],
    variety: 'Medium / Long Staple Bt-2',
    season: 'Kharif',
    unit: 'quintal',
    icon: '☁️'
  },
  'Maize': {
    name: 'Maize',
    msp: 2225,
    basePrice: 2225,
    typicalPriceRange: [2150, 2450],
    variety: 'Hybrid Yellow Corn',
    season: 'Kharif',
    unit: 'quintal',
    icon: '🌽'
  },
  'Groundnut': {
    name: 'Groundnut',
    msp: 6783,
    basePrice: 6783,
    typicalPriceRange: [6600, 7350],
    variety: 'Bold Pods (TG 37A)',
    season: 'Kharif',
    unit: 'quintal',
    icon: '🥜'
  },
  'Onion': {
    name: 'Onion',
    msp: 1850,
    basePrice: 1850,
    typicalPriceRange: [1600, 2300],
    variety: 'Nashik Red / Agri-Found Dark Red',
    season: 'Rabi',
    unit: 'quintal',
    icon: '🧅'
  }
};

function generateNearbyMarkets(userLat, userLng, locationName = 'Indore, Madhya Pradesh', cropName = 'Wheat') {
  const shortCity = locationName.split(',')[0].trim();
  const cropInfo = CROP_MASTER_DATA[cropName] || CROP_MASTER_DATA['Wheat'];
  const msp = cropInfo.msp;

  const marketTemplates = [
    {
      id: 'mkt-primary-center',
      name: `${shortCity} Primary Govt Procurement Center`,
      type: 'GOVT_MSP',
      typeLabel: 'Govt MSP Procurement Kendra',
      location: `${shortCity} Bypass Link Highway`,
      dLat: 0.028,
      dLng: 0.034,
      priceOffset: 0, // Direct MSP
      priceSource: 'Government MSP Portal (Rabi 2025/26)',
      lastUpdated: 'Today, 09:00 AM',
      otherCostsPerQtl: 0, // Zero mandi cess at Govt centers
      badge: 'Zero Mandi Fee • 100% DBT',
      trustScore: '5.0 ★ Govt Verified',
      isDirectGovt: true
    },
    {
      id: 'mkt-central-apmc',
      name: `${shortCity} Central APMC Krishi Upaj Mandi`,
      type: 'APMC_MANDI',
      typeLabel: 'Regulated Main APMC Yard',
      location: `${shortCity} Main Market Yard, Sector 4`,
      dLat: 0.065,
      dLng: -0.038,
      priceOffset: Math.round(msp * 0.064), // ~6.4% above MSP
      priceSource: 'Agmarknet APMC Live Auction Feed',
      lastUpdated: 'Today, 11:45 AM',
      otherCostsPerQtl: 18, // ₹18/qtl mandi cess + weighing
      badge: 'Live Open Auction',
      trustScore: '4.8 ★ Regulated',
      isDirectGovt: false
    },
    {
      id: 'mkt-regional-agro-terminal',
      name: `${shortCity} Agro Silo Complex & Terminal Hub`,
      type: 'AGRO_TERMINAL',
      typeLabel: 'Modern Silo & Agro Terminal',
      location: `${shortCity} Agro Industrial Ring Road`,
      dLat: 0.125,
      dLng: 0.088,
      priceOffset: Math.round(msp * 0.095), // ~9.5% above MSP
      priceSource: 'e-NAM National Spot Exchange',
      lastUpdated: 'Today, 01:15 PM',
      otherCostsPerQtl: 12, // ₹12/qtl bulk terminal handling
      badge: 'e-NAM Spot Verified',
      trustScore: '4.9 ★ Fast Weighment',
      isDirectGovt: false
    },
    {
      id: 'mkt-cooperative-pacs',
      name: `${shortCity} PACS Cooperative Farmers Kendra`,
      type: 'PACS_COOP',
      typeLabel: 'Farmer Cooperative PAC Society',
      location: `${shortCity} Gram Panchayat Sub-Yard`,
      dLat: -0.042,
      dLng: -0.051,
      priceOffset: Math.round(msp * 0.02), // ~2% above MSP
      priceSource: 'State Cooperative Federation Desk',
      lastUpdated: 'Today, 10:30 AM',
      otherCostsPerQtl: 5, // ₹5/qtl coop cess
      badge: 'Village Level Center',
      trustScore: '4.7 ★ Cooperative',
      isDirectGovt: false
    },
    {
      id: 'mkt-neighboring-mandi',
      name: `${shortCity} North Regional Krishi Hub`,
      type: 'APMC_MANDI',
      typeLabel: 'Regional High-Demand APMC Mandi',
      location: `${shortCity} Outer Expressway Corridor`,
      dLat: -0.165,
      dLng: 0.142,
      priceOffset: Math.round(msp * 0.12), // ~12% above MSP
      priceSource: 'Agmarknet Regional Mandi Daily Dispatch',
      lastUpdated: 'Today, 12:30 PM',
      otherCostsPerQtl: 22, // ₹22/qtl cess + unloading
      badge: 'High Bulk Demand',
      trustScore: '4.6 ★ High Liquidity',
      isDirectGovt: false
    }
  ];

  return marketTemplates.map(t => {
    const cLat = Number((userLat + t.dLat).toFixed(4));
    const cLng = Number((userLng + t.dLng).toFixed(4));
    const dist = calculateDistance(userLat, userLng, cLat, cLng);
    const eta = calculateETA(dist);
    const pricePerQtl = Math.max(msp, msp + t.priceOffset);

    return {
      id: t.id,
      name: t.name,
      type: t.type,
      typeLabel: t.typeLabel,
      location: t.location,
      coordinates: { lat: cLat, lng: cLng },
      distance: dist,
      etaMinutes: eta,
      crop: cropName,
      pricePerQtl: pricePerQtl,
      msp: msp,
      priceDifference: pricePerQtl - msp,
      priceSource: t.priceSource,
      lastUpdated: t.lastUpdated,
      otherCostsPerQtl: t.otherCostsPerQtl,
      badge: t.badge,
      trustScore: t.trustScore,
      isDirectGovt: t.isDirectGovt,
      isDemoData: true,
      dataDisclaimer: 'Demo Data – Not Live'
    };
  }).sort((a, b) => a.distance - b.distance);
}

function calculateTransportCost(distanceKm, quantityQtl, transportMode = 'tractor') {
  const dist = Number(distanceKm) || 1;
  const qty = Number(quantityQtl) || 10;
  
  if (transportMode === 'truck') {
    // Mini-truck / Commercial 407 (Capacity ~35-50 qtl)
    const trips = Math.ceil(qty / 35);
    const base = 350 * trips;
    const perKm = dist * 6.5 * trips;
    const handling = qty * 10;
    return Math.round(base + perKm + handling);
  } else if (transportMode === 'tempo') {
    // 3-Wheeler / Small Piaggio (Capacity ~15 qtl)
    const trips = Math.ceil(qty / 15);
    const base = 160 * trips;
    const perKm = dist * 4.2 * trips;
    const handling = qty * 6;
    return Math.round(base + perKm + handling);
  } else {
    // Tractor Trolley (Standard Rural default, capacity ~25-30 qtl)
    const trips = Math.ceil(qty / 25);
    const base = 220 * trips;
    const perKm = dist * 4.5 * trips;
    const handling = qty * 8;
    return Math.round(base + perKm + handling);
  }
}

function calculateMarketMetrics(market, quantityQtl = 20, transportMode = 'tractor') {
  const qty = Number(quantityQtl) || 1;
  const sellingPrice = Number(market.pricePerQtl) || 2275;
  const totalSellingValue = Math.round(qty * sellingPrice);
  const transportCost = calculateTransportCost(market.distance, qty, transportMode);
  const otherCosts = Math.round((market.otherCostsPerQtl || 0) * qty);
  const totalDeductions = transportCost + otherCosts;
  const estimatedNetReturn = Math.max(0, totalSellingValue - totalDeductions);
  const netRatePerQtl = Math.round(estimatedNetReturn / qty);
  const mspBaseValue = Math.round(qty * market.msp);
  const netGainOverMsp = estimatedNetReturn - mspBaseValue;

  return {
    ...market,
    quantity: qty,
    transportMode,
    totalSellingValue,
    transportCost,
    otherCosts,
    totalDeductions,
    estimatedNetReturn,
    netRatePerQtl,
    netGainOverMsp
  };
}

function getBestMarketRecommendation(marketsWithMetrics, cropName, quantityQtl) {
  if (!marketsWithMetrics || marketsWithMetrics.length === 0) return null;

  // Sort by highest estimated net return
  const sorted = [...marketsWithMetrics].sort((a, b) => b.estimatedNetReturn - a.estimatedNetReturn);
  const best = sorted[0];
  const nearest = [...marketsWithMetrics].sort((a, b) => a.distance - b.distance)[0];
  const mspCenter = marketsWithMetrics.find(m => m.type === 'GOVT_MSP') || nearest;

  let reason = '';
  if (best.id === nearest.id) {
    reason = `Located nearest to your farm (${best.distance} km). Lower transportation expense (₹${best.transportCost.toLocaleString('en-IN')}) and zero/minimal mandi fee give you the maximum net in-hand return of ₹${best.estimatedNetReturn.toLocaleString('en-IN')} (₹${best.netRatePerQtl}/qtl).`;
  } else {
    const extraProfit = best.estimatedNetReturn - (nearest.estimatedNetReturn || 0);
    const extraDist = Math.round((best.distance - nearest.distance) * 10) / 10;
    reason = `${best.name} offers a higher rate of ₹${best.pricePerQtl.toLocaleString('en-IN')}/qtl (+₹${best.priceDifference}/qtl over MSP). The ₹${(best.totalSellingValue - (nearest.totalSellingValue || 0)).toLocaleString('en-IN')} higher gross selling value easily covers the extra ₹${(best.transportCost - nearest.transportCost).toLocaleString('en-IN')} transport cost for ${extraDist} km, yielding ₹${extraProfit.toLocaleString('en-IN')} higher net profit for ${quantityQtl} quintals.`;
  }

  return {
    bestMarket: best,
    reason,
    allRanked: sorted
  };
}

function getCropPriceTrends(cropName = 'Wheat', timeframe = '30D') {
  const cropInfo = CROP_MASTER_DATA[cropName] || CROP_MASTER_DATA['Wheat'];
  const base = cropInfo.basePrice;

  let days = 30;
  if (timeframe === '7D') days = 7;
  else if (timeframe === '90D') days = 90;

  const points = [];
  const today = new Date('2025-02-18T12:00:00Z');
  const seed = cropName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const wave1 = Math.sin((i + seed) * 0.35) * (base * 0.035);
    const wave2 = Math.cos((i + seed * 2) * 0.18) * (base * 0.02);
    const upwardTrend = ((days - i) / days) * (base * 0.045);
    const dailyPrice = Math.round(base + wave1 + wave2 + upwardTrend);

    const dateLabel = days <= 7 
      ? d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
      : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

    points.push({
      date: dateLabel,
      fullDate: d.toISOString().slice(0, 10),
      price: dailyPrice,
      msp: cropInfo.msp
    });
  }

  const prices = points.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const startPrice = points[0].price;
  const currentPrice = points[points.length - 1].price;
  const changeVal = currentPrice - startPrice;
  const changePct = Number(((changeVal / startPrice) * 100).toFixed(1));

  return {
    crop: cropName,
    timeframe,
    points,
    minPrice,
    maxPrice,
    avgPrice,
    currentPrice,
    changeVal,
    changePct,
    isDemoData: true,
    disclaimer: 'Demo Data – Not Live',
    dataSource: 'Agmarknet APMC Daily Archives & e-NAM Spot Feed'
  };
}

const DEFAULT_LAT = 22.7196;
const DEFAULT_LNG = 75.8577;
const DEFAULT_LOC = 'Indore, Madhya Pradesh';

const initialCenters = generateNearbyCenters(DEFAULT_LAT, DEFAULT_LNG, DEFAULT_LOC);
const initialFarmers = generateNearbyFarmers(DEFAULT_LAT, DEFAULT_LNG, initialCenters);

const INITIAL_STATE = {
  language: 'en',
  locationPresets: LOCATION_PRESETS,
  currentUser: {
    id: 'user-farmer-1',
    name: 'Meera Patil',
    initials: 'MP',
    role: 'FARMER',
    farmerId: 'KSP-MP-2048',
    location: DEFAULT_LOC,
    coordinates: { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
    accuracy: 15,
    isLiveGps: false,
    phone: '+91 98260 12345',
    season: 'Rabi 2025'
  },
  demoUsers: [
    {
      id: 'user-farmer-1',
      name: 'Meera Patil',
      initials: 'MP',
      role: 'FARMER',
      title: 'Farmer',
      farmerId: 'KSP-MP-2048',
      location: DEFAULT_LOC,
      coordinates: { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
      description: 'Book a slot, track your live queue, and view nearest centers on map.',
      path: '/farmer'
    },
    {
      id: 'user-ops-1',
      name: 'Arjun Rao',
      initials: 'AR',
      role: 'PROCUREMENT_OFFICER',
      title: 'Center team',
      centerName: initialCenters[0].name,
      location: initialCenters[0].location,
      coordinates: initialCenters[0].coordinates,
      description: 'Run arrival, inspection, weighment, and procurement from one view.',
      path: '/operations'
    },
    {
      id: 'user-admin-1',
      name: 'Priya Sharma',
      initials: 'PS',
      role: 'ADMIN',
      title: 'Administrator',
      location: 'State Control Room, Bhopal',
      coordinates: { lat: 23.2599, lng: 77.4126 },
      description: 'See network geospatial coverage, active queues, and state procurement metrics.',
      path: '/admin/analytics'
    }
  ],
  crops: [
    {
      id: 'crop-1',
      name: 'Wheat',
      variety: 'HD 2967 (Sharbati)',
      season: 'Rabi',
      area: 4.5,
      expectedQuantity: 45,
      unit: 'quintal',
      arrivalDate: '2025-02-22',
      harvestDate: '2025-02-15',
      status: 'READY'
    },
    {
      id: 'crop-2',
      name: 'Soybean',
      variety: 'JS 95-60',
      season: 'Kharif',
      area: 3.0,
      expectedQuantity: 28,
      unit: 'quintal',
      arrivalDate: '2025-02-28',
      harvestDate: '2025-02-20',
      status: 'READY'
    },
    {
      id: 'crop-3',
      name: 'Mustard',
      variety: 'Pusa Bold',
      season: 'Rabi',
      area: 2.0,
      expectedQuantity: 18,
      unit: 'quintal',
      arrivalDate: '2025-03-05',
      harvestDate: '2025-02-25',
      status: 'READY'
    }
  ],
  centers: initialCenters,
  farmers: initialFarmers,
  slots: [
    { id: 'slot-1', centerId: 'center-1', date: '2025-02-18', startTime: '09:00 AM', endTime: '10:30 AM', available: 2, status: 'OPEN' },
    { id: 'slot-2', centerId: 'center-1', date: '2025-02-18', startTime: '10:30 AM', endTime: '12:00 PM', available: 1, status: 'OPEN' },
    { id: 'slot-3', centerId: 'center-1', date: '2025-02-18', startTime: '12:30 PM', endTime: '02:00 PM', available: 4, status: 'OPEN' },
    { id: 'slot-4', centerId: 'center-1', date: '2025-02-18', startTime: '02:00 PM', endTime: '03:30 PM', available: 3, status: 'OPEN' },
    { id: 'slot-5', centerId: 'center-1', date: '2025-02-18', startTime: '03:30 PM', endTime: '05:00 PM', available: 5, status: 'OPEN' },
    { id: 'slot-6', centerId: 'center-2', date: '2025-02-18', startTime: '10:00 AM', endTime: '11:30 AM', available: 1, status: 'OPEN' },
    { id: 'slot-7', centerId: 'center-2', date: '2025-02-18', startTime: '02:00 PM', endTime: '03:30 PM', available: 2, status: 'OPEN' },
    { id: 'slot-8', centerId: 'center-3', date: '2025-02-18', startTime: '09:30 AM', endTime: '11:00 AM', available: 3, status: 'OPEN' },
    { id: 'slot-9', centerId: 'center-3', date: '2025-02-18', startTime: '01:30 PM', endTime: '03:00 PM', available: 4, status: 'OPEN' },
    { id: 'slot-10', centerId: 'center-4', date: '2025-02-18', startTime: '10:00 AM', endTime: '11:30 AM', available: 5, status: 'OPEN' }
  ],
  bookings: [
    {
      id: 'b-101',
      token: 'K-047',
      farmerName: 'Meera Patil',
      farmerId: 'KSP-MP-2048',
      crop: 'Wheat',
      cropId: 'crop-1',
      quantity: 25,
      unit: 'quintal',
      center: initialCenters[0].name,
      centerId: initialCenters[0].id,
      slot: '10:30 AM – 12:00 PM',
      slotId: 'slot-2',
      date: '2025-02-18',
      status: 'IN_INSPECTION',
      queuePosition: 1,
      waitMinutes: 10,
      qualityGrade: 'A',
      moisture: 11.8,
      foreignMaterial: 0.8,
      grossWeight: 26.2,
      tareWeight: 1.2,
      netWeight: 25.0,
      rate: 2275,
      amount: 56875,
      paymentStatus: 'PENDING',
      paymentRef: null,
      createdAt: '2025-02-18T08:30:00Z'
    },
    {
      id: 'b-102',
      token: 'K-048',
      farmerName: 'Rameshwar Singh',
      farmerId: 'KSP-MP-1102',
      crop: 'Soybean',
      cropId: 'crop-2',
      quantity: 18,
      unit: 'quintal',
      center: initialCenters[0].name,
      centerId: initialCenters[0].id,
      slot: '12:30 PM – 02:00 PM',
      slotId: 'slot-3',
      date: '2025-02-18',
      status: 'ARRIVED',
      queuePosition: 2,
      waitMinutes: 20,
      qualityGrade: null,
      netWeight: null,
      rate: 4892,
      amount: 88056,
      paymentStatus: 'PENDING',
      paymentRef: null,
      createdAt: '2025-02-18T09:10:00Z'
    },
    {
      id: 'b-103',
      token: 'K-049',
      farmerName: 'Dinesh Gurjar',
      farmerId: 'KSP-MP-3341',
      crop: 'Mustard',
      cropId: 'crop-3',
      quantity: 12,
      unit: 'quintal',
      center: initialCenters[0].name,
      centerId: initialCenters[0].id,
      slot: '02:00 PM – 03:30 PM',
      slotId: 'slot-4',
      date: '2025-02-18',
      status: 'BOOKED',
      queuePosition: 3,
      waitMinutes: 35,
      qualityGrade: null,
      netWeight: null,
      rate: 5650,
      amount: 67800,
      paymentStatus: 'PENDING',
      paymentRef: null,
      createdAt: '2025-02-18T09:45:00Z'
    },
    {
      id: 'b-100',
      token: 'K-044',
      farmerName: 'Kailash Meena',
      farmerId: 'KSP-MP-0914',
      crop: 'Wheat',
      cropId: 'crop-1',
      quantity: 32,
      unit: 'quintal',
      center: initialCenters[0].name,
      centerId: initialCenters[0].id,
      slot: '09:00 AM – 10:30 AM',
      slotId: 'slot-1',
      date: '2025-02-18',
      status: 'PAYMENT_COMPLETED',
      queuePosition: 0,
      waitMinutes: 0,
      qualityGrade: 'A',
      moisture: 11.5,
      foreignMaterial: 0.6,
      grossWeight: 33.4,
      tareWeight: 1.4,
      netWeight: 32.0,
      rate: 2275,
      amount: 72800,
      paymentStatus: 'COMPLETED',
      paymentRef: 'KSP-82A1',
      createdAt: '2025-02-18T07:15:00Z'
    }
  ],
  inspections: [
    {
      id: 'insp-1',
      bookingId: 'b-100',
      crop: 'Wheat',
      grade: 'A',
      result: 'APPROVED',
      moisture: 11.5,
      foreignMaterial: 0.6,
      remarks: 'Clean grain sample, low moisture compliant with MSP Fair Average Quality (FAQ) standards.',
      createdAt: '2025-02-18T09:40:00Z'
    },
    {
      id: 'insp-2',
      bookingId: 'b-101',
      crop: 'Wheat',
      grade: 'A',
      result: 'APPROVED',
      moisture: 11.8,
      foreignMaterial: 0.8,
      remarks: 'Grade A standard moisture verified at 11.8%. Approved for automated weighment.',
      createdAt: '2025-02-18T10:45:00Z'
    }
  ],
  notifications: [
    {
      id: 'notif-1',
      title: 'Slot confirmed: Basantpur Center',
      message: 'Token K-047 issued for Wheat (25 qtl). Please arrive by 10:15 AM.',
      unread: true,
      createdAt: '2025-02-18T08:35:00Z'
    },
    {
      id: 'notif-2',
      title: 'Quality inspection approved',
      message: 'Your Wheat sample passed inspection with Grade A (Moisture 11.8%). Moving to weighment.',
      unread: true,
      createdAt: '2025-02-18T10:48:00Z'
    },
    {
      id: 'notif-3',
      title: 'Live Location & Mandi Network Synced',
      message: 'Procurement centers and farmer queues live-calibrated relative to your GPS coordinates.',
      unread: false,
      createdAt: '2025-02-18T10:15:00Z'
    },
    {
      id: 'notif-4',
      title: 'MSP Rate Update for Rabi 2025',
      message: 'Government MSP for Wheat set at ₹2,275/qtl and Mustard at ₹5,650/qtl.',
      unread: false,
      createdAt: '2025-02-17T14:00:00Z'
    }
  ],
  analytics: {
    totalFarmers: 1420,
    todayBookings: 68,
    activeQueue: 19,
    paymentPending: 12,
    completedProcurement: 54,
    pendingInspection: 5,
    averageWaitMinutes: 22,
    weeklyTrend: [
      { label: 'Mon', value: 42 },
      { label: 'Tue', value: 68 },
      { label: 'Wed', value: 55 },
      { label: 'Thu', value: 71 },
      { label: 'Fri', value: 64 },
      { label: 'Sat', value: 82 },
      { label: 'Sun', value: 29 }
    ],
    procurementByCrop: [
      { label: 'Wheat', value: 1450 },
      { label: 'Soybean', value: 980 },
      { label: 'Mustard', value: 640 },
      { label: 'Gram (Chana)', value: 420 },
      { label: 'Paddy', value: 310 }
    ]
  },
  priceAlerts: [
    {
      id: 'alert-1',
      crop: 'Wheat',
      targetPrice: 2450,
      condition: 'ABOVE',
      marketName: 'All Nearby Mandis',
      active: true,
      triggered: false,
      createdAt: '2025-02-15T10:00:00Z'
    },
    {
      id: 'alert-2',
      crop: 'Soybean',
      targetPrice: 5100,
      condition: 'ABOVE',
      marketName: 'Indore Mandi Hub',
      active: true,
      triggered: false,
      createdAt: '2025-02-16T14:00:00Z'
    }
  ]
};

class Store {
  constructor() {
    this.listeners = [];
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure state has complete fields
        if (parsed.centers && parsed.currentUser && parsed.currentUser.coordinates && parsed.farmers) {
          if (!parsed.priceAlerts) {
            parsed.priceAlerts = INITIAL_STATE.priceAlerts;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not load state from localStorage:', e);
    }
    this.saveState(INITIAL_STATE);
    return INITIAL_STATE;
  }

  saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not persist state to localStorage:', e);
    }
  }

  getState() {
    return this.state;
  }

  setState(updater) {
    const newState = typeof updater === 'function' ? updater(this.state) : { ...this.state, ...updater };
    this.state = newState;
    this.saveState(newState);
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => {
      try {
        listener(this.state);
      } catch (err) {
        console.error('Error in state listener:', err);
      }
    });
  }

  // Language Support
  setLanguage(lang) {
    localStorage.setItem(LANG_KEY, lang);
    this.setState(s => ({ ...s, language: lang }));
  }

  getLanguage() {
    try {
      const savedLang = localStorage.getItem(LANG_KEY);
      if (savedLang) return savedLang;
    } catch (e) {}
    return this.state.language || 'en';
  }

  // Session & User
  setCurrentUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.setState(s => ({ ...s, currentUser: user }));
  }

  getCurrentUser() {
    try {
      const user = localStorage.getItem(USER_KEY);
      if (user) return JSON.parse(user);
    } catch (e) {}
    return this.state.currentUser;
  }

  // --- Dynamic Live Geolocation Engine ---
  updateUserLocation({ lat, lng, locationName, isLiveGps = false, accuracy = null }) {
    const userLat = Number(Number(lat).toFixed(4));
    const userLng = Number(Number(lng).toFixed(4));
    const locName = locationName || `${userLat.toFixed(2)}° N, ${userLng.toFixed(2)}° E`;

    const newCenters = generateNearbyCenters(userLat, userLng, locName);
    const newFarmers = generateNearbyFarmers(userLat, userLng, newCenters);

    this.setState(s => {
      const updatedUser = {
        ...s.currentUser,
        location: locName,
        coordinates: { lat: userLat, lng: userLng },
        accuracy: accuracy || (isLiveGps ? 10 : 25),
        isLiveGps: !!isLiveGps
      };

      // update demo user list as well
      const updatedDemoUsers = s.demoUsers.map(u => {
        if (u.role === 'FARMER') {
          return { ...u, location: locName, coordinates: { lat: userLat, lng: userLng } };
        }
        if (u.role === 'PROCUREMENT_OFFICER') {
          return {
            ...u,
            centerName: newCenters[0].name,
            location: newCenters[0].location,
            coordinates: newCenters[0].coordinates
          };
        }
        return u;
      });

      // Update slots to map to new center IDs
      const updatedSlots = [
        { id: 'slot-1', centerId: newCenters[0].id, date: '2025-02-18', startTime: '09:00 AM', endTime: '10:30 AM', available: 2, status: 'OPEN' },
        { id: 'slot-2', centerId: newCenters[0].id, date: '2025-02-18', startTime: '10:30 AM', endTime: '12:00 PM', available: 1, status: 'OPEN' },
        { id: 'slot-3', centerId: newCenters[0].id, date: '2025-02-18', startTime: '12:30 PM', endTime: '02:00 PM', available: 4, status: 'OPEN' },
        { id: 'slot-4', centerId: newCenters[0].id, date: '2025-02-18', startTime: '02:00 PM', endTime: '03:30 PM', available: 3, status: 'OPEN' },
        { id: 'slot-5', centerId: newCenters[0].id, date: '2025-02-18', startTime: '03:30 PM', endTime: '05:00 PM', available: 5, status: 'OPEN' },
        { id: 'slot-6', centerId: newCenters[1]?.id || 'center-2', date: '2025-02-18', startTime: '10:00 AM', endTime: '11:30 AM', available: 1, status: 'OPEN' },
        { id: 'slot-7', centerId: newCenters[1]?.id || 'center-2', date: '2025-02-18', startTime: '02:00 PM', endTime: '03:30 PM', available: 2, status: 'OPEN' },
        { id: 'slot-8', centerId: newCenters[2]?.id || 'center-3', date: '2025-02-18', startTime: '09:30 AM', endTime: '11:00 AM', available: 3, status: 'OPEN' },
        { id: 'slot-9', centerId: newCenters[2]?.id || 'center-3', date: '2025-02-18', startTime: '01:30 PM', endTime: '03:00 PM', available: 4, status: 'OPEN' },
        { id: 'slot-10', centerId: newCenters[3]?.id || 'center-4', date: '2025-02-18', startTime: '10:00 AM', endTime: '11:30 AM', available: 5, status: 'OPEN' }
      ];

      // Update current active booking center name if applicable
      const updatedBookings = s.bookings.map((b, idx) => {
        if (idx === 0) {
          return {
            ...b,
            center: newCenters[0].name,
            centerId: newCenters[0].id
          };
        }
        return b;
      });

      return {
        ...s,
        currentUser: updatedUser,
        demoUsers: updatedDemoUsers,
        centers: newCenters,
        farmers: newFarmers,
        slots: updatedSlots,
        bookings: updatedBookings
      };
    });

    localStorage.setItem(USER_KEY, JSON.stringify(this.state.currentUser));

    this.addNotification({
      title: isLiveGps ? '📍 Live GPS Location Locked' : '📍 Region Updated',
      message: `Set to ${locName}. ${newCenters.length} procurement centers within ${newCenters[newCenters.length - 1].distance} km calibrated.`,
      unread: true
    });
  }

  // Farmer Actions
  createCrop(cropData) {
    const newCrop = {
      id: 'crop-' + Date.now(),
      name: cropData.name,
      variety: cropData.variety || 'Standard Variety',
      season: cropData.season || 'Rabi',
      area: Number(cropData.area) || 1,
      expectedQuantity: Number(cropData.expectedQuantity) || 10,
      unit: cropData.unit || 'quintal',
      arrivalDate: cropData.arrivalDate || new Date().toISOString().slice(0, 10),
      harvestDate: cropData.harvestDate || null,
      status: 'READY'
    };

    this.setState(s => ({
      ...s,
      crops: [newCrop, ...s.crops]
    }));

    this.addNotification({
      title: `Crop registered: ${newCrop.name}`,
      message: `${newCrop.variety} (${newCrop.expectedQuantity} ${newCrop.unit}) added to your locker.`,
      unread: true
    });

    return newCrop;
  }

  createBooking({ cropId, centerId, slotId, quantity }) {
    const crop = this.state.crops.find(c => c.id === cropId) || { name: 'Wheat', unit: 'quintal' };
    const center = this.state.centers.find(c => c.id === centerId) || this.state.centers[0];
    const slot = this.state.slots.find(s => s.id === slotId) || { startTime: '10:30 AM', endTime: '12:00 PM', date: '2025-02-18' };
    
    const tokenNum = Math.floor(50 + Math.random() * 40);
    const token = `K-0${tokenNum}`;
    const qty = Number(quantity) || 10;

    const newBooking = {
      id: 'b-' + Date.now(),
      token,
      farmerName: this.getCurrentUser().name || 'Meera Patil',
      farmerId: this.getCurrentUser().farmerId || 'KSP-MP-2048',
      crop: crop.name,
      cropId,
      quantity: qty,
      unit: crop.unit || 'quintal',
      center: center.name,
      centerId: center.id,
      slot: `${slot.startTime} – ${slot.endTime}`,
      slotId: slot.id,
      date: slot.date || new Date().toISOString().slice(0, 10),
      status: 'BOOKED',
      queuePosition: center.queue + 1,
      waitMinutes: (center.queue + 1) * 8,
      qualityGrade: null,
      moisture: null,
      foreignMaterial: null,
      grossWeight: null,
      tareWeight: null,
      netWeight: null,
      rate: crop.name === 'Wheat' ? 2275 : crop.name === 'Mustard' ? 5650 : 4892,
      amount: qty * (crop.name === 'Wheat' ? 2275 : crop.name === 'Mustard' ? 5650 : 4892),
      paymentStatus: 'PENDING',
      paymentRef: null,
      createdAt: new Date().toISOString()
    };

    this.setState(s => {
      const updatedCenters = s.centers.map(c => c.id === centerId ? { ...c, queue: c.queue + 1 } : c);
      return {
        ...s,
        centers: updatedCenters,
        bookings: [newBooking, ...s.bookings],
        analytics: {
          ...s.analytics,
          todayBookings: s.analytics.todayBookings + 1,
          activeQueue: s.analytics.activeQueue + 1
        }
      };
    });

    this.addNotification({
      title: `Visit booked: Token ${token}`,
      message: `Your booking for ${newBooking.quantity} qtl ${newBooking.crop} at ${center.name} is confirmed. Estimated travel time: ${center.etaMinutes} mins.`,
      unread: true
    });

    return newBooking;
  }

  cancelBooking(bookingId) {
    this.setState(s => ({
      ...s,
      bookings: s.bookings.map(b => b.id === bookingId ? { ...b, status: 'CANCELLED', paymentStatus: 'CANCELLED' } : b)
    }));

    this.addNotification({
      title: 'Booking cancelled',
      message: `Booking #${bookingId} has been cancelled successfully.`,
      unread: true
    });
  }

  // Operations Team Workflow Actions
  markFarmerArrived(bookingId) {
    this.setState(s => ({
      ...s,
      bookings: s.bookings.map(b => b.id === bookingId ? { ...b, status: 'ARRIVED' } : b)
    }));
  }

  verifyFarmer(bookingId) {
    this.setState(s => ({
      ...s,
      bookings: s.bookings.map(b => b.id === bookingId ? { ...b, status: 'VERIFIED' } : b)
    }));
  }

  callNextFarmer() {
    const nextBooking = this.state.bookings.find(b => b.status === 'BOOKED' || b.status === 'ARRIVED');
    if (nextBooking) {
      this.setState(s => ({
        ...s,
        bookings: s.bookings.map(b => b.id === nextBooking.id ? { ...b, status: 'VERIFIED' } : b)
      }));
      return nextBooking;
    }
    return null;
  }

  createInspection({ bookingId, moisture, foreignMaterial, grade, result, remarks }) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    const newInsp = {
      id: 'insp-' + Date.now(),
      bookingId,
      crop: booking ? booking.crop : 'Crop',
      grade: grade || 'A',
      result: result || 'APPROVED',
      moisture: Number(moisture) || 12,
      foreignMaterial: Number(foreignMaterial) || 1,
      remarks: remarks || 'Quality inspected and certified.',
      createdAt: new Date().toISOString()
    };

    const nextStatus = result === 'APPROVED' ? 'WEIGHMENT' : result === 'REJECTED' ? 'REJECTED' : 'IN_INSPECTION';

    this.setState(s => ({
      ...s,
      inspections: [newInsp, ...s.inspections],
      bookings: s.bookings.map(b => b.id === bookingId ? {
        ...b,
        status: nextStatus,
        qualityGrade: grade,
        moisture: Number(moisture),
        foreignMaterial: Number(foreignMaterial)
      } : b)
    }));

    if (booking) {
      this.addNotification({
        title: `Inspection ${result}: Token ${booking.token}`,
        message: `Quality grade ${grade} recorded (Moisture ${moisture}%). Proceeding to scale.`,
        unread: true
      });
    }

    return newInsp;
  }

  createWeighment({ bookingId, gross, tare }) {
    const g = Number(gross) || 0;
    const t = Number(tare) || 0;
    const net = Math.max(0, g - t);

    this.setState(s => {
      const b = s.bookings.find(x => x.id === bookingId);
      const rate = b?.rate || 2275;
      const amount = net * rate;

      return {
        ...s,
        bookings: s.bookings.map(item => item.id === bookingId ? {
          ...item,
          grossWeight: g,
          tareWeight: t,
          netWeight: Number(net.toFixed(2)),
          amount,
          status: 'WEIGHMENT'
        } : item)
      };
    });
  }

  approveProcurement(bookingId, customRate) {
    this.setState(s => {
      const b = s.bookings.find(x => x.id === bookingId);
      const rate = customRate ? Number(customRate) : (b?.rate || 2275);
      const netWeight = b?.netWeight || b?.quantity || 10;
      const amount = netWeight * rate;

      return {
        ...s,
        bookings: s.bookings.map(item => item.id === bookingId ? {
          ...item,
          rate,
          amount,
          status: 'APPROVED',
          paymentStatus: 'PROCESSING'
        } : item)
      };
    });

    const b = this.state.bookings.find(x => x.id === bookingId);
    if (b) {
      this.addNotification({
        title: `Procurement Approved: Token ${b.token}`,
        message: `Final net weight ${b.netWeight || b.quantity} qtl approved for payment of ₹${(b.amount || 0).toLocaleString('en-IN')}.`,
        unread: true
      });
    }
  }

  updatePaymentStatus(bookingId, status = 'COMPLETED', referenceId) {
    const ref = referenceId || `KSP-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    this.setState(s => {
      return {
        ...s,
        bookings: s.bookings.map(item => item.id === bookingId ? {
          ...item,
          status: 'PAYMENT_COMPLETED',
          paymentStatus: status,
          paymentRef: ref
        } : item),
        analytics: {
          ...s.analytics,
          completedProcurement: s.analytics.completedProcurement + 1,
          activeQueue: Math.max(0, s.analytics.activeQueue - 1)
        }
      };
    });

    const b = this.state.bookings.find(x => x.id === bookingId);
    if (b) {
      this.addNotification({
        title: `Payment Disbursed: ₹${(b.amount || 0).toLocaleString('en-IN')}`,
        message: `Payment marked complete with reference ID ${ref}.`,
        unread: true
      });
    }
  }

  // Notifications
  addNotification({ title, message, unread = true }) {
    const newNotif = {
      id: 'notif-' + Date.now(),
      title,
      message,
      unread,
      createdAt: new Date().toISOString()
    };

    this.setState(s => ({
      ...s,
      notifications: [newNotif, ...s.notifications]
    }));
  }

  markNotificationRead(id) {
    this.setState(s => ({
      ...s,
      notifications: s.notifications.map(n => n.id === id ? { ...n, unread: false } : n)
    }));
  }

  markAllNotificationsRead() {
    this.setState(s => ({
      ...s,
      notifications: s.notifications.map(n => ({ ...n, unread: false }))
    }));
  }

  // Price Alerts Engine
  createPriceAlert({ crop, targetPrice, condition = 'ABOVE', marketName = 'All Nearby Mandis' }) {
    const alert = {
      id: 'alert-' + Date.now(),
      crop: crop || 'Wheat',
      targetPrice: Number(targetPrice) || 2400,
      condition: condition || 'ABOVE',
      marketName: marketName || 'All Nearby Mandis',
      active: true,
      triggered: false,
      createdAt: new Date().toISOString()
    };

    this.setState(s => ({
      ...s,
      priceAlerts: [alert, ...(s.priceAlerts || [])]
    }));

    this.addNotification({
      title: `🔔 Price Alert Set: ${alert.crop} at ₹${alert.targetPrice}/qtl`,
      message: `Monitoring ${alert.marketName}. You'll be alerted when ${alert.crop} price meets or exceeds ₹${alert.targetPrice}/qtl.`,
      unread: true
    });

    this.checkPriceAlerts();
    return alert;
  }

  deletePriceAlert(alertId) {
    this.setState(s => ({
      ...s,
      priceAlerts: (s.priceAlerts || []).filter(a => a.id !== alertId)
    }));
  }

  togglePriceAlert(alertId) {
    this.setState(s => ({
      ...s,
      priceAlerts: (s.priceAlerts || []).map(a => a.id === alertId ? { ...a, active: !a.active } : a)
    }));
  }

  checkPriceAlerts() {
    const s = this.state;
    const alerts = s.priceAlerts || [];
    const user = s.currentUser;
    const coords = user?.coordinates || { lat: 22.7196, lng: 75.8577 };

    let hasUpdate = false;
    const updatedAlerts = alerts.map(alert => {
      if (!alert.active || alert.triggered) return alert;

      const markets = generateNearbyMarkets(coords.lat, coords.lng, user.location, alert.crop);
      const maxMarketPrice = Math.max(...markets.map(m => m.pricePerQtl));

      if (maxMarketPrice >= alert.targetPrice) {
        const topMarket = markets.find(m => m.pricePerQtl === maxMarketPrice) || markets[0];
        hasUpdate = true;
        
        this.addNotification({
          title: `🎯 Target Price Met: ${alert.crop} ₹${maxMarketPrice}/qtl!`,
          message: `${topMarket.name} is offering ₹${maxMarketPrice}/qtl (Target: ₹${alert.targetPrice}/qtl). Distance: ${topMarket.distance} km. Check Smart Selling Price to compare net returns.`,
          unread: true
        });

        return { ...alert, triggered: true, triggeredAt: new Date().toISOString(), highestObservedPrice: maxMarketPrice };
      }

      return alert;
    });

    if (hasUpdate) {
      this.setState(st => ({ ...st, priceAlerts: updatedAlerts }));
    }
  }

  resetDemoData() {
    this.setState(INITIAL_STATE);
  }
}

// Expose utilities and store globally
window.calculateDistance = calculateDistance;
window.calculateETA = calculateETA;
window.LOCATION_PRESETS = LOCATION_PRESETS;
window.CROP_MASTER_DATA = CROP_MASTER_DATA;
window.generateNearbyMarkets = generateNearbyMarkets;
window.calculateTransportCost = calculateTransportCost;
window.calculateMarketMetrics = calculateMarketMetrics;
window.getBestMarketRecommendation = getBestMarketRecommendation;
window.getCropPriceTrends = getCropPriceTrends;
window.kpStore = new Store();

