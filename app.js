// KisanProcure Main Application & Multi-Language Routing Engine
// Enhanced with Interactive Leaflet Geospatial Maps, Live Geolocation & Farmer Tracking

(function() {
  'use strict';

  // --- SVG Icons Library ---
  const icons = {
    sprout: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>`,
    tractor: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 11 11 .9c.6 0 .9.5.8 1.1l-.8 5c-.1.5-.6.9-1.1.9-1.2 0-2.3-.7-2.8-1.7l-1.6-3.2"/><path d="M14 11V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6"/><circle cx="7" cy="15" r="5"/><circle cx="18" cy="18" r="2"/></svg>`,
    activity: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.48 12H2"/></svg>`,
    barChart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`,
    home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    calendar: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`,
    ticket: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>`,
    packageCheck: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
    users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    clipboardCheck: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`,
    scale: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
    creditCard: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,
    bell: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
    settings: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    help: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`,
    logOut: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
    check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    checkCircle: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    arrowRight: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    chevronRight: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    mapPin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    clock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    trendingUp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    cloudSun: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/></svg>`,
    leaf: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
    refresh: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>`,
    menu: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
    close: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    shieldCheck: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
    globe: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    crosshair: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/></svg>`,
    navigation: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`
  };

  // --- Internationalization (i18n) Translations ---
  const translations = {
    en: {
      langName: "English",
      brandName: "KisanProcure",
      demoMode: "Live Geospatial Demo",
      enterDemo: "Enter demo",
      startDemo: "Start the demo",
      seeHowItWorks: "See how it works",
      overview: "Overview",
      myCrops: "My crops",
      bookSlot: "Book a slot",
      bookings: "Bookings",
      liveQueue: "Live queue",
      procurementStatus: "Procurement status",
      notifications: "Notifications",
      helpCenter: "Help center",
      settings: "Settings",
      exitDemo: "Exit demo",
      goodMorning: "Good morning",
      goodMorningTeam: "Good morning, Team",
      farmerWorkspace: "Farmer workspace",
      centerWorkspace: "Center workspace",
      controlRoom: "Control room",
      operationsOverview: "Operations overview",
      todaysQueue: "Today's queue",
      inspection: "Inspection",
      weighment: "Weighment",
      procurementPayment: "Procurement & payment",
      analyticsOverview: "Analytics overview",
      refresh: "Refresh",
      cancel: "Cancel",
      save: "Save",
      newBooking: "New booking",
      registerCrop: "Register crop",
      chooseCenter: "Choose your center",
      pickTime: "Pick a time",
      confirmVisit: "Confirm your visit",
      callNext: "Call next farmer",
      markArrived: "Mark arrived",
      verifyFarmer: "Verify farmer",
      inspect: "Inspect",
      recordInspection: "Record inspection",
      recordWeighment: "Record weighment",
      approveProcurement: "Approve procurement",
      markPaymentComplete: "Mark payment complete",
      grossWeight: "Gross weight",
      tareWeight: "Tare weight",
      netWeight: "Net produce weight",
      token: "Token",
      crop: "Crop",
      status: "Status",
      actions: "Actions",
      slot: "Slot",
      wait: "Est. wait",
      position: "Position",
      aheadOfYou: "ahead of you",
      nowServing: "now serving",
      heroBadge: "Live Geolocation & Procurement Grid",
      heroTitle1: "Your harvest",
      heroTitle2: "mapped & planned.",
      heroSub: "KisanProcure pinpoints your live location, computes real-time distance and ETA to nearby procurement centers, and orchestrates live token queues for seamless MSP crop selling.",
      step1Title: "Live proximity & crowd",
      step1Sub: "See exact distance in km, tractor drive ETA, live queue, and open slots from your GPS position.",
      step2Title: "Carry one clear token",
      step2Sub: "Follow the live queue movement from home or on the road so you never waste hours waiting.",
      step3Title: "Transparent trail & DBT",
      step3Sub: "Instant moisture grading, certified electronic weighment, and direct benefit transfer payment.",
      registeredCrops: "Registered crops",
      completedProcurements: "Completed procurements",
      quantityProcured: "Quantity procured",
      totalEarned: "Total earned",
      farmersToday: "Farmers today",
      waitingInQueue: "Waiting in queue",
      processingAtCounters: "Processing at counters",
      completedToday: "Completed today",
      farmersOnboarded: "Farmers onboarded",
      bookingsToday: "Bookings today",
      activeQueue: "Active queue",
      paymentPending: "Payment pending",
      weeklyMovement: "Weekly movement",
      procurementByCrop: "Procurement by crop",
      language: "Language",
      smartPrice: "Smart Selling Price",
      smartSellingPriceTitle: "Smart Crop Selling Price Intelligence",
      smartSellingPriceSub: "Compare real-time market prices, calculate transport cost, evaluate net returns, and find the most profitable mandi to sell your harvest.",
      marketComparison: "Market Comparison",
      bestMarketToSell: "Best Market to Sell",
      highestNetReturn: "Highest Net Return",
      whyRecommended: "Why this is recommended",
      totalSellingValue: "Total Selling Value",
      transportCost: "Estimated Transport Cost",
      otherCosts: "Mandi Fee & Handling",
      estimatedNetReturn: "Estimated Net Return",
      sellingPricePerQtl: "Selling Price / Quintal",
      priceSource: "Price Source",
      lastUpdated: "Last Updated",
      distance: "Distance",
      travelTime: "Travel Time",
      priceTrend: "Historical Price Trend",
      priceAlert: "Price Alert",
      setPriceAlert: "Set Price Alert",
      activeAlerts: "Active Price Alerts",
      demoDataDisclaimer: "Demo Data – Not Live",
      demoDataNote: "Historical price trend and spot feeds are illustrative simulations based on Agmarknet APMC & e-NAM reference data.",
      selectCrop: "Select Crop",
      enterQuantity: "Produce Quantity (Quintals)",
      transportVehicle: "Transport Mode",
      tractorTrolley: "Tractor Trolley",
      miniTruck: "Mini-Truck / 407",
      smallTempo: "Small Tempo / 3-Wheeler",
      targetPrice: "Target Price (₹/qtl)",
      createAlert: "Create Price Alert",
      alertCondition: "Notify when price reaches or exceeds",
      simulatePriceCheck: "Test / Check Alerts Now",
      bookAtThisMarket: "Book Slot at this Center",
      openInMap: "Directions in Map",
      viewCards: "Cards View",
      viewTable: "Comparison Table",
      sortBy: "Sort by",
      sortNetReturn: "Highest Net Return",
      sortDistance: "Nearest Distance",
      sortPrice: "Highest Selling Price",
      compareAllMarkets: "Compare All Mandis & Centers",
      mspBaseline: "Government MSP Baseline",
      netProfitGain: "Net Gain over MSP",
      days7: "7 Days",
      days30: "30 Days",
      days90: "3 Months",
      highPrice: "30D High",
      lowPrice: "30D Low",
      avgPrice: "30D Average",
      currentPrice: "Current Price",
      priceChange: "Price Change"
    },
    hi: {
      langName: "हिंदी",
      brandName: "किसानप्रोक्योर",
      demoMode: "लाइव भू-स्थानिक डेमो",
      enterDemo: "डेमो शुरू करें",
      startDemo: "डेमो शुरू करें",
      seeHowItWorks: "कार्यप्रणाली देखें",
      overview: "अवलोकन",
      myCrops: "मेरी फसलें",
      bookSlot: "स्लॉट बुक करें",
      bookings: "बुकिंग्स",
      liveQueue: "लाइव कतार",
      procurementStatus: "खरीद की स्थिति",
      notifications: "सूचनाएं",
      helpCenter: "सहायता केंद्र",
      settings: "सेटिंग्स",
      exitDemo: "बाहर निकलें",
      goodMorning: "शुभ प्रभात",
      goodMorningTeam: "शुभ प्रभात टीम",
      farmerWorkspace: "किसान कार्यक्षेत्र",
      centerWorkspace: "खरीद केंद्र कार्यक्षेत्र",
      controlRoom: "नियंत्रण कक्ष",
      operationsOverview: "संचालन अवलोकन",
      todaysQueue: "आज की कतार",
      inspection: "गुणवत्ता जांच",
      weighment: "तौल (वजन पैमाना)",
      procurementPayment: "खरीद और भुगतान",
      analyticsOverview: "विश्लेषण",
      refresh: "ताज़ा करें",
      cancel: "रद्द करें",
      save: "सुरक्षित करें",
      newBooking: "नई बुकिंग",
      registerCrop: "फसल जोड़ें",
      chooseCenter: "खरीद केंद्र चुनें",
      pickTime: "समय चुनें",
      confirmVisit: "पुष्टि करें",
      callNext: "अगले किसान को बुलाएं",
      markArrived: "आगमन दर्ज करें",
      verifyFarmer: "सत्यापित करें",
      inspect: "निरीक्षण",
      recordInspection: "गुणवत्ता सहेजें",
      recordWeighment: "वजन सहेजें",
      approveProcurement: "खरीद स्वीकृत करें",
      markPaymentComplete: "भुगतान पूर्ण करें",
      grossWeight: "सकल वजन (Gross)",
      tareWeight: "खाली वजन (Tare)",
      netWeight: "शुद्ध फसल वजन",
      token: "टोकन",
      crop: "फसल",
      status: "स्थिति",
      actions: "कार्रवाई",
      slot: "स्लॉट",
      wait: "प्रतीक्षा समय",
      position: "स्थान",
      aheadOfYou: "आपसे आगे",
      nowServing: "वर्तमान सेवा",
      heroBadge: "लाइव जीपीएस व खरीद केंद्र नक्शा",
      heroTitle1: "आपकी उपज,",
      heroTitle2: "सटीक योजना।",
      heroSub: "किसानप्रोक्योर आपके वर्तमान जीपीएस स्थान से निकटतम खरीद केंद्रों की दूरी, यात्रा समय और लाइव कतार दिखाता है।",
      step1Title: "सटीक दूरी और कतार",
      step1Sub: "अपने स्थान से किमी में दूरी, ट्रैक्टर यात्रा समय और उपलब्ध स्लॉट देखें।",
      step2Title: "डिजिटल टोकन",
      step2Sub: "लाइव कतार ट्रैकिंग से बिना लंबी लाइन में खड़े हुए सही समय पर पहुंचें।",
      step3Title: "पारदर्शी भुगतान",
      step3Sub: "सटीक इलेक्ट्रॉनिक तौल और सीधे बैंक खाते में भुगतान।",
      registeredCrops: "पंजीकृत फसलें",
      completedProcurements: "पूर्ण खरीद",
      quantityProcured: "कुल उपज",
      totalEarned: "कुल आय",
      farmersToday: "आज के किसान",
      waitingInQueue: "कतार में",
      processingAtCounters: "काउंटर पर",
      completedToday: "आज पूर्ण",
      farmersOnboarded: "किसान जुड़े",
      bookingsToday: "आज की बुकिंग",
      activeQueue: "सक्रिय कतार",
      paymentPending: "लंबित भुगतान",
      weeklyMovement: "साप्ताहिक रुझान",
      procurementByCrop: "फसलवार खरीद",
      language: "भाषा",
      smartPrice: "स्मार्ट विक्रय मूल्य",
      smartSellingPriceTitle: "स्मार्ट फसल विक्रय मूल्य व मंडी तुलना",
      smartSellingPriceSub: "वास्तविक बाजार दरों की तुलना करें, परिवहन लागत और शुद्ध आय की गणना करें, और अपनी उपज बेचने के लिए सबसे लाभदायक मंडी चुनें।",
      marketComparison: "मंडी तुलना",
      bestMarketToSell: "बिक्री के लिए सर्वश्रेष्ठ मंडी",
      highestNetReturn: "अधिकतम शुद्ध आय",
      whyRecommended: "सिफारिश का कारण",
      totalSellingValue: "कुल बिक्री मूल्य",
      transportCost: "अनुमानित परिवहन लागत",
      otherCosts: "मंडी शुल्क व हैंडलिंग",
      estimatedNetReturn: "अनुमानित शुद्ध आय",
      sellingPricePerQtl: "विक्रय मूल्य / क्विंटल",
      priceSource: "मूल्य स्रोत",
      lastUpdated: "अंतिम अपडेट",
      distance: "दूरी",
      travelTime: "यात्रा समय",
      priceTrend: "ऐतिहासिक मूल्य रुझान",
      priceAlert: "मूल्य अलर्ट",
      setPriceAlert: "मूल्य अलर्ट सेट करें",
      activeAlerts: "सक्रिय मूल्य अलर्ट",
      demoDataDisclaimer: "डेमो डेटा – लाइव नहीं",
      demoDataNote: "ऐतिहासिक मूल्य रुझान और मंडी दरें एग्मार्कनेट और ई-नाम संदर्भ डेटा पर आधारित सांकेतिक डेमो डेटा हैं।",
      selectCrop: "फसल चुनें",
      enterQuantity: "उपज मात्रा (क्विंटल)",
      transportVehicle: "परिवहन साधन",
      tractorTrolley: "ट्रैक्टर ट्रॉली",
      miniTruck: "मिनी-ट्रक / 407",
      smallTempo: "छोटा टेम्पो / 3-व्हीलर",
      targetPrice: "लक्षित मूल्य (₹/क्विंटल)",
      createAlert: "अलर्ट सेट करें",
      alertCondition: "मूल्य पहुंचने या अधिक होने पर सूचित करें",
      simulatePriceCheck: "अलर्ट जांचें",
      bookAtThisMarket: "इस केंद्र पर स्लॉट बुक करें",
      openInMap: "नक्शे में दिशा-निर्देश",
      viewCards: "कार्ड दृश्य",
      viewTable: "तुलना तालिका",
      sortBy: "क्रमबद्ध करें",
      sortNetReturn: "अधिकतम शुद्ध लाभ",
      sortDistance: "न्यूनतम दूरी",
      sortPrice: "उच्चतम विक्रय मूल्य",
      compareAllMarkets: "सभी मंडियों की तुलना करें",
      mspBaseline: "सरकारी एमएसपी आधार मूल्य",
      netProfitGain: "एमएसपी से अतिरिक्त शुद्ध लाभ",
      days7: "7 दिन",
      days30: "30 दिन",
      days90: "3 माह",
      highPrice: "30 दिन उच्चतम",
      lowPrice: "30 दिन न्यूनतम",
      avgPrice: "30 दिन औसत",
      currentPrice: "वर्तमान मूल्य",
      priceChange: "मूल्य परिवर्तन"
    },
    te: {
      langName: "తెలుగు",
      brandName: "కిసాన్‌ప్రొక్యూర్",
      demoMode: "లైవ్ లొకేషన్ డెమో",
      enterDemo: "ప్రవేశించండి",
      startDemo: "డెమో ప్రారంభించండి",
      seeHowItWorks: "ఎలా పనిచేస్తుంది",
      overview: "అవలోకనం",
      myCrops: "నా పంటలు",
      bookSlot: "స్లాట్ బుక్ చేయండి",
      bookings: "బుకింగ్‌లు",
      liveQueue: "లైవ్ క్యూ",
      procurementStatus: "సేకరణ స్థితి",
      notifications: "నోటిఫికేషన్లు",
      helpCenter: "సహాయ కేంద్రం",
      settings: "సెట్టింగ్‌లు",
      exitDemo: "నిష్క్రమించండి",
      goodMorning: "శుభోదయం",
      goodMorningTeam: "శుభోదయం బృందం",
      farmerWorkspace: "రైతు కార్యక్షేత్రం",
      centerWorkspace: "కేంద్ర కార్యక్షేత్రం",
      controlRoom: "కంట్రోల్ రూమ్",
      operationsOverview: "కార్యకలాపాలు",
      todaysQueue: "నేటి క్యూ",
      inspection: "నాణ్యత తనిఖీ",
      weighment: "తూకం",
      procurementPayment: "సేకరణ & చెల్లింపు",
      analyticsOverview: "విశ్లేషణలు",
      refresh: "రిఫ్రెష్",
      cancel: "రద్దు",
      save: "సేవ్",
      newBooking: "కొత్త బుకింగ్",
      registerCrop: "పంట నమోదు",
      chooseCenter: "కేంద్రాన్ని ఎంచుకోండి",
      pickTime: "సమయం ఎంచుకోండి",
      confirmVisit: "నిర్ధారించండి",
      callNext: "తదుపరి రైతును పిలవండి",
      markArrived: "చేరిక నమోదు",
      verifyFarmer: "రైతు ధృవీకరణ",
      inspect: "తనిఖీ చేయండి",
      recordInspection: "తనిఖీ నమోదు",
      recordWeighment: "తూకం నమోదు",
      approveProcurement: "ఆమోదించండి",
      markPaymentComplete: "చెల్లింపు పూర్తి",
      grossWeight: "స్థూల బరువు",
      tareWeight: "ఖాళీ బరువు",
      netWeight: "నికర పంట బరువు",
      token: "టోకెన్",
      crop: "పంట",
      status: "స్థితి",
      actions: "చర్యలు",
      slot: "స్లాట్",
      wait: "వేచి ఉండే సమయం",
      position: "స్థానం",
      aheadOfYou: "మీ ముందు",
      nowServing: "సేవ పొందుతున్నారు",
      heroBadge: "లైవ్ లొకేషన్ & సేకరణ కేంద్రాలు",
      heroTitle1: "మీ పంట,",
      heroTitle2: "ఖచ్చితమైన ప్రణాళిక.",
      heroSub: "మీ ప్రస్తుత స్థానం నుండి సమీప సేకరణ కేంద్రాల ఖచ్చితమైన దూరం మరియు లైవ్ క్యూను కిసాన్‌ప్రొక్యూర్ అందిస్తుంది.",
      step1Title: "దూరం మరియు క్యూ",
      step1Sub: "కిమీలలో దూరం, ప్రయాణ సమయం మరియు అందుబాటులో ఉన్న స్లాట్‌లను చూడండి.",
      step2Title: "డిజిటల్ టోకెన్",
      step2Sub: "లైవ్ క్యూ ట్రాకింగ్ ద్వారా కేంద్రంలో సమయం ఆదా చేసుకోండి.",
      step3Title: "డైరెక్ట్ పేమెంట్",
      step3Sub: "ఎలక్ట్రానిక్ తూకం మరియు నేరుగా బ్యాంకు ఖాతాలోకి నగదు బదిలీ.",
      registeredCrops: "నమోదైన పంటలు",
      completedProcurements: "పూర్తయిన సేకరణలు",
      quantityProcured: "సేకరించిన పరిమాణం",
      totalEarned: "మొత్తం ఆదాయం",
      farmersToday: "నేటి రైతులు",
      waitingInQueue: "క్యూలో వేచి ఉన్నారు",
      processingAtCounters: "కౌంటర్ల వద్ద",
      completedToday: "నేడు పూర్తయినవి",
      farmersOnboarded: "రైతుల సంఖ్య",
      bookingsToday: "నేటి బుకింగ్‌లు",
      activeQueue: "యాక్టివ్ క్యూ",
      paymentPending: "పెండింగ్ చెల్లింపు",
      weeklyMovement: "వారపు గమనం",
      procurementByCrop: "పంటల వారీగా సేకరణ",
      language: "భాష",
      smartPrice: "స్మార్ట్ అమ్మకపు ధర",
      smartSellingPriceTitle: "స్మార్ట్ పంట అమ్మకపు ధర & మార్కెట్ పోలిక",
      smartSellingPriceSub: "వివిధ మార్కెట్ ధరలను సరిపోల్చండి, రవాణా ఖర్చులను లెక్కించండి, నికర రాబడిని చూసి పంట అమ్మకానికి ఉత్తమమైన మార్కెట్‌ను ఎంచుకోండి.",
      marketComparison: "మార్కెట్ పోలిక",
      bestMarketToSell: "అమ్మకానికి ఉత్తమ మార్కెట్",
      highestNetReturn: "అత్యధిక నికర రాబడి",
      whyRecommended: "సిఫార్సు చేయడానికి కారణం",
      totalSellingValue: "మొత్తం అమ్మకపు విలువ",
      transportCost: "అంచనా రవాణా ఖర్చు",
      otherCosts: "మార్కెట్ ఫీజు & హ్యాండ్లింగ్",
      estimatedNetReturn: "అంచనా నికర రాబడి",
      sellingPricePerQtl: "అమ్మకపు ధర / క్వింటాల్",
      priceSource: "ధర మూలం",
      lastUpdated: "చివరిగా నవీకరించబడింది",
      distance: "దూరం",
      travelTime: "ప్రయాణ సమయం",
      priceTrend: "ధరల చారిత్రక ధోరణి",
      priceAlert: "ధర హెచ్చరిక",
      setPriceAlert: "ధర హెచ్చరికను సెట్ చేయండి",
      activeAlerts: "యాక్టివ్ ధర హెచ్చరికలు",
      demoDataDisclaimer: "డెమో డేటా – లైవ్ కాదు",
      demoDataNote: "చారిత్రక ధరల ధోరణి మరియు స్పాట్ ఫీడ్‌లు అగ్‌మార్క్‌నెట్ మరియు ఇ-నామ్ ఆధారిత సూచిక డెమో డేటా మాత్రమే.",
      selectCrop: "పంటను ఎంచుకోండి",
      enterQuantity: "దిగుబడి పరిమాణం (క్వింటాల్స్)",
      transportVehicle: "రవాణా విధానం",
      tractorTrolley: "ట్రాక్టర్ ట్రాలీ",
      miniTruck: "మినీ ట్రక్ / 407",
      smallTempo: "చిన్న టెంపో / 3-వీలర్",
      targetPrice: "లక్ష్య ధర (₹/క్వింటాల్)",
      createAlert: "హెచ్చరికను సృష్టించండి",
      alertCondition: "ధర చేరుకున్నప్పుడు లేదా దాటినప్పుడు తెలియజేయండి",
      simulatePriceCheck: "హెచ్చరికలను తనిఖీ చేయండి",
      bookAtThisMarket: "ఈ కేంద్రంలో స్లాట్ బుక్ చేయండి",
      openInMap: "మ్యాప్‌లో దిశలు",
      viewCards: "కార్డ్ వీక్షణ",
      viewTable: "పోలిక పట్టిక",
      sortBy: "క్రమబద్ధీకరించు",
      sortNetReturn: "అత్యధిక నికర లాభం",
      sortDistance: "సమీప దూరం",
      sortPrice: "అత్యధిక అమ్మకపు ధర",
      compareAllMarkets: "అన్ని మార్కెట్లను సరిపోల్చండి",
      mspBaseline: "ప్రభుత్వ MSP ప్రాథమిక ధర",
      netProfitGain: "MSP కంటే అదనపు నికర లాభం",
      days7: "7 రోజులు",
      days30: "30 రోజులు",
      days90: "3 నెలలు",
      highPrice: "30 రోజుల గరిష్టం",
      lowPrice: "30 రోజుల కనిష్టం",
      avgPrice: "30 రోజుల సగటు",
      currentPrice: "ప్రస్తుత ధర",
      priceChange: "ధర మార్పు"
    }
  };

  function t(key) {
    const lang = window.kpStore ? window.kpStore.getLanguage() : 'en';
    const langDict = translations[lang] || translations.en;
    return langDict[key] || translations.en[key] || key;
  }

  function renderLanguageSelector() {
    const current = window.kpStore ? window.kpStore.getLanguage() : 'en';
    return `
      <div class="lang-switcher-pill">
        <button onclick="window.kpApp.setLang('en')" class="lang-btn ${current === 'en' ? 'active' : ''}">EN</button>
        <button onclick="window.kpApp.setLang('hi')" class="lang-btn ${current === 'hi' ? 'active' : ''}">हिंदी</button>
        <button onclick="window.kpApp.setLang('te')" class="lang-btn ${current === 'te' ? 'active' : ''}">తెలుగు</button>
      </div>
    `;
  }

  // --- Utility Formatters ---
  function money(val) {
    return '₹' + Number(val || 0).toLocaleString('en-IN');
  }

  function formatDate(dStr) {
    if (!dStr) return '';
    try {
      const d = new Date(dStr);
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch(e) {
      return dStr;
    }
  }

  function titleCase(s) {
    if (!s) return '';
    return String(s).replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  }

  function statusBadge(status) {
    const s = String(status || 'READY').toUpperCase();
    let badgeClass = 'badge-secondary';
    if (['APPROVED', 'PAYMENT_COMPLETED', 'READY', 'OPEN'].includes(s)) badgeClass = 'badge-success';
    else if (['BOOKED', 'WAITING', 'IN_INSPECTION', 'WEIGHMENT', 'PROCESSING'].includes(s)) badgeClass = 'badge-accent';
    else if (['REJECTED', 'CANCELLED', 'HIGH'].includes(s)) badgeClass = 'badge-destructive';
    else if (['MEDIUM', 'ARRIVED', 'VERIFIED'].includes(s)) badgeClass = 'badge-primary';

    return `<span class="badge ${badgeClass}">${titleCase(s)}</span>`;
  }

  // --- Toast Manager ---
  function showToast(title, message, type = 'success') {
    const container = document.getElementById('toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div style="font-size: 1.1rem; color: ${type === 'success' ? '#10b981' : type === 'warning' ? 'hsl(var(--accent))' : 'hsl(var(--primary))'};">
        ${icons.checkCircle}
      </div>
      <div>
        <p style="font-weight: 700; font-size: 0.875rem;">${title}</p>
        <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground)); margin-top: 0.15rem;">${message}</p>
      </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 4000);
  }

  function createToastContainer() {
    const el = document.createElement('div');
    el.id = 'toast-container';
    el.className = 'toast-container';
    document.body.appendChild(el);
    return el;
  }

  // --- Modal Manager ---
  function openModal(title, contentHtml) {
    closeModal();
    const overlay = document.createElement('div');
    overlay.id = 'active-modal';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-content" onclick="event.stopPropagation()">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
          <h2 class="font-serif" style="font-size: 1.5rem; font-weight: 700;">${title}</h2>
          <button class="btn btn-ghost" onclick="window.kpApp.closeModal()" style="padding: 0.4rem; border-radius: 0.5rem;">
            ${icons.close}
          </button>
        </div>
        <div>${contentHtml}</div>
      </div>
    `;
    overlay.onclick = closeModal;
    document.body.appendChild(overlay);
  }

  function closeModal() {
    const active = document.getElementById('active-modal');
    if (active) active.remove();
  }

  // --- Location Banner Component ---
  function renderLocationBanner(customTitle, customSub) {
    const user = window.kpStore.getCurrentUser();
    const presets = window.kpStore.getState().locationPresets || [];
    const coords = user.coordinates || { lat: 22.7196, lng: 75.8577 };

    return `
      <div class="location-banner kp-stagger">
        <div class="location-meta">
          <div class="location-icon-box">
            ${icons.mapPin}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span style="font-weight: 800; font-size: 1rem;">${customTitle || 'Your Current Live Location'}</span>
              ${user.isLiveGps ? `
                <span class="badge badge-accent" style="display: inline-flex; align-items: center; gap: 0.35rem;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background-color: #059669; animation: pulseGlow 1.5s infinite;"></span>
                  Live GPS Active
                </span>
              ` : `
                <span class="badge" style="background-color: hsla(var(--muted), 0.8); color: hsl(var(--foreground)); font-weight: 600;">Calibrated Hub</span>
              `}
            </div>
            <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">
              ${user.location} • <span class="font-mono" style="font-size: 0.75rem; font-weight: 600;">${coords.lat.toFixed(4)}° N, ${coords.lng.toFixed(4)}° E</span>
              ${customSub ? `<span style="display: block; font-size: 0.75rem; margin-top: 0.15rem; color: hsl(var(--primary));">${customSub}</span>` : ''}
            </p>
          </div>
        </div>

        <div class="location-actions">
          <button onclick="window.kpApp.detectLiveLocation()" class="btn-gps-detect" title="Detect your device GPS coordinates">
            ${icons.crosshair} <span>Detect My Live Location</span>
          </button>
          <select onchange="window.kpApp.selectLocationPreset(this.value)" class="btn-preset-select" title="Switch agricultural hub region">
            <option value="" disabled selected>🌍 Switch Mandi Hub...</option>
            ${presets.map(p => `<option value="${p.name}">${p.name} (${p.state})</option>`).join('')}
          </select>
        </div>
      </div>
    `;
  }

  // --- Navigation & Shell ---
  function getFarmerNav() {
    return [
      { href: '#/farmer', label: t('overview'), icon: 'home' },
      { href: '#/farmer/smart-price', label: t('smartPrice'), icon: 'trendingUp' },
      { href: '#/farmer/crops', label: t('myCrops'), icon: 'sprout' },
      { href: '#/farmer/book', label: t('bookSlot'), icon: 'calendar' },
      { href: '#/farmer/bookings', label: t('bookings'), icon: 'ticket' },
      { href: '#/farmer/queue', label: t('liveQueue'), icon: 'activity' },
      { href: '#/farmer/status', label: t('procurementStatus'), icon: 'packageCheck' }
    ];
  }

  function getOpsNav() {
    return [
      { href: '#/operations', label: t('operationsOverview'), icon: 'home' },
      { href: '#/operations/queue', label: t('todaysQueue'), icon: 'users' },
      { href: '#/operations/inspection', label: t('inspection'), icon: 'clipboardCheck' },
      { href: '#/operations/weighment', label: t('weighment'), icon: 'scale' },
      { href: '#/operations/procurement', label: t('procurementPayment'), icon: 'creditCard' }
    ];
  }

  function getAdminNav() {
    return [
      { href: '#/admin/analytics', label: t('analyticsOverview'), icon: 'barChart' }
    ];
  }

  function renderShell(contentHtml, area = 'farmer') {
    const user = window.kpStore.getCurrentUser();
    const currentHash = window.location.hash || '#/farmer';
    const navItems = area === 'admin' ? getAdminNav() : area === 'operations' ? getOpsNav() : getFarmerNav();
    const areaTitle = area === 'farmer' ? t('farmerWorkspace') : area === 'admin' ? t('controlRoom') : t('centerWorkspace');
    const unreadCount = window.kpStore.getState().notifications.filter(n => n.unread).length;

    return `
      <div class="app-shell">
        <div id="sidebar-backdrop" class="app-sidebar-backdrop" onclick="window.kpApp.toggleSidebar(false)"></div>
        <aside id="app-sidebar" class="app-sidebar">
          <div>
            <a href="#/" class="brand-logo inverse">
              <span class="logo-icon">${icons.sprout}</span>
              <span>Kisan<span class="accent-text">Procure</span></span>
            </a>
          </div>

          <div class="sidebar-section-title">${areaTitle}</div>

          <nav class="sidebar-nav">
            ${navItems.map(item => `
              <a href="${item.href}" class="nav-link ${currentHash === item.href ? 'active' : ''}">
                ${icons[item.icon] || ''}
                <span>${item.label}</span>
              </a>
            `).join('')}
          </nav>

          <div class="sidebar-footer">
            <a href="#/farmer/notifications" class="nav-link ${currentHash === '#/farmer/notifications' ? 'active' : ''}">
              ${icons.bell}
              <span style="flex: 1;">${t('notifications')}</span>
              ${unreadCount > 0 ? `<span class="badge badge-accent" style="padding: 0.15rem 0.45rem;">${unreadCount}</span>` : ''}
            </a>
            ${area === 'farmer' ? `
              <a href="#/farmer/help" class="nav-link ${currentHash === '#/farmer/help' ? 'active' : ''}">
                ${icons.help}
                <span>${t('helpCenter')}</span>
              </a>
              <a href="#/farmer/profile" class="nav-link ${currentHash === '#/farmer/profile' ? 'active' : ''}">
                ${icons.settings}
                <span>${t('settings')}</span>
              </a>
            ` : ''}
            <button onclick="window.kpApp.logout()" class="nav-link" style="width: 100%; text-align: left; background: none; border: none; cursor: pointer;">
              ${icons.logOut}
              <span>${t('exitDemo')}</span>
            </button>
          </div>
        </aside>

        <div class="app-main-content">
          <header class="app-header">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <button class="mobile-menu-btn" onclick="window.kpApp.toggleSidebar(true)">
                ${icons.menu}
              </button>
              <div>
                <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${t('goodMorning')},</p>
                <p style="font-weight: 700; font-size: 0.95rem;">${user.name}</p>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.75rem;">
              ${renderLanguageSelector()}
              <a href="#/farmer/profile" class="user-avatar-btn">
                <span class="user-avatar">${user.initials || 'KP'}</span>
              </a>
            </div>
          </header>

          <main class="app-page-body">
            ${contentHtml}
          </main>
        </div>
      </div>
    `;
  }

  function pageHeading(eyebrow, title, description, actionHtml = '') {
    return `
      <div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 1rem; margin-bottom: 1.75rem;">
        <div>
          ${eyebrow ? `<p style="font-size: 0.6875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: hsl(var(--primary));">${eyebrow}</p>` : ''}
          <h1 class="font-serif" style="font-size: 2.15rem; font-weight: 700; letter-spacing: -0.035em; line-height: 1.1; margin-top: 0.35rem;">${title}</h1>
          ${description ? `<p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); max-width: 680px; margin-top: 0.35rem; line-height: 1.5;">${description}</p>` : ''}
        </div>
        ${actionHtml}
      </div>
    `;
  }

  // --- VIEWS ---

  // 1. Landing Page
  function renderLanding() {
    const user = window.kpStore.getCurrentUser();
    return `
      <div style="min-height: 100vh; background-color: hsl(var(--background));">
        <header style="max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <a href="#/" class="brand-logo">
            <span class="logo-icon">${icons.sprout}</span>
            <span>Kisan<span class="accent-text">Procure</span></span>
          </a>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            ${renderLanguageSelector()}
            <a href="#/login" class="btn btn-primary">
              ${t('enterDemo')} ${icons.arrowRight}
            </a>
          </div>
        </header>

        <main>
          <!-- Hero Section -->
          <section style="max-width: 1280px; margin: 0 auto; padding: 2rem 1.5rem 4rem; display: grid; gap: 3rem; grid-template-columns: 1fr;" class="lg:grid-2">
            <div style="align-self: center; max-width: 600px;">
              <span class="badge badge-accent">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: hsl(var(--primary));"></span>
                ${t('heroBadge')}
              </span>
              <h1 class="font-serif" style="font-size: 3.5rem; font-weight: 800; line-height: 0.98; letter-spacing: -0.04em; margin-top: 1.5rem;">
                ${t('heroTitle1')}<br />
                <span style="color: hsl(var(--primary));">${t('heroTitle2')}</span>
              </h1>
              <p style="font-size: 1.125rem; color: hsl(var(--muted-foreground)); line-height: 1.7; margin-top: 1.5rem;">
                ${t('heroSub')}
              </p>
              <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem;">
                <a href="#/farmer/book" class="btn btn-primary btn-lg">
                  ${t('startDemo')} ${icons.arrowRight}
                </a>
                <a href="#how-it-works" class="btn btn-secondary btn-lg">
                  ${t('seeHowItWorks')}
                </a>
              </div>
              <div style="display: flex; gap: 2.5rem; border-top: 1px solid hsl(var(--border)); padding-top: 1.5rem; margin-top: 3rem;">
                <div>
                  <p class="font-serif" style="font-size: 1.5rem; font-weight: 700;">Live GPS</p>
                  <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Geospatial Routing</p>
                </div>
                <div>
                  <p class="font-serif" style="font-size: 1.5rem; font-weight: 700;">4 Centers</p>
                  <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Real-time Queues</p>
                </div>
                <div>
                  <p class="font-serif" style="font-size: 1.5rem; font-weight: 700;">Direct DBT</p>
                  <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">MSP Settlement</p>
                </div>
              </div>
            </div>

            <!-- Hero Visual Card Stack -->
            <div style="position: relative; min-height: 440px;">
              <div style="background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); border-radius: 1.75rem; padding: 1.75rem; box-shadow: var(--shadow-xl);">
                <div style="display: flex; align-items: center; justify-content: space-between; opacity: 0.85; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em;">
                  <span>Live Location Matrix</span>
                  ${icons.mapPin}
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.75rem;">
                  <div style="background-color: rgba(255,255,255,0.12); padding: 1rem; border-radius: 1rem;">
                    <p style="font-size: 0.75rem; opacity: 0.75;">Nearest Center</p>
                    <p class="font-serif" style="font-size: 1.25rem; font-weight: 700; margin-top: 0.25rem;">4.2 km</p>
                    <p style="font-size: 0.75rem; opacity: 0.75; margin-top: 0.25rem;">~12 min tractor drive</p>
                  </div>
                  <div style="background-color: hsl(var(--accent)); color: hsl(var(--accent-foreground)); padding: 1rem; border-radius: 1rem;">
                    <p style="font-size: 0.75rem; font-weight: 600; opacity: 0.85;">${t('liveQueue')}</p>
                    <p class="font-serif" style="font-size: 2rem; font-weight: 800; line-height: 1; margin-top: 0.25rem;">3</p>
                    <p style="font-size: 0.75rem; opacity: 0.85; margin-top: 0.25rem;">trucks ahead of you</p>
                  </div>
                </div>

                <div style="background-color: hsl(var(--card)); color: hsl(var(--card-foreground)); border-radius: 1rem; padding: 1.25rem; margin-top: 1rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem;">
                    <span style="font-weight: 700;">Live Grid Status</span>
                    <span style="font-weight: 700; color: hsl(var(--primary));">Synced with GPS</span>
                  </div>
                  <div style="height: 8px; border-radius: 9999px; background-color: hsl(var(--muted)); margin-top: 0.75rem; overflow: hidden;">
                    <div style="height: 100%; width: 100%; border-radius: 9999px; background-color: hsl(var(--accent));"></div>
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(4, 1fr); text-align: center; font-size: 0.6875rem; font-weight: 700; color: hsl(var(--muted-foreground)); margin-top: 1rem;">
                    <span style="color: hsl(var(--primary));">📍 Geotag</span>
                    <span style="color: hsl(var(--primary));">🏢 Centers</span>
                    <span style="color: hsl(var(--primary));">🚜 Route</span>
                    <span style="color: hsl(var(--primary));">💳 DBT</span>
                  </div>
                </div>
              </div>

              <div class="card" style="padding: 1rem 1.25rem; margin-top: 1rem; display: flex; align-items: center; gap: 1rem; box-shadow: var(--shadow-lg);">
                <span style="width: 40px; height: 40px; border-radius: 0.75rem; background-color: hsl(var(--secondary)); color: hsl(var(--primary)); display: grid; place-items: center;">
                  ${icons.check}
                </span>
                <div>
                  <p style="font-weight: 700; font-size: 0.875rem;">Instant MSP Disbursal Active</p>
                  <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">Linked with Aadhaar & NPCI Direct Benefit Transfer</p>
                </div>
              </div>
            </div>
          </section>

          <!-- How it Works -->
          <section id="how-it-works" style="max-width: 1280px; margin: 0 auto; padding: 4rem 1.5rem;">
            <div style="max-width: 600px;">
              <p style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: hsl(var(--primary));">${t('seeHowItWorks')}</p>
              <h2 class="font-serif" style="font-size: 2.5rem; font-weight: 700; letter-spacing: -0.03em; margin-top: 0.5rem;">Less waiting. Real-time knowing.</h2>
            </div>

            <div class="grid-3" style="margin-top: 3rem;">
              <div class="card" style="padding: 1.75rem;">
                <div style="display: flex; justify-content: space-between; color: hsl(var(--primary));">
                  ${icons.mapPin}
                  <span class="font-mono" style="font-size: 0.75rem; font-weight: 700;">01</span>
                </div>
                <h3 class="font-serif" style="font-size: 1.25rem; font-weight: 700; margin-top: 2rem;">${t('step1Title')}</h3>
                <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); line-height: 1.6; margin-top: 0.5rem;">${t('step1Sub')}</p>
              </div>

              <div class="card" style="padding: 1.75rem;">
                <div style="display: flex; justify-content: space-between; color: hsl(var(--primary));">
                  ${icons.ticket}
                  <span class="font-mono" style="font-size: 0.75rem; font-weight: 700;">02</span>
                </div>
                <h3 class="font-serif" style="font-size: 1.25rem; font-weight: 700; margin-top: 2rem;">${t('step2Title')}</h3>
                <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); line-height: 1.6; margin-top: 0.5rem;">${t('step2Sub')}</p>
              </div>

              <div class="card" style="padding: 1.75rem;">
                <div style="display: flex; justify-content: space-between; color: hsl(var(--primary));">
                  ${icons.creditCard}
                  <span class="font-mono" style="font-size: 0.75rem; font-weight: 700;">03</span>
                </div>
                <h3 class="font-serif" style="font-size: 1.25rem; font-weight: 700; margin-top: 2rem;">${t('step3Title')}</h3>
                <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); line-height: 1.6; margin-top: 0.5rem;">${t('step3Sub')}</p>
              </div>
            </div>
          </section>
        </main>

        <footer style="max-width: 1280px; margin: 0 auto; padding: 2rem 1.5rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; font-size: 0.875rem; color: hsl(var(--muted-foreground));">
          <a href="#/" class="brand-logo">
            <span class="logo-icon">${icons.sprout}</span>
            <span>Kisan<span class="accent-text">Procure</span></span>
          </a>
          <span>© 2025 KisanProcure. Direct Procurement & Token Orchestration Demo.</span>
        </footer>
      </div>
    `;
  }

  // 2. Login Role Selector
  function renderLogin() {
    const roles = window.kpStore.getState().demoUsers;
    const selectedRole = window.kpApp.selectedRole || 'FARMER';

    return `
      <div style="min-height: 100vh; background-color: hsla(var(--secondary), 0.35);">
        <header style="max-width: 1140px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <a href="#/" class="brand-logo">
            <span class="logo-icon">${icons.sprout}</span>
            <span>Kisan<span class="accent-text">Procure</span></span>
          </a>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            ${renderLanguageSelector()}
            <span class="badge badge-accent">${t('demoMode')}</span>
          </div>
        </header>

        <main style="max-width: 1140px; margin: 0 auto; padding: 2rem 1.5rem 4rem; display: grid; gap: 3rem;" class="lg:grid-2">
          <div style="align-self: center;">
            <p style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: hsl(var(--primary));">${t('brandName')}</p>
            <h1 class="font-serif" style="font-size: 3rem; font-weight: 800; line-height: 1; letter-spacing: -0.04em; margin-top: 0.75rem;">
              Pick a role.<br />Explore the network.
            </h1>
            <p style="color: hsl(var(--muted-foreground)); line-height: 1.6; margin-top: 1.25rem; font-size: 1rem;">
              Experience the full interactive geospatial demo from the viewpoint of a Farmer, Center Procurement Officer, or State Administrator.
            </p>
            <a href="#/" style="display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 700; color: hsl(var(--primary)); margin-top: 2rem;">
              <span style="transform: rotate(180deg); display: inline-block;">${icons.arrowRight}</span> Back to overview
            </a>
          </div>

          <div class="card" style="padding: 2rem; box-shadow: var(--shadow-xl);">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <h2 class="font-serif" style="font-size: 1.5rem; font-weight: 700;">${t('enterDemo')}</h2>
                <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-top: 0.25rem;">Select the workspace you want to tour.</p>
              </div>
              <div style="color: hsl(var(--primary));">${icons.shieldCheck}</div>
            </div>

            <div style="display: grid; gap: 0.75rem; margin-top: 1.75rem;">
              ${roles.map(r => {
                const isSelected = selectedRole === r.role;
                const iconSvg = r.role === 'FARMER' ? icons.tractor : r.role === 'PROCUREMENT_OFFICER' ? icons.activity : icons.barChart;
                return `
                  <button onclick="window.kpApp.selectRole('${r.role}')" class="card" style="padding: 1rem 1.25rem; text-align: left; display: flex; align-items: flex-start; gap: 1rem; border: 2px solid ${isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}; background-color: ${isSelected ? 'hsla(var(--secondary), 0.7)' : 'hsl(var(--card))'};">
                    <span style="width: 44px; height: 44px; border-radius: 0.75rem; background-color: ${isSelected ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}; color: ${isSelected ? 'hsl(var(--primary-foreground))' : 'hsl(var(--primary))'}; display: grid; place-items: center; flex-shrink: 0;">
                      ${iconSvg}
                    </span>
                    <span style="flex: 1;">
                      <span style="display: block; font-weight: 700; font-size: 0.95rem;">${r.title}</span>
                      <span style="display: block; font-size: 0.8125rem; color: hsl(var(--muted-foreground)); line-height: 1.4; margin-top: 0.2rem;">${r.description}</span>
                    </span>
                    ${isSelected ? `<span style="color: hsl(var(--primary));">${icons.check}</span>` : ''}
                  </button>
                `;
              }).join('')}
            </div>

            <button onclick="window.kpApp.enterWorkspace()" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 1.75rem;">
              ${t('enterDemo')} ${icons.arrowRight}
            </button>
          </div>
        </main>
      </div>
    `;
  }

  // 3. Farmer Dashboard Overview
  function renderFarmerDashboard() {
    const state = window.kpStore.getState();
    const user = window.kpStore.getCurrentUser();
    const activeBooking = state.bookings.find(b => !['CANCELLED', 'PAYMENT_COMPLETED', 'REJECTED'].includes(b.status)) || state.bookings[0];
    const totalEarned = state.bookings.filter(b => b.status === 'PAYMENT_COMPLETED').reduce((acc, b) => acc + (b.amount || 0), 0);
    const totalQty = state.bookings.filter(b => b.status === 'PAYMENT_COMPLETED').reduce((acc, b) => acc + (b.netWeight || b.quantity || 0), 0);

    const content = `
      ${renderLocationBanner('Your Live Location & Procurement Grid', 'Procurement centers and active farmer queues are live-calibrated relative to your GPS coordinates.')}

      ${pageHeading(t('farmerWorkspace'), 'Stay ahead of your harvest day.', 'Track nearby centers, live distances, queue movements, and payment disbursals.')}

      <div class="kp-stagger grid-4" style="margin-bottom: 2rem;">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon primary">${icons.sprout}</span>
          </div>
          <p class="stat-value">${state.crops.length}</p>
          <p class="stat-label">${t('registeredCrops')}</p>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon accent">${icons.ticket}</span>
          </div>
          <p class="stat-value">${state.bookings.filter(b => b.status === 'PAYMENT_COMPLETED').length}</p>
          <p class="stat-label">${t('completedProcurements')}</p>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon teal">${icons.scale}</span>
          </div>
          <p class="stat-value">${totalQty} <span style="font-size: 1rem; font-weight: 600;">qtl</span></p>
          <p class="stat-label">${t('quantityProcured')}</p>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon primary">${icons.creditCard}</span>
          </div>
          <p class="stat-value font-serif" style="font-size: 1.45rem;">${money(totalEarned)}</p>
          <p class="stat-label">${t('totalEarned')}</p>
        </div>
      </div>

      <!-- Live Map Card -->
      <div class="kp-map-card kp-stagger" style="margin-bottom: 2rem;">
        <div class="kp-map-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: hsl(var(--primary));">${icons.mapPin}</span>
            <span style="font-weight: 700; font-size: 0.95rem;">Live Procurement Centers Map (Relative to Your Location)</span>
          </div>
          <a href="#/farmer/book" class="btn btn-primary btn-sm">
            ${icons.calendar} ${t('bookSlot')}
          </a>
        </div>
        <div id="farmer-dashboard-map" class="kp-map-container"></div>
        <div class="kp-map-legend">
          <span class="legend-item"><span style="color: #059669;">●</span> Your Location (Farmer)</span>
          <span class="legend-item"><span style="color: #059669;">🏢</span> Low Crowd Center</span>
          <span class="legend-item"><span style="color: #d97706;">🏢</span> Medium Crowd Center</span>
          <span class="legend-item"><span style="color: #dc2626;">🏢</span> High Crowd Center</span>
          <span class="legend-item"><span style="color: #2563eb;">🚜</span> Nearby Active Farmers</span>
        </div>
      </div>

      <!-- Smart Selling Price Teaser Banner -->
      <div class="card kp-stagger" style="padding: 1.25rem 1.5rem; margin-bottom: 2rem; background: linear-gradient(135deg, hsla(var(--primary), 0.08) 0%, hsla(var(--secondary), 0.6) 100%); border: 1.5px solid hsla(var(--primary), 0.3); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span style="width: 48px; height: 48px; border-radius: 1rem; background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); display: grid; place-items: center; font-size: 1.35rem;">
            ${icons.trendingUp}
          </span>
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <h3 class="font-serif" style="font-size: 1.15rem; font-weight: 700;">${t('smartPrice')} & Mandi Comparison</h3>
              <span class="badge badge-accent">Live Multi-Market Comparison</span>
            </div>
            <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">
              Compare nearest mandis, calculate transport freight, and discover highest net profit before you sell.
            </p>
          </div>
        </div>
        <a href="#/farmer/smart-price" class="btn btn-primary">
          ${t('compareMarkets')} ${icons.arrowRight}
        </a>
      </div>

      <div class="kp-stagger" style="display: grid; gap: 1.5rem;" class="lg:grid-2">
        <!-- Active Token / Next Step Card -->
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="font-serif" style="font-size: 1.25rem; font-weight: 700;">Active Token & Journey</h2>
              <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">Live updates on your center arrival</p>
            </div>
            ${statusBadge(activeBooking ? activeBooking.status : 'READY')}
          </div>
          <div class="card-body">
            ${activeBooking ? `
              <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <span class="font-mono" style="width: 60px; height: 60px; border-radius: 1rem; background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); font-size: 1.25rem; font-weight: 800; display: grid; place-items: center;">
                    ${activeBooking.token}
                  </span>
                  <div>
                    <p style="font-weight: 700; font-size: 1.1rem;">${activeBooking.crop} • ${activeBooking.quantity} ${activeBooking.unit}</p>
                    <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground)); display: flex; align-items: center; gap: 0.35rem; margin-top: 0.25rem;">
                      ${icons.mapPin} ${activeBooking.center}
                    </p>
                  </div>
                </div>
                <a href="#/farmer/queue" class="btn btn-secondary">
                  ${t('liveQueue')} ${icons.chevronRight}
                </a>
              </div>

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; border-top: 1px solid hsl(var(--border)); padding-top: 1.25rem; margin-top: 1.5rem;">
                <div>
                  <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${t('slot')}</p>
                  <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0.2rem;">${activeBooking.slot}</p>
                </div>
                <div>
                  <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${t('position')}</p>
                  <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0.2rem;">#${activeBooking.queuePosition || '1'}</p>
                </div>
                <div>
                  <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${t('wait')}</p>
                  <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0.2rem;">${activeBooking.waitMinutes || 15} min</p>
                </div>
              </div>
            ` : `
              <div style="text-align: center; padding: 2rem 1rem;">
                <p style="font-weight: 700; font-size: 1.125rem;">Nothing booked yet</p>
                <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-top: 0.35rem;">Choose a nearby center and a time slot that works for you.</p>
                <a href="#/farmer/book" class="btn btn-primary" style="margin-top: 1rem;">${t('bookSlot')}</a>
              </div>
            `}
          </div>
        </div>

        <!-- Notifications -->
        <div class="card">
          <div class="card-header">
            <h2 class="font-serif" style="font-size: 1.25rem; font-weight: 700;">${t('notifications')}</h2>
            <a href="#/farmer/notifications" style="font-size: 0.75rem; font-weight: 700; color: hsl(var(--primary));">View all</a>
          </div>
          <div style="display: flex; flex-direction: column;">
            ${state.notifications.slice(0, 3).map(n => `
              <div style="padding: 1rem 1.25rem; border-bottom: 1px solid hsl(var(--border)); display: flex; gap: 0.75rem;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${n.unread ? 'hsl(var(--accent))' : 'hsl(var(--border))'}; margin-top: 0.4rem; flex-shrink: 0;"></span>
                <div>
                  <p style="font-weight: 700; font-size: 0.875rem;">${n.title}</p>
                  <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); line-height: 1.4; margin-top: 0.2rem;">${n.message}</p>
                  <p style="font-size: 0.6875rem; color: hsl(var(--muted-foreground)); margin-top: 0.25rem;">${formatDate(n.createdAt)}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    return renderShell(content, 'farmer');
  }

  // --- Historical Price Trend SVG Chart Helper ---
  function renderPriceTrendSvg(trendData) {
    if (!trendData || !trendData.points || trendData.points.length === 0) return '';
    const pts = trendData.points;
    const w = 600;
    const h = 200;
    const padTop = 20;
    const padBottom = 25;
    const padLeft = 45;
    const padRight = 20;

    const minP = Math.min(...pts.map(p => p.price), trendData.points[0].msp) - 25;
    const maxP = Math.max(...pts.map(p => p.price)) + 35;
    const rangeP = Math.max(1, maxP - minP);

    const getX = i => padLeft + (i / (pts.length - 1)) * (w - padLeft - padRight);
    const getY = price => h - padBottom - ((price - minP) / rangeP) * (h - padTop - padBottom);

    const coords = pts.map((p, i) => ({ x: getX(i), y: getY(p.price), price: p.price, date: p.date, msp: p.msp }));

    const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ');
    const areaPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${(h - padBottom).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(h - padBottom).toFixed(1)} Z`;

    const mspY = getY(trendData.points[0].msp);

    const gridPrices = [
      Math.round(minP + rangeP * 0.25),
      Math.round(minP + rangeP * 0.55),
      Math.round(minP + rangeP * 0.85)
    ];

    return `
      <div style="position: relative; width: 100%;">
        <svg viewBox="0 0 ${w} ${h}" class="price-svg-chart">
          <defs>
            <linearGradient id="trendAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#059669" stop-opacity="0.32" />
              <stop offset="100%" stop-color="#059669" stop-opacity="0.0" />
            </linearGradient>
          </defs>

          <!-- Horizontal Grid Lines & Price Labels -->
          ${gridPrices.map(gp => {
            const gy = getY(gp);
            return `
              <line x1="${padLeft}" y1="${gy}" x2="${w - padRight}" y2="${gy}" stroke="hsl(var(--border))" stroke-dasharray="3,3" stroke-width="1" />
              <text x="${padLeft - 6}" y="${gy + 3}" font-size="9" fill="hsl(var(--muted-foreground))" text-anchor="end" font-family="monospace">₹${gp}</text>
            `;
          }).join('')}

          <!-- MSP Baseline Reference Line -->
          <line x1="${padLeft}" y1="${mspY}" x2="${w - padRight}" y2="${mspY}" stroke="#10b981" stroke-dasharray="4,4" stroke-width="1.5" opacity="0.8" />
          <text x="${w - padRight}" y="${mspY - 5}" font-size="9" fill="#059669" text-anchor="end" font-weight="bold">MSP Baseline: ₹${trendData.points[0].msp}</text>

          <!-- Shaded Area & Line Curve -->
          <path d="${areaPath}" fill="url(#trendAreaGrad)" />
          <path d="${linePath}" fill="none" stroke="#059669" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" />

          <!-- Interactive Data Points -->
          ${coords.map(c => `
            <circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="3.5" fill="#ffffff" stroke="#059669" stroke-width="2">
              <title>${c.date}: ₹${c.price}/qtl</title>
            </circle>
          `).join('')}

          <!-- X-Axis Labels -->
          <text x="${padLeft}" y="${h - 6}" font-size="9" fill="hsl(var(--muted-foreground))" text-anchor="start">${pts[0].date}</text>
          <text x="${w / 2}" y="${h - 6}" font-size="9" fill="hsl(var(--muted-foreground))" text-anchor="middle">${pts[Math.floor(pts.length / 2)].date}</text>
          <text x="${w - padRight}" y="${h - 6}" font-size="9" fill="hsl(var(--muted-foreground))" text-anchor="end">${pts[pts.length - 1].date}</text>
        </svg>
      </div>
    `;
  }

  // 3b. Smart Selling Price & Market Comparison View
  function renderSmartPrice() {
    const state = window.kpStore.getState();
    const user = window.kpStore.getCurrentUser();
    const coords = user?.coordinates || { lat: 22.7196, lng: 75.8577 };

    const selectedCrop = window.kpApp.smartPriceCrop || (state.crops[0] ? state.crops[0].name : 'Wheat');
    const selectedQty = Number(window.kpApp.smartPriceQty || 25);
    const selectedTransport = window.kpApp.smartPriceTransport || 'tractor';
    const selectedTimeframe = window.kpApp.smartPriceTimeframe || '30D';
    const selectedView = window.kpApp.smartPriceView || 'cards';
    const selectedSort = window.kpApp.smartPriceSort || 'netReturn';

    const cropMasterKeys = Object.keys(window.CROP_MASTER_DATA || { 'Wheat': {}, 'Soybean': {}, 'Mustard': {} });

    // Generate real-time candidate markets around user location
    const marketsRaw = window.generateNearbyMarkets(coords.lat, coords.lng, user.location, selectedCrop);
    const marketsWithMetrics = marketsRaw.map(m => window.calculateMarketMetrics(m, selectedQty, selectedTransport));

    // Sort markets
    const sortedMarkets = [...marketsWithMetrics].sort((a, b) => {
      if (selectedSort === 'distance') return a.distance - b.distance;
      if (selectedSort === 'price') return b.pricePerQtl - a.pricePerQtl;
      return b.estimatedNetReturn - a.estimatedNetReturn;
    });

    // Best Market Recommendation
    const recommendation = window.getBestMarketRecommendation(marketsWithMetrics, selectedCrop, selectedQty, selectedTransport);
    const bestMarket = recommendation ? recommendation.bestMarket : sortedMarkets[0];

    // Historical Price Trend
    const trendData = window.getCropPriceTrends(selectedCrop, selectedTimeframe);

    // Active price alerts
    const allAlerts = state.priceAlerts || [];

    const chartSvgHtml = renderPriceTrendSvg(trendData);

    const content = `
      ${renderLocationBanner(t('smartSellingPriceTitle'), 'Real-time distance, transport costs, and net returns dynamically calculated from your location.')}

      ${pageHeading(t('smartPrice'), t('smartSellingPriceTitle'), t('smartSellingPriceSub'), `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button onclick="window.kpApp.openSetPriceAlertModal('${selectedCrop}')" class="btn btn-secondary">
            ${icons.bell} ${t('setPriceAlert')}
          </button>
          <button onclick="window.kpApp.refreshView()" class="btn btn-ghost">
            ${icons.refresh} ${t('refresh')}
          </button>
        </div>
      `)}

      <!-- 1. Interactive Crop, Quantity & Transport Selector Card -->
      <div class="card kp-stagger" style="padding: 1.5rem; margin-bottom: 1.75rem;">
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          
          <!-- Crop Chips Bar -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
              <label class="form-label" style="font-size: 0.8125rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: hsl(var(--primary));">
                ${t('selectCrop')}
              </label>
              <span class="badge badge-accent font-mono" style="font-size: 0.75rem;">
                MSP: ₹${(window.CROP_MASTER_DATA[selectedCrop]?.msp || 2275).toLocaleString('en-IN')}/qtl
              </span>
            </div>
            <div class="quick-crop-bar">
              ${cropMasterKeys.map(cropName => {
                const info = window.CROP_MASTER_DATA[cropName];
                const isActive = cropName === selectedCrop;
                return `
                  <button onclick="window.kpApp.setSmartPriceCrop('${cropName}')" class="quick-crop-chip ${isActive ? 'active' : ''}">
                    <span>${info.icon || '🌾'}</span>
                    <span>${cropName}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Quantity & Transport Row -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; border-top: 1px dashed hsl(var(--border)); padding-top: 1.25rem;">
            
            <!-- Produce Quantity Input -->
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label class="form-label">${t('enterQuantity')}</label>
                <div style="display: flex; gap: 0.35rem;">
                  <button onclick="window.kpApp.setSmartPriceQty(10)" class="btn btn-ghost" style="padding: 0.15rem 0.45rem; font-size: 0.7rem; border-radius: 0.4rem; background: hsla(var(--muted), 0.5);">10q</button>
                  <button onclick="window.kpApp.setSmartPriceQty(25)" class="btn btn-ghost" style="padding: 0.15rem 0.45rem; font-size: 0.7rem; border-radius: 0.4rem; background: hsla(var(--muted), 0.5);">25q</button>
                  <button onclick="window.kpApp.setSmartPriceQty(50)" class="btn btn-ghost" style="padding: 0.15rem 0.45rem; font-size: 0.7rem; border-radius: 0.4rem; background: hsla(var(--muted), 0.5);">50q</button>
                  <button onclick="window.kpApp.setSmartPriceQty(100)" class="btn btn-ghost" style="padding: 0.15rem 0.45rem; font-size: 0.7rem; border-radius: 0.4rem; background: hsla(var(--muted), 0.5);">100q</button>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.35rem;">
                <input type="number" min="1" max="1000" step="1" id="smart-price-qty" class="form-input font-mono" style="font-size: 1.15rem; font-weight: 700;" value="${selectedQty}" onchange="window.kpApp.setSmartPriceQty(this.value)" />
                <span style="font-weight: 700; color: hsl(var(--muted-foreground)); font-size: 0.95rem;">Quintal</span>
              </div>
            </div>

            <!-- Transport Vehicle Mode -->
            <div class="form-group">
              <label class="form-label">${t('transportVehicle')}</label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-top: 0.35rem;">
                <button onclick="window.kpApp.setSmartPriceTransport('tractor')" class="card" style="padding: 0.65rem 0.5rem; text-align: center; border: 1.5px solid ${selectedTransport === 'tractor' ? 'hsl(var(--primary))' : 'hsl(var(--border))'}; background: ${selectedTransport === 'tractor' ? 'hsla(var(--secondary), 0.8)' : 'hsl(var(--card))'}; cursor: pointer;">
                  <span style="display: block; font-size: 1.25rem;">🚜</span>
                  <span style="display: block; font-size: 0.75rem; font-weight: 700; margin-top: 0.2rem;">${t('tractorTrolley')}</span>
                </button>
                <button onclick="window.kpApp.setSmartPriceTransport('truck')" class="card" style="padding: 0.65rem 0.5rem; text-align: center; border: 1.5px solid ${selectedTransport === 'truck' ? 'hsl(var(--primary))' : 'hsl(var(--border))'}; background: ${selectedTransport === 'truck' ? 'hsla(var(--secondary), 0.8)' : 'hsl(var(--card))'}; cursor: pointer;">
                  <span style="display: block; font-size: 1.25rem;">🚛</span>
                  <span style="display: block; font-size: 0.75rem; font-weight: 700; margin-top: 0.2rem;">${t('miniTruck')}</span>
                </button>
                <button onclick="window.kpApp.setSmartPriceTransport('tempo')" class="card" style="padding: 0.65rem 0.5rem; text-align: center; border: 1.5px solid ${selectedTransport === 'tempo' ? 'hsl(var(--primary))' : 'hsl(var(--border))'}; background: ${selectedTransport === 'tempo' ? 'hsla(var(--secondary), 0.8)' : 'hsl(var(--card))'}; cursor: pointer;">
                  <span style="display: block; font-size: 1.25rem;">🛺</span>
                  <span style="display: block; font-size: 0.75rem; font-weight: 700; margin-top: 0.2rem;">${t('smallTempo')}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- 2. "Best Market to Sell" Hero Recommendation Card -->
      ${bestMarket ? `
        <div class="recommendation-hero-card kp-stagger" style="margin-bottom: 2rem;">
          <div class="hero-header">
            <div>
              <span class="recommendation-badge">
                ⭐ ${t('bestMarketToSell')}
              </span>
              <h2 class="font-serif" style="font-size: 1.85rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 0.75rem; line-height: 1.15;">
                ${bestMarket.name}
              </h2>
              <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); display: flex; align-items: center; gap: 0.4rem; margin-top: 0.35rem; flex-wrap: wrap;">
                ${icons.mapPin} ${bestMarket.location} •
                <span class="distance-pill">${bestMarket.distance} km away</span>
                <span class="eta-pill">${icons.clock} ~${bestMarket.etaMinutes} min</span>
                <span class="badge badge-secondary" style="font-size: 0.7rem;">${bestMarket.typeLabel}</span>
              </p>
            </div>

            <!-- Net Return Highlight Block -->
            <div style="text-align: right; background: hsla(var(--card), 0.85); padding: 1rem 1.35rem; border-radius: 1rem; border: 1px solid hsla(var(--primary), 0.2); box-shadow: var(--shadow-sm);">
              <p style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: hsl(var(--muted-foreground));">
                ${t('estimatedNetReturn')}
              </p>
              <p class="font-serif font-mono" style="font-size: 2.25rem; font-weight: 800; color: hsl(var(--primary)); line-height: 1.05; margin-top: 0.25rem;">
                ${money(bestMarket.estimatedNetReturn)}
              </p>
              <p style="font-size: 0.8125rem; font-weight: 700; color: hsl(var(--primary)); margin-top: 0.2rem;">
                ₹${bestMarket.netRatePerQtl.toLocaleString('en-IN')}/qtl net in hand (${selectedQty} qtl)
              </p>
            </div>
          </div>

          <!-- Recommendation Reason Box -->
          <div class="recommendation-reason-box">
            <div style="display: flex; align-items: flex-start; gap: 0.65rem;">
              <span style="font-size: 1.15rem; color: hsl(var(--primary));">💡</span>
              <div>
                <p style="font-weight: 800; font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.08em; color: hsl(var(--primary));">
                  ${t('whyRecommended')}
                </p>
                <p style="margin-top: 0.25rem; font-size: 0.925rem; line-height: 1.55;">
                  ${recommendation.reason}
                </p>
              </div>
            </div>
          </div>

          <!-- Quick Metrics & Direct Actions Bar -->
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; border-top: 1px dashed hsla(var(--primary), 0.3); padding-top: 1.25rem; margin-top: 1.5rem;">
            <div style="display: flex; flex-wrap: wrap; gap: 1.25rem; font-size: 0.875rem;">
              <div>
                <span style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${t('sellingPricePerQtl')}:</span>
                <span class="font-mono" style="font-weight: 800; color: hsl(var(--foreground)); margin-left: 0.25rem;">₹${bestMarket.pricePerQtl.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${t('transportCost')}:</span>
                <span class="font-mono" style="font-weight: 700; color: #dc2626; margin-left: 0.25rem;">- ₹${bestMarket.transportCost.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${t('priceSource')}:</span>
                <span style="font-weight: 600; color: hsl(var(--muted-foreground)); margin-left: 0.25rem;">${bestMarket.priceSource}</span>
              </div>
            </div>

            <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
              <button onclick="window.kpApp.bookAtMarket('${bestMarket.id}', '${selectedCrop}', ${selectedQty})" class="btn btn-primary">
                ${icons.calendar} ${t('bookAtThisMarket')} ${icons.arrowRight}
              </button>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${bestMarket.coordinates.lat},${bestMarket.coordinates.lng}" target="_blank" class="btn btn-secondary">
                ${icons.navigation} ${t('openInMap')}
              </a>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 3. Market Comparison Section (Cards or Table View) -->
      <div class="kp-stagger" style="margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <h2 class="font-serif" style="font-size: 1.5rem; font-weight: 700;">
              ${t('marketComparison')} (${sortedMarkets.length} Mandis & Hubs)
            </h2>
            <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">
              Showing crop selling price, transport freight, and net return breakdown relative to your location.
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
            <!-- Sort Selector -->
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span style="font-size: 0.75rem; font-weight: 700; color: hsl(var(--muted-foreground));">${t('sortBy')}:</span>
              <select onchange="window.kpApp.setSmartPriceSort(this.value)" class="form-select" style="padding: 0.35rem 0.75rem; font-size: 0.8125rem; width: auto;">
                <option value="netReturn" ${selectedSort === 'netReturn' ? 'selected' : ''}>${t('sortNetReturn')}</option>
                <option value="distance" ${selectedSort === 'distance' ? 'selected' : ''}>${t('sortDistance')}</option>
                <option value="price" ${selectedSort === 'price' ? 'selected' : ''}>${t('sortPrice')}</option>
              </select>
            </div>

            <!-- View Switcher (Cards vs Table) -->
            <div style="display: inline-flex; border-radius: 0.6rem; border: 1px solid hsl(var(--border)); overflow: hidden; background: hsl(var(--card));">
              <button onclick="window.kpApp.setSmartPriceView('cards')" class="btn ${selectedView === 'cards' ? 'btn-primary' : 'btn-ghost'}" style="padding: 0.35rem 0.75rem; font-size: 0.75rem; border-radius: 0;">
                ${t('viewCards')}
              </button>
              <button onclick="window.kpApp.setSmartPriceView('table')" class="btn ${selectedView === 'table' ? 'btn-primary' : 'btn-ghost'}" style="padding: 0.35rem 0.75rem; font-size: 0.75rem; border-radius: 0;">
                ${t('viewTable')}
              </button>
            </div>
          </div>
        </div>

        ${selectedView === 'cards' ? `
          <!-- Cards Grid View -->
          <div class="market-comparison-grid">
            ${sortedMarkets.map((m) => {
              const isBest = bestMarket && m.id === bestMarket.id;
              return `
                <div class="market-item-card ${isBest ? 'is-best-option' : ''}">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
                      <div>
                        <span class="badge ${m.isDirectGovt ? 'badge-primary' : 'badge-secondary'}" style="font-size: 0.6875rem; margin-bottom: 0.35rem;">
                          ${m.typeLabel}
                        </span>
                        <h3 class="font-serif" style="font-size: 1.2rem; font-weight: 700; line-height: 1.2;">${m.name}</h3>
                        <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">${m.location}</p>
                      </div>
                      ${isBest ? `<span class="badge badge-accent" style="font-weight: 800;">⭐ Best Net Return</span>` : ''}
                    </div>

                    <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.75rem;">
                      <span class="distance-pill">${icons.mapPin} ${m.distance} km</span>
                      <span class="eta-pill">${icons.clock} ~${m.etaMinutes} min</span>
                      <span class="badge-demo-data" style="font-size: 0.65rem; padding: 0.15rem 0.45rem;">${m.dataDisclaimer}</span>
                    </div>

                    <!-- Price & Net Return Stats -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; background: hsla(var(--secondary), 0.6); padding: 0.85rem; border-radius: 0.85rem; margin-top: 1rem;">
                      <div>
                        <p style="font-size: 0.6875rem; color: hsl(var(--muted-foreground)); font-weight: 700; text-transform: uppercase;">${t('sellingPricePerQtl')}</p>
                        <p class="market-price-tag" style="margin-top: 0.15rem;">₹${m.pricePerQtl.toLocaleString('en-IN')}</p>
                        ${m.priceDifference > 0 ? `<span style="font-size: 0.7rem; color: #059669; font-weight: 700;">+₹${m.priceDifference}/qtl vs MSP</span>` : `<span style="font-size: 0.7rem; color: hsl(var(--muted-foreground));">Govt MSP Rate</span>`}
                      </div>
                      <div>
                        <p style="font-size: 0.6875rem; color: hsl(var(--muted-foreground)); font-weight: 700; text-transform: uppercase;">${t('estimatedNetReturn')}</p>
                        <p class="font-serif font-mono" style="font-size: 1.35rem; font-weight: 800; color: hsl(var(--primary)); margin-top: 0.15rem;">${money(m.estimatedNetReturn)}</p>
                        <span style="font-size: 0.7rem; color: hsl(var(--primary)); font-weight: 700;">₹${m.netRatePerQtl}/qtl net</span>
                      </div>
                    </div>

                    <!-- Cost Breakdown Details -->
                    <div style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); border-top: 1px dashed hsl(var(--border)); padding-top: 0.75rem; margin-top: 0.85rem; display: flex; flex-direction: column; gap: 0.35rem;">
                      <div style="display: flex; justify-content: space-between;">
                        <span>Total Selling Value (${selectedQty} qtl):</span>
                        <span class="font-mono" style="font-weight: 600;">₹${m.totalSellingValue.toLocaleString('en-IN')}</span>
                      </div>
                      <div style="display: flex; justify-content: space-between; color: #dc2626;">
                        <span>Transport Cost (${m.distance} km, ${m.transportMode}):</span>
                        <span class="font-mono" style="font-weight: 600;">- ₹${m.transportCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div style="display: flex; justify-content: space-between;">
                        <span>Mandi Fee & Handling:</span>
                        <span class="font-mono" style="font-weight: 600;">${m.otherCosts > 0 ? `- ₹${m.otherCosts.toLocaleString('en-IN')}` : '₹0 (Zero Fee)'}</span>
                      </div>
                      <div style="display: flex; justify-content: space-between; color: hsl(var(--muted-foreground)); font-size: 0.6875rem; margin-top: 0.25rem;">
                        <span>Source: ${m.priceSource}</span>
                        <span>${m.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  <div style="margin-top: 1.25rem; display: flex; gap: 0.5rem;">
                    <button onclick="window.kpApp.bookAtMarket('${m.id}', '${selectedCrop}', ${selectedQty})" class="btn ${isBest ? 'btn-primary' : 'btn-secondary'} btn-sm" style="flex: 1; justify-content: center;">
                      ${t('bookSlot')}
                    </button>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${m.coordinates.lat},${m.coordinates.lng}" target="_blank" class="btn btn-ghost btn-sm" style="justify-content: center; padding: 0.35rem 0.6rem;">
                      ${icons.navigation}
                    </a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <!-- Comparison Table View -->
          <div class="comparison-table-wrapper card">
            <table class="kp-compare-table">
              <thead>
                <tr>
                  <th>${t('marketComparison')}</th>
                  <th>${t('sellingPricePerQtl')}</th>
                  <th>${t('distance')} & ETA</th>
                  <th>${t('transportCost')}</th>
                  <th>${t('totalSellingValue')}</th>
                  <th>${t('estimatedNetReturn')}</th>
                  <th>${t('priceSource')}</th>
                  <th>${t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                ${sortedMarkets.map(m => {
                  const isBest = bestMarket && m.id === bestMarket.id;
                  return `
                    <tr class="${isBest ? 'highlight-row' : ''}">
                      <td>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                          ${isBest ? `<span title="Highest Net Return">⭐</span>` : ''}
                          <div>
                            <span style="font-weight: 700; font-size: 0.95rem;">${m.name}</span>
                            <span style="display: block; font-size: 0.75rem; color: hsl(var(--muted-foreground));">${m.location} • <span class="badge-demo-data" style="font-size: 0.65rem; padding: 0.1rem 0.35rem;">Demo</span></span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="font-mono font-serif" style="font-weight: 800; font-size: 1.1rem; color: hsl(var(--primary));">₹${m.pricePerQtl.toLocaleString('en-IN')}</span>
                        <span style="display: block; font-size: 0.7rem; color: hsl(var(--muted-foreground));">${m.priceDifference > 0 ? `+₹${m.priceDifference} vs MSP` : 'Govt MSP'}</span>
                      </td>
                      <td>
                        <span style="font-weight: 700;">${m.distance} km</span>
                        <span style="display: block; font-size: 0.75rem; color: hsl(var(--muted-foreground));">~${m.etaMinutes} min drive</span>
                      </td>
                      <td>
                        <span class="font-mono" style="color: #dc2626; font-weight: 700;">₹${m.transportCost.toLocaleString('en-IN')}</span>
                        <span style="display: block; font-size: 0.7rem; color: hsl(var(--muted-foreground));">${m.transportMode}</span>
                      </td>
                      <td>
                        <span class="font-mono" style="font-weight: 700;">₹${m.totalSellingValue.toLocaleString('en-IN')}</span>
                        <span style="display: block; font-size: 0.7rem; color: hsl(var(--muted-foreground));">${selectedQty} qtl</span>
                      </td>
                      <td>
                        <span class="font-mono font-serif" style="font-weight: 800; font-size: 1.15rem; color: hsl(var(--primary));">₹${m.estimatedNetReturn.toLocaleString('en-IN')}</span>
                        <span style="display: block; font-size: 0.75rem; font-weight: 700; color: hsl(var(--primary));">₹${m.netRatePerQtl}/qtl net</span>
                      </td>
                      <td>
                        <span style="font-size: 0.8125rem; font-weight: 600;">${m.priceSource}</span>
                        <span style="display: block; font-size: 0.7rem; color: hsl(var(--muted-foreground));">${m.lastUpdated}</span>
                      </td>
                      <td>
                        <button onclick="window.kpApp.bookAtMarket('${m.id}', '${selectedCrop}', ${selectedQty})" class="btn ${isBest ? 'btn-primary' : 'btn-secondary'} btn-sm">
                          ${t('bookSlot')}
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>

      <!-- 4. Visual Net Return Breakdown Waterfall & Price Trend Grid -->
      <div class="kp-stagger" style="display: grid; gap: 1.5rem; margin-bottom: 2rem;" class="lg:grid-2">
        
        <!-- Net Return Waterfall Visualizer Card -->
        <div class="net-return-breakdown-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
            <div>
              <p style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: hsl(var(--primary));">
                ${t('estimatedNetReturn')} Breakdown
              </p>
              <h3 class="font-serif" style="font-size: 1.35rem; font-weight: 700; margin-top: 0.2rem;">
                Net Profit Formula: ${selectedCrop} (${selectedQty} qtl)
              </h3>
            </div>
            <span class="badge badge-accent font-mono">${bestMarket?.name.split(' ')[0] || 'Top'} Mandi</span>
          </div>

          <div style="background-color: hsla(var(--secondary), 0.4); border-radius: 0.85rem; padding: 1.25rem;">
            <div class="waterfall-row positive">
              <span style="font-weight: 600;">Gross Selling Value (${selectedQty} qtl × ₹${bestMarket?.pricePerQtl}/qtl):</span>
              <span class="font-mono font-serif" style="font-weight: 800; font-size: 1.1rem;">+ ₹${(bestMarket?.totalSellingValue || 0).toLocaleString('en-IN')}</span>
            </div>
            <div class="waterfall-row deduction">
              <span>Less: Transport Freight (${bestMarket?.distance} km via ${bestMarket?.transportMode}):</span>
              <span class="font-mono" style="font-weight: 700;">- ₹${(bestMarket?.transportCost || 0).toLocaleString('en-IN')}</span>
            </div>
            <div class="waterfall-row deduction">
              <span>Less: Mandi Cess / Scale Weighment (${bestMarket?.otherCostsPerQtl || 0} ₹/qtl):</span>
              <span class="font-mono" style="font-weight: 700;">- ₹${(bestMarket?.otherCosts || 0).toLocaleString('en-IN')}</span>
            </div>
            <div class="waterfall-row positive" style="border-top: 2px solid hsl(var(--primary)); color: hsl(var(--primary));">
              <span style="font-weight: 800; font-size: 1rem;">${t('estimatedNetReturn')} (In-Hand Cash):</span>
              <span class="font-mono font-serif" style="font-size: 1.45rem; font-weight: 800;">₹${(bestMarket?.estimatedNetReturn || 0).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div style="margin-top: 1rem; padding: 0.75rem 1rem; background-color: hsla(var(--primary), 0.08); border-radius: 0.75rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.8125rem;">
            <span style="font-weight: 700; color: hsl(var(--primary));">📈 ${t('netProfitGain')}:</span>
            <span class="font-mono" style="font-weight: 800; color: hsl(var(--primary)); font-size: 0.95rem;">+ ₹${(bestMarket?.netGainOverMsp || 0).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <!-- 5. Historical Price Trend Chart Card -->
        <div class="price-trend-container">
          <div class="chart-header-row">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <h3 class="font-serif" style="font-size: 1.35rem; font-weight: 700;">
                  ${t('priceTrend')} — ${selectedCrop}
                </h3>
                <span class="badge-demo-data" style="font-size: 0.7rem;">${t('demoDataDisclaimer')}</span>
              </div>
              <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">
                Spot market auction prices across regional APMC hubs
              </p>
            </div>

            <!-- Timeframe selector -->
            <div class="timeframe-pill-group">
              <button onclick="window.kpApp.setSmartPriceTimeframe('7D')" class="timeframe-btn ${selectedTimeframe === '7D' ? 'active' : ''}">${t('days7')}</button>
              <button onclick="window.kpApp.setSmartPriceTimeframe('30D')" class="timeframe-btn ${selectedTimeframe === '30D' ? 'active' : ''}">${t('days30')}</button>
              <button onclick="window.kpApp.setSmartPriceTimeframe('90D')" class="timeframe-btn ${selectedTimeframe === '90D' ? 'active' : ''}">${t('days90')}</button>
            </div>
          </div>

          <!-- Trend stats bar -->
          <div class="trend-stats-bar">
            <div class="trend-stat-item">
              <p>${t('highPrice')}</p>
              <p style="color: #059669;">₹${trendData.maxPrice.toLocaleString('en-IN')}</p>
            </div>
            <div class="trend-stat-item">
              <p>${t('lowPrice')}</p>
              <p style="color: #dc2626;">₹${trendData.minPrice.toLocaleString('en-IN')}</p>
            </div>
            <div class="trend-stat-item">
              <p>${t('avgPrice')}</p>
              <p>₹${trendData.avgPrice.toLocaleString('en-IN')}</p>
            </div>
            <div class="trend-stat-item">
              <p>${t('priceChange')}</p>
              <p style="color: ${trendData.changeVal >= 0 ? '#059669' : '#dc2626'};">
                ${trendData.changeVal >= 0 ? '+' : ''}₹${trendData.changeVal} (${trendData.changePct}%)
              </p>
            </div>
          </div>

          <!-- SVG Price Chart -->
          ${chartSvgHtml}

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; font-size: 0.7rem; color: hsl(var(--muted-foreground));">
            <span>ℹ️ ${trendData.disclaimer} • ${trendData.dataSource}</span>
            <span style="font-weight: 700; color: #059669;">● MSP: ₹${(window.CROP_MASTER_DATA[selectedCrop]?.msp || 2275)}/qtl</span>
          </div>
        </div>

      </div>

      <!-- 6. Price Alert Management Section -->
      <div class="card kp-stagger" style="padding: 1.75rem; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: hsl(var(--primary));">${icons.bell}</span>
              <h2 class="font-serif" style="font-size: 1.35rem; font-weight: 700;">
                ${t('activeAlerts')} (${allAlerts.length})
              </h2>
            </div>
            <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">
              Receive instant in-app notification when market selling price crosses your target benchmark.
            </p>
          </div>

          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button onclick="window.kpApp.testPriceAlert('${selectedCrop}')" class="btn btn-secondary btn-sm">
              🔔 ${t('simulatePriceCheck')}
            </button>
            <button onclick="window.kpApp.openSetPriceAlertModal('${selectedCrop}')" class="btn btn-primary btn-sm">
              + ${t('setPriceAlert')}
            </button>
          </div>
        </div>

        <div style="display: grid; gap: 0.75rem;">
          ${allAlerts.length > 0 ? allAlerts.map(alert => `
            <div class="price-alert-card ${alert.triggered ? 'triggered' : ''}">
              <div style="display: flex; align-items: center; gap: 0.85rem;">
                <span style="width: 40px; height: 40px; border-radius: 0.75rem; background-color: ${alert.triggered ? 'hsl(var(--accent))' : 'hsla(var(--primary), 0.1)'}; color: ${alert.triggered ? 'hsl(var(--accent-foreground))' : 'hsl(var(--primary))'}; display: grid; place-items: center; font-size: 1.1rem; flex-shrink: 0;">
                  ${alert.triggered ? '🎯' : '🔔'}
                </span>
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-weight: 700; font-size: 0.95rem;">${alert.crop}</span>
                    <span class="badge ${alert.active ? (alert.triggered ? 'badge-accent' : 'badge-success') : 'badge-secondary'}" style="font-size: 0.7rem;">
                      ${alert.triggered ? 'Target Reached!' : alert.active ? 'Monitoring Active' : 'Paused'}
                    </span>
                  </div>
                  <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); margin-top: 0.15rem;">
                    Target Price: <b style="color: hsl(var(--primary));">₹${alert.targetPrice}/qtl</b> • Scope: ${alert.marketName}
                  </p>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <button onclick="window.kpApp.togglePriceAlert('${alert.id}')" class="btn btn-ghost btn-sm" style="font-size: 0.75rem;">
                  ${alert.active ? 'Pause' : 'Resume'}
                </button>
                <button onclick="window.kpApp.deletePriceAlert('${alert.id}')" class="btn btn-ghost btn-sm" style="color: #dc2626; font-size: 0.75rem;">
                  Delete
                </button>
              </div>
            </div>
          `).join('') : `
            <div style="text-align: center; padding: 2rem 1rem; color: hsl(var(--muted-foreground));">
              <p style="font-size: 0.875rem;">No price alerts configured yet.</p>
              <button onclick="window.kpApp.openSetPriceAlertModal('${selectedCrop}')" class="btn btn-secondary btn-sm" style="margin-top: 0.5rem;">
                + Set Your First Price Alert
              </button>
            </div>
          `}
        </div>
      </div>
    `;

    return renderShell(content, 'farmer');
  }

  // 4. My Crops
  function renderCrops() {
    const crops = window.kpStore.getState().crops;

    const content = `
      ${pageHeading(t('myCrops'), 'What are you bringing in?', 'Keep your crop details ready so booking takes less than a minute.', `
        <button onclick="window.kpApp.openAddCropModal()" class="btn btn-primary">
          ${icons.sprout} ${t('registerCrop')}
        </button>
      `)}

      <div class="kp-stagger grid-3">
        ${crops.map(c => `
          <div class="card" style="padding: 1.5rem;">
            <div style="display: flex; align-items: flex-start; justify-content: space-between;">
              <span style="width: 44px; height: 44px; border-radius: 0.75rem; background-color: hsl(var(--secondary)); color: hsl(var(--primary)); display: grid; place-items: center;">
                ${icons.leaf}
              </span>
              ${statusBadge(c.status)}
            </div>
            <h2 class="font-serif" style="font-size: 1.35rem; font-weight: 700; margin-top: 1.25rem;">${c.name}</h2>
            <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-top: 0.25rem;">${c.variety} • ${c.season}</p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; border-top: 1px solid hsl(var(--border)); padding-top: 1rem; margin-top: 1.25rem;">
              <div>
                <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">Expected</p>
                <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0.2rem;">${c.expectedQuantity} ${c.unit}</p>
              </div>
              <div>
                <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">Area</p>
                <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0.2rem;">${c.area} acres</p>
              </div>
            </div>

            <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); margin-top: 1rem;">
              Arrival target: ${formatDate(c.arrivalDate)}
            </p>
          </div>
        `).join('')}
      </div>
    `;

    return renderShell(content, 'farmer');
  }

  // 5. Book Slot View (With Interactive Map)
  function renderBookSlot() {
    const state = window.kpStore.getState();
    const selectedCenterId = window.kpApp.bookingState?.centerId || state.centers[0].id;
    const selectedSlotId = window.kpApp.bookingState?.slotId || state.slots.filter(s => s.centerId === selectedCenterId)[0]?.id || '';
    const selectedCropId = window.kpApp.bookingState?.cropId || state.crops[0]?.id || '';
    const quantity = window.kpApp.bookingState?.quantity || '20';
    const confirmedBooking = window.kpApp.confirmedBooking;

    const availableSlots = state.slots.filter(s => s.centerId === selectedCenterId && s.status === 'OPEN');
    const selectedCenter = state.centers.find(c => c.id === selectedCenterId) || state.centers[0];

    const content = `
      ${renderLocationBanner('Step 1: Choose Your Procurement Center', 'Distance & tractor drive ETA computed dynamically from your live GPS position.')}

      ${pageHeading(t('bookSlot'), 'Make the center work for you.', 'Compare live conditions on map, select your preferred center, then lock your visit time.')}

      <div class="kp-stagger" style="display: grid; gap: 1.5rem;" class="lg:grid-2">
        <div>
          <!-- Step 1: Center Picker & Map -->
          <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.75rem;">
              <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                <span style="width: 36px; height: 36px; border-radius: 0.75rem; background-color: hsl(var(--accent)); color: hsl(var(--accent-foreground)); font-weight: 800; display: grid; place-items: center;">1</span>
                <div>
                  <h2 class="font-serif" style="font-size: 1.25rem; font-weight: 700;">${t('chooseCenter')}</h2>
                  <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground));">Nearby centers ranked by live distance, wait time, and open slots.</p>
                </div>
              </div>
            </div>

            <!-- Interactive Map inside Booking Step 1 -->
            <div class="kp-map-card" style="margin-top: 1.25rem; margin-bottom: 1.25rem;">
              <div id="book-slot-map" class="kp-map-container" style="height: 320px;"></div>
              <div class="kp-map-legend">
                <span class="legend-item"><span style="color: #059669;">●</span> Your Location</span>
                <span class="legend-item"><span style="color: #059669;">🏢</span> Selected Route</span>
                <span class="legend-item"><span style="color: #2563eb;">🚜</span> Other Farmers</span>
              </div>
            </div>

            <div style="display: grid; gap: 0.75rem;">
              ${state.centers.map(c => {
                const isSelected = selectedCenterId === c.id;
                const isBest = c.distance === Math.min(...state.centers.map(x => x.distance));
                return `
                  <button onclick="window.kpApp.selectCenter('${c.id}')" class="card" style="padding: 1rem 1.25rem; text-align: left; border: 2px solid ${isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}; background-color: ${isSelected ? 'hsla(var(--secondary), 0.6)' : 'hsl(var(--card))'}; transition: all 0.2s ease;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
                      <div>
                        <p style="font-weight: 700; font-size: 1rem;">${c.name} <span class="font-mono" style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">(${c.code})</span></p>
                        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-top: 0.35rem;">
                          <span class="distance-pill">${icons.mapPin} ${c.distance} km away</span>
                          <span class="eta-pill">${icons.clock} ~${c.etaMinutes} min drive</span>
                          <span style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${c.location}</span>
                        </div>
                      </div>
                      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.35rem;">
                        ${isBest ? `<span class="badge badge-accent">Nearest</span>` : ''}
                        ${statusBadge(c.crowd)}
                      </div>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.75rem; margin-top: 0.85rem; font-size: 0.75rem; color: hsl(var(--muted-foreground)); font-weight: 600; border-top: 1px dashed hsl(var(--border)); padding-top: 0.65rem;">
                      <span style="display: flex; align-items: center; gap: 0.25rem;">${icons.users} ${c.queue} waiting in queue</span>
                      <span style="display: flex; align-items: center; gap: 0.25rem;">${icons.clock} ~${c.waitMinutes} min wait</span>
                      <a href="https://www.google.com/maps/dir/?api=1&destination=${c.coordinates.lat},${c.coordinates.lng}" target="_blank" onclick="event.stopPropagation()" style="color: hsl(var(--primary)); text-decoration: underline; display: flex; align-items: center; gap: 0.25rem;">
                        ${icons.navigation} Directions
                      </a>
                    </div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Step 2: Time Slot Picker -->
          <div class="card" style="padding: 1.5rem;">
            <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
              <span style="width: 36px; height: 36px; border-radius: 0.75rem; background-color: hsl(var(--accent)); color: hsl(var(--accent-foreground)); font-weight: 800; display: grid; place-items: center;">2</span>
              <div>
                <h2 class="font-serif" style="font-size: 1.25rem; font-weight: 700;">${t('pickTime')}</h2>
                <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground));">Open slots for ${selectedCenter?.name}.</p>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.75rem; margin-top: 1.25rem;">
              ${availableSlots.map(s => {
                const isSelected = selectedSlotId === s.id;
                return `
                  <button onclick="window.kpApp.selectSlot('${s.id}')" class="card" style="padding: 1rem; text-align: left; border: 2px solid ${isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}; background-color: ${isSelected ? 'hsla(var(--secondary), 0.7)' : 'hsl(var(--card))'};">
                    <p style="font-weight: 700; font-size: 0.95rem;">${s.startTime} – ${s.endTime}</p>
                    <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); margin-top: 0.25rem;">
                      ${formatDate(s.date)} • ${s.available} spaces left
                    </p>
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Step 3: Confirmation Summary -->
        <div>
          <div class="card" style="padding: 1.5rem; position: sticky; top: 90px;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="width: 36px; height: 36px; border-radius: 0.75rem; background-color: hsl(var(--accent)); color: hsl(var(--accent-foreground)); font-weight: 800; display: grid; place-items: center;">3</span>
              <div>
                <h2 class="font-serif" style="font-size: 1.25rem; font-weight: 700;">${t('confirmVisit')}</h2>
                <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground));">Review your visit details before locking.</p>
              </div>
            </div>

            ${confirmedBooking ? `
              <div style="text-align: center; padding: 2rem 0;">
                <span style="width: 64px; height: 64px; border-radius: 1.25rem; background-color: hsl(var(--secondary)); color: hsl(var(--primary)); display: grid; place-items: center; margin: 0 auto;">
                  ${icons.checkCircle}
                </span>
                <p style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: hsl(var(--primary)); margin-top: 1rem;">Booking confirmed</p>
                <p class="font-mono font-serif" style="font-size: 3rem; font-weight: 800; margin-top: 0.25rem;">${confirmedBooking.token}</p>
                <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-top: 0.25rem;">${confirmedBooking.center} • ${confirmedBooking.slot}</p>
                <a href="#/farmer/queue" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 1.5rem;">
                  ${t('liveQueue')} ${icons.arrowRight}
                </a>
              </div>
            ` : `
              <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                <div class="form-group">
                  <label class="form-label">${t('crop')}</label>
                  <select id="booking-crop" class="form-select" onchange="window.kpApp.updateBookingCrop(this.value)">
                    ${state.crops.map(c => `<option value="${c.id}" ${c.id === selectedCropId ? 'selected' : ''}>${c.name} • ${c.variety}</option>`).join('')}
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Quantity to bring (quintal)</label>
                  <input type="number" id="booking-qty" class="form-input" value="${quantity}" oninput="window.kpApp.updateBookingQty(this.value)" placeholder="e.g. 25" />
                </div>

                <div style="background-color: hsla(var(--secondary), 0.7); border-radius: 0.75rem; padding: 1rem; font-size: 0.875rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <p style="font-weight: 700;">${selectedCenter?.name || 'Selected Center'}</p>
                    <span class="distance-pill">${selectedCenter?.distance || 4.2} km</span>
                  </div>
                  <p style="color: hsl(var(--muted-foreground)); margin-top: 0.25rem; font-size: 0.8125rem;">
                    ${state.slots.find(s => s.id === selectedSlotId)?.startTime || 'Choose slot'} on ${formatDate(state.slots.find(s => s.id === selectedSlotId)?.date)}
                  </p>
                  <p style="color: hsl(var(--primary)); font-size: 0.75rem; font-weight: 600; margin-top: 0.35rem;">
                    🚗 Est. Travel Time: ~${selectedCenter?.etaMinutes || 12} mins from your location
                  </p>
                </div>

                <button onclick="window.kpApp.submitBooking()" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 0.5rem;">
                  ${t('confirmVisit')} ${icons.arrowRight}
                </button>
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    return renderShell(content, 'farmer');
  }

  // 6. Bookings
  function renderBookings() {
    const state = window.kpStore.getState();
    const bookings = state.bookings;

    const content = `
      ${pageHeading(t('bookings'), 'Your visits, all in one place.', 'Keep an eye on what is booked, what is moving, and what is complete.', `
        <a href="#/farmer/book" class="btn btn-primary">
          ${icons.calendar} ${t('newBooking')}
        </a>
      `)}

      <div class="kp-stagger card" style="overflow: hidden;">
        <div style="display: grid; grid-template-columns: 1.4fr 1.2fr 1fr 1fr auto; gap: 1rem; padding: 0.85rem 1.25rem; background-color: hsla(var(--muted), 0.4); border-bottom: 1px solid hsl(var(--border)); font-size: 0.6875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: hsl(var(--muted-foreground));" class="sm:grid">
          <span>${t('token')}</span>
          <span>Center & Distance</span>
          <span>${t('slot')}</span>
          <span>${t('status')}</span>
          <span>${t('actions')}</span>
        </div>

        <div style="display: flex; flex-direction: column;">
          ${bookings.map(b => {
            const centerObj = state.centers.find(c => c.id === b.centerId || c.name === b.center) || state.centers[0];
            return `
              <div style="display: grid; grid-template-columns: 1.4fr 1.2fr 1fr 1fr auto; gap: 1rem; align-items: center; padding: 1.25rem; border-bottom: 1px solid hsl(var(--border));">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span class="font-mono" style="font-weight: 700; color: hsl(var(--primary));">${b.token}</span>
                    ${statusBadge(b.status)}
                  </div>
                  <p style="font-size: 0.875rem; font-weight: 600; margin-top: 0.25rem;">${b.crop} • ${b.quantity} ${b.unit}</p>
                </div>
                <div>
                  <p style="font-size: 0.875rem; font-weight: 600;">${b.center}</p>
                  <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); display: flex; align-items: center; gap: 0.25rem; margin-top: 0.15rem;">
                    ${icons.mapPin} ${centerObj?.distance || 4.2} km away (~${centerObj?.etaMinutes || 12} min drive)
                  </p>
                </div>
                <p style="font-size: 0.875rem;">
                  <span style="font-weight: 600;">${b.slot}</span>
                  <span style="display: block; font-size: 0.75rem; color: hsl(var(--muted-foreground));">${formatDate(b.date)}</span>
                </p>
                <div>${statusBadge(b.paymentStatus)}</div>
                <div>
                  ${['BOOKED', 'WAITING'].includes(b.status) ? `
                    <button onclick="window.kpApp.cancelBooking('${b.id}')" class="btn btn-ghost" style="color: hsl(var(--destructive)); font-size: 0.8125rem;">
                      ${t('cancel')}
                    </button>
                  ` : `<span style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">—</span>`}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    return renderShell(content, 'farmer');
  }

  // 7. Live Queue Tracker View
  function renderQueue() {
    const state = window.kpStore.getState();
    const active = state.bookings.find(b => !['CANCELLED', 'PAYMENT_COMPLETED', 'REJECTED'].includes(b.status)) || state.bookings[0];
    const centerObj = active ? (state.centers.find(c => c.id === active.centerId || c.name === active.center) || state.centers[0]) : state.centers[0];

    const content = `
      ${renderLocationBanner('Live Queue & Navigation Link', `Tracking trip to ${centerObj?.name} (${centerObj?.distance || 4.2} km from your location).`)}

      ${pageHeading(t('liveQueue'), 'Know when it’s your turn.', 'This view refreshes in real-time as trucks and tokens move at the center counter.', `
        <button onclick="window.kpApp.refreshView()" class="btn btn-secondary">
          ${icons.refresh} ${t('refresh')}
        </button>
      `)}

      ${active ? `
        <div class="kp-stagger" style="display: grid; gap: 1.5rem;" class="lg:grid-2">
          <!-- Live Billboard -->
          <div class="billboard">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; opacity: 0.85;">
              <span>${t('token')}</span>
              <span style="display: flex; align-items: center; gap: 0.35rem; background-color: rgba(255,255,255,0.15); padding: 0.25rem 0.5rem; border-radius: 9999px;">
                <span style="width: 6px; height: 6px; border-radius: 50%; background-color: hsl(var(--accent)); animation: pulseGlow 1.5s infinite;"></span>
                Live
              </span>
            </div>
            <p class="token-display">${active.token}</p>
            <p style="font-size: 0.95rem; opacity: 0.85; margin-top: 0.5rem;">${active.center} • ${active.slot}</p>
            <p style="font-size: 0.8125rem; opacity: 0.9; margin-top: 0.25rem;">📍 Distance: <b>${centerObj?.distance} km</b> • Est. drive: ~${centerObj?.etaMinutes} mins</p>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 1.25rem; margin-top: 1.5rem;">
              <div>
                <p class="font-serif" style="font-size: 2rem; font-weight: 800;">${active.queuePosition || 1}</p>
                <p style="font-size: 0.75rem; opacity: 0.75;">${t('aheadOfYou')}</p>
              </div>
              <div style="border-left: 1px solid rgba(255,255,255,0.15); border-right: 1px solid rgba(255,255,255,0.15);">
                <p class="font-serif" style="font-size: 2rem; font-weight: 800;">${active.waitMinutes || 15}<span style="font-size: 1rem;">m</span></p>
                <p style="font-size: 0.75rem; opacity: 0.75;">${t('wait')}</p>
              </div>
              <div>
                <p class="font-serif" style="font-size: 2rem; font-weight: 800;">K-044</p>
                <p style="font-size: 0.75rem; opacity: 0.75;">${t('nowServing')}</p>
              </div>
            </div>
          </div>

          <!-- Journey Step Tracker -->
          <div class="card" style="padding: 1.75rem;">
            <p style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; color: hsl(var(--primary));">Current Stage</p>
            <h2 class="font-serif" style="font-size: 1.75rem; font-weight: 700; margin-top: 0.5rem;">${titleCase(active.status)}</h2>
            <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); line-height: 1.6; margin-top: 0.5rem;">
              Keep your token ready. When you arrive at ${active.center}, show Token <b>${active.token}</b> at Counter 1.
            </p>

            <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=${centerObj.coordinates.lat},${centerObj.coordinates.lng}" target="_blank" class="btn btn-primary btn-sm" style="flex: 1; justify-content: center;">
                ${icons.navigation} Navigate in Google Maps
              </a>
              <a href="#/farmer/status" class="btn btn-secondary btn-sm">
                Full Timeline ${icons.chevronRight}
              </a>
            </div>

            <div class="journey-timeline" style="margin-top: 2rem;">
              <div class="timeline-item">
                <div class="timeline-line done"></div>
                <div class="timeline-dot done">${icons.check}</div>
                <div>
                  <p style="font-weight: 700; font-size: 0.95rem;">${t('bookSlot')}</p>
                  <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); margin-top: 0.15rem;">${active.slot}</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-line ${['ARRIVED', 'VERIFIED', 'IN_INSPECTION', 'WEIGHMENT', 'APPROVED', 'PAYMENT_COMPLETED'].includes(active.status) ? 'done' : ''}"></div>
                <div class="timeline-dot ${['ARRIVED', 'VERIFIED', 'IN_INSPECTION', 'WEIGHMENT', 'APPROVED', 'PAYMENT_COMPLETED'].includes(active.status) ? 'done' : 'active'}">
                  ${['ARRIVED', 'VERIFIED', 'IN_INSPECTION', 'WEIGHMENT', 'APPROVED', 'PAYMENT_COMPLETED'].includes(active.status) ? icons.check : '2'}
                </div>
                <div>
                  <p style="font-weight: 700; font-size: 0.95rem;">${t('markArrived')}</p>
                  <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); margin-top: 0.15rem;">Show token at center entry scale</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-dot ${['APPROVED', 'PAYMENT_COMPLETED'].includes(active.status) ? 'done' : ''}">
                  ${['APPROVED', 'PAYMENT_COMPLETED'].includes(active.status) ? icons.check : '3'}
                </div>
                <div>
                  <p style="font-weight: 700; font-size: 0.95rem; color: ${['APPROVED', 'PAYMENT_COMPLETED'].includes(active.status) ? 'inherit' : 'hsl(var(--muted-foreground))'};">${t('procurementPayment')}</p>
                  <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); margin-top: 0.15rem;">Automated DBT disbursement after weighment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : `
        <div class="card" style="text-align: center; padding: 4rem 1.5rem;">
          <h3 class="font-serif" style="font-size: 1.25rem; font-weight: 700; margin-top: 1rem;">No active queue</h3>
        </div>
      `}
    `;

    return renderShell(content, 'farmer');
  }

  // 8. Procurement Status Timeline
  function renderStatus() {
    const state = window.kpStore.getState();
    const b = state.bookings[0];
    const steps = ['BOOKED', 'ARRIVED', 'IN_INSPECTION', 'WEIGHMENT', 'APPROVED', 'PAYMENT_COMPLETED'];
    const currentIndex = b ? Math.max(0, steps.indexOf(b.status)) : 0;

    const content = `
      ${pageHeading(t('procurementStatus'), 'A clear trail from crop to cash.', 'Every important handoff, recorded and easy to understand.')}

      ${b ? `
        <div class="kp-stagger card" style="max-width: 760px; padding: 2rem;">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 1rem; border-bottom: 1px solid hsl(var(--border)); padding-bottom: 1.5rem;">
            <div>
              <p class="font-mono" style="font-weight: 800; font-size: 0.95rem; color: hsl(var(--primary));">${b.token}</p>
              <h2 class="font-serif" style="font-size: 1.75rem; font-weight: 700; margin-top: 0.25rem;">${b.crop} • ${b.quantity} ${b.unit}</h2>
              <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-top: 0.25rem;">${b.center} • ${formatDate(b.date)}</p>
            </div>
            ${statusBadge(b.status)}
          </div>

          <div class="journey-timeline" style="margin-top: 2rem;">
            ${steps.map((step, i) => {
              const isDone = i <= currentIndex;
              const isLast = i === steps.length - 1;
              let subtitle = '';
              if (i === 0) subtitle = 'Your visit slot is confirmed.';
              else if (i === 1) subtitle = 'Arrival confirmed at the center counter.';
              else if (i === 2) subtitle = b.qualityGrade ? `Quality grade verified: Grade ${b.qualityGrade}` : 'Quality team checking produce moisture.';
              else if (i === 3) subtitle = b.netWeight ? `Scale Reading: Net ${b.netWeight} ${b.unit}` : 'Weight scale determining final amount.';
              else if (i === 4) subtitle = b.amount ? `Approved: ${money(b.amount)} at ₹${b.rate}/qtl` : 'Procurement approved for disbursement.';
              else if (i === 5) subtitle = b.paymentRef ? `Payment disbursed: Ref ${b.paymentRef} (${titleCase(b.paymentStatus)})` : 'Direct bank transfer in progress.';

              return `
                <div class="timeline-item">
                  ${!isLast ? `<div class="timeline-line ${i < currentIndex ? 'done' : ''}"></div>` : ''}
                  <div class="timeline-dot ${isDone ? 'done' : ''}">
                    ${isDone ? icons.check : i + 1}
                  </div>
                  <div>
                    <p style="font-weight: 700; font-size: 1rem; color: ${isDone ? 'inherit' : 'hsl(var(--muted-foreground))'};">${titleCase(step)}</p>
                    <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">${subtitle}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : `
        <div class="card" style="text-align: center; padding: 4rem 1.5rem;">
          <p style="font-weight: 700; font-size: 1.125rem;">Your timeline will begin here</p>
        </div>
      `}
    `;

    return renderShell(content, 'farmer');
  }

  // 9. Notifications Feed
  function renderNotifications() {
    const notifs = window.kpStore.getState().notifications;

    const content = `
      ${pageHeading(t('notifications'), 'Nothing important should slip past you.', 'Updates from your center, in plain language.', `
        <button onclick="window.kpApp.markAllNotificationsRead()" class="btn btn-secondary">
          Mark all read
        </button>
      `)}

      <div class="kp-stagger" style="max-width: 760px; display: flex; flex-direction: column; gap: 0.75rem;">
        ${notifs.map(n => `
          <button onclick="window.kpApp.markNotificationRead('${n.id}')" class="card" style="padding: 1.25rem; text-align: left; display: flex; gap: 1rem; border: 1px solid ${n.unread ? 'hsla(var(--primary), 0.3)' : 'hsl(var(--border))'}; background-color: ${n.unread ? 'hsla(var(--secondary), 0.35)' : 'hsl(var(--card))'};">
            <span style="width: 40px; height: 40px; border-radius: 0.75rem; background-color: hsl(var(--secondary)); color: hsl(var(--primary)); display: grid; place-items: center; flex-shrink: 0;">
              ${icons.bell}
            </span>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <p style="font-weight: 700; font-size: 0.95rem;">${n.title}</p>
                ${n.unread ? `<span class="badge badge-accent">New</span>` : ''}
              </div>
              <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground)); line-height: 1.5; margin-top: 0.25rem;">${n.message}</p>
              <p style="font-size: 0.6875rem; color: hsl(var(--muted-foreground)); margin-top: 0.35rem;">${formatDate(n.createdAt)}</p>
            </div>
          </button>
        `).join('')}
      </div>
    `;

    return renderShell(content, 'farmer');
  }

  // 10. Farmer Profile & Live Location Options
  function renderProfile() {
    const user = window.kpStore.getCurrentUser();
    const currLang = window.kpStore.getLanguage();
    const coords = user.coordinates || { lat: 22.7196, lng: 75.8577 };

    const content = `
      ${renderLocationBanner('Manage Your Location & Mandi Calibration', 'Update your GPS location to calibrate distance to nearest procurement hubs.')}

      ${pageHeading(t('settings'), 'Your profile & location control.', 'Keep your coordinates and contact details updated for accurate routing.')}

      <div class="kp-stagger" style="display: grid; gap: 1.5rem; max-width: 900px;" class="lg:grid-2">
        <div class="card" style="padding: 1.75rem;">
          <span class="font-serif" style="width: 64px; height: 64px; border-radius: 1rem; background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); font-size: 1.5rem; font-weight: 800; display: grid; place-items: center;">
            ${user.initials || 'MP'}
          </span>
          <h2 class="font-serif" style="font-size: 1.75rem; font-weight: 700; margin-top: 1.25rem;">${user.name || 'Meera Patil'}</h2>
          <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">${user.farmerId || 'KSP-MP-2048'} • ${user.location}</p>

          <!-- Language Selection Section -->
          <div style="border-top: 1px solid hsl(var(--border)); padding-top: 1.25rem; margin-top: 1.5rem;">
            <p style="font-size: 0.6875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.16em; color: hsl(var(--primary));">${t('language')}</p>
            <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">Choose your preferred portal language:</p>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem; flex-wrap: wrap;">
              <button onclick="window.kpApp.setLang('en')" class="btn ${currLang === 'en' ? 'btn-primary' : 'btn-secondary'}">English</button>
              <button onclick="window.kpApp.setLang('hi')" class="btn ${currLang === 'hi' ? 'btn-primary' : 'btn-secondary'}">हिंदी (Hindi)</button>
              <button onclick="window.kpApp.setLang('te')" class="btn ${currLang === 'te' ? 'btn-primary' : 'btn-secondary'}">తెలుగు (Telugu)</button>
            </div>
          </div>
        </div>

        <div class="card" style="padding: 1.75rem;">
          <h2 class="font-serif" style="font-size: 1.25rem; font-weight: 700;">Location & Contact Details</h2>
          <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">Coordinates power real-time distance and ETA calculation.</p>

          <form onsubmit="window.kpApp.saveProfile(event)" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.25rem;">
            <div class="form-group">
              <label class="form-label">Full name</label>
              <input type="text" id="prof-name" class="form-input" value="${user.name || 'Meera Patil'}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Farmer ID</label>
              <input type="text" id="prof-id" class="form-input" value="${user.farmerId || 'KSP-MP-2048'}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Location / District</label>
              <input type="text" id="prof-loc" class="form-input" value="${user.location || 'Indore, Madhya Pradesh'}" required />
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Latitude (°N)</label>
                <input type="number" step="0.0001" id="prof-lat" class="form-input" value="${coords.lat}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Longitude (°E)</label>
                <input type="number" step="0.0001" id="prof-lng" class="form-input" value="${coords.lng}" required />
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem;">
              ${icons.check} ${t('save')}
            </button>
          </form>
        </div>
      </div>
    `;

    return renderShell(content, 'farmer');
  }

  // 11. Help Center
  function renderHelp() {
    const faqs = [
      { q: 'How does live location work in KisanProcure?', a: 'When you allow location access or pick a region, the system calculates exact distance (in km) and travel time to all procurement centers using high-precision GPS geodetics.' },
      { q: 'How do I choose the best center?', a: 'Compare the live wait time, queue size, distance, and available slots. KisanProcure highlights the nearest center, but you are free to pick any open center.' },
      { q: 'What should I carry to the center?', a: 'Bring your token ID, farmer Aadhaar/ID, and the crop produce you registered. Arrive a little before your slot so the team can verify you without delay.' },
      { q: 'When will I receive payment?', a: 'After inspection and weighment, the center approves procurement. Direct Benefit Transfer (DBT) disburses to your linked bank account.' }
    ];

    const content = `
      ${pageHeading(t('helpCenter'), 'Questions, answered simply.', 'A little context before you head to the center.')}

      <div class="kp-stagger" style="display: grid; gap: 2rem; max-width: 1000px;" class="lg:grid-2">
        <div style="background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); border-radius: 1.5rem; padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="color: hsl(var(--accent));">${icons.help}</div>
            <h2 class="font-serif" style="font-size: 2rem; font-weight: 700; margin-top: 3rem;">Need a human?</h2>
            <p style="font-size: 0.875rem; opacity: 0.85; line-height: 1.6; margin-top: 0.75rem;">Your local center manager can help with arrival, GPS navigation, or payment questions.</p>
          </div>
          <button onclick="alert('Center Support Desk: Toll Free 1800-233-0199 / Direct Center Manager: +91 7272 254100')" class="btn btn-secondary" style="margin-top: 2rem; align-self: flex-start;">
            Contact center
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${faqs.map(f => `
            <div class="card" style="padding: 1.25rem;">
              <p style="font-weight: 700; font-size: 1rem; color: hsl(var(--foreground));">${f.q}</p>
              <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); line-height: 1.5; margin-top: 0.5rem; border-top: 1px solid hsl(var(--border)); padding-top: 0.5rem;">${f.a}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    return renderShell(content, 'farmer');
  }

  // 12. Operations Overview Dashboard
  function renderOperations() {
    const state = window.kpStore.getState();
    const center = state.centers[0];
    const waiting = state.bookings.filter(b => ['BOOKED', 'ARRIVED'].includes(b.status)).length;
    const processing = state.bookings.filter(b => ['VERIFIED', 'IN_INSPECTION', 'WEIGHMENT'].includes(b.status)).length;
    const completed = state.bookings.filter(b => ['APPROVED', 'PAYMENT_COMPLETED'].includes(b.status)).length;

    const content = `
      ${pageHeading(t('centerWorkspace'), 'Keep today moving.', 'A live view of arrivals, queue movement, and quality inspection at the active center.', `
        <button onclick="window.kpApp.refreshView()" class="btn btn-secondary">
          ${icons.refresh} ${t('refresh')}
        </button>
      `)}

      <div class="kp-stagger grid-4" style="margin-bottom: 2rem;">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon primary">${icons.users}</span>
          </div>
          <p class="stat-value">${state.bookings.length}</p>
          <p class="stat-label">${t('farmersToday')}</p>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon accent">${icons.clock}</span>
          </div>
          <p class="stat-value">${waiting}</p>
          <p class="stat-label">${t('waitingInQueue')}</p>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon teal">${icons.activity}</span>
          </div>
          <p class="stat-value">${processing}</p>
          <p class="stat-label">${t('processingAtCounters')}</p>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon primary">${icons.checkCircle}</span>
          </div>
          <p class="stat-value">${completed}</p>
          <p class="stat-label">${t('completedToday')}</p>
        </div>
      </div>

      <div class="kp-stagger" style="display: grid; gap: 1.5rem;" class="lg:grid-2">
        <div class="card" style="padding: 1.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <p style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; color: hsl(var(--primary));">Active center</p>
              <h2 class="font-serif" style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">${center?.name}</h2>
              <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">${center?.location} • GPS: ${center?.coordinates?.lat}, ${center?.coordinates?.lng}</p>
            </div>
            <span class="badge badge-success">Open</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2rem;">
            <div style="background-color: hsla(var(--secondary), 0.6); padding: 1rem; border-radius: 0.75rem;">
              <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${t('liveQueue')}</p>
              <p class="font-serif" style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">${waiting}</p>
            </div>
            <div style="background-color: hsla(var(--secondary), 0.6); padding: 1rem; border-radius: 0.75rem;">
              <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">Slots open</p>
              <p class="font-serif" style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">${center?.availableSlots || 8}</p>
            </div>
            <div style="background-color: hsla(var(--secondary), 0.6); padding: 1rem; border-radius: 0.75rem;">
              <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">Counters</p>
              <p class="font-serif" style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">${center?.counters || 3}</p>
            </div>
          </div>
        </div>

        <div class="card" style="padding: 1.75rem;">
          <p style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; color: hsl(var(--primary));">Quick desk actions</p>
          <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.25rem;">
            <a href="#/operations/queue" class="card" style="padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; font-weight: 700;">
              <span style="display: flex; align-items: center; gap: 0.75rem; color: hsl(var(--foreground));">
                <span style="color: hsl(var(--primary));">${icons.users}</span> ${t('todaysQueue')}
              </span>
              ${icons.chevronRight}
            </a>
            <a href="#/operations/inspection" class="card" style="padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; font-weight: 700;">
              <span style="display: flex; align-items: center; gap: 0.75rem; color: hsl(var(--foreground));">
                <span style="color: hsl(var(--primary));">${icons.clipboardCheck}</span> ${t('inspection')}
              </span>
              ${icons.chevronRight}
            </a>
            <a href="#/operations/weighment" class="card" style="padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; font-weight: 700;">
              <span style="display: flex; align-items: center; gap: 0.75rem; color: hsl(var(--foreground));">
                <span style="color: hsl(var(--primary));">${icons.scale}</span> ${t('weighment')}
              </span>
              ${icons.chevronRight}
            </a>
          </div>
        </div>
      </div>
    `;

    return renderShell(content, 'operations');
  }

  // 13. Operations Today's Queue Desk
  function renderOperationsQueue() {
    const state = window.kpStore.getState();
    const filter = window.kpApp.queueFilter || 'ALL';
    const items = state.bookings.filter(b => filter === 'ALL' || b.status === filter);

    const content = `
      ${pageHeading(t('todaysQueue'), 'The next farmer is clear.', 'Move each arrival through the counter without losing the thread.', `
        <button onclick="window.kpApp.callNextFarmer()" class="btn btn-primary">
          ${t('callNext')} ${icons.arrowRight}
        </button>
      `)}

      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
        ${['ALL', 'BOOKED', 'ARRIVED', 'VERIFIED', 'IN_INSPECTION'].map(f => `
          <button onclick="window.kpApp.filterQueue('${f}')" class="btn ${filter === f ? 'btn-primary' : 'btn-secondary'}" style="padding: 0.4rem 0.85rem; font-size: 0.75rem; border-radius: 9999px;">
            ${titleCase(f)}
          </button>
        `).join('')}
      </div>

      <div class="kp-stagger card" style="overflow: hidden;">
        <div style="display: grid; grid-template-columns: 0.6fr 1.2fr 1fr 1fr 1.3fr; gap: 1rem; padding: 0.85rem 1.25rem; background-color: hsla(var(--muted), 0.4); border-bottom: 1px solid hsl(var(--border)); font-size: 0.6875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: hsl(var(--muted-foreground));" class="sm:grid">
          <span>${t('token')}</span>
          <span>Farmer</span>
          <span>${t('crop')}</span>
          <span>${t('status')}</span>
          <span>${t('actions')}</span>
        </div>

        <div style="display: flex; flex-direction: column;">
          ${items.map(x => `
            <div style="display: grid; grid-template-columns: 0.6fr 1.2fr 1fr 1fr 1.3fr; gap: 1rem; align-items: center; padding: 1.25rem; border-bottom: 1px solid hsl(var(--border));">
              <span class="font-mono" style="font-weight: 800; color: hsl(var(--primary)); font-size: 1rem;">${x.token}</span>
              <div>
                <p style="font-weight: 700; font-size: 0.95rem;">${x.farmerName}</p>
                <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${x.farmerId}</p>
              </div>
              <div>
                <p style="font-size: 0.875rem; font-weight: 600;">${x.crop}</p>
                <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${x.quantity} qtl • ${x.slot}</p>
              </div>
              <div>${statusBadge(x.status)}</div>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${x.status === 'BOOKED' ? `
                  <button onclick="window.kpApp.markArrived('${x.id}')" class="btn btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;">
                    ${t('markArrived')}
                  </button>
                ` : ''}
                ${x.status === 'ARRIVED' ? `
                  <button onclick="window.kpApp.verifyFarmer('${x.id}')" class="btn btn-primary" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;">
                    ${t('verifyFarmer')}
                  </button>
                ` : ''}
                ${['VERIFIED', 'WAITING', 'IN_INSPECTION'].includes(x.status) ? `
                  <a href="#/operations/inspection" class="btn btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;">
                    ${t('inspect')}
                  </a>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    return renderShell(content, 'operations');
  }

  // 14. Quality Inspection Desk
  function renderInspectionDesk() {
    const state = window.kpStore.getState();
    const waitingForInsp = state.bookings.filter(b => ['VERIFIED', 'WAITING', 'IN_INSPECTION', 'ARRIVED'].includes(b.status));
    const selectedBookingId = window.kpApp.selectedInspectionBookingId || (waitingForInsp[0] ? waitingForInsp[0].id : '');
    const selectedBooking = state.bookings.find(b => b.id === selectedBookingId);

    const content = `
      ${pageHeading(t('inspection'), 'Record the inspection once.', 'Clear inputs now mean a cleaner procurement trail later.')}

      <div class="kp-stagger" style="display: grid; gap: 1.5rem;" class="lg:grid-2">
        <div class="card" style="padding: 1.5rem;">
          <h2 class="font-serif" style="font-size: 1.25rem; font-weight: 700;">Waiting for inspection</h2>
          <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1.25rem;">
            ${waitingForInsp.map(b => {
              const isSelected = selectedBookingId === b.id;
              return `
                <button onclick="window.kpApp.selectInspectionBooking('${b.id}')" class="card" style="padding: 1rem; text-align: left; border: 2px solid ${isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}; background-color: ${isSelected ? 'hsla(var(--secondary), 0.7)' : 'hsl(var(--card))'};">
                  <div style="display: flex; justify-content: space-between;">
                    <span class="font-mono" style="font-weight: 800; color: hsl(var(--primary));">${b.token}</span>
                    ${statusBadge(b.status)}
                  </div>
                  <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0.35rem;">${b.farmerName} • ${b.crop}</p>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="card" style="padding: 1.75rem;">
          ${selectedBooking ? `
            <div>
              <p style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; color: hsl(var(--primary));">Inspection Form</p>
              <h2 class="font-serif" style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">${selectedBooking.farmerName} (${selectedBooking.token})</h2>

              <form onsubmit="window.kpApp.submitInspection(event)" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;">
                <div class="grid-2">
                  <div class="form-group">
                    <label class="form-label">Moisture content (%)</label>
                    <input type="number" step="0.1" id="insp-moisture" class="form-input" value="11.8" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Foreign material (%)</label>
                    <input type="number" step="0.1" id="insp-fm" class="form-input" value="0.8" required />
                  </div>
                </div>

                <div class="grid-2">
                  <div class="form-group">
                    <label class="form-label">Quality Grade</label>
                    <select id="insp-grade" class="form-select">
                      <option value="A">Grade A (Superior FAQ)</option>
                      <option value="B">Grade B (Standard FAQ)</option>
                      <option value="C">Grade C (Below FAQ)</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Result</label>
                    <select id="insp-result" class="form-select">
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="PENDING">Pending Further Testing</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Remarks & Quality notes</label>
                  <textarea id="insp-remarks" class="form-textarea" placeholder="Add context for weighing desk or farmer"></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-lg" style="margin-top: 0.5rem;">
                  ${icons.check} ${t('recordInspection')}
                </button>
              </form>
            </div>
          ` : `
            <div style="text-align: center; padding: 4rem 1rem;">
              <h3 class="font-serif" style="font-size: 1.25rem; font-weight: 700; margin-top: 1rem;">Choose an arrival</h3>
            </div>
          `}
        </div>
      </div>
    `;

    return renderShell(content, 'operations');
  }

  // 15. Weighment Desk (Scale Simulator)
  function renderWeighmentDesk() {
    const state = window.kpStore.getState();
    const readyForWeighing = state.bookings.filter(b => ['IN_INSPECTION', 'WEIGHMENT', 'VERIFIED'].includes(b.status));
    const selectedBookingId = window.kpApp.selectedWeighmentBookingId || (readyForWeighing[0] ? readyForWeighing[0].id : '');
    const selectedBooking = state.bookings.find(b => b.id === selectedBookingId);

    const gross = Number(window.kpApp.weighmentGross || selectedBooking?.grossWeight || (selectedBooking ? selectedBooking.quantity * 1.05 : 26.2));
    const tare = Number(window.kpApp.weighmentTare || selectedBooking?.tareWeight || 1.2);
    const net = Math.max(0, gross - tare);

    const content = `
      ${pageHeading(t('weighment'), 'Turn weight into certainty.', 'Gross, tare, and net — captured together for a fair final amount.')}

      <div class="kp-stagger" style="display: grid; gap: 1.5rem;" class="lg:grid-2">
        <div class="card" style="padding: 1.5rem;">
          <h2 class="font-serif" style="font-size: 1.25rem; font-weight: 700;">Ready for weighment</h2>
          <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1.25rem;">
            ${readyForWeighing.map(b => {
              const isSelected = selectedBookingId === b.id;
              return `
                <button onclick="window.kpApp.selectWeighmentBooking('${b.id}')" class="card" style="padding: 1rem; text-align: left; border: 2px solid ${isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}; background-color: ${isSelected ? 'hsla(var(--secondary), 0.7)' : 'hsl(var(--card))'};">
                  <div style="display: flex; justify-content: space-between;">
                    <span class="font-mono" style="font-weight: 800; color: hsl(var(--primary));">${b.token}</span>
                    ${statusBadge(b.status)}
                  </div>
                  <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0.35rem;">${b.farmerName} • ${b.crop}</p>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="card" style="padding: 1.75rem;">
          ${selectedBooking ? `
            <div>
              <p style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; color: hsl(var(--primary));">Scale Reading</p>
              <h2 class="font-serif" style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">${selectedBooking.farmerName} (${selectedBooking.token})</h2>

              <div class="grid-2" style="margin-top: 1.5rem;">
                <div class="form-group">
                  <label class="form-label">${t('grossWeight')} (qtl)</label>
                  <input type="number" step="0.05" id="weigh-gross" class="form-input" value="${gross.toFixed(2)}" oninput="window.kpApp.updateWeighmentGross(this.value)" />
                </div>
                <div class="form-group">
                  <label class="form-label">${t('tareWeight')} (qtl)</label>
                  <input type="number" step="0.05" id="weigh-tare" class="form-input" value="${tare.toFixed(2)}" oninput="window.kpApp.updateWeighmentTare(this.value)" />
                </div>
              </div>

              <!-- High Contrast Scale Display -->
              <div class="scale-display" style="margin-top: 1.5rem;">
                <p class="scale-label">${t('netWeight')}</p>
                <p class="scale-value" id="scale-net-display">${net.toFixed(2)} <span style="font-size: 1.5rem;">qtl</span></p>
              </div>

              <button onclick="window.kpApp.saveWeighment()" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 1.5rem;">
                ${icons.check} ${t('recordWeighment')}
              </button>
            </div>
          ` : `
            <div style="text-align: center; padding: 4rem 1rem;">
              <h3 class="font-serif" style="font-size: 1.25rem; font-weight: 700; margin-top: 1rem;">Choose a farmer</h3>
            </div>
          `}
        </div>
      </div>
    `;

    return renderShell(content, 'operations');
  }

  // 16. Procurement Desk
  function renderProcurementDesk() {
    const state = window.kpStore.getState();
    const queue = state.bookings.filter(b => ['WEIGHMENT', 'APPROVED', 'PAYMENT_PROCESSING', 'PAYMENT_COMPLETED'].includes(b.status));

    const content = `
      ${pageHeading(t('procurementPayment'), 'Close the loop with confidence.', 'Approve the final quantity, then make payment status visible to the farmer.')}

      <div class="kp-stagger" style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${queue.map(b => {
          const qty = b.netWeight || b.quantity || 10;
          const rate = b.rate || 2275;
          const amount = qty * rate;

          return `
            <div class="card" style="padding: 1.5rem;">
              <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 1rem;">
                <div>
                  <span class="font-mono" style="font-weight: 800; color: hsl(var(--primary)); font-size: 1.125rem;">${b.token}</span>
                  <h2 class="font-serif" style="font-size: 1.35rem; font-weight: 700; margin-top: 0.25rem;">${b.farmerName} • ${b.crop}</h2>
                </div>
                ${statusBadge(b.status)}
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; border-top: 1px solid hsl(var(--border)); padding-top: 1.25rem; margin-top: 1.25rem;">
                <div>
                  <label class="form-label">${t('netWeight')}</label>
                  <p class="font-mono font-serif" style="font-size: 1.35rem; font-weight: 700; margin-top: 0.25rem;">${qty} qtl</p>
                </div>

                <div class="form-group">
                  <label class="form-label">Procurement Rate (₹/qtl)</label>
                  <input type="number" id="proc-rate-${b.id}" class="form-input" value="${rate}" />
                </div>

                <div>
                  <label class="form-label">Projected payout</label>
                  <p class="font-serif" style="font-size: 1.5rem; font-weight: 700; color: hsl(var(--primary)); margin-top: 0.25rem;">${money(amount)}</p>
                </div>
              </div>

              <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.25rem; border-top: 1px solid hsl(var(--border)); padding-top: 1rem;">
                ${b.status === 'WEIGHMENT' ? `
                  <button onclick="window.kpApp.approveProcurement('${b.id}')" class="btn btn-primary">
                    ${icons.check} ${t('approveProcurement')}
                  </button>
                ` : ''}
                ${b.status === 'APPROVED' ? `
                  <button onclick="window.kpApp.completePayment('${b.id}')" class="btn btn-accent">
                    ${icons.creditCard} ${t('markPaymentComplete')}
                  </button>
                ` : ''}
                ${b.status === 'PAYMENT_COMPLETED' ? `
                  <div style="display: flex; align-items: center; gap: 0.5rem; color: #065f46; font-weight: 700; font-size: 0.875rem;">
                    ${icons.checkCircle} Disbursed Ref: ${b.paymentRef || 'KSP-82A1'}
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    return renderShell(content, 'operations');
  }

  // 17. Admin Analytics View (With Regional Geospatial Network Map)
  function renderAnalytics() {
    const state = window.kpStore.getState();
    const an = state.analytics;
    const maxCropVal = Math.max(...an.procurementByCrop.map(x => x.value), 1);
    const maxWeeklyVal = Math.max(...an.weeklyTrend.map(x => x.value), 1);

    const content = `
      ${pageHeading(t('controlRoom'), 'The network, at a glance.', 'A grounded geospatial view of farmers, queues, procurement, and payment across the platform.', `
        <button onclick="window.kpApp.refreshView()" class="btn btn-secondary">
          ${icons.refresh} ${t('refresh')}
        </button>
      `)}

      <div class="kp-stagger grid-4" style="margin-bottom: 2rem;">
        <div class="stat-card">
          <div class="stat-header"><span class="stat-icon primary">${icons.users}</span></div>
          <p class="stat-value">${an.totalFarmers}</p>
          <p class="stat-label">${t('farmersOnboarded')}</p>
        </div>

        <div class="stat-card">
          <div class="stat-header"><span class="stat-icon accent">${icons.calendar}</span></div>
          <p class="stat-value">${an.todayBookings}</p>
          <p class="stat-label">${t('bookingsToday')}</p>
        </div>

        <div class="stat-card">
          <div class="stat-header"><span class="stat-icon teal">${icons.activity}</span></div>
          <p class="stat-value">${an.activeQueue}</p>
          <p class="stat-label">${t('activeQueue')}</p>
        </div>

        <div class="stat-card">
          <div class="stat-header"><span class="stat-icon primary">${icons.creditCard}</span></div>
          <p class="stat-value">${an.paymentPending}</p>
          <p class="stat-label">${t('paymentPending')}</p>
        </div>
      </div>

      <!-- Admin Geospatial Network Map -->
      <div class="kp-map-card kp-stagger" style="margin-bottom: 2rem;">
        <div class="kp-map-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: hsl(var(--primary));">${icons.mapPin}</span>
            <span style="font-weight: 700; font-size: 0.95rem;">Regional Procurement Centers & Incoming Farmers Grid</span>
          </div>
          <span class="badge badge-accent">Live GPS Tracking</span>
        </div>
        <div id="admin-analytics-map" class="kp-map-container large"></div>
        <div class="kp-map-legend">
          <span class="legend-item"><span style="color: #059669;">●</span> Central Anchor (Farmer)</span>
          <span class="legend-item"><span style="color: #059669;">🏢</span> Low Crowd Hub</span>
          <span class="legend-item"><span style="color: #d97706;">🏢</span> Medium Crowd Hub</span>
          <span class="legend-item"><span style="color: #dc2626;">🏢</span> High Capacity Hub</span>
          <span class="legend-item"><span style="color: #2563eb;">🚜</span> Active Farmer Transports</span>
        </div>
      </div>

      <div class="kp-stagger" style="display: grid; gap: 1.5rem;" class="lg:grid-2">
        <div class="card" style="padding: 1.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h2 class="font-serif" style="font-size: 1.25rem; font-weight: 700;">${t('weeklyMovement')}</h2>
              <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">Completed procurement by day</p>
            </div>
            <div style="color: hsl(var(--primary));">${icons.trendingUp}</div>
          </div>

          <div style="display: flex; align-items: flex-end; gap: 0.75rem; height: 180px; margin-top: 2rem; padding-bottom: 0.5rem;">
            ${an.weeklyTrend.map(point => {
              const h = Math.max(16, Math.round((point.value / maxWeeklyVal) * 130));
              return `
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.35rem;">
                  <span style="font-size: 0.6875rem; font-weight: 700; color: hsl(var(--muted-foreground));">${point.value}</span>
                  <div style="width: 100%; height: ${h}px; border-radius: 0.5rem 0.5rem 0 0; background-color: hsl(var(--primary)); transition: height 0.3s ease;"></div>
                  <span style="font-size: 0.6875rem; font-weight: 600; color: hsl(var(--muted-foreground));">${point.label}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="card" style="padding: 1.75rem;">
          <h2 class="font-serif" style="font-size: 1.25rem; font-weight: 700;">${t('procurementByCrop')}</h2>
          <p style="font-size: 0.8125rem; color: hsl(var(--muted-foreground)); margin-top: 0.2rem;">Quantity recorded this season</p>

          <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-top: 1.75rem;">
            ${an.procurementByCrop.map(crop => {
              const pct = Math.round((crop.value / maxCropVal) * 100);
              return `
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.875rem; font-weight: 700;">
                    <span>${crop.label}</span>
                    <span>${crop.value} qtl</span>
                  </div>
                  <div style="height: 8px; border-radius: 9999px; background-color: hsl(var(--muted)); margin-top: 0.4rem; overflow: hidden;">
                    <div style="height: 100%; width: ${pct}%; border-radius: 9999px; background-color: hsl(var(--accent));"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    return renderShell(content, 'admin');
  }

  // 18. Not Found Fallback
  function renderNotFound() {
    return `
      <div style="min-height: 100vh; display: grid; place-items: center; padding: 2rem; text-align: center;">
        <div>
          <h1 class="font-serif" style="font-size: 4rem; font-weight: 800; color: hsl(var(--primary));">404</h1>
          <p class="font-serif" style="font-size: 1.5rem; font-weight: 700; margin-top: 0.5rem;">Page not found</p>
          <a href="#/" class="btn btn-primary" style="margin-top: 1.5rem;">Back to Home</a>
        </div>
      </div>
    `;
  }

  // --- Router & App Controller ---
  class AppController {
    constructor() {
      this.selectedRole = 'FARMER';
      this.bookingState = { centerId: 'center-1', slotId: 'slot-2', cropId: 'crop-1', quantity: '20' };
      this.confirmedBooking = null;
      this.queueFilter = 'ALL';
      this.selectedInspectionBookingId = null;
      this.selectedWeighmentBookingId = null;
      this.weighmentGross = null;
      this.weighmentTare = null;
      this.activeMaps = {};
      this.smartPriceCrop = 'Wheat';
      this.smartPriceQty = 25;
      this.smartPriceTransport = 'tractor';
      this.smartPriceTimeframe = '30D';
      this.smartPriceView = 'cards';
      this.smartPriceSort = 'netReturn';

      window.addEventListener('hashchange', () => this.route());
      window.kpStore.subscribe(() => this.route());
    }

    init() {
      this.route();
    }

    setLang(lang) {
      if (window.kpStore) {
        window.kpStore.setLanguage(lang);
        const name = lang === 'hi' ? 'हिंदी (Hindi)' : lang === 'te' ? 'తెలుగు (Telugu)' : 'English';
        showToast('Language Changed', `Portal language switched to ${name}.`, 'info');
      }
    }

    // --- Dynamic Geolocation Handlers ---
    detectLiveLocation() {
      if (!navigator.geolocation) {
        showToast('GPS Unavailable', 'Geolocation is not supported by your browser.', 'warning');
        return;
      }

      showToast('Acquiring GPS Fix', 'Detecting your device coordinates...', 'info');

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const accuracy = Math.round(position.coords.accuracy || 15);

          let locationName = `${lat.toFixed(2)}° N, ${lng.toFixed(2)}° E`;

          try {
            // Attempt reverse geocoding via OpenStreetMap Nominatim
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=12`, {
              headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
              const data = await res.json();
              if (data && data.address) {
                const city = data.address.city || data.address.town || data.address.village || data.address.county || data.address.state_district;
                const state = data.address.state || '';
                locationName = city ? `${city}, ${state}` : (data.display_name.split(',').slice(0, 2).join(','));
              }
            }
          } catch (e) {
            console.warn('Reverse geocoding fetch fallback:', e);
          }

          window.kpStore.updateUserLocation({
            lat,
            lng,
            locationName,
            isLiveGps: true,
            accuracy
          });

          showToast('Location Synced', `Live location locked: ${locationName} (${accuracy}m precision)`);
          this.route();
        },
        (error) => {
          console.warn('Geolocation error:', error);
          showToast('GPS Permission', 'Could not access GPS. Switched to high accuracy regional preset.', 'warning');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }

    selectLocationPreset(presetName) {
      const presets = window.LOCATION_PRESETS || [];
      const p = presets.find(x => x.name === presetName);
      if (p) {
        window.kpStore.updateUserLocation({
          lat: p.lat,
          lng: p.lng,
          locationName: `${p.name}, ${p.state}`,
          isLiveGps: false
        });
        showToast('Region Calibrated', `Active hub changed to ${p.name} (${p.state}). Centers updated.`);
        this.route();
      }
    }

    // --- Interactive Leaflet Map Initializer ---
    initLeafletMap(containerId, options = {}) {
      const container = document.getElementById(containerId);
      if (!container || typeof L === 'undefined') return;

      if (this.activeMaps[containerId]) {
        try {
          this.activeMaps[containerId].remove();
        } catch(e) {}
        delete this.activeMaps[containerId];
      }

      const state = window.kpStore.getState();
      const user = state.currentUser;
      const userCoords = user.coordinates || { lat: 22.7196, lng: 75.8577 };
      const centers = state.centers || [];
      const farmers = state.farmers || [];
      const selectedCenterId = options.selectedCenterId || this.bookingState.centerId || centers[0]?.id;
      const selectedCenter = centers.find(c => c.id === selectedCenterId) || centers[0];

      const map = L.map(containerId, {
        zoomControl: true,
        scrollWheelZoom: false
      }).setView([userCoords.lat, userCoords.lng], options.zoom || 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // 1. User Live Location Marker & Radius
      const userIcon = L.divIcon({
        className: 'user-pulse-marker',
        html: `<div class="pulse-ring"></div><div class="marker-dot">📍</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const userMarker = L.marker([userCoords.lat, userCoords.lng], { icon: userIcon }).addTo(map);
      userMarker.bindPopup(`
        <div class="map-popup-card">
          <span class="badge badge-accent" style="margin-bottom: 0.35rem; display: inline-block;">Your Live Location</span>
          <h4>${user.name} (You)</h4>
          <p style="font-size: 0.8125rem; color: #555;">${user.location}</p>
          <p style="font-size: 0.75rem; font-family: monospace; color: #777; margin-top: 0.25rem;">
            ${userCoords.lat.toFixed(4)}° N, ${userCoords.lng.toFixed(4)}° E
          </p>
        </div>
      `);

      L.circle([userCoords.lat, userCoords.lng], {
        radius: 2000,
        color: '#10b981',
        fillColor: '#10b981',
        fillOpacity: 0.08,
        weight: 1.5,
        dashArray: '4, 4'
      }).addTo(map);

      // 2. Centers Markers
      centers.forEach(c => {
        const isSelected = c.id === selectedCenterId;
        const crowdClass = c.crowd ? c.crowd.toLowerCase() : 'low';
        const centerIcon = L.divIcon({
          className: 'center-marker-badge',
          html: `
            <div class="pin-head ${crowdClass}" style="${isSelected ? 'transform: scale(1.15); box-shadow: 0 0 0 3px #154734;' : ''}">
              🏢 ${c.distance} km
            </div>
            <div class="pin-pointer"></div>
          `,
          iconSize: [64, 36],
          iconAnchor: [32, 36]
        });

        const cMarker = L.marker([c.coordinates.lat, c.coordinates.lng], { icon: centerIcon }).addTo(map);
        cMarker.bindPopup(`
          <div class="map-popup-card">
            <span class="badge ${c.crowd === 'LOW' ? 'badge-secondary' : c.crowd === 'HIGH' ? 'badge-destructive' : 'badge-accent'}" style="margin-bottom: 0.35rem; display: inline-block;">
              ${c.crowd} Crowd • ${c.waitMinutes} min wait
            </span>
            <h4>${c.name}</h4>
            <p style="font-size: 0.8125rem; color: #555; margin-bottom: 0.5rem;">${c.location} • Code: <b>${c.code}</b></p>
            <div style="font-size: 0.75rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem; padding: 0.5rem; background: #f4f6f5; border-radius: 0.5rem; margin-bottom: 0.75rem;">
              <div><b>Distance:</b> ${c.distance} km</div>
              <div><b>Drive ETA:</b> ~${c.etaMinutes} min</div>
              <div><b>Queue:</b> ${c.queue} trucks</div>
              <div><b>Open Slots:</b> ${c.availableSlots}</div>
            </div>
            <button onclick="window.kpApp.selectCenter('${c.id}')" class="btn btn-primary btn-sm" style="width: 100%; justify-content: center;">
              Select for Booking
            </button>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${c.coordinates.lat},${c.coordinates.lng}" target="_blank" class="btn btn-ghost btn-sm" style="width: 100%; justify-content: center; margin-top: 0.35rem; font-size: 0.75rem;">
              🗺️ Navigate via Google Maps
            </a>
          </div>
        `);
      });

      // 3. Nearby Active Farmers
      farmers.forEach(f => {
        const fIcon = L.divIcon({
          className: 'farmer-marker-badge',
          html: `🚜`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const fMarker = L.marker([f.coordinates.lat, f.coordinates.lng], { icon: fIcon }).addTo(map);
        fMarker.bindPopup(`
          <div class="map-popup-card">
            <span class="badge badge-primary" style="margin-bottom: 0.35rem; display: inline-block;">Nearby Farmer</span>
            <h4>${f.name}</h4>
            <p style="font-size: 0.8125rem; color: #555;">${f.village} • ID: ${f.farmerId}</p>
            <div style="font-size: 0.75rem; margin-top: 0.5rem; padding: 0.5rem; background: #f8fafc; border-radius: 0.5rem;">
              <div><b>Crop:</b> ${f.crop} (${f.quantity} qtl)</div>
              <div><b>Token:</b> ${f.token} (${f.status})</div>
              <div><b>Heading To:</b> ${f.centerName} (${f.distanceToCenter} km)</div>
            </div>
          </div>
        `);
      });

      // 4. Route Polyline to Selected Center
      if (selectedCenter && selectedCenter.coordinates) {
        const latlngs = [
          [userCoords.lat, userCoords.lng],
          [selectedCenter.coordinates.lat, selectedCenter.coordinates.lng]
        ];
        L.polyline(latlngs, {
          color: '#059669',
          weight: 4,
          opacity: 0.85,
          dashArray: '8, 8'
        }).addTo(map);
      }

      // Auto fit bounds
      try {
        const allPoints = [
          [userCoords.lat, userCoords.lng],
          ...centers.map(c => [c.coordinates.lat, c.coordinates.lng]),
          ...farmers.map(f => [f.coordinates.lat, f.coordinates.lng])
        ];
        const bounds = L.latLngBounds(allPoints);
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
      } catch(e) {}

      setTimeout(() => {
        map.invalidateSize();
      }, 250);

      this.activeMaps[containerId] = map;
    }

    route() {
      const hash = window.location.hash || '#/';
      const root = document.getElementById('root');
      if (!root) return;

      closeModal();
      window.scrollTo(0, 0);

      switch(hash) {
        case '#/':
        case '':
          root.innerHTML = renderLanding();
          break;
        case '#/login':
          root.innerHTML = renderLogin();
          break;
        case '#/farmer':
          root.innerHTML = renderFarmerDashboard();
          setTimeout(() => this.initLeafletMap('farmer-dashboard-map'), 50);
          break;
        case '#/farmer/smart-price':
          root.innerHTML = renderSmartPrice();
          break;
        case '#/farmer/crops':
          root.innerHTML = renderCrops();
          break;
        case '#/farmer/book':
          root.innerHTML = renderBookSlot();
          setTimeout(() => this.initLeafletMap('book-slot-map', { selectedCenterId: this.bookingState.centerId }), 50);
          break;
        case '#/farmer/bookings':
          root.innerHTML = renderBookings();
          break;
        case '#/farmer/queue':
          root.innerHTML = renderQueue();
          break;
        case '#/farmer/status':
          root.innerHTML = renderStatus();
          break;
        case '#/farmer/notifications':
          root.innerHTML = renderNotifications();
          break;
        case '#/farmer/profile':
          root.innerHTML = renderProfile();
          break;
        case '#/farmer/help':
          root.innerHTML = renderHelp();
          break;
        case '#/operations':
          root.innerHTML = renderOperations();
          break;
        case '#/operations/queue':
          root.innerHTML = renderOperationsQueue();
          break;
        case '#/operations/inspection':
          root.innerHTML = renderInspectionDesk();
          break;
        case '#/operations/weighment':
          root.innerHTML = renderWeighmentDesk();
          break;
        case '#/operations/procurement':
          root.innerHTML = renderProcurementDesk();
          break;
        case '#/admin/analytics':
          root.innerHTML = renderAnalytics();
          setTimeout(() => this.initLeafletMap('admin-analytics-map', { zoom: 10 }), 50);
          break;
        default:
          root.innerHTML = renderNotFound();
          break;
      }
    }

    toggleSidebar(open) {
      const sidebar = document.getElementById('app-sidebar');
      const backdrop = document.getElementById('sidebar-backdrop');
      if (sidebar && backdrop) {
        if (open) {
          sidebar.classList.add('open');
          backdrop.classList.add('open');
        } else {
          sidebar.classList.remove('open');
          backdrop.classList.remove('open');
        }
      }
    }

    refreshView() {
      showToast('Data refreshed', 'Synced latest queue and operational metrics.', 'info');
      this.route();
    }

    selectRole(role) {
      this.selectedRole = role;
      const user = window.kpStore.getState().demoUsers.find(u => u.role === role);
      if (user) window.kpStore.setCurrentUser(user);
      this.route();
    }

    enterWorkspace() {
      const user = window.kpStore.getState().demoUsers.find(u => u.role === this.selectedRole);
      if (user) {
        window.kpStore.setCurrentUser(user);
        window.location.hash = user.path;
      }
    }

    logout() {
      window.location.hash = '#/login';
      showToast('Logged out', 'Returned to demo role switcher.', 'info');
    }

    // Farmer Crop Modal
    openAddCropModal() {
      const modalContent = `
        <form onsubmit="window.kpApp.submitNewCrop(event)" style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Crop name</label>
            <input type="text" id="new-crop-name" class="form-input" placeholder="e.g. Wheat" required />
          </div>
          <div class="form-group">
            <label class="form-label">Variety</label>
            <input type="text" id="new-crop-variety" class="form-input" placeholder="e.g. HD 2967" required />
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Area (acres)</label>
              <input type="number" step="0.5" id="new-crop-area" class="form-input" value="2.5" required />
            </div>
            <div class="form-group">
              <label class="form-label">Expected quantity (quintal)</label>
              <input type="number" id="new-crop-qty" class="form-input" value="25" required />
            </div>
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Season</label>
              <select id="new-crop-season" class="form-select">
                <option value="Rabi">Rabi</option>
                <option value="Kharif">Kharif</option>
                <option value="Zaid">Zaid</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Unit</label>
              <input type="text" id="new-crop-unit" class="form-input" value="quintal" required />
            </div>
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Arrival date</label>
              <input type="date" id="new-crop-arrival" class="form-input" value="${new Date().toISOString().slice(0, 10)}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Harvest date (optional)</label>
              <input type="date" id="new-crop-harvest" class="form-input" />
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-lg" style="margin-top: 0.5rem;">
            ${icons.sprout} ${t('registerCrop')}
          </button>
        </form>
      `;
      openModal(t('registerCrop'), modalContent);
    }

    submitNewCrop(e) {
      e.preventDefault();
      const name = document.getElementById('new-crop-name').value;
      const variety = document.getElementById('new-crop-variety').value;
      const area = document.getElementById('new-crop-area').value;
      const expectedQuantity = document.getElementById('new-crop-qty').value;
      const season = document.getElementById('new-crop-season').value;
      const unit = document.getElementById('new-crop-unit').value;
      const arrivalDate = document.getElementById('new-crop-arrival').value;
      const harvestDate = document.getElementById('new-crop-harvest').value;

      window.kpStore.createCrop({ name, variety, area, expectedQuantity, season, unit, arrivalDate, harvestDate });
      closeModal();
      showToast('Crop registered', `${name} (${variety}) registered successfully!`);
    }

    selectCenter(centerId) {
      this.bookingState.centerId = centerId;
      const firstSlot = window.kpStore.getState().slots.find(s => s.centerId === centerId && s.status === 'OPEN');
      if (firstSlot) this.bookingState.slotId = firstSlot.id;
      this.confirmedBooking = null;
      this.route();
    }

    selectSlot(slotId) {
      this.bookingState.slotId = slotId;
      this.confirmedBooking = null;
      this.route();
    }

    updateBookingCrop(cropId) {
      this.bookingState.cropId = cropId;
    }

    updateBookingQty(qty) {
      this.bookingState.quantity = qty;
    }

    submitBooking() {
      const { cropId, centerId, slotId, quantity } = this.bookingState;
      const b = window.kpStore.createBooking({ cropId, centerId, slotId, quantity });
      this.confirmedBooking = b;
      showToast('Booking confirmed', `Token ${b.token} generated for ${b.crop} at ${b.center}!`);
      this.route();
    }

    cancelBooking(bookingId) {
      if (confirm('Are you sure you want to cancel this visit slot?')) {
        window.kpStore.cancelBooking(bookingId);
        showToast('Cancelled', 'Your visit booking has been cancelled.', 'warning');
      }
    }

    markNotificationRead(id) {
      window.kpStore.markNotificationRead(id);
    }

    markAllNotificationsRead() {
      window.kpStore.markAllNotificationsRead();
      showToast('Updated', 'All notifications marked as read.', 'info');
    }

    saveProfile(e) {
      e.preventDefault();
      const name = document.getElementById('prof-name').value;
      const farmerId = document.getElementById('prof-id').value;
      const location = document.getElementById('prof-loc').value;
      const lat = Number(document.getElementById('prof-lat')?.value || 22.7196);
      const lng = Number(document.getElementById('prof-lng')?.value || 75.8577);
      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

      window.kpStore.setCurrentUser({
        ...window.kpStore.getCurrentUser(),
        name,
        farmerId,
        location,
        coordinates: { lat, lng },
        initials
      });

      window.kpStore.updateUserLocation({ lat, lng, locationName: location, isLiveGps: false });
      showToast('Saved', 'Profile & live coordinates updated successfully!');
    }

    filterQueue(filter) {
      this.queueFilter = filter;
      this.route();
    }

    callNextFarmer() {
      const b = window.kpStore.callNextFarmer();
      if (b) {
        showToast('Calling Next', `Farmer ${b.farmerName} (Token ${b.token}) called to counter.`);
      } else {
        showToast('Queue clear', 'No pending arrivals waiting in queue.', 'info');
      }
    }

    markArrived(bookingId) {
      window.kpStore.markFarmerArrived(bookingId);
      showToast('Arrival logged', 'Farmer arrival recorded.');
    }

    verifyFarmer(bookingId) {
      window.kpStore.verifyFarmer(bookingId);
      showToast('Verified', 'Farmer verified and sent to inspection.');
    }

    selectInspectionBooking(id) {
      this.selectedInspectionBookingId = id;
      this.route();
    }

    submitInspection(e) {
      e.preventDefault();
      const bookingId = this.selectedInspectionBookingId;
      const moisture = document.getElementById('insp-moisture').value;
      const foreignMaterial = document.getElementById('insp-fm').value;
      const grade = document.getElementById('insp-grade').value;
      const result = document.getElementById('insp-result').value;
      const remarks = document.getElementById('insp-remarks').value;

      window.kpStore.createInspection({ bookingId, moisture, foreignMaterial, grade, result, remarks });
      showToast('Inspection Saved', `Quality grade ${grade} recorded.`);
      this.selectedInspectionBookingId = null;
      this.route();
    }

    selectWeighmentBooking(id) {
      this.selectedWeighmentBookingId = id;
      this.weighmentGross = null;
      this.weighmentTare = null;
      this.route();
    }

    updateWeighmentGross(val) {
      this.weighmentGross = val;
      this.updateNetDisplay();
    }

    updateWeighmentTare(val) {
      this.weighmentTare = val;
      this.updateNetDisplay();
    }

    updateNetDisplay() {
      const g = Number(this.weighmentGross || document.getElementById('weigh-gross')?.value || 0);
      const t = Number(this.weighmentTare || document.getElementById('weigh-tare')?.value || 0);
      const net = Math.max(0, g - t);
      const el = document.getElementById('scale-net-display');
      if (el) {
        el.innerHTML = `${net.toFixed(2)} <span style="font-size: 1.5rem;">qtl</span>`;
      }
    }

    saveWeighment() {
      const bookingId = this.selectedWeighmentBookingId;
      const gross = Number(document.getElementById('weigh-gross')?.value || this.weighmentGross || 0);
      const tare = Number(document.getElementById('weigh-tare')?.value || this.weighmentTare || 0);

      window.kpStore.createWeighment({ bookingId, gross, tare });
      showToast('Weighment Recorded', `Net ${(gross - tare).toFixed(2)} qtl scale certificate generated.`);
      this.selectedWeighmentBookingId = null;
      this.route();
    }

    approveProcurement(bookingId) {
      const rateInput = document.getElementById(`proc-rate-${bookingId}`);
      const rate = rateInput ? Number(rateInput.value) : 2275;
      window.kpStore.approveProcurement(bookingId, rate);
      showToast('Procurement Approved', 'Purchase voucher approved. Ready for payment.');
    }

    completePayment(bookingId) {
      window.kpStore.updatePaymentStatus(bookingId, 'COMPLETED');
      showToast('Payment Complete', 'Direct benefit transfer credited to farmer account.');
    }

    // Smart Selling Price & Market Comparison Controller Methods
    setSmartPriceCrop(cropName) {
      this.smartPriceCrop = cropName;
      this.route();
    }

    setSmartPriceQty(qty) {
      this.smartPriceQty = Math.max(1, Number(qty) || 25);
      this.route();
    }

    setSmartPriceTransport(mode) {
      this.smartPriceTransport = mode;
      this.route();
    }

    setSmartPriceTimeframe(tf) {
      this.smartPriceTimeframe = tf;
      this.route();
    }

    setSmartPriceView(view) {
      this.smartPriceView = view;
      this.route();
    }

    setSmartPriceSort(sort) {
      this.smartPriceSort = sort;
      this.route();
    }

    bookAtMarket(marketId, cropName, quantity) {
      const state = window.kpStore.getState();
      const matchedCrop = state.crops.find(c => c.name.toLowerCase() === cropName.toLowerCase()) || state.crops[0];
      const matchedCenter = state.centers[0];

      this.bookingState.cropId = matchedCrop ? matchedCrop.id : 'crop-1';
      this.bookingState.quantity = quantity || 25;
      this.bookingState.centerId = matchedCenter ? matchedCenter.id : 'center-1';
      this.confirmedBooking = null;

      window.location.hash = '#/farmer/book';
      showToast('Market Selected', `Proceed to lock your arrival slot for ${quantity} qtl ${cropName}.`, 'info');
    }

    openSetPriceAlertModal(cropName) {
      const crop = cropName || this.smartPriceCrop || 'Wheat';
      const cropInfo = window.CROP_MASTER_DATA[crop] || { msp: 2275, basePrice: 2275 };
      const currentMarketPrice = cropInfo.basePrice + Math.round(cropInfo.msp * 0.064);

      const modalContent = `
        <form onsubmit="window.kpApp.submitPriceAlert(event)" style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="form-group">
            <label class="form-label">${t('crop')}</label>
            <select id="alert-crop" class="form-select" onchange="document.getElementById('alert-target-price').value = (window.CROP_MASTER_DATA[this.value]?.basePrice || 2275) + 120">
              ${Object.keys(window.CROP_MASTER_DATA).map(c => `<option value="${c}" ${c === crop ? 'selected' : ''}>${c} (MSP ₹${window.CROP_MASTER_DATA[c].msp}/qtl)</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label class="form-label">${t('targetPrice')}</label>
              <span style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">Current: ~₹${currentMarketPrice}/qtl</span>
            </div>
            <input type="number" id="alert-target-price" class="form-input font-mono" style="font-size: 1.2rem; font-weight: 700;" value="${currentMarketPrice + 120}" required />
            <div style="display: flex; gap: 0.4rem; margin-top: 0.4rem;">
              <button type="button" onclick="document.getElementById('alert-target-price').value = ${currentMarketPrice + 50}" class="btn btn-ghost" style="padding: 0.2rem 0.5rem; font-size: 0.75rem; background: hsla(var(--muted), 0.5);">+₹50</button>
              <button type="button" onclick="document.getElementById('alert-target-price').value = ${currentMarketPrice + 100}" class="btn btn-ghost" style="padding: 0.2rem 0.5rem; font-size: 0.75rem; background: hsla(var(--muted), 0.5);">+₹100</button>
              <button type="button" onclick="document.getElementById('alert-target-price').value = ${currentMarketPrice + 200}" class="btn btn-ghost" style="padding: 0.2rem 0.5rem; font-size: 0.75rem; background: hsla(var(--muted), 0.5);">+₹200</button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">${t('marketComparison')} Scope</label>
            <select id="alert-scope" class="form-select">
              <option value="All Nearby Mandis">All Nearby Mandis & Hubs (Within 50 km)</option>
              <option value="Nearest APMC Mandi">Nearest APMC Mandi Only</option>
              <option value="Govt MSP Center">Primary Govt Procurement Center</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary btn-lg" style="margin-top: 0.5rem;">
            ${icons.bell} ${t('createAlert')}
          </button>
        </form>
      `;
      openModal(t('setPriceAlert'), modalContent);
    }

    submitPriceAlert(e) {
      e.preventDefault();
      const crop = document.getElementById('alert-crop').value;
      const targetPrice = Number(document.getElementById('alert-target-price').value);
      const marketName = document.getElementById('alert-scope').value;

      window.kpStore.createPriceAlert({ crop, targetPrice, marketName });
      closeModal();
      showToast('Price Alert Set', `Target of ₹${targetPrice}/qtl set for ${crop}.`);
      this.route();
    }

    deletePriceAlert(id) {
      window.kpStore.deletePriceAlert(id);
      showToast('Alert Removed', 'Price alert removed.');
      this.route();
    }

    togglePriceAlert(id) {
      window.kpStore.togglePriceAlert(id);
      showToast('Alert Updated', 'Price alert status toggled.');
      this.route();
    }

    testPriceAlert(cropName) {
      const crop = cropName || this.smartPriceCrop || 'Wheat';
      const cropInfo = window.CROP_MASTER_DATA[crop] || { msp: 2275, basePrice: 2275 };
      const simulatedPrice = cropInfo.basePrice + 180;

      window.kpStore.addNotification({
        title: `🎯 Target Price Reached: ${crop} at ₹${simulatedPrice}/qtl!`,
        message: `Indore Central APMC Mandi is now trading ${crop} at ₹${simulatedPrice}/qtl (+₹180 over MSP). Compare net returns and lock your preferred selling option.`,
        unread: true
      });

      showToast('Alert Triggered', `Price alert for ${crop} (₹${simulatedPrice}/qtl) received. Check notifications!`, 'info');
      this.route();
    }

    closeModal() {
      closeModal();
    }
  }

  window.kpApp = new AppController();
  document.addEventListener('DOMContentLoaded', () => window.kpApp.init());
})();
